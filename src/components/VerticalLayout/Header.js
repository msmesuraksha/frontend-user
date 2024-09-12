import PropTypes from 'prop-types';
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import logoLightSvg from "../../assets/images/MSEMESURAKSHAA.png";
import './verticalFile.css'
import { withTranslation } from "react-i18next";
import { setSelectCopenOpen } from 'store/selectCompany/selectCompany.actiontype';
import { getData } from 'store/utils/reducer/sessionStorage';

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions";

const Header = props => {
  const dispatch = useDispatch()

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  const companyName = getData("COMPANY")

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex align-items-center">
            <button
              type="button"
              onClick={tToggle}
              className="btn btn-sm px-3 font-size-16 header-item toggleeButton"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars" />
            </button>

            <Link
              to="/companies"
              className="logo logo-light d-flex align-items-center p-2"
              onClick={() => dispatch(setSelectCopenOpen(false))}
            >
              <img src={logoLightSvg} alt="Company Logo" height="60" className="p-1" />
            </Link>

            <h4 className="text-capitalize ml-3">
              <b>{companyName || ''}</b>
            </h4>
          </div>

          <div className="d-flex align-items-center">
            <NotificationDropdown />
            <ProfileMenu />
          </div>
        </div>

      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func
};

const mapStatetoProps = state => {
  const {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
  } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));




