import { ObjectId } from 'mongodb';
import { getDb } from '../../config/db.js';
import { 
  createMemberSchema, 
  updateMemberSchema, 
  memberIdSchema 
} from './members.schema.js';

// Collection name
const COLLECTION = 'members';

// Get all members
export async function getAllMembers(req, res) {
  try {
    const db = getDb();
    const members = await db.collection(COLLECTION).find().toArray();
    res.status(200).json(members);
  } catch (error) {
    console.error('Error getting members:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
}

// Get member by ID
export async function getMemberById(req, res) {
  try {
    // Validate ID
    const validation = memberIdSchema.safeParse({ id: req.params.id });
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors });
    }

    const db = getDb();
    const memberId = new ObjectId(req.params.id);
    const member = await db.collection(COLLECTION).findOne({ _id: memberId });

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.status(200).json(member);
  } catch (error) {
    console.error('Error getting member by ID:', error);
    res.status(500).json({ error: 'Failed to fetch member' });
  }
}

// Create new member
export async function createMember(req, res) {
  try {
    // Extract profile image from body if present
    const { profileImage, ...memberData } = req.body;
    
    // Validate member data
    const validation = createMemberSchema.safeParse(memberData);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    const db = getDb();
    
    // Prepare data for insertion
    const newMemberData = {
      ...validation.data,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add profile image if provided
    if (profileImage) {
      newMemberData.profileImage = profileImage;
    }

    const result = await db.collection(COLLECTION).insertOne(newMemberData);
    const newMember = await db.collection(COLLECTION).findOne({ _id: result.insertedId });

    // Return member without full image data to keep response size reasonable
    if (newMember.profileImage) {
      // Just return a flag that image exists
      const memberWithoutFullImage = {
        ...newMember,
        profileImage: 'Image data exists',
        hasImage: true
      };
      res.status(201).json(memberWithoutFullImage);
    } else {
      res.status(201).json(newMember);
    }
  } catch (error) {
    console.error('Error creating member:', error);
    res.status(500).json({ error: 'Failed to create member' });
  }
}

// Update member
export async function updateMember(req, res) {
  try {
    // Validate ID
    const idValidation = memberIdSchema.safeParse({ id: req.params.id });
    if (!idValidation.success) {
      return res.status(400).json({ error: idValidation.error.errors });
    }

    // Extract profile image from body if present
    const { profileImage, ...memberData } = req.body;
    
    // Validate member data
    const validation = updateMemberSchema.safeParse(memberData);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    const db = getDb();
    const memberId = new ObjectId(req.params.id);
    
    // Prepare update data
    const updateData = {
      ...validation.data,
      updatedAt: new Date()
    };

    // Add profile image if provided
    if (profileImage) {
      updateData.profileImage = profileImage;
    }

    const result = await db.collection(COLLECTION).updateOne(
      { _id: memberId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Member not found' });
    }

    const updatedMember = await db.collection(COLLECTION).findOne({ _id: memberId });
    
    // Return member without full image data to keep response size reasonable
    if (updatedMember.profileImage) {
      // Just return a flag that image exists
      const memberWithoutFullImage = {
        ...updatedMember,
        profileImage: 'Image data exists',
        hasImage: true
      };
      res.status(200).json(memberWithoutFullImage);
    } else {
      res.status(200).json(updatedMember);
    }
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ error: 'Failed to update member' });
  }
}

// Delete member
export async function deleteMember(req, res) {
  try {
    // Validate ID
    const validation = memberIdSchema.safeParse({ id: req.params.id });
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors });
    }

    const db = getDb();
    const memberId = new ObjectId(req.params.id);
    
    const result = await db.collection(COLLECTION).deleteOne({ _id: memberId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ error: 'Failed to delete member' });
  }
}

// Add a route to get image by member ID
export async function getMemberImage(req, res) {
  try {
    // Validate ID
    const validation = memberIdSchema.safeParse({ id: req.params.id });
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors });
    }

    const db = getDb();
    const memberId = new ObjectId(req.params.id);
    
    // Only fetch the profileImage field
    const member = await db.collection(COLLECTION).findOne(
      { _id: memberId },
      { projection: { profileImage: 1 } }
    );

    if (!member || !member.profileImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // The profileImage field contains the data URL format: data:image/jpeg;base64,/9j/4AAQSkZ...
    // We can send this directly
    res.status(200).json({ profileImage: member.profileImage });
  } catch (error) {
    console.error('Error getting member image:', error);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
}