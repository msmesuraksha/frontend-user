import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
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
} from "reactstrap"

import { getData } from "store/utils/reducer/sessionStorage"

import Breadcrumbs from "components/Common/Breadcrumb"
// import MiniCards from "./mini-card";
import profile1 from "assets/images/profile-img.png"
// import {
//   Pdate,
//   Ddate,
//   Name,
//   Idno,
//   Budget,
// } from "./CryptoCol";

import { selectLoginSuccess } from "store/auth/login/Login.selecter"
import { profileEditStart } from "store/profileEdit/profileEdit.action"
import { ToastContainer, toast } from "react-toastify"

const ContactsProfile = props => {
  document.title = "Profile | MSME Suraksha - React Admin & Dashboard Template"

  const authUser = getData("authUser")
  const userData = authUser
  const userProfile = userData

  const [isEdit, setIsEdit] = useState(false)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")

  const dispatch = useDispatch()

  const handleChange = () => {
    isEdit != undefined && isEdit != false ? setIsEdit(false) : setIsEdit(true)
    return isEdit
  }

  const submitForm = () => {
    const payload = {
      id: userProfile.id,
      name: fullName,
    }
    toast.success("Profile updated please login again")
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
          <Breadcrumbs
            title={isEdit == true ? "Profile Edit" : "Personal Information"}
            breadcrumbItem={
              isEdit == true ? "Profile Edit" : "Personal Information"
            }
          />
          <Row>
            <Col xl="12">
              {isEdit == false ? (
                <Card>
                  <CardBody>
                    <Row>
                      <Col>
                        <div className="text-sm-end">
                          <Button
                            type="button"
                            color="primary"
                            className="btn-rounded  mb-2 me-2"
                            onClick={() => handleChange()}
                          >
                            <i className="bx bxs-edit-alt me-1" />
                            Edit Profile
                          </Button>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <div className="table-responsive">
                          <Table className="table-nowrap mb-0">
                            <tbody>
                              <tr>
                                <th scope="row">User ID :</th>
                                <td>MSME-{userProfile.id.slice(0, 8)}</td>
                              </tr>
                              <tr>
                                <th scope="row">Full Name :</th>
                                <td className="text-capitalize">
                                  {userProfile.name}
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">E-mail :</th>
                                <td>{userProfile.emailId}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              ) : (
                <Card>
                  <CardBody>
                    <Row>
                      <Col xl={8}>
                        <form>
                          <div className="form-group row align-items-center">
                            <label className="col-sm-2 col-form-label text-left">
                              User ID :
                            </label>
                            <div className="col-sm-10 col-md-6">
                              <input
                                className="form-control"
                                disabled
                                value={`MSKE-${userProfile.id.slice(0, 8)}`}
                                type="text"
                              />
                            </div>
                          </div>
                          <br></br>
                          <div className="form-group row align-items-center">
                            <label className="col-sm-2 col-form-label text-left">
                              Full Name:
                            </label>
                            <div className="col-sm-10 col-md-6">
                              <input
                                className="form-control"
                                type="text"
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                                id="profileName"
                                placeholder="Enter Full Name"
                                name="profileName"
                              />
                            </div>
                          </div>
                          <br></br>
                          <div className="form-group row align-items-center">
                            <label className="col-sm-2 col-form-label text-left">
                              Email Address:
                            </label>
                            <div className="col-sm-10 col-md-6">
                              <input
                                className="form-control"
                                type="email"
                                disabled
                                value={userProfile.emailId}
                              />
                            </div>
                          </div>
                        </form>
                        <div className="text-left mt-3">
                          <Button
                            type="button"
                            color="primary"
                            className="mb-2 me-2"
                            disabled={fullName.length > 0 ? false : true}
                            onClick={() => submitForm()}
                          >
                            Submit
                          </Button>

                          <Button
                            type="button"
                            color="secondary"
                            className="mb-2 me-2"
                            onClick={() => handleChange()}
                          >
                            Close
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              )}
            </Col>
            <Col xl="12">
              <Card></Card>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  )
}

ContactsProfile.propTypes = {
  userProfile: PropTypes.object,
}

export default ContactsProfile
