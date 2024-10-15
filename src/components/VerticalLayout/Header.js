import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"

import { connect } from "react-redux"
import { Row, Col } from "reactstrap"
import { Link } from "react-router-dom"

// Reactstrap
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown"
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown"
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"
import megamenuImg from "../../assets/images/megamenu-img.png"

// import images
import github from "../../assets/images/brands/github.png"
import bitbucket from "../../assets/images/brands/bitbucket.png"
import dribbble from "../../assets/images/brands/dribbble.png"
import dropbox from "../../assets/images/brands/dropbox.png"
import mail_chimp from "../../assets/images/brands/mail_chimp.png"
import slack from "../../assets/images/brands/slack.png"

import logo from "../../assets/images/logo.png"
import logoLightSvg from "../../assets/images/MSEMESURAKSHAA.png"
import mobileLog from "../../assets/images/users/phone.png"
import mailLog from "../../assets/images/users/mail.png"

//i18n
import { withTranslation } from "react-i18next"

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions"

const Header = props => {
  const [search, setsearch] = useState(false)
  const [megaMenu, setmegaMenu] = useState(false)
  const [socialDrp, setsocialDrp] = useState(false)

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        )
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    }
  }

  function tToggle() {
    var body = document.body
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable")
    } else {
      body.classList.toggle("vertical-collpsed")
      body.classList.toggle("sidebar-enable")
    }
  }

  const [isMobile, setIsMobile] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const [dropdownOpenMail, setDropdownOpenMail] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth <= 1200){
        setIsMobile(false);
      }else{
        setIsMobile(true);
      }
       // Adjust this value based on your breakpoints
    };

    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize); // Listen for resize events

    return () => window.removeEventListener('resize', handleResize); // Clean up listener
  }, []);

 



  const toggleMobileDropdown = e => {
    if(!isMobile){
      setDropdownOpen(!dropdownOpen)
    }
  }

  const toggleMailDropdown = e => {
    if(!isMobile){
      setDropdownOpenMail(!dropdownOpenMail)
    }
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/dashboard" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logo} alt="" height="22" />
                </span>
              </Link>

              <Link to="/companies" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logo} alt="" height="50" />
                </span>
                <span className="logo-lg">
                  <img src={logoLightSvg} alt="" height="40" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                tToggle()
              }}
              className="btn btn-sm px-3 font-size-16 header-item waves-effect"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars" />
            </button>
          </div>
          <div className="d-flex">
          <Dropdown isOpen={isMobile == true? false: dropdownOpenMail} toggle={()=>toggleMailDropdown()} className="d-inline-block">
              <DropdownToggle
                className="btn header-item"
                id="page-header-user-dropdown"
                tag="button"
              >
                <img
                  className="rounded-circle header-profile-user"
                  src={mailLog}
                  alt="Header Avatar"
                />
                <span className="d-none d-xl-inline-block ms-2 me-1">
                  <a href="mailto:customer@msmesuraksha.com">
                    <span className="text-dark">customer@msmesuraksha.com</span>
                  </a>
                </span>
                {!isMobile && <i className="mdi mdi-chevron-down d-none d-xl-inline-block" /> }
              </DropdownToggle>
           
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem tag="a" href="mailto:customer@msmesuraksha.com">
                    <span className="text-dark">customer@msmesuraksha.com</span>
                  </DropdownItem>
                </DropdownMenu>
             
            </Dropdown>
            <Dropdown isOpen={isMobile == true? false: dropdownOpen} toggle={()=>toggleMobileDropdown()} className="d-inline-block">
              <DropdownToggle
                className="btn header-item"
                id="page-header-user-dropdown"
                tag="button"
              >
                <img
                  className="rounded-circle header-profile-user"
                  src={mobileLog}
                  alt="Header Avatar"
                />
                <span className="d-none d-xl-inline-block ms-2 me-1">
                  <a href="tel:+919326058760">
                    <span className="text-dark">9326058760</span>
                  </a>
                </span>
                {!isMobile && <i className="mdi mdi-chevron-down d-none d-xl-inline-block" /> }
              </DropdownToggle>
           
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem tag="a" href="tel:+919326058760">
                    <span className="text-dark">9326058760</span>
                  </DropdownItem>
                </DropdownMenu>
             
            </Dropdown>
            <ProfileMenu />
          </div>
        </div>
      </header>
    </React.Fragment>
  )
}

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
}

const mapStatetoProps = state => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state.Layout
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType }
}

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header))
