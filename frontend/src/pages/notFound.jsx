import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="container fade-in" style={{ 
      padding: '80px 20px', 
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh'
    }}>
      <FaExclamationTriangle size={60} style={{ color: 'var(--accent-color)', marginBottom: '20px' }} />
      
      <h1 style={{ 
        fontSize: '3rem', 
        color: 'var(--primary-color)', 
        marginBottom: '20px' 
      }}>
        404
      </h1>
      
      <h2 style={{ marginBottom: '20px' }}>Page Not Found</h2>
      
      <p style={{ 
        fontSize: '1.1rem', 
        color: 'var(--gray-color)', 
        maxWidth: '600px', 
        marginBottom: '30px' 
      }}>
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      
      <Link to="/" className="button" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <FaHome /> Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;