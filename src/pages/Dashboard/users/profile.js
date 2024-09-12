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

  const miniCards = [
    {
      title: "Completed Projects",
      iconClass: "bx-check-circle",
      text: "125",
    },
    { title: "Pending Projects", iconClass: "bx-hourglass", text: "12" },
    { title: "Total Revenue", iconClass: "bx-package", text: "$36,524" },
  ];
  const authUser = getData("authUser")
  const userData = authUser
  const userProfile = userData

  // const userProfile = {
  //   img: profile1,
  //   name: "John Doe",
  //   designation: "Software Developer",
  //   projectCount: 10,
  //   revenue: "$50,000",
  //   personalDetail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //   phone: "123-456-7890",
  //   email: "john@example.com",
  //   location: "New York, USA",
  //   experiences: [
  //     {
  //       id: 1,
  //       iconClass: "bx bx-building",
  //       designation: "Software Developer",
  //       timeDuration: "2020 - Present",
  //       link: "/experience1",
  //     },
  //     {
  //       id: 2,
  //       iconClass: "bx bx-building",
  //       designation: "Frontend Developer",
  //       timeDuration: "2018 - 2020",
  //       link: "/experience2",
  //     },
  //   ],
  //   projects: [
  //     { id: 1, name: "Project 1", startDate: "2022-01-01", deadline: "2022-12-31", budget: "$10,000" },
  //     { id: 2, name: "Project 2", startDate: "2022-03-15", deadline: "2022-11-30", budget: "$15,000" },
  //   ],
  // };

  //   const columns = [
  //     {
  //       Header: "#",
  //       accessor: "id",
  //       disableFilters: true,
  //       filterable: true,
  //       Cell: (cellProps) => {
  //         return <Idno {...cellProps} />;
  //       },
  //     },
  //     {
  //       Header: "Project",
  //       accessor: "name",
  //       disableFilters: true,
  //       filterable: true,
  //       Cell: (cellProps) => {
  //         return <Name {...cellProps} />;
  //       },
  //     },
  //     {
  //       Header: "Start Date",
  //       accessor: "startDate",
  //       disableFilters: true,
  //       filterable: true,
  //       Cell: (cellProps) => {
  //         return <Pdate {...cellProps} />;
  //       },
  //     },
  //     {
  //       Header: "Deadline",
  //       accessor: "deadline",
  //       disableFilters: true,
  //       filterable: true,
  //       Cell: (cellProps) => {
  //         return <Ddate {...cellProps} />;
  //       },
  //     },
  //     {
  //       Header: "Budget",
  //       accessor: "budget",
  //       disableFilters: true,
  //       filterable: true,
  //       Cell: (cellProps) => {
  //         return <Budget {...cellProps} />;
  //       },
  //     },
  //   ];

  const [isEdit, setIsEdit] = useState(false);
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const userProfileData = useSelector(selectLoginSuccess)

  console.log('userProfileData', userProfileData);

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
          {/* <Breadcrumbs title="Contacts" breadcrumbItem="Profile" /> */}

          <Row>
            {/* <Col xl="6">
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs="7">
                      <div className="text-primary p-3">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>It will seem like simplified</p>
                      </div>
                    </Col>
                    <Col xs="5" className="align-self-end">
                      <img src={profile1} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <Row>
                    <Col sm="4">
                      <div className="avatar-md profile-user-wid mb-4">
                        <img
                          src={userProfile.img}
                          alt=""
                          className="img-thumbnail rounded-circle"
                        />
                      </div>
                      <h5 className="font-size-15 text-truncate">
                        {userProfile.name}
                      </h5>
                      <p className="text-muted mb-0 text-truncate">
                        {userProfile.designation}
                      </p>
                    </Col>

                    <Col sm={8}>
                      <div className="pt-4">
                        <Row>
                          <Col xs="6">
                            <h5 className="font-size-15">
                              {userProfile.projectCount}
                            </h5>
                            <p className="text-muted mb-0">Projects</p>
                          </Col>
                          <Col xs="6">
                            <h5 className="font-size-15">
                              {userProfile.revenue}
                            </h5>
                            <p className="text-muted mb-0">Revenue</p>
                          </Col>
                        </Row>
                        <div className="mt-4">
                          <Link to="" className="btn btn-primary btn-sm">
                            View Profile{" "}
                            <i className="mdi mdi-arrow-right ms-1" />
                          </Link>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              </Col> */}
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
                {/* <CardBody>
                  <CardTitle className="mb-5">Experience</CardTitle>
                  <div>
                    <ul className="verti-timeline list-unstyled">
                      {userProfile.experiences.map((experience, i) => (
                        <li
                          className={
                            experience.id === 1 ? "event-list active" : "event-list"
                          }
                          key={"_exp_" + i}
                        >
                          <div className="event-timeline-dot">
                            <i
                              className={
                                experience.id === 1
                                  ? "bx bx-right-arrow-circle bx-fade-right"
                                  : "bx bx-right-arrow-circle"
                              }
                            />
                          </div>
                          <div className="d-flex">
                            <div className="me-3">
                              <i
                                className={
                                  "bx " +
                                  experience.iconClass +
                                  " h4 text-primary"
                                }
                              />
                            </div>
                            <div className="flex-grow-1">
                              <div>
                                <h5 className="font-size-15">
                                  <Link to={experience.link} className="text-dark">
                                    {experience.designation}
                                  </Link>
                                </h5>
                                <span className="text-primary">
                                  {experience.timeDuration}
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardBody> */}
              </Card>


            </Col>

            {/* <Col xl="8">
              <Row>
                {miniCards.map((card, key) => (
                  <MiniCards
                    title={card.title}
                    text={card.text}
                    iconClass={card.iconClass}
                    key={"_card_" + key}
                  />
                ))}
              </Row>
            </Col> */}
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
