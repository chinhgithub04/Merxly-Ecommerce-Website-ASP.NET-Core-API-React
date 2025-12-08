import { 
  FaTwitter, 
  FaFacebookF, 
  FaPinterestP, 
  FaYoutube, 
  FaInstagram,
  FaTruck
} from "react-icons/fa";

import { 
  FiShoppingCart, 
  FiHeart, 
  FiUser,
  FiRefreshCcw,
  FiHeadphones,
  FiHelpCircle
} from "react-icons/fi";

export default function Header() {
  return (
    <header className="header">

        {/* -------------------- TOP BAR -------------------- */}
        <div className="header-top">
          <div className="container top-container">

            <div className="top-left">
              <span className="black-tag">Black</span>
              <span className="friday">Friday</span>
            </div>

            <div className="top-center">
              <span className="discount">
                Up to <strong className="discount_off"> 59% </strong> OFF
              </span>
            </div>
            <div className="top-right">
              <button className="shop-btn">SHOP NOW →</button>
              <button className="top-close">×</button>
            </div>

          </div>
        </div>

        {/* -------------------- MIDDLE BAR -------------------- */}
        <div className="header-middle">

          {/* --------- TOP SMALL ROW --------- */}
          <div className="container middle-top">
            <span className="welcome-text">
              Welcome to Clicon online eCommerce store.
            </span>

          <div className="middle-top-right">
            <span>Follow us:</span>

            <div className="social-icons">
              <FaTwitter className="social-icon" />
              <FaFacebookF className="social-icon" />
              <FaPinterestP className="social-icon" />
              <FaYoutube className="social-icon" />
              <FaInstagram className="social-icon" />
            </div>


            </div>
          </div>

          {/* --------- MAIN ROW --------- */}
          <div className="container middle-flex">

            {/* Logo */}
            <div className="logo-area">
              <img 
                src="/assets/images/logo/logo.png" 
                className="header-logo" 
                alt="CLICON" 
              />
            </div>

            {/* Search */}
            <div className="search-area">
              <input type="text" placeholder="Search for anything…" />
              <button className="search-btn">🔍</button>
            </div>

            {/* Icons */}
           <div className="actions">

            {/* Cart + Badge */}
            <div className="cart-icon">
              <FiShoppingCart />
              <span className="badge">2</span>
            </div>

            {/* Wishlist */}
            <FiHeart className="icon" />

            {/* User */}
            <FiUser className="icon" />

          </div>

          </div>
        </div>


      {/* -------------------- BOTTOM BAR -------------------- */}
      <div className="header-bottom">
        <div className="container bottom-flex">

          <div className="left-group">
            <button className="category-btn">All Category ⌄</button>

            <nav className="nav-links">
              <a><FaTruck /> Track Order</a>
              <a><FiRefreshCcw /> Compare</a>
              <a><FiHeadphones /> Customer Support</a>
              <a><FiHelpCircle /> Need Help</a>
            </nav>
          </div>

          <div className="hotline">☎ +1-202-555-0104</div>

        </div>
      </div>
    </header>
  );
}
