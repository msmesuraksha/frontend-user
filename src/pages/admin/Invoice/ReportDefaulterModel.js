import React, { useState } from "react"
import PropTypes from "prop-types"
import axios from "axios";

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

  Table,
  Row, Col
} from "reactstrap"
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
import Select from "react-select"
import moment from "moment"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import { recoredPaymentReportDefault, getAllInvoice } from "../../../store/debtors/debtors.actions"
import { recordPaymentReportDefaulter } from "store/debtors/debtors.selecter"

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

import { RecordPaymentSubmit } from './recordPaymentPop'

const ReportedDefaulterModel = props => {
  const [selectedOption, setSelectedOption] = useState("")

  const [isProceed, setisProceed] = useState(false)
  const { isOpen, toggle, selected, requestor, name } = props
  const dispatch = useDispatch()
  const colourStyles = {
    menuList: styles => ({
      ...styles,
      background: '#FFFFFF'
    })

  }
  const Recordedpyment = useSelector(recordPaymentReportDefaulter)
  const checkboxStyle = {
    border: '2px solid #3498db', // Set the border color (change #3498db to your desired color)
    borderRadius: '4px', // Optional: Add rounded corners for a nicer look
    padding: '5px', // Optional: Add padding to the checkbox
    marginRight: '5px', // Optional: Add some spacing between the checkbox and label
  };
  const [salutations, setsalutations] = useState([
    { label: "Cash", value: "CASH" },

    { label: "Bank Transfer", value: "BANK_TRANSFER" },
    { label: "Cheque Payment", value: "CHEQUE_PAYMENT" },

  ])

  useEffect(() => {
    // dispatch()
  }, [])
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [payentMode, setPaymentMode] = useState('')
  const [attachment, setAttachment] = useState({})
  const [remark, setRemark] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [ifsc, setIfsc] = useState('')
  const [bankName, setBankName] = useState('')
  const [accountTransactionID, setAccountTransactionID] = useState('')

  const [chequeNo, setChequeNo] = useState('')
  const [checkCheque, setCheckCheque] = useState('')

  const [chequePhoto, setChequePhoto] = useState('')

  const [beneficiaryBankName, setBeneficiaryBankName] = useState('')










  const [amountValid, setAmountValid] = useState(false)
  const [payMentDateValid, setpayMentDateValid] = useState(false)
  const [payMentModeValid, setpayMentModeValid] = useState(false)


  const [accountNumberValid, setaccountNumberValid] = useState(false)
  const [accountTransactionValid, setaccountTransactionValid] = useState(false)

  const [checkAmount, setCheckAmount] = useState(false)




  const handleFileChange = (event, fieldName) => {
    const files = event.target.files
    const formData = new FormData();

    formData.append('file', files[0]);   //append the values with key, value pair
    formData.append('fieldName', fieldName);


    uploadFile(formData)


  }

  function uploadFile(formData) {

    const token = sessionStorage.getItem("tokenemployeeRegister")
    const headers = {
      'x-access-token': token != null ? token : '',
    };


    axios.post('https://bafana-backend.azurewebsites.net/api/files/upload', formData, {
      headers: headers
    })
      .then((response) => {
        if (response.data.response.fieldName == "attachment") {
          setAttachment(response.data.response)
          toast.success("File Upload Successfully")
        }

        if (response.data.response.fieldName == "cheque_photo") {
          setChequePhoto(response.data.response)
          toast.success("File Upload Successfully")
        }

      })
      .catch((error) => {


      })
  }


  const handleSubmit = () => {

    if (amount.length > 0) {
      setAmountValid(false)
    } else {
      setAmountValid(true)
    }

    if (date.length > 0) {
      setpayMentDateValid(false)
    } else {
      setpayMentDateValid(true)
    }

    if (payentMode.length > 0) {
      setpayMentModeValid(false)
    } else {
      setpayMentModeValid(true)
    }



    if (payentMode == "BANK_TRANSFER") {
      if (accountNumber.length > 0) {
        setaccountNumberValid(false)
      } else {
        setaccountNumberValid(true)
      }

      if (bankName.length > 0) {
        setaccountTransactionValid(false)
      } else {
        setaccountTransactionValid(true)
      }

      if (accountNumber.length == 0 || bankName.length == 0) return

    }

    if (payentMode == "CHEQUE_PAYMENT") {
      if (chequeNo.length > 0) {
        setCheckCheque(false)
      } else {
        setCheckCheque(true)

      }

      if (bankName.length > 0) {
        setaccountTransactionValid(false)
      } else {
        setaccountTransactionValid(true)
      }

      if (chequeNo.length == 0 || bankName.length == 0) return
    }

    const inputAmount = Number(amount)
    const fullAmount = Number(selected.totalAmount)

    if (inputAmount > 0) {
      if (inputAmount > fullAmount) {
        setCheckAmount(true)
        return
      } else {
        setCheckAmount(false)
      }
    }

    const dummyPayload = [{
      "defaulterEntryId": selected.id,
      "amtPaid": amount,
      "requestor": requestor, // CREDITOR/DEBTOR
      "paymentDate": date,
      "paymentMode": payentMode,
      "transactionId": accountTransactionID,
      "ifsc": ifsc,
      "bankName": bankName,

      "chequeNumber": chequeNo,
      "bankAccNumber": accountNumber,
      "attachments": [attachment.documentId],


      // if disputing a transaction
      "isDispute": false, // make this flag as true whenever recording payment for a disputed transaction,
      "disputeType": "",// values = DISPUTE_TYPE1,DISPUTE_TYPE2, DISPUTE_TYPE3

      // if DISPUTE_TYPE1, DISPUTE_TYPE2 
      "debtorcacertificate": "", // this field stores the document id of "Upload CA Verified GST Input Credit Report"

      //if DISPUTE_TYPE1,DISPUTE_TYPE3
      "debtorRemarks": remark,
      "supportingDocuments": [],
      "otherDisputeReasons": [],
      "totalAmtAsPerDebtor": "",
      "disputedInvoiceSupportingDocuments": []
    }]



    if (amount !== '' && date !== '' && payentMode !== '') {


      dispatch(recoredPaymentReportDefault(dummyPayload[0]))
      toast.success("Record Payment Successfully")
      setAmount('')
      setDate('')
      setPaymentMode('')
      setAttachment('')
      setRemark('')
      setAccountNumber('')
      setAccountTransactionID('')

      if (requestor == 'DEBTOR') {
        togglePopupIsOpen()
      } else {
        setTimeout(() => {
          dispatch(getAllInvoice());
        }, 1000);
        toggle()
      }


    }

  }
  const handleDateChange = (value) => {
    const Dates = moment(value[0]).format("DD-MM-YYYY")
    setDate(Dates)
  };
  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);

  const today = new Date();

  const disableFutureDates = (date) => {
    return date > today;
  };
  // console.log("selectedselectedselectedselected",selected)

  const [popupIsOpen, setPopupIsOpen] = useState(false)

  const togglePopupIsOpen = () => setPopupIsOpen(!popupIsOpen)

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="lg"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-content">
        {popupIsOpen && < RecordPaymentSubmit isOpen={popupIsOpen} toggle={togglePopupIsOpen} />}
        <ModalHeader toggle={toggle}><b>Record A Payment</b></ModalHeader>

        <ModalBody>

          <form>
            <Row className="selectionListss ">
              <Col md={3}>
                <div className="mb-2"><b className="mt-2">{name} Name<span style={{ color: 'red' }}>*</span></b></div>
              </Col>
              <Col md={5}>
                <div className="d-inline">
                  <label
                    className="visually-hidden custom-content "
                    htmlFor="customerSelect"
                  >
                    Customer Name
                  </label>
                  <Input
                    type="text"
                    id="customerEmail"
                    name="customerEmail"
                    className="text-capitalize"
                    value={requestor == 'DEBTOR' ? selected?.creditor?.companyName : selected?.debtor?.companyName}
                    disabled


                    placeholder="Seller Name"
                  />
                </div>
              </Col>
              <Col md={3}>

              </Col>

            </Row>

            <Row className="selectionListss">
              <Col md={3}>
                <div className="mb-2"><b className="mt-2">Amount<span style={{ color: 'red' }}>*</span></b></div>
              </Col>
              <Col md={5}>
                <div className="d-inline">
                  <label
                    className="visually-hidden custom-content"
                    htmlFor="customerSelect"
                  >
                    Select Customer
                  </label>

                  <Input
                    type="number"
                    id="customerEmail"
                    name="customerEmail"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount Paid"
                    autoComplete="off"
                  />
                  {amountValid && <p className="text-danger " style={{ fontSize: '11px' }}>Please enter amount</p>}
                  {checkAmount && <p className="text-danger " style={{ fontSize: '11px' }}>Please enter valid amount</p>}

                </div>
              </Col>
              <Col md={3}>

              </Col>

            </Row>
            <Row style={{ marginTop: "-5px" }}>
              <Col md={3}>
              </Col>
              <Col md={5}>
                <div className="d-inline">

                  <Input type="checkbox" className="" style={checkboxStyle} onClick={() => setAmount(selected.totalAmount + '')} />

                  <span>Full amount ({numberFormat(selected.totalAmount)})</span>
                </div>
              </Col>
              <Col md={3}>

              </Col>
            </Row>

            <Row className="selectionListss">
              <Col md={3}>
                <div className="mb-2"><b className="mt-2">Payment Date<span style={{ color: 'red' }}>*</span></b></div>
              </Col>
              <Col md={5}>
                <div className="d-inline">
                  <label
                    className="visually-hidden custom-content"
                    htmlFor="customerSelect"
                  >
                    Select Customer
                  </label>

                  {/*                   <DatePicker
                    selected={new Date()}
                    value={date}
                    onChange={(date) =>
                      handleDateChange(date)
                    }

                    dateFormat="dd-MMM-yyyy" // Format to display year, month, and day
                    className="form-control custom-content"

                  /> */}
                  <InputGroup>
                    <Flatpickr
                      className="form-control d-block"
                      // value={data[index].date == '' ? new Date() : data[index].date}
                      placeholder="Select Date"
                      options={{
                        /*  altInput: true, */
                        altFormat: "F j, Y",
                        dateFormat: "d-m-Y",
                        disable: [
                          disableFutureDates
                        ]
                      }}
                      onChange={(date) =>
                        handleDateChange(date)
                      }
                    />
                  </InputGroup>
                </div>
                {payMentDateValid && <p className="text-danger " style={{ fontSize: '11px' }}>Please select payment date</p>}

              </Col>
              <Col md={3}>

              </Col>

            </Row>

            <Row className="selectionListss">
              <Col md={3}>
                <div className="mb-2"><b className="mt-2">Payment Mode<span style={{ color: 'red' }}>*</span></b></div>
              </Col>
              <Col md={5}>
                <div className="d-inline">
                  <label
                    className="visually-hidden custom-content"
                    htmlFor="customerSelect"
                  >
                    Select Customer
                  </label>

                  <Select
                    id="primaryContact"
                    className="custom-content"
                    options={salutations}
                    styles={colourStyles}
                    onChange={selected => setPaymentMode(selected.value)}
                    placeholder="Cash"
                  />
                  {payMentModeValid && <p className="text-danger " style={{ fontSize: '11px' }}>Please select payment mode</p>}

                </div>
              </Col>
              <Col md={3}>

              </Col>

            </Row>






            {payentMode == "BANK_TRANSFER" ?
              <>
                <Row className="selectionListss">
                  <Col md={3}>
                    <div className="mb-2"><b className="mt-2">Bank Account No<span style={{ color: 'red' }}>*</span></b></div>
                  </Col>
                  <Col md={5}>
                    <div className="d-inline">

                      <Input
                        type="number"
                        id="bankaccount"
                        name="bankaccount"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        placeholder="Bank Account Number"
                      />
                      {accountNumberValid && <p className="text-danger " style={{ fontSize: '11px' }}>Please fill bank account number</p>}
                    </div>
                  </Col>
                  <Col md={3}>

                  </Col>
                </Row>
                <Row className="selectionListss">
                  <Col md={3}>
                    <div className="mb-2"><b className="mt-2">Bank Name<span style={{ color: 'red' }}>*</span> </b></div>
                  </Col>
                  <Col md={5}>
                    <div className="d-inline">

                      <Input
                        type="text"
                        id="bankaccountname"
                        name="bankaccountname"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="Please Enter Bank Name"
                        autoComplete="off"
                      />
                      {accountTransactionValid && <p className="text-danger " style={{ fontSize: '11px' }}>Please Enter Bank Name</p>}
                    </div>
                  </Col>
                  <Col md={3}>

                  </Col>
                </Row>
                <Row className="selectionListss">
                  <Col md={3}>
                    <div className="mb-2"><b className="mt-2">IFSC No</b></div>
                  </Col>
                  <Col md={5}>
                    <div className="d-inline">

                      <Input
                        type="text"
                        id="bankaccount"
                        name="bankaccount"
                        value={ifsc}
                        onChange={(e) => setIfsc(e.target.value)}
                        placeholder="IFSC Code"
                        autoComplete="off"
                      />

                    </div>
                  </Col>
                  <Col md={3}>

                  </Col>
                </Row>
                <Row className="selectionListss">
                  <Col md={3}>
                    <div className="mb-2"><b className="mt-2">Transaction ID</b></div>
                  </Col>
                  <Col md={5}>
                    <div className="d-inline">

                      <Input
                        type="text"
                        id="tansactionid"
                        name="tansactionid"
                        value={accountTransactionID}
                        onChange={(e) => setAccountTransactionID(e.target.value)}
                        placeholder="Transaction ID"
                        autoComplete="off"
                      />

                    </div>
                  </Col>
                  <Col md={3}>

                  </Col>
                </Row>
              </>
              : ""}

            {payentMode == "CHEQUE_PAYMENT" ?
              <>
                <Row className="selectionListss">
                  <Col md={3}>
                    <div className="mb-2"><b className="mt-2">Cheque No.<span style={{ color: 'red' }}>*</span></b></div>
                  </Col>
                  <Col md={5}>
                    <div className="d-inline">

                      <Input
                        type="number"
                        id="chequeNo"
                        name="chequeNo"
                        value={chequeNo}
                        onChange={(e) => setChequeNo(e.target.value)}
                        placeholder="Cheque Number"
                      />
                      {checkCheque && <p className="text-danger " style={{ fontSize: '11px' }}>Please fill cheque number</p>}
                    </div>
                  </Col>
                  <Col md={3}>

                  </Col>
                </Row>
                {/* <Row className="selectionListss">
                  <Col md={3}>
                    <div className="mb-2"><b className="mt-2">Cheque Photo</b></div>
                  </Col>
                  <Col md={5}>
                    <div className="d-inline">
                      <label
                        className="visually-hidden custom-content"
                        htmlFor="customerSelect"
                      >
                        Select Customer
                      </label>
                      <InputGroup className="">
                        <input
                          type="file"
                          className="form-control"
                          id=""
                          accept=".png, .jpg, .jpeg"
                          aria-describedby="fileUploadHelp"
                          onChange={e =>
                            handleFileChange(e, "cheque_photo")
                          }
                        />
                      </InputGroup>

                    </div>
                  </Col>
                  <Col md={3}>

                  </Col>

                </Row> */}
                <Row className="selectionListss">
                  <Col md={3}>
                    <div className="mb-2"><b className="mt-2">Beneficiary Bank Name<span style={{ color: 'red' }}>*</span></b></div>
                  </Col>
                  <Col md={5}>
                    <div className="d-inline">

                      <Input
                        type="text"
                        id="beneficiaryBankName"
                        name="beneficiaryBankName"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="Please Enter Bank Name"
                        autoComplete="off"
                      />
                      {accountTransactionValid && <p className="text-danger " style={{ fontSize: '11px' }}>Please Enter Bank Name</p>}

                    </div>
                  </Col>
                  <Col md={3}>

                  </Col>
                </Row>
              </>
              : ""}
            <Row className="selectionListss">
              <Col md={3}>
                <div className="mb-2"><b className="mt-2">Attachment / Cheque Photo</b></div>
              </Col>
              <Col md={5}>
                <div className="d-inline">
                  <label
                    className="visually-hidden custom-content"
                    htmlFor="customerSelect"
                  >
                    Select Customer
                  </label>
                  <InputGroup className="">
                    <input
                      type="file"
                      className="form-control"
                      id=""
                      accept=".pdf, .doc, xls, xlsx, .png, .jpg, .jpeg"
                      aria-describedby="fileUploadHelp"
                      onChange={e =>
                        handleFileChange(e, "attachment")
                      }
                    />
                  </InputGroup>

                </div>
              </Col>
              <Col md={3}>

              </Col>

            </Row>


            <Row className="selectionListss">
              <Col md={3}>
                <div className="mb-2"><b className="mt-2">Remarks</b></div>
              </Col>
              <Col md={5}>
                <div className="d-inline">

                  <Input
                    type="textarea"
                    id="customerEmail"
                    name="customerEmail"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="Remarks"
                  />

                </div>
              </Col>
              <Col md={3}>

              </Col>

            </Row>
          </form>



        </ModalBody>
        <ModalFooter>
          <Button type="button" color="primary" onClick={() => handleSubmit(true)}>
            Submit
          </Button>

          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </div>
      <ToastContainer />

    </Modal>
  )
}

ReportedDefaulterModel.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default ReportedDefaulterModel
