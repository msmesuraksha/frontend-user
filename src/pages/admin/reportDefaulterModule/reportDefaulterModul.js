import React, { useState } from "react"
import PropTypes, { number } from "prop-types"
import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import './style.css'
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  InputGroup,
  Input,
  Label,
  Card,
  CardBody,
  Row, Col
} from "reactstrap"
import { Steps } from "antd";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";


import 'react-calendar/dist/Calendar.css';
import './style.css';

import { ToastContainer, toast } from 'react-toastify';


import { useEffect } from "react";
import { getAllDebtors } from '../../../store/debtors/debtors.actions'

import Select from "react-select"
import * as moment from "moment";

import 'react-datepicker/dist/react-datepicker.css';
import { selectDebtorsList } from "store/debtors/debtors.selecter";
import { setIsCustomerFeedbackModalOpen, addInvoiceArray, } from "../../../store/debtors/debtors.actions"
import { selectFeedbackModalOpen, addInvoiceReportDebtorSelector, } from "store/debtors/debtors.selecter"
import { addInvoiceBillSuccess } from '../../../store/actions'
import { AddcustomerFomr } from "../AddCustomer/addCustomerForm";

import { SelectAddCustomer } from "store/addCustomer/addCustomer.selecter";
import { setAddCustomerOpen } from "store/addCustomer/addCustomer.actiontype"
import { numberFormat } from "../uploadPendingDoucument/uploadPendingDoc";

import { InvoiceDetailsModule } from "./invoiceDefaulterModule";
import { FeedbackQuestionModule } from "./feedbackQuestionModule";
import { ReportDefPreviewModule } from "./ReportPreviewModule";
import { ModalFooter } from "react-bootstrap";
import { getFeebBackQuestionList } from "../../../store/debtors/debtors.actions"
import { getFeebBackQuestionListSelector } from "store/debtors/debtors.selecter"
import { ConfirmDefaulterModule } from "./ConfirmDefaulterModule";
import { InvoiceThankYouPop } from "./invoiceThankYouPop";
import { EditReportedDefaulterModel } from "./requestEditMessageModal";
import { currentInvoiceClear } from "../../../store/debtors/debtors.actions";


const ReportDefaulterModule = props => {

  const { isOpen, toggle, requestedData } = props

  const [selectedOption, setSelectedOption] = useState("")
  const [isChangedCustomername, setisChangedCustomername] = useState(false)
  const [currentStep, setCurrentStep] = useState(0);


  const [filteredCustomerDetail, setfilteredCustomerDetail] = useState([])

  const [data, setData] = useState([
    {
      id: generateUniqueId(),
      itemDetail: "",
      date: "",
      amount: "",
      invoiceDocument: "",
      DispatchDocument: "",
      DeliveryDocument: "",
      generalDocuments: "",
      purchaseOrderDocument: "",
      GSTDocument: ""
    },
  ])

  const [newPayload, setNewPayload] = useState([])

  const getFeebBackQuestion = useSelector(getFeebBackQuestionListSelector)

  const [feedbackQuestion, setFeedBackQuestion] = useState([])

  const [feedbackPreview, setFeedbackPreview] = useState([])

  const [feedbackPayload, setFeedbackPayload] = useState([])

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setFeedBackQuestion(getFeebBackQuestion)
  }, [getFeebBackQuestion])

  function generateUniqueId() {
    const randomPart = Math.random().toString(36).substr(2, 5);
    const timestamp = new Date().getTime();
    const uniqueId = timestamp.toString(36) + randomPart;
    return uniqueId;
  }

  const { Step } = Steps;

  const invoiceType = requestedData != '' ? 'editInvoice' : 'invoice';

  const debterId = requestedData != '' ? requestedData.debtor._id : selectedOption.value;

  const defaulterId = requestedData?.id



  function closeReporteDefulater() {
    toggle()
    setData([])
    setNewPayload([])
    dispatch(currentInvoiceClear())
    setfilteredCustomerDetail([])
  }


  const renderStep = (step) => {
    switch (step) {
      case 0:
        return requestedData != '' ? <EditReportedDefaulterModel requestedData={requestedData} filteredCustomerDetail={filteredCustomerDetail} setfilteredCustomerDetail={setfilteredCustomerDetail} handleNext={handleNext} setNewPayload={setNewPayload} data={data} setData={setData} /> : <InvoiceDetailsModule filteredCustomerDetail={filteredCustomerDetail} selectedOption={selectedOption} isChangedCustomername={isChangedCustomername} handleNext={handleNext} data={data} setData={setData} newPayload={newPayload} setNewPayload={setNewPayload} generateUniqueId={generateUniqueId} />;
      case 1:
        return <FeedbackQuestionModule debtorId={debterId} feedbackdataPaylodTwo={feedbackPreview} setfeedbackdataPaylodTwo={setFeedbackPreview} feedbackdataPaylod={feedbackPayload} setfeedbackdataPaylod={setFeedbackPayload} getFeebBackQuestion={feedbackQuestion} />;
      case 2:
        return <ReportDefPreviewModule filteredCustomerDetail={filteredCustomerDetail} dataForPreview={data} feedbackPreview={feedbackPreview} />;
      case 3:
        return <ConfirmDefaulterModule handleCheckboxChange={handleCheckboxChange} isChecked={isChecked} allInvoiceLists={newPayload} feedbackPayload={feedbackPayload} moduleName={invoiceType} defaulterId={defaulterId} handlePrevious={handlePrevious} handleNext={handleNext} toggle={toggle} />;
      case 4:
        return <InvoiceThankYouPop toggle={toggle} />;
      default:
        return null;
    }
  };

  function handlePrevious() {
    if (currentStep == 3) {
      setIsChecked(false)
    }
    if (currentStep > 0) setCurrentStep((s) => s - 1)
  }

  function handleNext() {
    if (currentStep < 5) setCurrentStep((s) => s + 1)
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const isAddCustomerOpen = useSelector(SelectAddCustomer);
  const toggleAddCustomer = () => dispatch(setAddCustomerOpen(!isAddCustomerOpen));


  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#FAFAFA",
      width: "300px",
      // match with the menu
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // Overwrittes the different states of border
      borderColor: state.isFocused ? " #4da6ff" : " #80d4ff",
      // Removes weird border around container  
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? " #4da6ff" : " #80d4ff"
      }
    }),
    option: (provided, state) => ({

      // Your custom option styles here
      backgroundColor: state.isFocused ? '#80bfff' : '#FAFAFA',
      ':hover': {
        backgroundColor: '#80bfff', // Change background color on hover
      },


      menu: base => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        marginTop: 2
      }),
      menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 2,
        margin: 2
      })
    }),
    // Add more styles as needed for other parts of the Select component
  };

  const GetAllDebtors = useSelector(selectDebtorsList)
  const dispatch = useDispatch()

  function getDebtrosLists(responsData) {
    return (responsData && (
      responsData.map((item) => {
        return (
          {
            "value": item.id, "label": item.firstname + ", " + item.companyName,
          }

        )
      })
    )
    )
  }

  let getDebtrosList = getDebtrosLists(GetAllDebtors)
  if (getDebtrosList != undefined) {
    getDebtrosList = getDebtrosList.sort((a, b) => a.label.localeCompare(b.label));

  }

  const handleSelectCustomer = (item) => {
    setisChangedCustomername(true)
    setSelectedOption(item)
    var filteredArray = []
    filteredArray = GetAllDebtors.filter((value) => value.id == item.value)
    setfilteredCustomerDetail(filteredArray[0])

  }

  useEffect(() => {
    dispatch(getAllDebtors());
    dispatch(addInvoiceBillSuccess())
    dispatch(getFeebBackQuestionList())
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-contents">
        <ModalHeader toggle={() => closeReporteDefulater()} className="font-weight-bold" ><b style={{ fontSize: '18px' }}>Report A Defaulter</b></ModalHeader>
        <ModalBody className="" >
          <Row>
            <Steps current={currentStep}>
              <Step title={"Invoice details"} />
              <Step title={"Defaulter Feedback"} />
              <Step title={"Report Defaulter Preview"} />
              <Step title={"Confirm Complaint"} />
            </Steps>
          </Row>
          {
            filteredCustomerDetail.length == 0 && requestedData == '' ? <form>
              <Row className="selectionList">
                <Col xs={12} md={2}>
                  <div className="mt-2"><b className="mt-2">Customer Name*</b></div>
                </Col>
                <Col xs={12} md={4}>
                  <div className="d-inline">
                    <label
                      className="visually-hidden custom-content"
                      htmlFor="customerSelect"
                    >
                      Select Customer
                    </label>

                    <Select
                      options={getDebtrosList}
                      styles={customStyles}
                      value={selectedOption}
                      onChange={selected => handleSelectCustomer(selected)}
                    />

                  </div>
                </Col>
                <Col xs={12} md={3}>
                  <div className="d-inline">
                    <Button variant="link" onClick={() => toggleAddCustomer()}>
                      <i className="fas fa-plus-circle" />{" Add New Customer"}
                    </Button>
                    {isAddCustomerOpen && <AddcustomerFomr />}
                  </div>
                </Col>

              </Row>
            </form> : ""}
          <div>{renderStep(currentStep)}</div>
        </ModalBody>
        {filteredCustomerDetail.length != 0 && currentStep > 0 && currentStep < 3 && <ModalFooter>
          <Row className='backBtn' >
            <Col style={{ display: 'contents' }} ><Button className="btn btn-info" onClick={() => handlePrevious()}><span className="h5">Back</span></Button></Col>
            <Col style={{ display: 'contents' }}><Button className="btn btn-info" onClick={() => handleNext()}><span className="h5">Next</span></Button></Col>
          </Row>
        </ModalFooter>}

      </div>
      <ToastContainer />

    </Modal>
  )
}

ReportDefaulterModule.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default ReportDefaulterModule
