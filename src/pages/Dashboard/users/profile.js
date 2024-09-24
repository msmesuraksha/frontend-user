import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Table,
  Button,
  CardHeader,
} from "reactstrap";

import { getData } from "store/utils/reducer/sessionStorage";

import Breadcrumbs from "components/Common/Breadcrumb";
// import MiniCards from "./mini-card";
import profile1 from "assets/images/profile-img.png";
// import {
//   Pdate,
//   Ddate,
//   Name,
//   Idno,
//   Budget,
// } from "./CryptoCol";

import { selectLoginSuccess } from "store/auth/login/Login.selecter";
import { profileEditStart } from "store/profileEdit/profileEdit.action";
import { ToastContainer, toast } from 'react-toastify';

const ContactsProfile = (props) => {
  document.title = "Profile | MSME Suraksha - React Admin & Dashboard Template";

  const authUser = getData("authUser")
  const userData = authUser
  const userProfile = userData

  const [isEdit, setIsEdit] = useState(false);
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const handleChange = () => {
    isEdit != undefined && isEdit != false ? setIsEdit(false) : setIsEdit(true)
    return isEdit
  }

  const submitForm = () => {
    const payload = {
      id: userProfile.id,
      name: fullName
    }
    toast.success('Profile updated please login again')
    dispatch(profileEditStart(payload))

    setTimeout(() => {
      window.location.href = "/login"
      sessionStorage.clear()
    }, 1000)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col xl="12">
              {isEdit == false ? <Card>
                <CardBody>
                  {/* <p className="text-muted mb-4">
                    {userProfile.personalDetail}
                    </p> */}
                  <Row>
                    <Col lg={8}>
                      <CardTitle className="mb-4">Personal Information</CardTitle>
                      <div className="table-responsive">
                        <Table className="table-nowrap mb-0">
                          <tbody>
                            <tr>
                              <th scope="row">User ID :</th>
                              <td>MSME-{userProfile.id.slice(0, 8)}</td>
                            </tr>
                            <tr>
                              <th scope="row">Full Name :</th>
                              <td className="text-capitalize">{userProfile.name}</td>
                            </tr>
                            <tr>
                              <th scope="row">E-mail :</th>
                              <td>{userProfile.emailId}</td>
                            </tr>
                            {/* <tr>
                          <th scope="row">Location :</th>
                          <td>{userProfile.location}</td>
                        </tr> */}
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                    <Col lg={4} className="d-flex" style={{ justifyContent: 'end' }}>
                      <button className=" btn btn-info d-flex ml-auto" onClick={() => handleChange()} style={{ background: '', border: 'none', height: '35px', width: '80px', justifyContent: 'center' }}>
                        Edit
                      </button>
                    </Col>
                  </Row>
                </CardBody>
              </Card> : <Card>
                <CardBody>
                  <Row>
                    <Col lg={8}>
                      <CardTitle className="mb-4">Profile Edit</CardTitle>
                      <form>
                        <div className="form-group row align-items-center">
                          <label className="col-sm-2 col-form-label text-left">
                            User ID :
                          </label>
                          <div className="col-sm-10 col-md-6">
                            <input className="form-control" disabled value={`MSKE-${userProfile.id.slice(0, 8)}`} type="text" />
                          </div>
                        </div>
                        <br></br>
                        <div className="form-group row align-items-center">
                          <label className="col-sm-2 col-form-label text-left">
                            Full Name:
                          </label>
                          <div className="col-sm-10 col-md-6">
                            <input className="form-control" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} id="profileName" placeholder="Enter Full Name" name='profileName' />
                          </div>
                        </div>
                        <br></br>
                        <div className="form-group row align-items-center">
                          <label className="col-sm-2 col-form-label text-left">
                            Email Address:
                          </label>
                          <div className="col-sm-10 col-md-6">
                            <input className="form-control" type="email" disabled value={userProfile.emailId} />
                          </div>
                        </div>
                      </form>
                      <div className="text-left mt-3">
                        <Button className="btn btn-info" disabled={fullName.length > 0 ? false : true} style={{ border: 'none' }} onClick={() => submitForm()}>
                          Submit
                        </Button>
                      </div>
                    </Col>
                    <Col lg={4} className="d-flex justify-content-lg-end justify-content-center mt-3 mt-lg-0">
                      <button
                        className="btn btn-info"
                        onClick={() => handleChange()}
                        style={{ border: 'none', height: '35px', width: '80px', justifyContent: 'center' }}
                      >
                        Close
                      </button>
                    </Col>
                  </Row>
                </CardBody>



              </Card>}
            </Col>
            <Col xl="12">
              <Card>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

ContactsProfile.propTypes = {
  userProfile: PropTypes.object,
};

export default ContactsProfile;
