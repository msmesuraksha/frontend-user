import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
// action
import { addNewCompany } from "../../../store/actions";
import { ToastContainer, toast } from 'react-toastify';
import TermsandconditionsModal from './termsandconditionsmodal'
//redux
import { useSelector, useDispatch } from "react-redux";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Label,
  Form,
  CardBody,
  Card,
  Container,
  Row, Col,
  FormGroup,
} from "reactstrap"
import Select from "react-select"

import { getData } from "store/utils/reducer/sessionStorage";

// state and city select
import { City, Country, State } from "country-state-city";

const ReportedDebtorsModel = props => {
  const [termsModal, setTermsModal] = useState(false);

  const [gstNumberValid, setGstNumberValid] = useState(true)
  const [panNumberValid, setPanNumberValid] = useState(true)
  const [zipcodeValid, setZipcodeValid] = useState(true)
  const [mobileNumberValid, setMobileNumberValid] = useState(true)

  const [stateData, setStateData] = useState();
  const [cityData, setCityData] = useState();

  let countryData = Country.getAllCountries();
  const [country, setCountry] = useState(countryData[100]);

  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")


  const [salutationState, setsalutationState] = useState([])
  const [salutationCity, setSalutationCity] = useState([])

  const authUser = getData("authUser")
  const logindata = (sessionStorage.getItem("authUser")) != undefined ? authUser : ''

  const [gstValidation, setGSTValidation] = useState({
    touched: false,
    error: ''
  });

  const [panValidation, setPanValidation] = useState({
    touched: false,
    error: ''
  });

  const dispatch = useDispatch();

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

  const formikModal = useFormik({
    enableReinitialize: true,

    initialValues: {
      companyName: '',
      mobileNumber: '',
      secondMobileNo: '',
      gstNumber: '',
      panNumber: '',
      state: '',
      city: '',
      zipcode: '',
      Address1: '',
      Address2: '',
    },

    validate: values => {
      const errors = {}

      if (!values.companyName) {
        errors.companyName = "Company name is required"
      }
      if (!values.mobileNumber) {
        errors.mobileNumber = "Phone number is required"
        setMobileNumberValid(false)
      } else if (!/^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/.test(values.mobileNumber)) {
        errors.mobileNumber = "Invalid phone number"
        setMobileNumberValid(false)
      } else {
        setMobileNumberValid(true)
      }

      if (!values.secondMobileNo) {

      } else if (!/^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/.test(values.secondMobileNo)) {
        errors.secondMobileNo = "Invalid phone number"

      } else {

      }

      if (!values.gstNumber) {
        errors.gstNumber = "GST Number is required"
        setGstNumberValid(false)
      } else if (!/^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/.test(values.gstNumber)) {
        errors.gstNumber = "Invalid GST Number"
        setGstNumberValid(false)
      } else {
        setGstNumberValid(true)
      }
      if (!values.panNumber) {
        errors.panNumber = "PANCARD is required"
        setPanNumberValid(false)
      } else if (!/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/.test(values.panNumber)) {
        errors.panNumber = "Invalid PANCARD"
        setPanNumberValid(false)
      } else {
        setPanNumberValid(true)
      }
      if (!values.zipcode) {
        errors.zipcode = "zipcode is required"
        setZipcodeValid(false)
      } else if (!/^\d{6}$/.test(values.zipcode)) {
        errors.zipcode = "Invalid zipcode"
        setZipcodeValid(false)
      } else {
        setZipcodeValid(true)
      }
      return errors
    },
    onSubmit: values => {
    },
  });

  const formSubmit = (item, e) => {



    if (gstNumberValid && panNumberValid && zipcodeValid && mobileNumberValid) {
      const payload = {
        "companyName": item.companyName,
        "gstin": item.gstNumber.toUpperCase(),
        "companyPan": item.panNumber.toUpperCase(),
        "address1": item.Address1,
        "address2": item.Address2,
        "state": selectedState.value != undefined ? selectedState.value : '',
        "city": selectedCity.value != undefined ? selectedCity.value : '',
        "zipcode": item.zipcode,
        "mobile": item.mobileNumber,
        "secPhoneNumber": item.secondMobileNo,
        "emailId": logindata.emailId
      }


      let checkvalue = false;

      for (const key in payload) {
        if (key !== "secPhoneNumber" && key !== "address2" && payload.hasOwnProperty(key)) {
          if (payload[key] === '') {
            checkvalue = true;
            break;
          }
        }
      }

      const secondMobileNo = payload.secPhoneNumber + ''

      if (secondMobileNo.length > 10) {
        toast.error('Secondary Mobile Number Incorrect')
        return
      }

      if (checkvalue) {
        toast.error('Please fill all fields ')
        return
      }
      dispatch(addNewCompany(payload));

    } else {
      toast.error('Please fill all fields ')
      return
    }


  }
  const { isOpen, toggle } = props
  const toggleTermsTodal = () => setTermsModal(!termsModal);



  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      // show={show}
      size="lg"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-content">
        <TermsandconditionsModal isOpen={termsModal} toggle={toggleTermsTodal} />
        <ModalHeader toggle={toggle}>Add a Company</ModalHeader>
        <ModalBody>

          <div className="account-pages">
            <Container>
              <Row className="justify-content-center">
                <Col xl={12}>
                  <Card className="overflow-hidden">

                    <CardBody className="pt-0">
                      <div className="p-2">
                        <Form
                          className="form-horizontal"


                        >
                          <Row>
                            <Col md={6}>
                              <div className="mb-3">
                                <Label className="form-label">Personal Name</Label>
                                <Input
                                  name="name"
                                  type="text"
                                  className="form-control"
                                  placeholder={logindata != undefined ? logindata.name : 'Enter Name'}
                                  onChange={formikModal.handleChange}
                                  value={logindata != undefined ? logindata.name : ''}
                                  disabled
                                />

                              </div>
                            </Col>
                            <Col md={6}>
                              <div className="mb-3">
                                <Label className="form-label">Company Name<span className="text-danger">*</span></Label>
                                <Input
                                  type="text"
                                  id="companyName"
                                  name="companyName"
                                  value={formikModal.values.companyName}
                                  className="text-capitalize"
                                  autoComplete="off"
                                  onChange={formikModal.handleChange}
                                  onBlur={formikModal.handleBlur}
                                  placeholder="Enter Company Name"
                                />
                                {formikModal.touched.companyName &&
                                  formikModal.errors.companyName && (
                                    <div className="text-danger">
                                      {formikModal.errors.companyName}
                                    </div>
                                  )}

                              </div>
                            </Col>
                          </Row>

                          <Row>

                            <Col md={6}>
                              <div className="mb-3">
                                <Label className="form-label">Mobile Number (Primary)<span className="text-danger">*</span></Label>
                                <div className="input-group">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">(+91) -</span>
                                  </div>
                                  <FormGroup>
                                    <Input
                                      type="number"
                                      id="mobileNumber"
                                      name="mobileNumber"
                                      autoComplete="off"
                                      value={formikModal.values.mobileNumber}
                                      onChange={formikModal.handleChange}
                                      onBlur={formikModal.handleBlur}
                                      placeholder="Mobile Number"
                                      pattern="[6-9]\d{9}" // Allow only 10 digits starting with 6, 7, 8, or 9
                                      maxLength={10}
                                    />
                                    {formikModal.touched.mobileNumber &&
                                      formikModal.errors.mobileNumber && (
                                        <div className="text-danger">
                                          {formikModal.errors.mobileNumber}
                                        </div>
                                      )}
                                  </FormGroup>
                                </div>
                              </div>
                            </Col>
                            <Col md={6}>
                              <div className="mb-3">
                                <Label className="form-label">Mobile Number (Secondary)</Label>
                                <div className="input-group">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">(+91) -</span>
                                  </div>
                                  <FormGroup>
                                    <Input
                                      type="number"
                                      id="secondMobileNo"
                                      name="secondMobileNo"
                                      autoComplete="off"
                                      value={formikModal.values.secondMobileNo}
                                      onChange={formikModal.handleChange}
                                      onBlur={formikModal.handleBlur}
                                      placeholder="Mobile Number"
                                      pattern="[6-9]\d{9}" // Allow only 10 digits starting with 6, 7, 8, or 9
                                      maxLength={10}
                                    />
                                    {formikModal.touched.secondMobileNo &&
                                      formikModal.errors.secondMobileNo && (
                                        <div className="text-danger">
                                          {formikModal.errors.secondMobileNo}
                                        </div>
                                      )}
                                  </FormGroup>
                                </div>
                              </div>
                            </Col>

                          </Row>

                          <Row>
                            <Col md={6}>
                              <div className="mb-3">
                                <Label className="form-label">Email</Label>
                                <Input
                                  id="email"
                                  name="email"
                                  className="form-control"
                                  placeholder="Enter email"
                                  type="email"
                                  onChange={formikModal.handleChange}
                                  value={logindata != undefined ? logindata.emailId : ""}
                                  disabled

                                />

                              </div>
                            </Col>
                            <Col>
                              <div className="mb-3">
                                <Label className="form-label">GST Number<span className="text-danger">*</span></Label>
                                <Input
                                  type="text"
                                  id="gstNumber"
                                  name="gstNumber"
                                  className=""
                                  autoComplete="off"
                                  value={formikModal.values.gstNumber.toUpperCase()}
                                  onChange={formikModal.handleChange}
                                  onBlur={formikModal.handleBlur}
                                  placeholder="Enter GST Number"
                                />
                                {formikModal.touched.gstNumber &&
                                  formikModal.errors.gstNumber && (
                                    <div className="text-danger">
                                      {formikModal.errors.gstNumber}
                                    </div>
                                  )}

                              </div>
                            </Col>

                          </Row>

                          <Row>
                            <Col>

                              <div className="mb-3">
                                <label className="form-label">PAN Number <span className="text-danger">*</span></label>
                                <Input
                                  type="text"
                                  id="panNumber"
                                  name="panNumber"
                                  className=""
                                  autoComplete="off"
                                  value={formikModal.values.panNumber.toUpperCase()}
                                  onChange={formikModal.handleChange}
                                  onBlur={formikModal.handleBlur}
                                  placeholder="Enter Pan Number"
                                />
                                {formikModal.touched.panNumber &&
                                  formikModal.errors.panNumber && (
                                    <div className="text-danger">
                                      {formikModal.errors.panNumber}
                                    </div>
                                  )}

                              </div>
                            </Col>
                            <Col>
                              <div className="mb-3">
                                <Label className="form-label">Address1<span className="text-danger">*</span></Label>
                                <Input
                                  type="text"
                                  id="Address1"
                                  name="Address1"
                                  className=""
                                  autoComplete="off"
                                  value={formikModal.values.Address1}
                                  onChange={formikModal.handleChange}
                                  placeholder="Enter Address 1"
                                />


                              </div>
                            </Col>

                          </Row>
                          <Row>
                            <Col>

                              <div className="mb-3">
                                <label className="form-label">Address2</label>
                                <Input
                                  type="text"
                                  id="Address2"
                                  name="Address2"
                                  className=""
                                  autoComplete="off"
                                  value={formikModal.values.Address2}
                                  onChange={formikModal.handleChange}
                                  placeholder="Enter Address 2"
                                />


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
                                {panValidation.error && panValidation.error != '' && (
                                  <div className="invalid-feedback">{panValidation.error}</div>
                                )}
                              </div>
                            </Col>

                          </Row>
                          <Row>
                            <Col md={6}>
                              <div className="mb-3">
                                <label className="form-label">City<span className="text-danger">*</span></label>
                                <Select
                                  id="primaryContact"
                                  className="custom-content"
                                  options={salutationCity}
                                  styles={colourStyles}
                                  value={selectedCity}
                                  onChange={selected => setSelectedCity(selected)}
                                  placeholder="Select City"
                                />
                                {panValidation.error && panValidation.error != '' && (
                                  <div className="invalid-feedback">{panValidation.error}</div>
                                )}
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-3">
                                <Label className="form-label">Zip Number<span className="text-danger">*</span></Label>
                                <Input
                                  type="number"
                                  id="zipcode"
                                  name="zipcode"
                                  value={formikModal.values.zipcode}
                                  onChange={formikModal.handleChange}
                                  onBlur={formikModal.handleBlur}
                                  placeholder="Enter 6 Digit Zipcode"
                                  autoComplete="off"
                                />
                                {formikModal.touched.zipcode &&
                                  formikModal.errors.zipcode && (
                                    <div className="text-danger">
                                      {formikModal.errors.zipcode}
                                    </div>
                                  )}

                              </div>
                            </Col>
                          </Row>
                          <Row>


                            <Col md={6}>

                            </Col>
                          </Row>
                          <div>
                            <p className="mb-0">
                              By registering you agree to the MSME Suraksha{" "}
                              <a href="#" className="text-primary" onClick={() => setTermsModal(true)}>
                                Terms of Use
                              </a>
                            </p>
                          </div>

                        </Form>
                        <div className="mt-4 d-grid">
                          <button
                            className="btn btn-primary waves-effect waves-light "
                            type="submit"
                            style={{ width: '150px' }}
                            onClick={(e) => formSubmit(formikModal.values, e)}
                          >
                            Add Company
                          </button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                </Col>
              </Row>
              <ToastContainer />
            </Container>
          </div>
        </ModalBody>
      </div>
    </Modal>
  )
}

ReportedDebtorsModel.propTypes =
{
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default ReportedDebtorsModel
