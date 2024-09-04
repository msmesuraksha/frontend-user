import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row, Col
} from "reactstrap";

import { getData } from "store/utils/reducer/sessionStorage";

//i18n
import { withTranslation } from "react-i18next";
// Redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";
import PhoneIcon from '@material-ui/icons/Phone';
// users
import user1 from "../../../assets/images/users/avatar-1.jpg";

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);

  const [username, setusername] = useState("Admin");
  const handleClick = () => {
    window.location.href = `mailto:customer@msmesuraksha.com`;
  };
  useEffect(() => {
    if (sessionStorage.getItem("authUser")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = getData("authUser");
        setusername(obj.displayName);
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = getData("authUser");
        setusername(obj.username);
      }
    }
  }, [props.success]);

  const authUser = getData("authUser")

  return (
    <React.Fragment>



      <Row >
        <Col xs="auto" className="">
          <a href="mailto:customer@msmesuraksha.com " className="d-flex text-end">
            <i className='bx bx-envelope text-dark' style={{ fontSize: "30px", marginTop: '27px' }} data-toggle="tooltip" data-placement="top"
              title="Contact us via mail"
            ></i>&nbsp;  <span style={{ marginTop: '32px' }} className="text-dark" >customer@msmesuraksha.com </span>

          </a>
        </Col>
        <Col xs="auto">
          <a href="tel:+919326058760" className="d-flex">
            <i className='bx bx-mobile-alt text-dark' style={{ fontSize: "30px", marginTop: '27px' }} data-toggle="tooltip" data-placement="top"
              title="Contact us via Phone"
            ></i>     &nbsp;   <span style={{ marginTop: '32px' }} className="text-dark">9326058760  </span> </a>      &nbsp;       &nbsp;       &nbsp;
        </Col>
        <Col xs="auto">
          <Dropdown
            isOpen={menu}
            toggle={() => setMenu(!menu)}
            className="d-inline-block"
          >
            <DropdownToggle
              className="btn header-item "
              id="page-header-user-dropdown"
              tag="button"
              style={{ padding: '0px' }}
            >
              <div className="d-flex">
                <i className='bx bxs-user-circle' style={{ fontSize: "35px", marginTop: '20px' }}></i>  &nbsp;
                <span style={{ marginTop: '25px' }} >{authUser.name}</span>&nbsp;
                <i className="mdi mdi-chevron-down d-none d-xl-inline-block" style={{ fontSize: "15px", marginTop: '25px' }} />&nbsp;
              </div>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <Link to="/logout" className="dropdown-item">
                <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
                <span>{props.t("Logout")}</span>
              </Link>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>



    </React.Fragment>
    /*     <React.Fragment>
          <Row xs="auto" className="d-flex justify-content-center">
            <Col xs="auto" className="text-center text-md-end mb-3 mb-md-0">
              <a href="mailto:customer@msmesuraksha.com" className="d-flex align-items-center justify-content-center justify-content-md-end text-dark">
                <i className='bx bx-envelope' style={{ fontSize: "30px" }} data-toggle="tooltip" data-placement="top" title="Contact us via mail"></i>
                <span className="ms-2">customer@msmesuraksha.com</span>
              </a>
            </Col>
            <Col xs="auto" className="text-center text-md-start">
              <a href="tel:+919326058760" className="d-flex align-items-center justify-content-center justify-content-md-start text-dark">
                <i className='bx bx-mobile-alt' style={{ fontSize: "30px" }} data-toggle="tooltip" data-placement="top" title="Contact us via Phone"></i>
                <span className="ms-2">9326058760</span>
              </a>
            </Col>
          </Row>
    
          <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className="d-inline-block">
            <DropdownToggle className="btn header-item" id="page-header-user-dropdown" tag="button">
              <div className="d-flex align-items-center">
                <i className='bx bxs-user-circle' style={{ fontSize: "35px" }}></i>
                <span className="ms-2">{JSON.parse(sessionStorage.getItem("authUser")).name}</span>
                <i className="mdi mdi-chevron-down d-none d-xl-inline-block ms-2" style={{ fontSize: "15px" }} />
              </div>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <Link to="/logout" className="dropdown-item">
                <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
                <span>Logout</span>
              </Link>
            </DropdownMenu>
          </Dropdown>
        </React.Fragment> */
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
};

const mapStatetoProps = state => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);
