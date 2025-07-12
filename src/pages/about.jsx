import { Link } from "react-router-dom";
import { useState } from "react";
import Slider from "react-slick";
import Counter from "../components/Counter";
import PageBanner from "../components//PageBanner";
import VideoPopup from "../components//VideoPopup";
import Layout from "../layouts/Layout2";
import { teamSlider } from "../sliderProps";
import img1 from "../assets/img/afri.jpg";
import img2 from "../assets/img/U4C3.png";
import img3 from "../assets/img/U4C2.png";
import tans2 from "../assets/img/icons/Transparent by Design.svg";
import tan1 from "../assets/img/icons/Impact-First.svg";
import tans from "../assets/img/icons/Milestone-Based Giving_1.svg";
import tans3 from "../assets/img/icons/Powered by Purposeful Tech.svg";
import tans4 from "../assets/img/icons/Empowerment Through Choice.svg";
import tans5 from "../assets/img/icons/Collaboration.svg";
import tans6 from "../assets/img/icons/Transparency and Inclusivity.svg";
import tan5 from "../assets/img/TRANSPARENCY.svg";
import tan6 from "../assets/img/LOWER COST.svg";
import tan7 from "../assets/img/Faster Transactions.svg";
import tan8 from "../assets/img/Global Reach.svg";
import tan9 from "../assets/img/SECURITY.svg";

const About = () => {
  const [video, setVideo] = useState(false);
  return (
    <Layout>
      {video && <VideoPopup close={setVideo} />}
      <PageBanner pageName="About Us" />
      <section className="about-section-three section-gap">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-5 col-lg-7 col-md-9 col-sm-10">
              <div className="about-text mb-lg-50">
                <div className="common-heading mb-30">
                  <span className="tagline">
                    <i className="fas fa-plus" /> Who We Are
                    <span className="heading-shadow-text">About Us</span>
                  </span>
                  <h2 className="title">
                    We Unite People with Purpose and Passion
                  </h2>
                </div>
                <p>
                  Our journey is fueled by compassion and powered by technology.
                  United4Change delivers life-saving aid in healthcare,
                  education, clean water, and basic needs to underserved
                  communities, with full transparency and community trust at the
                  core.
                </p>
                <ul className="check-list mt-30">
                  <li data-aos="fade-up" data-aos-delay="0">
                    <h5 className="title">U4C Giving Program</h5>
                    <p>
                      Your support is the driving force behind the work we do,
                      and we are deeply grateful for every contribution that
                      helps us create this lasting difference. Whether you
                      donate or share our mission, your involvement directly
                      impacts the lives of communities in need.
                    </p>
                  </li>
                  <li data-aos="fade-up" data-aos-delay="100">
                    <h5 className="title">Embark on a Journey with Us</h5>
                    <p>
                      With each project we undertake, we work to ensure that
                      every dollar and every effort brings hope to the resilient
                      communities around the world. Discover how your support
                      can change lives by supporting #United4change
                    </p>
                  </li>
                  <li data-aos="fade-up" data-aos-delay="200">
                    <h5 className="title">
                      Share Your Support with #United4Change
                    </h5>
                    <p>
                      We invite you to be part of a global community who share
                      your values and commitment to positive change through
                      giving. Use #United4Change to share your chosen cause on
                      social media and inspire others to join in customizing
                      their impact.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-7 col-lg-8 col-md-10">
              <div className="about-gallery " data-aos="fade-right">
                <div className="img-one">
                  <img src={img1} alt="Image" />
                </div>
                {/* <div className="img-two " data-aos="fade-up">
                  <img src={img2} alt="Image" />
                </div> */}
                {/* <div className="pattern">
                  <img
                    src={img3}
                    alt="Pattern"
                  /> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== About Section End ======*/}
      {/*====== Feature Section Start ======*/}
      <section className="feature-section primary-soft-bg section-gap">
        <div className="container">
          <div className="common-heading text-center -mt-30 mb-30">
            <h2 className="title">Our Vision</h2>
            <p className="clik mb-5">
              To create a world where giving is easy, transparent, and
              impactful.
            </p>
            <h2 className="title">Our Mission</h2>
            <p className="clik mb-5">
              Our mission at United4Change goes beyond charity; it's a movement
              to empower everyone and strengthen resilient communities by
              providing essential resources in health, education, and basic
              needs.
            </p>
            <h2 className="title">Our Core Values</h2>
          </div>
          <div className="row icon-boxes justify-content-center">
            <div
              className="col-lg-4 col-md-6 col-sm-9"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="icon-box mt-30">
                <div className="icon">
                  <img src={tans4} className="fla" />
                </div>
                <h5 className="title">Empowerment Through Choice</h5>
                <p>
                  We put the power of giving into your hands so you can support
                  the causes closest to your heart.
                </p>
                <div className="box-img"></div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 col-sm-9"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="icon-box mt-30">
                <div className="icon">
                  <img src={tans5} className="fla" />
                </div>
                <h5 className="title">Collaboration</h5>
                <p>
                  Collaboration is at the heart of our approach to ensure
                  impactful, grassroots-level change. We understand that
                  collective challenges demand a united front, and we work with
                  local leaders and global partners to create sustainable
                  solutions.
                </p>
                <div className="box-img"></div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 col-sm-9"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="icon-box mt-30">
                <div className="icon">
                  <img src={tans6} className="fla" />
                </div>
                <h5 className="title">Transparency and Inclusivity</h5>
                <p>
                  Our diverse global community operates on integrity, openness,
                  and equal access for all, empowering everyone to be part of
                  the change.
                </p>
                <div className="box-img"></div>
              </div>
            </div>
          </div>

          <div className="common-heading text-center mt-60 mb-30">
            <h2 className="title">How We Use Technology to Transform Giving</h2>
            <p className="clik mb-5">
              United4Change leverages blockchain and digital cash to create a
              smarter, faster, and more transparent way to give.
            </p>
          </div>

          <div className="row icon-boxes justify-content-center">
            <div
              className="col-lg-6 col-md-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="icon-box mt-30">
                <div className="icon">
                  <img src={tan5} className="fla" />
                </div>
                <h5 className="title">Transparency</h5>
                <p>
                  See exactly where your money goes. Blockchain technology makes
                  every transaction public, immutable, and tamper-proof.
                </p>
                <div className="box-img"></div>
              </div>
            </div>
            <div
              className="col-lg-6 col-md-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="icon-box mt-30">
                <div className="icon">
                  <img src={tan6} className="fla" />
                </div>
                <h5 className="title">Lower Costs</h5>
                <p>
                  Using stablecoins reduces high transaction fees, allowing more
                  of your donation to reach the people and projects that need
                  it.
                </p>
                <div className="box-img"></div>
              </div>
            </div>
            <div
              className="col-lg-6 col-md-6"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="icon-box mt-30">
                <div className="icon">
                  <img src={tan7} className="fla" />
                </div>
                <h5 className="title">Faster Transactions</h5>
                <p>
                  Donations are processed instantly—no bank delays—so funds
                  reach the intended recipients without unnecessary holdups.
                </p>
                <div className="box-img"></div>
              </div>
            </div>
            <div
              className="col-lg-6 col-md-6"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="icon-box mt-30">
                <div className="icon">
                  <img src={tan8} className="fla" />
                </div>
                <h5 className="title">Global Reach</h5>
                <p>
                  Our digital giving system enables donations from anywhere in
                  the world, making giving borderless and barrier-free.
                </p>
                <div className="box-img"></div>
              </div>
            </div>
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="500">
              <div className="icon-box mt-30 text-center">
                <div className="icon">
                  <img src={tan9} className="fla" />
                </div>
                <h5 className="title">Security & Accountability</h5>
                <p>
                  Every donation is encrypted and traceable from the moment it's
                  made until it reaches the project, ensuring full transparency
                  and accountability.
                </p>
                <div className="box-img"></div>
              </div>
            </div>
          </div>

          <div className="text-center mt-60">
            <h4 className="title mb-3">Why Now?</h4>
            <p className="clik mb-4">
              We understand that digital giving may feel new, but it has the
              power to transform trust in charity. By adopting secure,
              transparent systems powered by blockchain, United4Change is
              helping donors give with confidence.
            </p>
            <p className="clik mb-4">
              Inclusivity: By offering card and digital cash options, we make
              giving accessible to all — from traditional donors to the next
              generation of changemakers.
            </p>
            <a href="#donate" className="main-btn">
              Make a Digital Donation
            </a>
          </div>
        </div>
      </section>

      {/*====== Feature Section End ======*/}

      {/*====== Counter With Image Text Block Start ======*/}
      <section className="counter-with-video">
        <div className="video-area">
          <div className="container">
            <div className="funden-video">
              <img src={img3} alt="Image" />
            </div>
          </div>
        </div>{" "}
        <div className="counter-boxes-area conday-bg">
          <div className="container">
            <div className="row align-items-start">
              {" "}
              {/* Changed from justify-content-center */}
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
                    <p className="mx-auto mt-auto">
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
                    <p className="mx-auto mt-auto">
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
                    <img src={tans2} className="fla jii" alt="Milestone icon" />
                  </div>
                  <div className="content flex-grow-1 d-flex flex-column">
                    <span className="d-block title">
                      {" "}
                      {/* Changed from titl titles */}
                      Transparent by Design{" "}
                    </span>
                    <p className="mx-auto mt-auto">
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
                    <img src={tans3} className="fla jii" alt="Milestone icon" />
                  </div>
                  <div className="content flex-grow-1 d-flex flex-column">
                    <span className="d-block title">
                      {" "}
                      {/* Changed from titl titles */}
                      Powered by Purposeful Tech
                    </span>
                    <p className="mx-auto mt-auto">
                      We use secure, open digital tools like blockchain and
                      stable digital cash to make giving more accountable,
                      borderless, and fair.
                    </p>
                  </div>
                </div>
              </div>

              {/* Repeat same structure for other boxes */}
            </div>
          </div>
        </div>
      </section>
      {/*====== Counter With Image Text Block End ======*/}

      {/*====== Partners Section With CTA Start ======*/}
      <section className="partners-section -mb-10">
        <div className="container">
          <div className="partners-logos partners-section-padding section-border-top"></div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
