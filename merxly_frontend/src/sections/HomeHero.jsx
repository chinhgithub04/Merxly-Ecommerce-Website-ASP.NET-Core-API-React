
import CountdownTimer from "../components/CountdownTimer";
import { AiFillStar } from "react-icons/ai";
import { FiPackage, FiRepeat, FiCreditCard, FiHeadphones, FiHeart,  FiShoppingCart } from "react-icons/fi";



export default function HomeHero() {
  return (
    <>
      {/* ================= HERO BANNER ================= */}
      <section className="home-hero">
        <div className="container hero-grid">

          {/* LEFT BANNER */}
          <div className="hero-left">
            <div className="subtitle">THE BEST PLACE TO PLAY</div>
            <h2 className="title">Xbox Consoles</h2>
            <p className="desc">
              Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.
            </p>

            <a href="#" className="btn-primary">SHOP NOW →</a>

            <img className="hero-img" src="/assets/images/products/product_1.png" alt="Xbox" />
            <div className="price-tag">$299</div>
          </div>

          {/* RIGHT BANNERS */}
          <div className="hero-right">

            {/* Pixel */}
            <div className="pixel-banner">
              <span className="pixel-badge">29% OFF</span>

              <div className="pixel-text">
                <span className="pixel-sale">SUMMER SALES</span>
                <h4>New Google Pixel 6 Pro</h4>
                <a className="pixel-btn">SHOP NOW →</a>
              </div>

              <img className="pixel-img" src="/assets/images/products/product_2.png" alt="pixel" />
            </div>

            {/* Earbuds */}
            <div className="earbuds-banner">
              <img className="earbuds-img" src="/assets/images/products/product_3.png" alt="earbuds" />

              <div className="earbuds-text">
                <h4>Xiaomi FlipBuds Pro</h4>
                <p className="price">$299 USD</p>
                <a className="earbuds-btn">SHOP NOW →</a>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ================= FEATURES SECTION ================= */}
      <section className="home-features">
        <div className="container features-grid">

          <div className="feature-item">
            <FiPackage className="feature-icon 1" />
            <div className="text">
              <h4>FASTED DELIVERY</h4>
              <p>Delivery in 24/H</p>
            </div>
          </div>

          <div className="feature-item">
            <FiRepeat className="feature-icon 2" />
            <div className="text">
              <h4>24 HOURS RETURN</h4>
              <p>100% money-back guarantee</p>
            </div>
          </div>

          <div className="feature-item">
            <FiCreditCard className="feature-icon 3" />
            <div className="text">
              <h4>SECURE PAYMENT</h4>
              <p>Your money is safe</p>
            </div>
          </div>

          <div className="feature-item">
            <FiHeadphones className="feature-icon 4" />
            <div className="text">
              <h4>SUPPORT 24/7</h4>
              <p>Live contact/message</p>
            </div>
          </div>

        </div>
      </section>

       {/* ================= Best Deals ================= */}
      <section className="best-deals-section">
      <div className="container">

        {/* ----- TOP BAR ----- */}
        <div className="best-deals-header">
          <h3>Best Deals</h3>

          <CountdownTimer durationDays={1} />

          <a className="view-all">Browse All Product →</a>
        </div>

     
        {/* ----- PRODUCT GRID LAYOUT ----- */}
        <div className="best-deals-layout">

          {/* LEFT BANNER */}
          <div className="img-left">
            <img src="/assets/images/banners/sale.jpg" alt="" />
          </div>

          {/* RIGHT GRID */}
          <div className="best-grid">

            <div className="deal-item">
              <img src="/assets/images/products/product_1.png" alt="PS5" />

              <div className="product-info">
                <div className="rating">
                  <AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar />
                  <span className="review-count">(52,677)</span>
                </div>

                <h4 className="title">Xbox Series S Console with Wireless Controller</h4>

                <div className="price-box">
                  <span className="old-price">$866.90</span>
                  <span className="new-price">$442.12</span>
                </div>
                <div className="product-buttons">

                  {/* Wishlist button */}
                  <button className="btn-wishlist">
                    <FiHeart />
                  </button>

                  {/* Add to cart button */}
                  <button className="btn-cart">
                    <FiShoppingCart />
                    ADD TO CART
                  </button>

                </div>

              </div>
              
            </div>
            <div className="deal-item">
              <img src="/assets/images/products/product_1.png" alt="PS5" />

              <div className="product-info">
                <div className="rating">
                  <AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar />
                  <span className="review-count">(52,677)</span>
                </div>

                <h4 className="title">Xbox Series S Console with Wireless Controller</h4>

                <div className="price-box">
                  <span className="old-price">$866.90</span>
                  <span className="new-price">$442.12</span>
                </div>
                <div className="product-buttons">

                  {/* Wishlist button */}
                  <button className="btn-wishlist">
                    <FiHeart />
                  </button>

                  {/* Add to cart button */}
                  <button className="btn-cart">
                    <FiShoppingCart />
                    ADD TO CART
                  </button>

                </div>

              </div>
              
            </div>
            <div className="deal-item">
              <img src="/assets/images/products/product_1.png" alt="PS5" />

              <div className="product-info">
                <div className="rating">
                  <AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar />
                  <span className="review-count">(52,677)</span>
                </div>

                <h4 className="title">Xbox Series S Console with Wireless Controller</h4>

                <div className="price-box">
                  <span className="old-price">$866.90</span>
                  <span className="new-price">$442.12</span>
                </div>
                <div className="product-buttons">

                  {/* Wishlist button */}
                  <button className="btn-wishlist">
                    <FiHeart />
                  </button>

                  {/* Add to cart button */}
                  <button className="btn-cart">
                    <FiShoppingCart />
                    ADD TO CART
                  </button>

                </div>

              </div>
              
            </div>
            <div className="deal-item">
              <img src="/assets/images/products/product_1.png" alt="PS5" />

              <div className="product-info">
                <div className="rating">
                  <AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar />
                  <span className="review-count">(52,677)</span>
                </div>

                <h4 className="title">Xbox Series S Console with Wireless Controller</h4>

                <div className="price-box">
                  <span className="old-price">$866.90</span>
                  <span className="new-price">$442.12</span>
                </div>
                <div className="product-buttons">

                  {/* Wishlist button */}
                  <button className="btn-wishlist">
                    <FiHeart />
                  </button>

                  {/* Add to cart button */}
                  <button className="btn-cart">
                    <FiShoppingCart />
                    ADD TO CART
                  </button>

                </div>

              </div>
              
            </div>
            <div className="deal-item">
              <img src="/assets/images/products/product_1.png" alt="PS5" />

              <div className="product-info">
                <div className="rating">
                  <AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar />
                  <span className="review-count">(52,677)</span>
                </div>

                <h4 className="title">Xbox Series S Console with Wireless Controller</h4>

                <div className="price-box">
                  <span className="old-price">$866.90</span>
                  <span className="new-price">$442.12</span>
                </div>
                <div className="product-buttons">

                  {/* Wishlist button */}
                  <button className="btn-wishlist">
                    <FiHeart />
                  </button>

                  {/* Add to cart button */}
                  <button className="btn-cart">
                    <FiShoppingCart />
                    ADD TO CART
                  </button>

                </div>

              </div>
              
            </div>
            <div className="deal-item">
              <img src="/assets/images/products/product_1.png" alt="PS5" />

              <div className="product-info">
                <div className="rating">
                  <AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar />
                  <span className="review-count">(52,677)</span>
                </div>

                <h4 className="title">Xbox Series S Console with Wireless Controller</h4>

                <div className="price-box">
                  <span className="old-price">$866.90</span>
                  <span className="new-price">$442.12</span>
                </div>
                <div className="product-buttons">

                  {/* Wishlist button */}
                  <button className="btn-wishlist">
                    <FiHeart />
                  </button>

                  {/* Add to cart button */}
                  <button className="btn-cart">
                    <FiShoppingCart />
                    ADD TO CART
                  </button>

                </div>

              </div>
              
            </div>

          </div>
        </div>

      </div>
    </section>

    {/* -------------------- SHOP WITH CATEGORYS -------------------- */}
    <section className="category-section">
      <div className="container">

        <h2 className="category-title">Shop with Categorys</h2>

        <div className="category-wrapper">

          

          {/* CATEGORY SLIDER */}
          <div className="category-slider">

            <div className="category-item">
              <img src="/assets/images/categories/product_4.jpg" alt="" />
              <p>Computer & Laptop</p>
            </div>

            <div className="category-item">
              <img src="/assets/images/categories/product_5.jpg" alt="" />
              <p>SmartPhone</p>
            </div>

            <div className="category-item">
              <img src="/assets/images/categories/product_4.jpg" alt="" />
              <p>Headphones</p>
            </div>

            <div className="category-item">
              <img src="/assets/images/categories/product_5.jpg" alt="" />
              <p>Accessories</p>
            </div>

            <div className="category-item">
              <img src="/assets/images/categories/product_4.jpg" alt="" />
              <p>Camera & Photo</p>
            </div>

            <div className="category-item">
              <img src="/assets/images/categories/product_5.jpg" alt="" />
              <p>TV & Homes</p>
            </div>

          </div>

          
        </div>
      </div>
    </section>



    </>
  );
}
