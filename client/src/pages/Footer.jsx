import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-title">About Me</h2>
        <p className="footer-description">
          I'm Ashutosh — a Full Stack Developer who builds beautiful UIs, solves real-world problems with code, and keeps learning every day.
        </p>

        <div className="social-icons">
          <Link to="https://github.com/ashutoshpariharr" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </Link>
          <Link to="https://www.linkedin.com/in/ashutosh-parihar-110916281/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </Link>
          <Link to="https://www.instagram.com/ashutosh_parihar___/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </Link>
        </div>

        <p className="footer-copy">&copy; {new Date().getFullYear()} Ashutosh. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
