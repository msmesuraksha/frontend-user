import React, { useState, useEffect } from "react"
import Select from "react-select"
import { useFormik } from "formik"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  InputGroup,
  Input,
  Label,
  Card,
  CardBody,
  FormGroup,
  Table,
  Row, Col
} from "reactstrap"
import { useDispatch, useSelector } from 'react-redux'
import { SelectAddCustomer } from "store/addCustomer/addCustomer.selecter"
import { setAddCustomerOpen } from "store/addCustomer/addCustomer.actiontype"
import { addNewCustomerlist } from "store/sendbilltransacttion/actions"
import { ToastContainer, toast } from 'react-toastify';
// state and city select
import { City, Country, State } from "country-state-city";

import { fetchGstDetailsStart } from "store/fatchGstDetails/fatchGstDetails.action"
import { selectGstNoDetailsList } from "store/fatchGstDetails/fatchGstDetails.selecter"

import { getAllDebtors } from "store/actions"

import { dataresetGstDetailsSuccess } from "store/fatchGstDetails/fatchGstDetails.action"

export const AddcustomerFomr = ({ isAddCustomercheck }) => {
  const [selectedOption, setSelectedOption] = useState("")
  const [salutations, setsalutations] = useState([
    { label: "Mr.", value: "Mr." },
    { label: "Mrs.", value: "Mrs." },
    { label: "Miss", value: "Miss" },
    { label: "Dr.", value: "Dr." },
    { label: "Prof.", value: "Prof." },
  ])
  const dispatch = useDispatch();
  const isAddCustomerOpen = useSelector(SelectAddCustomer);
  const toggleAddCustomer = () => dispatch(setAddCustomerOpen(!isAddCustomerOpen));

  const handleInputChange = inputValue => {
    // Handle input change here
  }

  const [gstNumberValid, setGstNumberValid] = useState(true)
  const [panNumberValid, setPanNumberValid] = useState(true)
  const [zipcodeValid, setZipcodeValid] = useState(true)
  const [mobileNumberValid, setMobileNumberValid] = useState(true)
  const [emailidValid, setemailidValid] = useState(true)

  const formikModal = useFormik({
    initialValues: {
      customerTypeIndividual: "",
      customerTypeBusiness: "",
      customerType: "Business",
      primaryContact: "",
      firstname: "",
      lastname: "",
      salutation: "",
      companyName: "",
      customerEmail: "",
      customerPhone: "",
      secondCustomerNo: "",
      gstNumber: "",
      panCard: "",
      address1: "",
      address2: null,
      city: "",
      state: "",
      zipcode: "",
    },


    validate: values => {
      const errors = {}

      if (!values.customerType) {
        errors.customerType = "Customer Type is required"
      }
      if (!values.firstname) {
        errors.firstname = "Customer Name is required"
      }
      if (!values.primaryContact) {
        errors.primaryContact = "Primary Contact is required"
      }
      if (!values.companyName) {
        errors.companyName = "Company Name is required"
      }
      if (!values.customerEmail) {
        errors.customerEmail = "Customer Email is required"
        setemailidValid(false)
      } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(values.customerEmail)) {
        errors.customerEmail = "Invalid email address"
        setemailidValid(false)
      } else {
        setemailidValid(true)
      }
      if (!values.customerPhone) {
        errors.customerPhone = "Phone Number is required"
        setMobileNumberValid(false)
      } else if (!/^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/.test(values.customerPhone)) {
        errors.customerPhone = "Invalid Phone Number"
        setMobileNumberValid(false)
      } else {
        setMobileNumberValid(true)
      }

      if (!values.secondCustomerNo) {
      } else if (!/^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/.test(values.secondCustomerNo)) {
        errors.secondCustomerNo = "Invalid Phone Number"

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
      //else if (
      //   !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\w{1}\d{1}$/.test(values.gstNumber)
      // ) {
      //   errors.gstNumber = "Invalid GST Number"
      // }
      if (!values.panCard) {
        errors.panCard = "PANCARD is required"
        setPanNumberValid(false)
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(values.panCard)) {
        errors.panCard = "Invalid PANCARD"
        setPanNumberValid(false)
      } else {
        setPanNumberValid(true)
      }
      if (!values.address1) {
        errors.address1 = "Address 1 is required"
      }
      if (!values.cityState) {
        errors.cityState = "City/State is required"
      }
      if (!values.zipcode) {
        errors.zipcode = "Zipcode is required"
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
  })


  //city and State

  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState();
  const [cityData, setCityData] = useState();

  const [country, setCountry] = useState(countryData[100]);

  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [salutationState, setsalutationState] = useState([])
  const [salutationCity, setSalutationCity] = useState([])

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

  const handleFormSubmit = (item, e) => {

    const dummy = [
      {
        "firstname": item.firstname,
        "customerEmail": item.customerEmail,
        "customerMobile": item.customerPhone,
        "secCustomerMobile": item.secondCustomerNo,
        "address1": item.address1,
        "address2": item.address2 == "" ? undefined : item.address2,
        "city": selectedCity.value != undefined ? selectedCity.value : '',
        "state": selectedState.value != undefined ? selectedState.value : '',
        "zipcode": item.zipcode,
        "gstin": item.gstNumber?.toUpperCase(),
        "companyPan": item.panCard?.toUpperCase(),
        "companyName": item.companyName
      }
    ]
    if (gstNumberValid && panNumberValid && zipcodeValid && mobileNumberValid && emailidValid) {
      let dummyData = dummy[0]

      let checkvalue = false;

      for (const key in dummyData) {
        if (key !== "secCustomerMobile" && key !== "address2" && dummyData.hasOwnProperty(key)) {
          if (dummyData[key] === '' || dummyData[key] == undefined) {
            checkvalue = true;
            break;
          }
        }
      }

      const secondMobileNo = dummy[0].secCustomerMobile + ''

      if (secondMobileNo.length > 10) {
        toast.error('Secondary Mobile Number Incorrect')
        return
      }

      if (checkvalue) {
        toast.error("Please Fill All Required Fields");
        return
      } else {
        toast.success("Customer add Successfully");
      }
      dispatch(addNewCustomerlist(dummy))
      e.preventDefault();

      setTimeout(() => {
        dispatch(getAllDebtors())

        toggleAddCustomer()
      }, 1000);
    }


  }

  const colourStyles = {
    menuList: styles => ({
      ...styles,
      background: '#FFFFFF'
    })

  }

  const [getGstNo, setGstNo] = useState('')
  const [getPANNo, setPANNo] = useState('')

  const userData = useSelector(selectGstNoDetailsList)

  useEffect(() => {
    setSelectedState({ "label": userData.state, "value": userData.state })
    setSelectedCity({ "label": userData.city, "value": userData.city })
    setSelectedOption({ "label": userData.salutation, "value": userData.salutation })

    setPanNumberValid(true)
    setZipcodeValid(true)
    setMobileNumberValid(true)
    setemailidValid(true)

    formikModal.values.firstname = userData?.firstname != undefined ? userData?.firstname : formikModal.values.firstname
    formikModal.values.lastname = userData?.lastname != undefined ? userData?.lastname : formikModal.values.lastname
    formikModal.values.address1 = userData?.address1 != undefined ? userData?.address1 : formikModal.values.address1
    formikModal.values.address2 = userData?.address2 != undefined ? userData?.address2 : formikModal.values.address2
    formikModal.values.gstNumber = userData?.gstin != undefined ? userData?.gstin : formikModal.values.gstNumber
    formikModal.values.panCard = userData?.companyPan != undefined ? userData?.companyPan : formikModal.values.panCard
    formikModal.values.companyName = userData?.companyName != undefined ? userData?.companyName : formikModal.values.companyName
    formikModal.values.customerEmail = userData?.customerEmail != undefined ? userData?.customerEmail : formikModal.values.customerEmail
    formikModal.values.customerPhone = userData?.customerMobile != undefined ? userData?.customerMobile : formikModal.values.customerPhone
    formikModal.values.secondCustomerNo = userData?.secCustomerMobile != undefined ? userData?.secCustomerMobile : formikModal.values.secondCustomerNo
    formikModal.values.zipcode = userData?.zipcode != undefined ? userData?.zipcode : formikModal.values.zipcode
  }, [userData])

  useEffect(() => {
    formikModal.values.panCard = ''
    formikModal.values.companyName = ''
    formikModal.values.customerEmail = ''
    formikModal.values.customerPhone = ''
    formikModal.values.secondCustomerNo = ''
    formikModal.values.zipcode = ''
    formikModal.values.address1 = ''
    formikModal.values.address2 = ''
    formikModal.values.firstname = ''
    formikModal.values.lastname = ''
    formikModal.values.gstNumber = ''
    setSelectedState('')
    setSelectedCity('')
    dispatch(dataresetGstDetailsSuccess([]))
  }, [isAddCustomercheck])

  const resetData = () => {
    formikModal.values.panCard = ''
    formikModal.values.companyName = ''
    formikModal.values.customerEmail = ''
    formikModal.values.customerPhone = ''
    formikModal.values.secondCustomerNo = ''
    formikModal.values.zipcode = ''
    formikModal.values.address1 = ''
    formikModal.values.address2 = ''
    formikModal.values.firstname = ''
    formikModal.values.lastname = ''
    formikModal.values.gstNumber = ''
    setSelectedState('')
    setSelectedCity('')
    setGstNo('')
    dispatch(dataresetGstDetailsSuccess([]))
  }

  const GetCustomersDetails = () => {
    if (gstNumberValid || panNumberValid) {
      dispatch(fetchGstDetailsStart({
        "gstin": getGstNo,
      }))
    }
  }







  return (
    <Modal isOpen={isAddCustomerOpen}>
      <ModalHeader toggle={() => toggleAddCustomer()}>
        Add New Members{" "}
      </ModalHeader>
      <ModalBody>
        <form onSubmit={formikModal.handleSubmit}>
          <Row>
            <Col xs={12} md={2} className="mt-1">
              <Label for="gstNumber">GST No.<span style={{ color: 'red' }}>*</span></Label>
            </Col>
            <Col xs={12} md={5}>
              <FormGroup>
                <Input
                  type="text"
                  id="gstNumber"
                  name="gstNumber"
                  className="text-uppercase"
                  autoComplete="off"
                  value={formikModal.values.gstNumber}
                  onChange={(e) => { formikModal.handleChange(e), setGstNo(e.currentTarget.value) }}
                  onBlur={formikModal.handleBlur}
                  placeholder="Enter GST Number"
                  disabled={userData?.gstin == undefined ? false : true}

                />
                {formikModal.touched.gstNumber &&
                  formikModal.errors.gstNumber && (
                    <div className="text-danger">
                      {formikModal.errors.gstNumber}
                    </div>
                  )}
              </FormGroup>
            </Col>
            <Col>
              <Button disabled={getGstNo.length == 0 ? true : false} color="primary" onClick={() => GetCustomersDetails()}>
                Get Data
              </Button>
              <Button style={{ marginLeft: '1rem' }} disabled={getGstNo.length == 0 ? true : false} color="primary" onClick={() => resetData()}>
                Reset
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={2} className="mt-2">
              <Label for="panCard">PAN No.<span style={{ color: 'red' }}>*</span></Label>
            </Col>
            <Col xs={12} md={5}>
              <FormGroup>
                <Input
                  type="text"
                  id="panCard"
                  name="panCard"
                  className="text-uppercase"
                  autoComplete="off"
                  value={formikModal.values.panCard}
                  onChange={(e) => { formikModal.handleChange(e), setPANNo(e.currentTarget.value) }}
                  onBlur={formikModal.handleBlur}
                  placeholder="Enter Pan Number"
                  disabled={userData?.companyPan == undefined ? false : true}
                />
                {formikModal.touched.panCard &&
                  formikModal.errors.panCard && (
                    <div className="text-danger">
                      {formikModal.errors.panCard}
                    </div>
                  )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <hr className="bdr-light xlg"></hr>
            </Col>
          </Row>
          <Label for="address1">Personal Details</Label>

          <Row>
            <Col xs={12} md={2} className="mt-2">
              <Label for="customerType">Member Name<span style={{ color: 'red' }}>*</span></Label>
            </Col>
            {/* <Col xs={6} md={2}>
              <div className="d-inline">
                <label
                  className="visually-hidden custom-content"
                  htmlFor="primaryContact"
                >
                  Select Customer
                </label>
                <Select
                  id="primaryContact"
                  className="custom-content"
                  options={salutations}
                  styles={colourStyles}
                  value={selectedOption.value == undefined ? salutations : selectedOption}
                  onChange={selected => setSelectedOption(selected)}
                  onInputChange={handleInputChange}
                />
              </div>
            </Col> */}
            <Col xs={12} md={8}>
              <FormGroup>
                <Input
                  type="text"
                  id="firstname"
                  name="firstname"
                  autoComplete="off"
                  className="text-capitalize"
                  value={formikModal.values.firstname}
                  onChange={formikModal.handleChange}
                  onBlur={formikModal.handleBlur}
                  placeholder="Enter Full Name"
                  disabled={userData?.firstname == undefined ? false : true}
                />
                {formikModal.touched.firstname &&
                  formikModal.errors.firstname && (
                    <div className="text-danger">
                      {formikModal.errors.firstname}
                    </div>
                  )}
              </FormGroup>
            </Col>
            {/*             <Col xs={12} md={3}>
              <FormGroup>
                <Input
                  type="text"
                  id="lastname"
                  name="lastname"
                  autoComplete="off"
                  value={formikModal.values.lastname}
                  onChange={formikModal.handleChange}
                  className="text-capitalize"

                  onBlur={formikModal.handleBlur}
                  placeholder="Last Name"
                />
                {formikModal.touched.lastname &&
                  formikModal.errors.lastname && (
                    <div className="text-danger">
                      {formikModal.errors.lastname}
                    </div>
                  )}
              </FormGroup>
            </Col> */}
          </Row>
          {/* <Row>
          <Col xs="12">
            <hr className="bdr-light xlg"></hr>
          </Col>
        </Row> */}
          <Row>
            <Col xs={12} md={4} className="mt-2">
              <Label for="companyName">Company Name<span style={{ color: 'red' }}>*</span></Label>
            </Col>
            <Col xs={12} md={8}>
              <FormGroup>
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
                  disabled={userData?.companyName == undefined ? false : true}
                />
                {formikModal.touched.companyName &&
                  formikModal.errors.companyName && (
                    <div className="text-danger">
                      {formikModal.errors.companyName}
                    </div>
                  )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={2} className="mt-2">
              <Label for="customerEmail">Email<span style={{ color: 'red' }}>*</span></Label>
            </Col>
            <Col xs={12} md={8}>
              <FormGroup>
                <Input
                  type="text"
                  id="customerEmail"
                  name="customerEmail"
                  value={formikModal.values.customerEmail}
                  autoComplete="off"
                  onChange={formikModal.handleChange}
                  onBlur={formikModal.handleBlur}
                  placeholder="Customer Email"
                  disabled={userData?.customerEmail == undefined ? false : true}
                />
                {formikModal.touched.customerEmail &&
                  formikModal.errors.customerEmail && (
                    <div className="text-danger">
                      {formikModal.errors.customerEmail}
                    </div>
                  )}
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={2} className="mt-2">
              <Label for="customerPhone">Contact No.<span style={{ color: 'red' }}>*</span>(Primary)</Label>
            </Col>
            <Col xs={12} md={8}>
              <FormGroup>
                <Input
                  type="number"
                  id="customerPhone"
                  name="customerPhone"
                  autoComplete="off"
                  value={formikModal.values.customerPhone}
                  onChange={formikModal.handleChange}
                  onBlur={formikModal.handleBlur}
                  placeholder="Primary Mobile Number"
                  pattern="[6-9]\d{9}" // Allow only 10 digits starting with 6, 7, 8, or 9
                  maxLength="10"
                  disabled={userData?.customerMobile == undefined ? false : true}
                />
                {formikModal.touched.customerPhone &&
                  formikModal.errors.customerPhone && (
                    <div className="text-danger">
                      {formikModal.errors.customerPhone}
                    </div>
                  )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={2} className="mt-2">
              <Label for="secondCustomerNo">Contact No. (Secondary)</Label>
            </Col>
            <Col xs={12} md={8}>
              <FormGroup>
                <Input
                  type="number"
                  id="secondCustomerNo"
                  name="secondCustomerNo"
                  autoComplete="off"
                  value={formikModal.values.secondCustomerNo}
                  onChange={formikModal.handleChange}
                  onBlur={formikModal.handleBlur}
                  placeholder="Secondary Mobile Number"
                  pattern="[6-9]\d{9}" // Allow only 10 digits starting with 6, 7, 8, or 9
                  maxLength="10"
                  disabled={userData?.secCustomerMobile == undefined || userData?.secCustomerMobile == '' ? false : true}
                />
                {formikModal.touched.secondCustomerNo &&
                  formikModal.errors.secondCustomerNo && (
                    <div className="text-danger">
                      {formikModal.errors.secondCustomerNo}
                    </div>
                  )}
              </FormGroup>
            </Col>
          </Row>
          {/* Add similar code for the rest of the fields */}
          <Row>
            <Col xs="12">
              <hr className="bdr-light xlg"></hr>
            </Col>
          </Row>
          <Label for="address1">Address Details</Label>
          <Row>
            <Col xs={12} md={2} className="mt-4">
              <Label for="address1">Address 1<span style={{ color: 'red' }}>*</span></Label>
            </Col>
            <Col xs={12} md={6} className="mt-2">
              <FormGroup>
                <Input
                  type="textarea"
                  id="address1"
                  name="address1"
                  className="text-capitalize"
                  autoComplete="off"
                  value={formikModal.values.address1}
                  onChange={formikModal.handleChange}
                  onBlur={formikModal.handleBlur}
                  placeholder="Type Address here....."
                  disabled={userData?.address1 == undefined ? false : true}
                />
                {formikModal.touched.address1 &&
                  formikModal.errors.address1 && (
                    <div className="text-danger">
                      {formikModal.errors.address1}
                    </div>
                  )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={2} className="mt-3">
              <Label for="address2">Address 2</Label>
            </Col>
            <Col xs={12} md={6} className="mt-1">
              <FormGroup>
                <Input
                  type="textarea"
                  id="address2"
                  name="address2"
                  className="text-capitalize"
                  autoComplete="off"
                  value={formikModal.values.address2}
                  onChange={formikModal.handleChange}
                  onBlur={formikModal.handleBlur}
                  placeholder="Type Address here....."
                  disabled={userData?.address2 == undefined || userData?.address2 == '' ? false : true}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={2} className="mt-2">
              <Label for="cityState">State<span style={{ color: 'red' }}>*</span></Label>
            </Col>
            <Col xs={12} md={6} className="mt-1">
              <FormGroup>
                <Select
                  id="primaryContact"
                  className="custom-content"
                  options={salutationState}
                  styles={colourStyles}
                  value={selectedState.value == undefined ? "Please select your state" : selectedState}
                  onChange={selected => setSelectedState(selected)}
                  onBlur={formikModal.handleBlur}
                  placeholder="Select State"
                  isDisabled={userData?.state == undefined ? false : true}
                />
                {formikModal.touched.city &&
                  formikModal.errors.city && (
                    <div className="text-danger">
                      {formikModal.errors.city}
                    </div>
                  )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={2} className="mt-2">
              <Label for="cityState">City<span style={{ color: 'red' }}>*</span></Label>
            </Col>
            <Col xs={12} md={6} className="mt-1">
              <FormGroup>
                <Select
                  id="primaryContact"
                  className="custom-content"
                  options={salutationCity}
                  styles={colourStyles}
                  value={selectedCity.value == undefined ? "Please select your city" : selectedCity}
                  onChange={selected => setSelectedCity(selected)}
                  onBlur={formikModal.handleBlur}
                  placeholder="Select City"
                  isDisabled={userData?.city == undefined ? false : true}
                />
                {formikModal.touched.state &&
                  formikModal.errors.state && (
                    <div className="text-danger">
                      {formikModal.errors.state}
                    </div>
                  )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={2} className="mt-2">
              <Label for="zipcode">Zipcode<span style={{ color: 'red' }}>*</span></Label>
            </Col>
            <Col xs={12} md={6} className="mt-1">
              <FormGroup>
                <Input
                  type="number"
                  id="zipcode"
                  name="zipcode"
                  autoComplete="off"
                  value={formikModal.values.zipcode}
                  onChange={formikModal.handleChange}
                  onBlur={formikModal.handleBlur}
                  placeholder="Enter 6 digit zipcode"
                  disabled={userData?.zipcode == undefined ? false : true}
                />
                {formikModal.touched.zipcode &&
                  formikModal.errors.zipcode && (
                    <div className="text-danger">
                      {formikModal.errors.zipcode}
                    </div>
                  )}
              </FormGroup>
            </Col>
          </Row>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => toggleAddCustomer()}>
          Cancel
        </Button>
        <Button
          color="success"
          onClick={(e) => handleFormSubmit(formikModal.values, e)}
        >
          Submit
        </Button>
      </ModalFooter>
      <ToastContainer />
    </Modal >
  )

}