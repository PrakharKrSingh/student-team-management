import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={{
      backgroundColor: '#f8f9fa',
      padding: '20px 0',
      textAlign: 'center',
      marginTop: '40px',
      borderTop: '1px solid #e9ecef'
    }}>
      <div className="container">
        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
          &copy; {currentYear} Team Maestro. Made with <FaHeart style={{ color: 'var(--accent-color)' }} /> by Prakhar, Satvik, and Akshat
        </p>
      </div>
    </footer>
  );
};

export default Footer;