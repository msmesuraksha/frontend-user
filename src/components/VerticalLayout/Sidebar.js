import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import withRouter from "components/Common/withRouter";
import { useDispatch } from "react-redux";
import { setSelectCopenOpen } from "store/selectCompany/selectCompany.actiontype";
import {

  Button,
  
} from "reactstrap"
//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";

import { Link } from "react-router-dom";
import logobafana2 from "../../assets/images/logobafana2.png";
import logo from "../../assets/images/logo.svg";
import logoLightPng from "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/logo-light.svg";
import logoDark from "../../assets/images/logo-dark.png";
import logoLightSvgss from "../../assets/images/MSMES.png";


const Sidebar = props => {
  const dispatch = useDispatch()

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/companies" className="logo logo-dark" onClick={() => dispatch(setSelectCopenOpen(false))}>
            <span className="logo-sm">
              <img src={logo} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoDark} alt="" height="17" />
            </span>
          </Link>
          

         

          <Link to="/companies" className="logo logo-light p-2" onClick={() => dispatch(setSelectCopenOpen(false))}>
            <span className="logo-sm p-1">
              <img src={logoLightSvgss} alt="" height="60" />
            </span>
            <span className="logo-lg p-1">
              <img src={logoLightSvgss} alt="" height="60" />
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
