import "./Header.css";

const Header = () => {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <div className="logo">
          <svg width="28" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <rect x="1" y="4" width="18" height="14" rx="2" stroke="#caa87a" strokeWidth="1.2" fill="#f7efe6" />
            <circle cx="6" cy="11" r="1.6" fill="#caa87a" />
          </svg>
          <span className="brand">SPRY</span>
        </div>
        <nav className="header-right">
          <p className="tag">Quality products, curated</p>
        </nav>
      </div>
    </header>
  );
};

export default Header;
