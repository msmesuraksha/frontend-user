import React, { useState, useCallback } from "react"
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

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
import Select from "react-select"
import moment from "moment"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import { recoredPaymentReportDefault } from "../../../store/debtors/debtors.actions"
import { recordPaymentReportDefaulter } from "store/debtors/debtors.selecter"


import Dropzone from 'react-dropzone'
import { useDropzone } from 'react-dropzone'

import { DragDropModule } from "./multifileUpload";


const MarkDisputedMadal = props => {

  const { isOpen, toggle, selected, setIsOpenmark, submitCheckRqust1, } = props

  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch()
  }, [])

  const [amount, setAmount] = useState('')
  const [diffrenceAmount, setdiffrenceAmount] = useState('')
  const [discription, setdiscription] = useState('')
  const [date, setDate] = useState('')
  const [payentMode, setPaymentMode] = useState('')
  const [attachment, setAttachment] = useState({})
  const [ifsc, setIfsc] = useState('')
  const [bankName, setBankName] = useState('')
  const [caAttachment, setCaAttachment] = useState({})
  const [remark, setRemark] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountTransactionID, setAccountTransactionID] = useState('')

  const [amountValid, setAmountValid] = useState(false)
  const [payMentDateValid, setpayMentDateValid] = useState(false)
  const [payMentModeValid, setpayMentModeValid] = useState(false)
  const [attachmentValid, setAttachmentValid] = useState(false)
  const [attachmentCAValid, setAttachmentCAValid] = useState(false)

  const [accountNumberValid, setaccountNumberValid] = useState(false)
  const [accountTransactionValid, setaccountTransactionValid] = useState(false)

  const [checkAmount, setCheckAmount] = useState(false)

  const handleFileChange = (event, fieldName,) => {
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


    axios.post('https://msmesuraksha-backend.azurewebsites.net/api/files/upload', formData, {
      headers: headers
    })
      .then((response) => {
        if (response.data.response.fieldName == "recordPayment") {
          setAttachment(response.data.response)

        }
        if (response.data.response.fieldName == "caVerLedger") {
          setCaAttachment(response.data.response)
        }
        toast.success("File Upload Successfully")
      })
      .catch((error) => {

      })
  }

  const handleSubmit = () => {

    const size = Object.keys(attachment).length;
    const size2 = Object.keys(caAttachment).length;
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

    if (size > 0) {
      setAttachmentValid(false)
    } else {
      setAttachmentValid(true)
    }
    if (size2 > 0) {
      setAttachmentCAValid(false)
    } else {
      setAttachmentCAValid(true)
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


    let today = moment();

    const dummyPayload = [{
      "defaulterEntryId": selected.id,
      "amtPaid": selected.totalAmount,
      "requestor": "DEBTOR",
      "paymentDate": moment(today).format("DD-MM-YYYY"),
      "paymentMode": "",
      "transactionId": "",
      "chequeNumber": "",
      "bankAccNumber": "",
      "ifsc": "",
      "bankName": "",
      "attachments": [],
      "isDispute": true,
      "disputeType": "DISPUTE_TYPE1",
      "debtorcacertificate": "",
      "otherDisputeReasons": [],
      "debtorRemarks": discription,
      "supportingDocuments": [],

      "totalAmtAsPerDebtor": diffrenceAmount,
      "disputedInvoiceSupportingDocuments": dataa
    }]














    console.log("DUMMMMMMMMMM", dummyPayload)



    const payload = [
      {
        "defaulterEntryId": selected.id,
        "amtPaid": amount,
        "requestor": "DEBTOR", // CREDITOR/DEBTOR
        "paymentDate": date,
        "paymentMode": payentMode,
        "transactionId": accountTransactionID,
        "chequeNumber": "",
        "bankAccNumber": accountNumber,
        "ifsc": ifsc,
        "bankName": bankName,
        "attachments": [attachment.documentId],
        "debtorRemarks": remark,

        // if disputing a transaction
        "isDispute": true, // make this flag as true whenever recording payment for a disputed transaction,
        "disputeType": "DISPUTE_TYPE1",// values = DISPUTE_TYPE1,DISPUTE_TYPE2, DISPUTE_TYPE3

        // if DISPUTE_TYPE1, DISPUTE_TYPE2 
        "debtorcacertificate": caAttachment.documentId !== undefined ? caAttachment.documentId : '',
        "supportingDocuments": ""// this field stores the document id of "Upload CA Verified GST Input Credit Report"
      }

    ]

    if (diffrenceAmount != '') {
      dispatch(recoredPaymentReportDefault(dummyPayload[0]))
      submitCheckRqust1(true)
      setAmount('')
      setDate('')
      setPaymentMode('')
      setAttachment('')
      setCaAttachment('')
      setRemark('')
      setAccountNumber('')
      setAccountTransactionID('')
      toggle()
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

  const [dataa, setDatas] = useState([])

  useState(() => {
    const newInvoice = selected.invoices?.map((item, index) => {
      return {
        "invoiceId": item?._id,
        "isCheckedForSupportingDocs": false,
        "documents": []
      }
    })
    console.log("selected", newInvoice);
    setDatas(newInvoice)
  }, [selected])

  const handleCheckBoxclicked = (value, index) => {

    const newData = dataa.map((item, i) => {
      if (i === index) {
        return { ...item, isCheckedForSupportingDocs: value };
      }
      return item;
    });
    setDatas(newData)

  }

  const invoiceSupportingDocsDocument = (arry, index) => {

    const newData = dataa.map((item, i) => {
      if (i === index) {
        return { ...item, documents: arry };
      }
      return item;
    });
    setDatas(newData)

  }

  const [submitCheck, setSubmitCheck] = useState([])

  useEffect(() => {
    const checkSubmit = dataa.map(value => {
      return value.documents
    })

    setSubmitCheck(checkSubmit.flat())


  }, [dataa])

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
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Disputed amount is less than that claimed by seller</ModalHeader>

        <ModalBody>
          <Row className="selectionListss" style={{ fontSize: "14px" }}>
            <Col md={11}>
              <Card className="mb-3 ">
                <CardBody className="buyer-card-body">
                  <Row className="selectionListss">
                    <Col md={4}>
                      <div className="mb-2"><b className="mt-2" >    Total due amount :</b></div>
                    </Col>
                    <Col md={6}>
                      <div className="d-inline">
                        <b>{numberFormat(selected.totalAmount)}</b>

                      </div>
                    </Col>
                  </Row>

                  <Row className="selectionListss">
                    <Col md={4}>
                      <div className="mb-2"><b className="mt-2">    Difference amount as per your claim :</b></div>
                    </Col>
                    <Col md={6}>
                      <div className="d-inline">
                        <label
                          className="visually-hidden custom-content"
                          htmlFor="customerSelect"
                        >

                        </label>
                        <Input
                          type="number"
                          id="amount"
                          style={{ width: '300px' }}
                          name="amount"
                          value={diffrenceAmount}
                          onChange={(e) => setdiffrenceAmount(e.target.value)}
                          placeholder="Difference amount "
                        />

                      </div>
                    </Col>
                  </Row>
                  <div className="mt-2"> <strong>List of Invoices</strong></div>

                  {selected != undefined ? (
                    selected.invoices?.map((item, index) => <div key={index}><DragDropModule item={item} index={index} handleCheckBoxclicked={handleCheckBoxclicked} invoiceSupportingDocsDocument={invoiceSupportingDocsDocument} /></div>)
                  ) : (
                    <div>No data available</div>
                  )}







                  <Row className="selectionListss">
                    <Col md={9}>
                      <div className="mb-2"><b className="mt-2">Description for your claim</b></div>
                    </Col>
                    <Col md={12}>
                      <div className="d-inline">

                        <Input
                          type="textarea"
                          style={{ height: "100px" }}
                          id="customerEmail"
                          name="customerEmail"
                          value={discription}
                          onChange={(e) => setdiscription(e.target.value)}
                          placeholder="Description"
                        />

                      </div>
                    </Col>
                  </Row>






                </CardBody>
              </Card>


            </Col>

          </Row>









          {/* <Row>
            <Col md="6" className="">
              <Card className="mb-3">
                <CardBody className="buyer-card-body">
                  <h4>Record Payment</h4>
                  <form>
                    <Row className="selectionListss">
                      <Col md={5}>
                        <div className="mb-2"><b className="mt-2">Seller Name<span style={{ color: 'red' }}>*</span></b></div>
                      </Col>
                      <Col md={6}>
                        <div className="d-inline">
                          <label
                            className="visually-hidden custom-content"
                            htmlFor="customerSelect"
                          >
                            Customer Name
                          </label>
                          <Input
                            type="text"
                            id="customerEmail"
                            name="customerEmail"
                            value={selected.creditor != undefined ? selected.creditor.companyName : ""}
                            disabled


                            placeholder="Amount Paid"
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row className="selectionListss">
                      <Col md={5}>
                        <div className="mb-2"><b className="mt-2">Amount<span style={{ color: 'red' }}>*</span></b></div>
                      </Col>
                      <Col md={6}>
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
                            autoComplete="off"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Amount Paid"
                          />
                          {amountValid && <p className="text-danger" style={{ fontSize: '11px' }}>Please Enter Amount</p>}
                          {checkAmount && <p className="text-danger" style={{ fontSize: '11px' }}>Please Enter Valid Amount</p>}
                        </div>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "-5px" }}>
                      <Col md={5}>
                      </Col>
                      <Col md={6}>
                        <div className="d-inline">
                          <Input type="checkbox" className="" style={checkboxStyle} onClick={() => setAmount(selected.totalAmount + '')} />
                          <span>Full amount ({numberFormat(selected.totalAmount)})</span>
                        </div>
                      </Col>
                    </Row>
                    <Row className="selectionListss">
                      <Col md={5}>
                        <div className="mb-2"><b className="mt-2">Payment Date<span style={{ color: 'red' }}>*</span></b></div>
                      </Col>
                      <Col md={6}>
                        <div className="d-inline">
                          <label
                            className="visually-hidden custom-content"
                            htmlFor="customerSelect"
                          >
                            Select Customer
                          </label>
                       
                          <InputGroup>
                            <Flatpickr
                              className="form-control d-block"
                              placeholder="Select Date"
                              options={{
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
                        {payMentDateValid && <p className="text-danger" style={{ fontSize: '11px' }}>Please Select Payment Date</p>}
                      </Col>
                    </Row>
                    <Row className="selectionListss">
                      <Col md={5}>
                        <div className="mb-2"><b className="mt-2">Payment Mode<span style={{ color: 'red' }}>*</span></b></div>
                      </Col>
                      <Col md={6}>
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
                          {payMentModeValid && <p className="text-danger" style={{ fontSize: '11px' }}>Please Select Payment Mode</p>}
                        </div>
                      </Col>
                    </Row>
                    {payentMode == 'BANK_TRANSFER' &&
                      <>
                        <Row className="selectionListss">
                          <Col md={5}>
                            <div className="mb-2"><b className="mt-2">Bank Account No<span style={{ color: 'red' }}>*</span></b></div>
                          </Col>
                          <Col md={6}>
                            <div className="d-inline">

                              <Input
                                type="number"
                                id="bankaccount"
                                name="bankaccount"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                placeholder="Bank Account Number"
                              />
                              {accountNumberValid && <p className="text-danger" style={{ fontSize: '11px' }}>Please Fill Bank Account Number</p>}
                            </div>
                          </Col>
                        </Row>
                        <Row className="selectionListss">
                          <Col md={5}>
                            <div className="mb-2"><b className="mt-2">Bank Name<span style={{ color: 'red' }}>*</span></b></div>
                          </Col>
                          <Col md={6}>
                            <div className="d-inline">

                              <Input
                                type="text"
                                id="bankaccountname"
                                name="bankaccountname"
                                value={bankName}
                                onChange={(e) => setBankName(e.target.value)}
                                placeholder="Please Enter Bank Name"
                              />
                              {accountTransactionValid && <p className="text-danger" style={{ fontSize: '11px' }}>Please Enter Bank Name</p>}
                            </div>
                          </Col>
                          <Col md={3}>

                          </Col>
                        </Row>
                        <Row className="selectionListss">
                          <Col md={5}>
                            <div className="mb-2"><b className="mt-2">IFSC No</b></div>
                          </Col>
                          <Col md={6}>
                            <div className="d-inline">

                              <Input
                                type="text"
                                id="ifsc"
                                name="ifsc"
                                value={ifsc}
                                onChange={(e) => setIfsc(e.target.value)}
                                placeholder="IFSC Code"
                              />
                            </div>
                          </Col>
                          <Col md={3}>

                          </Col>
                        </Row>
                        <Row className="selectionListss">
                          <Col md={5}>
                            <div className="mb-2"><b className="mt-2">Transaction ID<span style={{ color: 'red' }}>*</span></b></div>
                          </Col>
                          <Col md={6}>
                            <div className="d-inline">

                              <Input
                                type="text"
                                id="tansactionid"
                                name="tansactionid"
                                value={accountTransactionID}
                                onChange={(e) => setAccountTransactionID(e.target.value)}
                                placeholder="Transaction ID"
                              />

                            </div>
                          </Col>
                        </Row>
                      </>
                    }


                    <Row className="selectionListss">
                      <Col md={5}>
                        <div className="mb-2"><b className="mt-2">Attachment<span style={{ color: 'red' }}>*</span></b></div>
                      </Col>
                      <Col md={6}>
                        <div className="d-inline">
                          <label
                            className="visually-hidden custom-content"
                            htmlFor="customerSelect"
                          >
                            Select Customer
                          </label>
                          <InputGroup className="text-capitalize">
                            <input
                              type="file"
                              className="form-control"
                              id=""
                              accept=".pdf, .doc, xls, xlsx,  .png, .jpg, .jpeg"
                              aria-describedby="fileUploadHelp"
                              onChange={e =>
                                handleFileChange(e, "recordPayment")
                              }
                            />
                          </InputGroup>
                          {attachmentValid && <p className="text-danger" style={{ fontSize: '11px' }}>Please Upload Attachment</p>}
                          <div id="fileUploadHelp" className="form-text">
                            Choose a file to upload (PDF, PNG, JPG, JPEG, DOC, XLS, XLSX).
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="selectionListss">
                      <Col md={5}>
                        <div className="mb-2"><b className="mt-2">Remarks</b></div>
                      </Col>
                      <Col md={6}>
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
                    </Row>

                  </form>

                </CardBody>
              </Card>
            </Col>
            <Col md="6" className="mt-4">
              <Card className="mb-3">
                <CardBody className="buyer-card-body">
                  <h4>Upload CA Verified ledger</h4>
                  <Row className="mt-4 mb-4">

                    <Col md={8}>


                      <InputGroup className="text-capitalize">
                        <input
                          type="file"
                          className="form-control"
                          id="uploadPurchaseOrder"
                          accept=".pdf, .doc, xls, xlsx,  .png, .jpg, .jpeg"
                          aria-describedby="fileUploadHelp"
                          onChange={e =>
                            handleFileChange(e, "caVerLedger")
                          }
                        />
                      </InputGroup>
                      {attachmentCAValid && <p className="text-danger" style={{ fontSize: '11px' }}>Please Upload Upload CA Verified ledger</p>}
                      <div id="fileUploadHelp" className="form-text">
                        Choose a file to upload (PDF, PNG, JPG, JPEG, DOC, XLS, XLSX).
                      </div>
                    </Col>

                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row> */}
        </ModalBody>
        <ModalFooter>
          <Button disabled={submitCheck.length > 0 ? false : true} type="button" color="primary" onClick={() => handleSubmit(true)}>
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


MarkDisputedMadal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default MarkDisputedMadal
