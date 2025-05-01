import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaUser, FaArrowLeft, FaSpinner, FaExclamationTriangle, FaEnvelope, FaPhone, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { memberService } from '../services/api';

const MemberDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        // Fetch member details
        const memberData = await memberService.getMemberById(id);
        setMember(memberData);

        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching member details:', err);
        setError('Failed to load member details. The member may not exist or there was a server error.');
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [id]);

  const handleDelete = async () => {
    // Confirm before deletion
    const confirmed = window.confirm(`Are you sure you want to delete ${member.name}?`);
    
    if (!confirmed) {
      return;
    }
    
    setDeleteLoading(true);
    
    try {
      await memberService.deleteMember(id);
      toast.success('Team member deleted successfully');
      navigate('/members');
    } catch (err) {
      console.error('Error deleting member:', err);
      toast.error('Failed to delete team member');
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ 
        padding: '60px 20px', 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '60vh'
      }}>
        <FaSpinner size={40} className="fa-spin" style={{ color: 'var(--primary-color)', marginBottom: '20px' }} />
        <p>Loading member details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '60px 20px' }}>
        <div className="alert alert-danger" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          padding: '20px'
        }}>
          <FaExclamationTriangle size={24} />
          <div>
            <h3 style={{ marginBottom: '5px' }}>Error</h3>
            <p>{error}</p>
          </div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <Link to="/members" className="button outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <FaArrowLeft /> Back to Members
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container fade-in" style={{ padding: '60px 20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/members" className="button outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <FaArrowLeft /> Back to Members
        </Link>
      </div>

      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        {/* Header Section */}
        <div style={{ 
          background: 'linear-gradient(to right, var(--primary-color), var(--secondary-color))',
          padding: '40px',
          color: 'white',
          position: 'relative'
        }}>
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{member.name}</h1>
              <p style={{ fontSize: '1.2rem', opacity: '0.9' }}>{member.role}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ 
                width: '150px', 
                height: '150px', 
                borderRadius: '50%', 
                overflow: 'hidden',
                border: '5px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
              }}>
                {member.profileImage ? (
                  <img 
                    src={member.profileImage} 
                    alt={`${member.name}'s profile`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                ) : (
                  <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                  }}>
                    <FaUser size={60} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Member Details */}
        <div style={{ padding: '40px' }}>
          <div className="grid grid-2" style={{ gap: '40px' }}>
            <div>
              <h2 style={{ 
                color: 'var(--primary-color)', 
                marginBottom: '20px',
                borderBottom: '2px solid var(--primary-color)',
                paddingBottom: '10px'
              }}>
                Contact Information
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ 
                    backgroundColor: 'var(--primary-color)', 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <FaEnvelope />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--gray-color)' }}>Email</p>
                    <p style={{ fontWeight: '500' }}>
                      <a href={`mailto:${member.email}`} style={{ color: 'var(--dark-color)' }}>
                        {member.email}
                      </a>
                    </p>
                  </div>
                </div>
                
                {member.phoneNumber && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ 
                      backgroundColor: 'var(--secondary-color)', 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <FaPhone />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--gray-color)' }}>Phone</p>
                      <p style={{ fontWeight: '500' }}>
                        <a href={`tel:${member.phoneNumber}`} style={{ color: 'var(--dark-color)' }}>
                          {member.phoneNumber}
                        </a>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h2 style={{ 
                color: 'var(--primary-color)', 
                marginBottom: '20px',
                borderBottom: '2px solid var(--primary-color)',
                paddingBottom: '10px'
              }}>
                Additional Information
              </h2>
              
              <div style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '20px', 
                borderRadius: 'var(--border-radius)',
                minHeight: '150px'
              }}>
                {member.additionalInfo ? (
                  <p>{member.additionalInfo}</p>
                ) : (
                  <p style={{ color: 'var(--gray-color)', fontStyle: 'italic' }}>
                    No additional information provided.
                  </p>
                )}
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                gap: '15px', 
                marginTop: '20px'
              }}>
                <button 
                  className="button outline" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    borderColor: 'var(--danger-color)',
                    color: 'var(--danger-color)'
                  }}
                  onClick={handleDelete}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? <FaSpinner className="fa-spin" /> : <FaTrash />} 
                  {deleteLoading ? 'Deleting...' : 'Delete Member'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsPage;