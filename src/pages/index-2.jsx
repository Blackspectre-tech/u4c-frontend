import { Link } from "react-router-dom";
import Slider from "react-slick";
import Counter from "../components//Counter";
import Layout from "../layouts/Layout";
import { projectSliderOne, projectSliderTwo } from "../sliderProps";
import { useEffect } from "react";
import bg1 from "../assets/img/U4C4.png";
import bg2 from "../assets/img/U4C3.png";
import bg3 from "../assets/img/01.png";
import heroline from "../assets/img/hero/hero-line.png";
import heroline2 from "../assets/img/hero/hero-line-2.png";
import bg4 from "../assets/img/tamarind2.jpeg";
import img2 from "../assets/img/tamarind2.jpeg";
import bg6 from "../assets/img/01.png";
import bg7 from "../assets/img/bg.png";
import img4 from "../assets/img/icons/Start A Project.svg";
import img7 from "../assets/img/icons/Donate.svg";
import tan2 from "../assets/img/icons/Transparent by Design.svg";
import tan1 from "../assets/img/icons/Impact-First.svg";
import tans from "../assets/img/icons/Milestone-Based Giving_1.svg";
import tan3 from "../assets/img/icons/Powered by Purposeful Tech.svg";

const Index = () => {
  useEffect(() => {
    let currentSlide = 0;
    const slides = document.querySelectorAll(".bg-slide");

    const intervalId = setInterval(() => {
      slides[currentSlide]?.classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide]?.classList.add("active");
    }, 5000);

    // Cleanup function
    return () => clearInterval(intervalId);
  }, []);
  return (
    <Layout transparentHeader transparentTop>
      <section className="hero-area-one">
        <div className="hero-background-slider">
          <div className="bg-overlay"></div>
          <div
            className="bg-slide active"
            style={{
              backgroundImage: `url(${bg1})`,
            }}
          ></div>
          <div
            className="bg-slide"
            style={{
              backgroundImage: `url(${bg2})`,
            }}
          ></div>
          <div
            className="bg-slide"
            style={{
              backgroundImage: `url(${bg3})`,
            }}
          ></div>
        </div>
        <div className="hero-text">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-10">
                <span
                  className="tagline "
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  Fund Projects. Track Impact. Be the Change.
                </span>
                <h1 className="title " data-aos="fade-up" data-aos-delay="400">
                  Your Support, Their Future
                </h1>
                <p className="mb-10" data-aos="fade-up" data-aos-delay="400">
                  We partner with grassroots organizations to empower you to
                  choose where your support goes. Each project is aligned with
                  our mission to bring hope, dignity, and resources to
                  underserved communities. From education and clean water to
                  healthcare and environmental resilience — your impact starts
                  here.
                </p>
                <Link
                  to="/"
                  className="main-btn "
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  Explore Projects <i className="far fa-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
          <div className="hero-shapes">
            <div className="hero-line-one">
              <img src={heroline} alt="Line" />
            </div>
            <div className="hero-line-two">
              <img src={heroline2} alt="Line" />
            </div>
            <div className="dot-one" />
            <div className="dot-two" />
          </div>
        </div>
      </section>
      {/*====== Hero Area End ======*/}
      {/*====== Project Section Start ======*/}
      <section className="project-section project-section-extra-gap">
        <div className="container-fluid fluid-extra-padding">
          <div className="common-heading text-center color-version-white mb-60">
            <span className="tagline">
              <i className="fas fa-plus" /> Popular Campaigns
              <span className="heading-shadow-text">Our Campaigns</span>
            </span>
            <h2 className=" ">Explore Our Campaigns</h2>
          </div>
          <div className="row project-items no-shadow">
            <div className="col-12 col-sm-6 col-md-4 mb-4">
              <div className="project-item">
                <div
                  className="thumb"
                  style={{
                    backgroundImage: `url(${bg4})`,
                  }}
                />
                <div className="content">
                  <h2 className="title">
                    <Link to="/project-details">
                      Tamarind Community Donation Drive
                    </Link>
                  </h2>
                  <div className="cats">
                    <Link to="/">Ongoing</Link>
                  </div>
                  <div className="author">
                    <img src={img2} alt="Tamarind Logo" />
                    <Link to="/"> tamarind.initiative@gmail.com</Link>
                  </div>
                  <h5 className="title">
                    <Link to="/project-details">
                      Donate food, clothing, shoes, blankets, toiletries, and
                      more to help people facing hardship in Yobe State.
                    </Link>
                  </h5>
                  <div className="project-stats">
                    <div className="stats-value">
                      <span className="value-title">
                        Raised of <span className="value">$12,480</span>
                      </span>
                      <span className="stats-percentage">42%</span>
                    </div>
                    <div className="stats-bar" data-value={42}>
                      <div className="bar-line" />
                    </div>
                  </div>
                  <span className="date">
                    <i className="far fa-calendar-alt" /> 14 June 2025
                  </span>
                </div>
              </div>
            </div>

            <div className=" col-12 col-sm-6 col-md-4 mb-4">
              <div className="project-item">
                <div
                  className="thumb"
                  style={{
                    backgroundImage: `url(${bg6})`,
                  }}
                />
                <div className="content">
                  <h2 className="title">
                    <Link to="/"> Good Care and Well Being</Link>
                  </h2>
                  <div className="cats">
                    <Link to="/">Ongoing</Link>
                  </div>
                  <div className="author">
                    <img src={bg6} alt="Thumb" />
                    <Link to="/"> lrichards.dev@gmail.com</Link>
                  </div>
                  <h5 className="title">
                    <Link to="/">
                      Description In a world where health is truly wealth,
                      access ...
                    </Link>
                  </h5>
                  <div className="project-stats">
                    <div className="stats-value">
                      <span className="value-title">
                        Raised of <span className="value">$59,689</span>
                      </span>
                      <span className="stats-percentage">87%</span>
                    </div>
                    <div className="stats-bar" data-value={87}>
                      <div className="bar-line" />
                    </div>
                  </div>
                  <span className="date">
                    <i className="far fa-calendar-alt" /> 25 February 2021
                  </span>
                </div>
              </div>
            </div>
            <div className=" col-12 col-sm-6 col-md-4 mb-4">
              <div className="project-item">
                <div
                  className="thumb"
                  style={{
                    backgroundImage: `url(${bg6})`,
                  }}
                />
                <div className="content">
                  <h2 className="title">
                    <Link to="/">Support Education</Link>
                  </h2>
                  <div className="cats">
                    <Link to="/">Ongoing</Link>
                  </div>
                  <div className="author">
                    <img src={bg6} alt="Thumb" />
                    <Link to="/"> lrichards.dev@gmail.com</Link>
                  </div>
                  <h5 className="title">
                    <Link to="/">
                      Summary The COVID19 crisis has deeply impacted southern
                      Afri ...
                    </Link>
                  </h5>
                  <div className="project-stats">
                    <div className="stats-value">
                      <span className="value-title">
                        Raised of <span className="value">$59,689</span>
                      </span>
                      <span className="stats-percentage">87%</span>
                    </div>
                    <div className="stats-bar" data-value={87}>
                      <div className="bar-line" />
                    </div>
                  </div>
                  <span className="date">
                    <i className="far fa-calendar-alt" /> 25 February 2021
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== Project Section End ======*/}
      {/*====== Counter Area Start ======*/}
      <section className="emergency-project-with-cta">
        <div className="container">
          <div className="common-heading text-center mb-60">
            <span className="tagline">
              <i className="fas fa-plus" /> Get Started Now
              <span className="heading-shadow-text">Start Now</span>
            </span>
            <h2 className="title">Fund A Project</h2>
          </div>
        </div>
        {/* FULL-WIDTH CTA BOX - NOT inside container */}
        <div
          className="cta-box cta-double-content full-width"
          style={{ backgroundImage: `url(${bg7})` }}
        >
          <div className="container">
            <div className="row justify-content-center">
              {/* LEFT COLUMN */}
              <div className="col-xl-4 col-lg-5 col-md-9">
                <div className="conten text-center">
                  <img
                    src={img7}
                    alt="Logo"
                    className="cta-logo mb-3"
                    style={{ width: "60px" }}
                  />
                  <h2 className="cta-title">Donate</h2>
                  <p className="">
                    Your donation supports vital <br /> campaigns worldwide.
                    Every
                    <br />
                    dollar counts.
                  </p>
                  <Link to="/" className="main-btn">
                    Discover Projects <i className="far fa-arrow-right" />
                  </Link>
                </div>
              </div>

              <div className="col-xl-2 col-lg-1 cta-double-content-gap" />

              {/* RIGHT COLUMN */}
              <div className="col-xl-4 col-lg-5 col-md-9">
                <div className="contet text-center">
                  <img
                    src={img4}
                    alt="Logo"
                    className="cta-logo mb-3"
                    style={{ width: "60px" }}
                  />
                  <h2 className="cta-title">Start A Project</h2>
                  <p>
                    {" "}
                    Nonprofits ready to make
                    <br /> a difference can start their
                    <br /> own fundraising campaign here.
                  </p>
                  <Link to="/" className="main-btn">
                    Start a Project <i className="far fa-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="counter-section-one mt-negative">
        <div className="container primary-bg">
          <div className="row counter-boxes justify-content-xl-between justify-content-center">
            <div className="col-xl-auto col-lg-5 col-md-5 col-sm-6">
              <div className="counter-box mb-40 icon-left">
                <div className="icon white-color">
                  <i className="flaticon-crowdfunding" />
                </div>
                <div className="content white-color">
                  <div className="count-wrap">
                    <Counter end={3598} />
                    <span className="suffix">+</span>
                  </div>
                  <h6 className="title">We’ve Project Complate</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-auto col-lg-5 col-md-5 col-sm-6">
              <div className="counter-box mb-40 icon-left">
                <div className="icon white-color">
                  <i className="flaticon-crowdfunding" />
                </div>
                <div className="content white-color">
                  <div className="count-wrap">
                    <Counter end={9634} />
                    <span className="suffix">+</span>
                  </div>
                  <h6 className="title">Global Partners</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-auto col-lg-5 col-md-5 col-sm-6">
              <div className="counter-box mb-40 icon-left">
                <div className="icon white-color">
                  <i className="flaticon-crowdfunding" />
                </div>
                <div className="content white-color">
                  <div className="count-wrap">
                    <Counter end={8565} />
                    <span className="suffix">+</span>
                  </div>
                  <h6 className="title">Awards Winning</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-auto col-lg-5 col-md-5 col-sm-6">
              <div className="counter-box mb-40 icon-left">
                <div className="icon white-color">
                  <i className="flaticon-crowdfunding" />
                </div>
                <div className="content white-color">
                  <div className="count-wrap">
                    <Counter end={4756} />
                    <span className="suffix">+</span>
                  </div>
                  <h6 className="title">Active Volunteer</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/*====== Counter Area End ======*/}
      <section className="mb-80 counter-with-image-text-block">
        <div className="counter-boxes-area primary-soft-bg">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-3 col-md-6">
                <div className="counter-box mb-60 text-center h-100 d-flex flex-column">
                  {" "}
                  {/* Added h-100 */}
                  <div className="icon mx-auto">
                    <img src={tan1} className="fla" alt="Impact First icon" />
                  </div>
                  <div className="content flex-grow-1 d-flex flex-column">
                    {" "}
                    {/* Added flex classes */}
                    <span className="d-block title">
                      Impact <br /> First
                    </span>
                    <p className="mx-auto">
                      {" "}
                      {/* Added mt-auto */}
                      Every project is chosen by the communities it serves — so
                      your donation directly fuels real, local impact.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="counter-box mb-60 text-center h-100 d-flex flex-column">
                  {" "}
                  {/* Changed to counter-box */}
                  <div className="icon mx-auto">
                    <img src={tans} className="fla jii" alt="Milestone icon" />
                  </div>
                  <div className="content flex-grow-1 d-flex flex-column">
                    <span className="d-block title">
                      {" "}
                      {/* Changed from titl titles */}
                      Milestone-Based Giving
                    </span>
                    <p className="mx-auto ">
                      Donations are held in smart digital vaults and only
                      released when verified milestones are met.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="counter-box mb-60 text-center h-100 d-flex flex-column">
                  {" "}
                  {/* Changed to counter-box */}
                  <div className="icon mx-auto">
                    <img src={tan2} className="fla jii" alt="Milestone icon" />
                  </div>
                  <div className="content flex-grow-1 d-flex flex-column">
                    <span className="d-block title">
                      {" "}
                      {/* Changed from titl titles */}
                      Transparent by Design{" "}
                    </span>
                    <p className="mx-auto ">
                      Every donation is traceable. See where your support goes,
                      who it helps, and what changes — in real time.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="counter-box mb-60 text-center h-100 d-flex flex-column">
                  {" "}
                  {/* Changed to counter-box */}
                  <div className="icon mx-auto">
                    <img src={tan3} className="fla jii" alt="Milestone icon" />
                  </div>
                  <div className="content flex-grow-1 d-flex flex-column">
                    <span className="d-block title">
                      {" "}
                      {/* Changed from titl titles */}
                      Powered by Purposeful Tech
                    </span>
                    <p className="mx-auto ">
                      We use secure, open digital tools like blockchain and
                      stable digital cash to make giving more accountable,
                      borderless, and fair.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*====== Testimonials End ======*/}
      {/*====== Emergency Project & CTA Start ======*/}

      {/*====== Emergency Project & CTA End ======*/}
      {/*====== Partners Section Start ======*/}
      {/* <section className="partners-section section-gap section-border-bottom">
        <div className="container">
          <div className="common-heading mb-30">
            <span className="tagline">
              <i className="fas fa-plus" /> Our Partners
              <span className="heading-shadow-text">Partners</span>
            </span>
            <h2 className="title">Trusted Partners</h2>
          </div>
          <div className="row partners-logos-one">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="logo mt-30">
                <Link to="/testimonial">
                    <img src="assets/img/partners/01.png" alt="Image" />
                  </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="logo mt-30">
                <Link to="/testimonial">
                    <img src="assets/img/partners/02.png" alt="Image" />
                  </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="logo mt-30">
                <Link to="/testimonial">
                    <img src="assets/img/partners/03.png" alt="Image" />
                  </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="logo mt-30">
                <Link to="/testimonial">
                    <img src="assets/img/partners/04.png" alt="Image" />
                  </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="logo mt-30">
                <Link to="/testimonial">
                    <img src="assets/img/partners/05.png" alt="Image" />
                  </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="logo mt-30">
                <Link to="/testimonial">
                    <img src="assets/img/partners/06.png" alt="Image" />
                  </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="logo mt-30">
                <Link to="/testimonial">
                    <img src="assets/img/partners/07.png" alt="Image" />
                  </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="logo mt-30">
                <Link to="/testimonial">
                    <img src="assets/img/partners/08.png" alt="Image" />
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/*====== Partners Section End ======*/}
      {/*====== Latest News Start ======*/}
      {/* <section className="latest-blog-section section-gap">
        <div className="container">
          <div className="common-heading text-center mb-30">
            <span className="tagline">
              <i className="fas fa-plus" /> Latest News &amp; Blog
              <span className="heading-shadow-text">News Blog</span>
            </span>
            <h2 className="title">Get Every Single Update</h2>
          </div>
          <div className="row justify-content-center latest-blog-posts style-one">
            <div
              className="col-lg-4 col-md-6 col-sm-9 col-11 " data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="latest-post-box mt-30">
                <div className="post-thumb">
                  <img src="assets/img/latest-news/01.jpg" alt="Image" />
                </div>
                <div className="post-content">
                  <a href="#" className="post-date">
                    <i className="far fa-calendar-alt" /> 25 February 2021
                  </a>
                  <h6 className="title">
                    <Link to="/news-details">Standing Out From Crowds mproving Mobile Experience</Link>
                  </h6>
                  <Link to="/news-details" className="post-link">
                      Read More <i className="far fa-arrow-right" />
                    </Link>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 col-sm-9 col-11 " data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="latest-post-box mt-30">
                <div className="post-thumb">
                  <img src="assets/img/latest-news/02.jpg" alt="Image" />
                </div>
                <div className="post-content">
                  <a href="#" className="post-date">
                    <i className="far fa-calendar-alt" /> 25 February 2021
                  </a>
                  <h6 className="title">
                    <Link to="/news-details">
                        Five Rules Of App Localization China Money Dating And
                        App Store
                      </Link>
                  </h6>
                  <Link to="/news-details" className="post-link">
                      Read More <i className="far fa-arrow-right" />
                    </Link>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 col-sm-9 col-11 " data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="latest-post-box mt-30">
                <div className="post-thumb">
                  <img src="assets/img/latest-news/03.jpg" alt="Image" />
                </div>
                <div className="post-content">
                  <a href="#" className="post-date">
                    <i className="far fa-calendar-alt" /> 25 February 2021
                  </a>
                  <h6 className="title">
                    <Link to="/news-details">How To Use Underlined Text Improve User Experience</Link>
                  </h6>
                  <Link to="/news-details" className="post-link">
                      Read More <i className="far fa-arrow-right" />
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </Layout>
  );
};

export default Index;
