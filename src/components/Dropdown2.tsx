import { Dropdown } from "react-bootstrap";

import { useDisconnect } from "@reown/appkit/react";
import { useEffect, useState } from "react";

export function ProfileDropdown() {
  const userName = "Bryan Ojji";
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if window is defined (for SSR)
      if (typeof window !== "undefined") {
        const scrollPosition = window.scrollY;
        // Change state when scrolled past 100px (adjust as needed)
        setIsSticky(scrollPosition > 100);
      }
      stickyNav(); // keep your existing sticky functionality
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { disconnect } = useDisconnect();

  const logout = async () => {
    console.log("disconnecting");
    await disconnect();
  };
  return (
    <div className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 d-flex justify-content-center">
            <div className="d-flex align-items-center gap-2">
              <span
                className={`user-name ${
                  isSticky ? "sticky-nav-link" : ""
                } mr-2`}
              >
                {userName}
              </span>

              <Dropdown className="btn-group">
                <Dropdown.Toggle
                  id="dropdown-profile"
                  className="btn-img img dropdown-toggle rounded-circle"
                  style={{
                    backgroundImage: `url('/assets/img/avatar.png')`,
                  }}
                ></Dropdown.Toggle>

                <Dropdown.Menu>
                  {[
                    {
                      icon: "fa fa-home",
                      label: "Dashboard",
                      _onClick: () => {},
                    },

                    { icon: "fa fa-cog", label: "Profile", _onClick: () => {} },
                    {
                      icon: "fa fa-power-off",
                      label: "Log Out",
                      _onClick: () => logout(),
                    },
                  ].map((item, i) => (
                    <Dropdown.Item
                      onClick={item._onClick}
                      key={i}
                      href="#"
                      className="d-flex align-items-center"
                    >
                      <div className="icon d-flex align-items-center justify-content-center mr-3">
                        <span className={item.icon}></span>
                      </div>
                      {item.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
