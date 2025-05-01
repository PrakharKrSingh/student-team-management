import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api`; // Ensure this is set in your .env file

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Member service
export const memberService = {
  // Get all members
  getAllMembers: async () => {
    try {
      const response = await api.get('/members');
      return response.data;
    } catch (error) {
      console.error('Error fetching members:', error);
      throw error;
    }
  },

  // Get member by ID
  getMemberById: async (id) => {
    try {
      const response = await api.get(`/members/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching member with ID ${id}:`, error);
      throw error;
    }
  },

  // Get member image
  getMemberImage: async (id) => {
    try {
      const response = await api.get(`/members/${id}/image`);
      return response.data.profileImage;
    } catch (error) {
      console.error(`Error fetching image for member with ID ${id}:`, error);
      throw error;
    }
  },

  // Create new member
  createMember: async (memberData) => {
    // For file uploads, we need to use FormData
    const formData = new FormData();
    
    // Add all member data to form
    Object.keys(memberData).forEach(key => {
      if (key === 'profileImage' && memberData[key] instanceof File) {
        formData.append(key, memberData[key]);
      } else if (key !== 'profileImage') {
        formData.append(key, memberData[key]);
      }
    });

    try {
      const response = await axios.post(`${API_URL}/members`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating member:', error);
      throw error;
    }
  },

  // Update member
  updateMember: async (id, memberData) => {
    // For file uploads, we need to use FormData
    const formData = new FormData();
    
    // Add all member data to form
    Object.keys(memberData).forEach(key => {
      if (key === 'profileImage' && memberData[key] instanceof File) {
        formData.append(key, memberData[key]);
      } else if (key !== 'profileImage') {
        formData.append(key, memberData[key]);
      }
    });

    try {
      const response = await axios.put(`${API_URL}/members/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating member with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete member
  deleteMember: async (id) => {
    try {
      const response = await api.delete(`/members/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting member with ID ${id}:`, error);
      throw error;
    }
  }
};