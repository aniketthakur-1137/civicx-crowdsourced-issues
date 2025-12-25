const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {/* Logo & Description */}
        <div>
          <div className="logo-inline">
            <div className="logo-circle small">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 2C8.686 2 6 6 6 10.5S8.686 19 12 20c3.314-1 6-5 6-9.5S15.314 2 12 2z"
                  fill="white"
                />
              </svg>
            </div>
            <span className="logo-text footer-logo">
              <span className="dark-green">Civic</span>
              <span className="light-green">X</span>
            </span>
          </div>
          <p className="muted small">
            CivicX — Crowdsourced civic issue reporting & resolution.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4>Contact</h4>
          <p className="muted small">
            office@civicx.org <br />
            +91 98765 43210
          </p>
        </div>

        {/* Social */}
        <div>
          <h4>Follow</h4>
          <div className="socials">
            <a href="#" className="social" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="social" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container copyright">
        <small>
          © {new Date().getFullYear()} CivicX — All rights reserved
        </small>
      </div>
    </footer>
  );
};

export default Footer;
