import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaSpinner, FaSearch, FaExclamationTriangle } from 'react-icons/fa';
import { memberService } from '../services/api';
import MemberCard from '../components/memberCard';

const ViewMembersPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await memberService.getAllMembers();
        setMembers(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching members:', err);
        setError('Failed to load team members. Please try again later.');
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Filter members based on search term
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container fade-in" style={{ padding: '60px 20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <h1 className="section-title" style={{ margin: 0 }}>Team Members</h1>
        
        <Link to="/add-member" className="button" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px'
        }}>
          <FaUserPlus /> Add New Member
        </Link>
      </div>

      {/* Search Bar */}
      <div className="card" style={{ 
        padding: '15px', 
        marginBottom: '30px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white'
      }}>
        <FaSearch size={20} style={{ marginRight: '10px', color: 'var(--gray-color)' }} />
        <input
          type="text"
          placeholder="Search members by name, role or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            border: 'none',
            fontSize: '16px',
            width: '100%',
            outline: 'none',
            backgroundColor: 'transparent'
          }}
        />
      </div>

      {loading ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '50px 0', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}>
          <FaSpinner size={40} className="fa-spin" style={{ color: 'var(--primary-color)', marginBottom: '20px' }} />
          <p>Loading team members...</p>
        </div>
      ) : error ? (
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
      ) : filteredMembers.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          {searchTerm ? (
            <div>
              <p style={{ marginBottom: '20px', fontSize: '1.2rem', color: 'var(--gray-color)' }}>
                No members found for "{searchTerm}".
              </p>
              <button className="button outline" onClick={() => setSearchTerm('')}>
                Clear Search
              </button>
            </div>
          ) : (
            <div>
              <h2 style={{ marginBottom: '20px', color: 'var(--primary-color)' }}>No team members yet!</h2>
              <p style={{ marginBottom: '30px', fontSize: '1.1rem', color: 'var(--gray-color)' }}>
                Get started by adding your first team member.
              </p>
              <Link to="/add-member" className="button" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <FaUserPlus /> Add New Member
              </Link>
            </div>
          )}
        </div>
      ) : (
        <>
          {searchTerm && (
            <p style={{ marginBottom: '20px' }}>
              Showing {filteredMembers.length} results for "{searchTerm}"
              <button 
                onClick={() => setSearchTerm('')} 
                style={{ 
                  marginLeft: '10px', 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--primary-color)', 
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Clear
              </button>
            </p>
          )}
          <div className="grid grid-3">
            {filteredMembers.map(member => (
              <MemberCard key={member._id} member={member} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewMembersPage;