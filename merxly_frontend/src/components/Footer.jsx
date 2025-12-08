
import { FaGooglePlay, FaApple } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">

        {/* -------- COLUMN 1 - LOGO + CONTACT -------- */}
        <div className="footer-col">
          <div className="footer-logo">CLICON</div>

          <div className="footer-contact">
            <p className="footer-title">Customer Supports:</p>
            <p className="footer-phone">(629) 555-0129</p>
            <p>48 Cao Thắng</p>
            <p>Manchester, Kentucky 39495</p>
            <p className="footer-mail">info@kinbo.com</p>
          </div>
        </div>

        {/* -------- COLUMN 2 - TOP CATEGORY -------- */}
        <div className="footer-col">
          <h4 className="footer-heading">TOP CATEGORY</h4>
          <ul className="footer-links">
            <li>Computer & Laptop</li>
            <li>SmartPhone</li>
            <li>Headphone</li>
            <li>Accessories</li>
            <li>Camera & Photo</li>
            <li>TV & Homes</li>
          </ul>
          <a className="footer-browse">Browse All Product →</a>
        </div>

        {/* -------- COLUMN 3 - QUICK LINKS -------- */}
        <div className="footer-col">
          <h4 className="footer-heading">QUICK LINKS</h4>
          <ul className="footer-links">
            <li>Shop Product</li>
            <li>Shopping Cart</li>
            <li>Wishlist</li>
            <li>Compare</li>
            <li>Track Order</li>
            <li>Customer Help</li>
            <li>About Us</li>
          </ul>
        </div>

        {/* -------- COLUMN 4 - DOWNLOAD APP -------- */}
        <div className="footer-col">
          <h4 className="footer-heading">DOWNLOAD APP</h4>
          <div className="download-app">
            <button className="app-btn">
              <FaGooglePlay />
              Get it now <strong>Google Play</strong>
            </button>
            <button className="app-btn">
              <FaApple />
              Get it now <strong>App Store</strong>
            </button>
          </div>
        </div>

        {/* -------- COLUMN 5 - POPULAR TAG -------- */}
        <div className="footer-col">
          <h4 className="footer-heading">POPULAR TAG</h4>

          <div className="tags">
            {[
              "Game", "iPhone", "TV", "Asus Laptops",
              "Macbook", "SSD", "Graphics Card",
              "Power Bank", "Smart TV", "Speaker",
              "Tablet", "Microwave", "Samsung"
            ].map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>

      </div>

      {/* ------- COPYRIGHT ------- */}
      <div className="footer-bottom">
        Kinbo - eCommerce Template © 2021. Design by Templatecookie
      </div>
    </footer>
  );
}
