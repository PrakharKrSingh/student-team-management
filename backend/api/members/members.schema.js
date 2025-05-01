import { z } from 'zod';
import { ObjectId } from 'mongodb';

// Custom ObjectId validator
const objectIdSchema = z.string().refine(
  (val) => {
    try {
      return new ObjectId(val);
    } catch (error) {
      return false;
    }
  },
  {
    message: 'Invalid ObjectId format',
  }
);

// Schema for creating a new member
export const createMemberSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  role: z.string().min(1, 'Role is required').max(100),
  email: z.string().email('Invalid email format').max(100),
  phoneNumber: z.string().optional(),
  additionalInfo: z.string().optional(),
  // profileImage is handled separately, not included in validation
});

// Schema for updating an existing member
export const updateMemberSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).optional(),
  role: z.string().min(1, 'Role is required').max(100).optional(),
  email: z.string().email('Invalid email format').max(100).optional(),
  phoneNumber: z.string().optional(),
  additionalInfo: z.string().optional(),
  // profileImage is handled separately, not included in validation
});

// Schema for member ID parameter
export const memberIdSchema = z.object({
  id: objectIdSchema,
});