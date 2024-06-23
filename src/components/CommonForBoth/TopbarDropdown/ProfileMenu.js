import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row, Col
} from "reactstrap";

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
    window.location.href = `mailto:gitlatnip91@gmail.com`;
  };
  useEffect(() => {
    if (sessionStorage.getItem("authUser")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(sessionStorage.getItem("authUser"));
        setusername(obj.displayName);
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(sessionStorage.getItem("authUser"));
        setusername(obj.username);
      }
    }
  }, [props.success]);

  return (
    <React.Fragment>


      <div style={{ width: '310px' }} className="">
        <Row>
          <Col md={7} className="">
            <a href="mailto:gitlatnip91@gmail.com " className="d-flex text-end">
              <i className='bx bx-envelope text-dark' style={{ fontSize: "30px", marginTop: '27px' }} data-toggle="tooltip" data-placement="top"
                title="Contact us via mail"
              ></i>&nbsp;  <span style={{ marginTop: '32px' }} className="text-dark" >gitlatnip91@gmail.com </span>

            </a>
          </Col>
          <Col md={5}>
            <a href="tel:+919326058760" className="d-flex">
              <i className='bx bx-mobile-alt text-dark' style={{ fontSize: "30px", marginTop: '27px' }} data-toggle="tooltip" data-placement="top"
                title="Contact us via Phone"
              ></i>     &nbsp;   <span style={{ marginTop: '32px' }} className="text-dark">9326058760  </span> </a>      &nbsp;       &nbsp;       &nbsp;
          </Col>
        </Row>
      </div>

      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >

          <div className="d-flex">
            <i className='bx bxs-user-circle' style={{ fontSize: "35px", marginTop: '20px' }}></i>  &nbsp;
            <span style={{ marginTop: '25px' }} >{JSON.parse(sessionStorage.getItem("authUser")).name}</span>&nbsp;
            <i className="mdi mdi-chevron-down d-none d-xl-inline-block" style={{ fontSize: "15px", marginTop: '25px' }} />&nbsp;
          </div>



          {/* <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          /> */}


          {/* <span className="d-none d-xl-inline-block ms-2 me-1">{username}</span> */}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          {/*           <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Profile")}{" "}
          </DropdownItem> */}
          {/* <DropdownItem tag="a" href="/crypto-wallet">
            <i className="bx bx-wallet font-size-16 align-middle me-1" />
            {props.t("My Wallet")}
          </DropdownItem>
          <DropdownItem tag="a" href="#">
            <span className="badge bg-success float-end">11</span>
            <i className="bx bx-wrench font-size-16 align-middle me-1" />
            {props.t("Settings")}
          </DropdownItem>
          <DropdownItem tag="a" href="auth-lock-screen">
            <i className="bx bx-lock-open font-size-16 align-middle me-1" />
            {props.t("Lock screen")}
          </DropdownItem> */}
          {/*           <div className="dropdown-divider" /> */}
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
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
