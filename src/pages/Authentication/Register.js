import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";
import Select from "react-select"

// state and city select
import { City, Country, State } from "country-state-city";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import Loader from "react-js-loader";
// action

import { registerUser_login, apiError } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";


// toast.configure() 
const Register = props => {

  //meta title
  document.title = "Register | MSME Suraksha - User & Dashboard";
  const [panNumber, setPanNumber] = useState('');
  const [gstNumber, setGSTNumber] = useState('');
  const [timerStart, setTimerStart] = useState(false);


  const [gstValidation, setGSTValidation] = useState("");

  const [panValidation, setPanValidation] = useState("");
  const [mobileValidation, setmobileValidation] = useState("");
  const [emailValidation, setemailValidation] = useState("");


  //city and State

  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState();
  const [cityData, setCityData] = useState();

  const [country, setCountry] = useState(countryData[100]);

  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [salutationState, setsalutationState] = useState([])
  const [salutationCity, setSalutationCity] = useState([])

  const colourStyles = {
    menuList: styles => ({
      ...styles,
      background: '#FFFFFF'
    })
  }

  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);



  useEffect(() => {
    if (stateData) {
      const selectState = stateData.filter((state) => state.name == selectedState.value)
      setCityData(City.getCitiesOfState(country?.isoCode, selectState[0]?.isoCode));
    }

  }, [selectedState]);

  useEffect(() => {
    if (stateData) {
      const stateDatalist = stateData.map((value, index) => {
        return { label: value.name, value: value.name }
      })
      setsalutationState(stateDatalist)
    }
  }, [stateData]);

  useEffect(() => {
    if (cityData) {
      const stateDatalist = cityData.map((value, index) => {
        return { label: value.name, value: value.name }
      })
      setSalutationCity(stateDatalist)
    }
  }, [cityData]);

  // 

  const [gstNumberValid, setGstNumberValid] = useState(true)
  const [panNumberValid, setPanNumberValid] = useState(true)
  const [zipcodeValid, setZipcodeValid] = useState(true)
  const [mobileNumberValid, setMobileNumberValid] = useState(true)
  const [emailidValid, setemailidValid] = useState(true)

  const handleGSTChange = (event) => {
    const gst = event.target.value;
    setGSTNumber(gst);

    if (gstValidation.touched) {
      if (isGSTValid(gst)) {
        setGSTValidation({ touched: true, error: '' });
      } else {
        setGSTValidation({ touched: true, error: 'Invalid GST format' });
      }
    }
  };
  function isPanCardValid(panCardNumber) {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panPattern.test(panCardNumber);
  }
  function isGSTValid(gstNumber) {
    const gstPattern = /^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/;
    return gstPattern.test(gstNumber);
  }

  const handleGSTBlur = () => {
    if (gstNumber === '') {
      setGSTValidation({ touched: true, error: 'GST number is required' });
      setGstNumberValid(false)
    } else if (!isGSTValid(gstNumber)) {
      setGSTValidation({ touched: true, error: 'Invalid GST format' });
      setGstNumberValid(false)
    } else {
      setGSTValidation({ touched: true, error: '' });
      setGstNumberValid(true)
    }
  };
  const handlePanChange = (event) => {
    const pan = event.target.value.toUpperCase();
    const panPattern = /^([A-Z]{5}[0-9]{4}[A-Z]{1})$/;
    if (pan.test(panPattern)) {
      setPanNumber(pan);
    }
    else {
      setPanValidation('Enter valid Pan Number')
    }



  };
  const handlePanBlur = () => {
    if (panNumber === '') {
      setPanValidation({ touched: true, error: 'PAN number is required' });
      setPanNumberValid(false)
    } else if (!isPanCardValid(panNumber)) {
      setPanValidation({ touched: true, error: 'Invalid PAN format' });
      setPanNumberValid(false)
    } else {
      setPanValidation({ touched: true, error: '' });
      setPanNumberValid(true)
    }
  };
  function isAadharNumberValid(aadharNumber) {
    if (!/^\d{12}$/.test(aadharNumber)) {
      return false;
    }

    const aadharArray = aadharNumber.split('').map(Number);
    const checksumDigit = aadharArray[11];

    let sum = 0;
    for (let i = 0; i < 11; i++) {
      sum += aadharArray[i];
    }

    const calculatedChecksum = (sum % 10 + 1) % 10;

    return checksumDigit === calculatedChecksum;
  }

  const dispatch = useDispatch();


  const formik = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
      name: '',
      companyName: '',
      password: '',
      aadharNumber: '',
      mobileNumber: '',
      secondMobileNo: '',
      gstNumber: '',
      panNumber: '',
      state: '',
      city: '',
      zipcode: '',

    },

    validate: values => {
      const errors = {}
      if (!values.companyName) {
        errors.companyName = "Company Name is required"
      }

      if (!values.email) {
        errors.email = "Customer Email is required"
        setemailidValid(false)
      } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(values.email)) {
        errors.email = "Invalid email address"
        setemailidValid(false)
      } else {
        setemailidValid(true)
      }

      if (!values.mobileNumber) {
        errors.mobileNumber = "Phone Number is required"
        setMobileNumberValid(false)
      } else if (!/^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/.test(values.mobileNumber)) {
        errors.mobileNumber = "Invalid Phone Number"
        setMobileNumberValid(false)
      } else {
        setMobileNumberValid(true)
      }
      if (!values.zipcode) {
        errors.zipcode = "zipcode is required"
        setZipcodeValid(false)
      } else if (!/^\d{6}$/.test(values.zipcode)) {
        errors.zipcode = "Invalid Zipcode"
        setZipcodeValid(false)
      } else {
        setZipcodeValid(true)
      }
      return errors
    },
    onSubmit: values => {
    },
  });



  const apiRespo = useSelector(state => (state.register_login_reducer.apiResponse))

  useEffect(() => {
    // dispatch(apiError(""));
    sessionStorage.removeItem("tokenemployeeRegister")
    sessionStorage.removeItem("COMPANY-ID")

    if (timerStart == true) {
      const interval = setInterval(() => {
        setTimerStart(false)
      }, 2000);
      return () => clearInterval(interval);
    }

    if (apiRespo != undefined) {
      if (apiRespo == true) {
        const newPageUrl = '/login'
        toast.success('Registration successful. Please check your email.')
        const intervals = setInterval(() => {
          window.location.href = newPageUrl;
        }, 2000);
        return () => clearInterval(intervals);
      }
      else {

        toast.error('user already existes')

      }

    }
  }, [apiRespo, timerStart]);

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        {timerStart == false ?
          <Container>
            <Row className="justify-content-center">
              <Col xl={8}>
                <Card className="overflow-hidden">
                  <div className="bg-primary bg-soft">
                    <Row>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-primary">Free Register</h5>
                          <p>Get your free MSME Suraksha account now.</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profileImg} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logoImg}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>

                    <div className="p-2">
                      <Form
                        className="form-horizontal"
                        onSubmit={(e) => {
                          e.preventDefault();
                          formik.handleSubmit();
                          const user = {
                            name: formik.values.name,
                            companyName: formik.values.companyName,
                            gstin: gstNumber.toUpperCase(),
                            companyPan: panNumber.toUpperCase(),
                            // aadharNumber: formik.values.aadharNumber,
                            mobile: formik.values.mobileNumber,
                            secPhoneNumber: formik.values.secondMobileNo,
                            emailId: formik.values.email,
                            aadharCardNo: "",
                            city: selectedCity.value != undefined ? selectedCity.value : '',
                            state: selectedState.value != undefined ? selectedState.value : '',
                            zipcode: formik.values.zipcode,

                          };


                          if (gstNumberValid && panNumberValid && zipcodeValid && mobileNumberValid && emailidValid) {

                            if (formik.values.name != '' && formik.values.zipcode != '' && formik.values.email != '' && gstNumber != '' && panNumber != "" && selectedState != "" && selectedCity != "") {
                              dispatch(registerUser_login(user, props.router.navigate));
                              setTimerStart(true)


                            }
                            return false;
                          }
                          toast.error('Please fill all fields ')
                          return

                        }}
                      >


                        <Row>
                          <Col md={6}>
                            <div className="mb-3">
                              <Label className="form-label">Name<span className="text-danger">*</span></Label>
                              <Input
                                name="name"
                                type="text"
                                className="form-control"
                                placeholder="Enter Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name || ""}
                                invalid={formik.touched.name && formik.errors.name ? true : false}
                              />
                              {formik.touched.name && formik.errors.name ? (
                                <FormFeedback type="invalid">{formik.errors.name}</FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="mb-3">
                              <Label className="form-label">Company Name<span className="text-danger">*</span></Label>
                              <Input
                                name="companyName"
                                type="text"
                                className="form-control"
                                placeholder="Enter company name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.companyName || ""}
                              // invalid={formik.touched.companyName && formik.errors.companyName ? true : false}
                              // Add your company name validation logic here
                              />
                              {formik.touched.companyName && formik.errors.companyName ? (
                                <FormFeedback type="invalid">

                                  {formik.errors.companyName}

                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={6}>

                            <div className="mb-3">
                              <Label className="form-label">Email<span className="text-danger">*</span></Label>
                              <Input
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                // value={formik.values.email || ""}
                                invalid={formik.touched.email && formik.errors.email ? true : false}

                              />
                              {formik.touched.email && formik.errors.email ? (
                                <FormFeedback type="invalid">{formik.errors.email}</FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="mb-3">
                              <Label className="form-label">Mobile Number (Primary)<span className="text-danger">*</span></Label>
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">(+91) -</span>
                                </div>
                                <input
                                  name="mobileNumber"
                                  type="tel"
                                  className={`form-control ${formik.touched.mobileNumber && formik.errors.mobileNumber ? "is-invalid" : ""
                                    }`}
                                  placeholder="Enter 10-digit mobile number"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.mobileNumber || ""}
                                  pattern="[6-9]\d{9}" // Allow only 10 digits starting with 6, 7, 8, or 9
                                  maxLength="10" // Restrict input to 10 characters
                                />
                                {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                                  <div className="invalid-feedback">{formik.errors.mobileNumber}</div>
                                ) : null}
                              </div>
                            </div>
                          </Col>

                        </Row>

                        <Row>
                          <Col md={6}>
                            <div className="mb-3">
                              <Label className="form-label">Mobile Number (Secondary )</Label>
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">(+91) -</span>
                                </div>
                                <input
                                  name="secondMobileNo"
                                  type="tel"
                                  className={`form-control ${formik.touched.secondMobileNo && formik.errors.secondMobileNo ? "is-invalid" : ""
                                    }`}
                                  placeholder="Enter 10-digit mobile number"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.secondMobileNo || ""}
                                  pattern="[6-9]\d{9}" // Allow only 10 digits starting with 6, 7, 8, or 9
                                  maxLength="10" // Restrict input to 10 characters
                                />
                              </div>
                            </div>
                          </Col>
                          <Col>
                            <div className="mb-3">
                              <Label className="form-label">GST Number<span className="text-danger">*</span></Label>
                              <Input
                                id="gstNumber"
                                name="gstNumber"
                                className="form-control"
                                placeholder="Enter GST Number"
                                type="text"
                                onChange={(e) => setGSTNumber(e.target.value)}
                                onBlur={handleGSTBlur}
                                value={gstNumber.toUpperCase()}
                                invalid={gstValidation.touched && gstValidation.error !== ''}
                              />
                              {gstValidation.touched && gstValidation.error !== '' && (
                                <FormFeedback type="invalid">{gstValidation.error}</FormFeedback>
                              )}
                            </div>
                          </Col>

                        </Row>
                        <Row>
                          <Col>

                            <div className="mb-3">
                              <label className="form-label">PAN Number<span className="text-danger">*</span></label>
                              <input
                                id="panNumber"
                                name="panNumber"
                                className={`form-control ${panValidation.touched && panValidation.error ? 'is-invalid' : ''}`}
                                placeholder="Enter PAN Number"
                                type="text"
                                // onChange={handlePanChange}
                                onChange={(e) => setPanNumber(e.target.value)}

                                onBlur={handlePanBlur}
                              // value={panNumber}
                              />
                              {panValidation.error && panValidation.error != '' && (
                                <div className="invalid-feedback">{panValidation.error}</div>
                              )}
                            </div>
                          </Col>
                          <Col>
                            <div className="mb-3">
                              <label className="form-label">State<span className="text-danger">*</span></label>
                              <Select
                                id="primaryContact"
                                className="custom-content"
                                options={salutationState}
                                styles={colourStyles}
                                value={selectedState}
                                onChange={selected => setSelectedState(selected)}
                                placeholder="Select State"
                              />
                              {formik.touched.state && formik.errors.state ? (
                                <FormFeedback type="invalid">{formik.errors.state}</FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="mb-3">
                              <label className="form-label">City<span className="text-danger">*</span></label>
                              <Select
                                id="primaryContact"
                                className="custom-content"
                                options={salutationCity}
                                styles={colourStyles}
                                value={selectedCity}
                                onChange={(selected) => setSelectedCity(selected)}
                                placeholder="Select City"
                              />
                              {formik.touched.city && formik.errors.city ? (
                                <FormFeedback type="invalid">{formik.errors.city}</FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="mb-3">
                              <Label className="form-label">Zip Code<span className="text-danger">*</span></Label>
                              <Input
                                type="number"
                                id="zipcode"
                                name="zipcode"
                                value={formik.values.zipcode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter 6 digit zipcode"
                              />
                              {formik.touched.zipcode &&
                                formik.errors.zipcode && (
                                  <div className="text-danger">
                                    {formik.errors.zipcode}
                                  </div>
                                )}
                            </div>
                          </Col>
                          <Col md={6}>
                          </Col>
                        </Row>
                        <Row>


                          <Col md={6}>

                          </Col>
                          <Col md={6}>

                          </Col>
                        </Row>
                        <div>
                          <p className="mb-0">
                            By registering you agree to the Bafana{" "}
                            <a href="#" className="text-primary">
                              Terms of Use
                            </a>
                          </p>
                        </div>
                        <div className="mt-4 d-grid">
                          <button
                            className="btn btn-primary waves-effect waves-light "
                            type="submit"

                          >
                            Register Now
                          </button>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    Already have an account ?{" "}
                    <Link to="/login" className="font-weight-medium text-primary">
                      {" "}
                      Login
                    </Link>{" "}
                  </p>
                  <p>
                    © {new Date().getFullYear()} MSME Suraksha. Crafted with{" "}
                    <i className="mdi mdi-heart text-danger" /> by AnandRishi Technologies Pvt Ltd
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
          :
          <div className="" style={{ paddingTop: '150px' }}>

            <Loader type="hourglass" bgColor={"gray"} color={"gray"} title=" Please wait..." size={150} />

          </div>
        }
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default withRouter(Register);
Register.propTypes = {
  history: PropTypes.object,
};