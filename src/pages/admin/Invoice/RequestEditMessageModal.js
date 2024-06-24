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
  Row, Col,
  ModalFooter
} from "reactstrap"
import { useFormik } from "formik"
import { ToastContainer, toast } from 'react-toastify';
import ReportedDebtorsModel from "./ReportedModel"

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

import { useEffect } from "react";
import { getAllDebtors } from '../../../store/debtors/debtors.actions'
import CurrencyFormat from 'react-currency-format';
import Select from "react-select"
import * as moment from "moment";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ConfirmReportModal from "./ConfirmReportDefaulterModal";
import { selectDebtorsList } from "store/debtors/debtors.selecter";
import { setIsCustomerFeedbackModalOpen, addInvoiceArray, } from "../../../store/debtors/debtors.actions"
import { selectFeedbackModalOpen, addInvoiceReportDebtorSelector, } from "store/debtors/debtors.selecter"
import { addInvoiceBillSuccess } from '../../../store/actions'
import { AddcustomerFomr } from "../AddCustomer/addCustomerForm";

import { SelectAddCustomer } from "store/addCustomer/addCustomer.selecter";
import { setAddCustomerOpen } from "store/addCustomer/addCustomer.actiontype"
import { numberFormat } from "../uploadPendingDoucument/uploadPendingDoc";

import { requestInvoiceDefEdit } from "../../../store/debtors/debtors.actions";

// import { hover } from "@testing-library/user-event/dist/types/convenience";
// import '../../../pages/Dashboard/users/send-bill-transaction/sendbilltransaction.scss'
const EditReportedDefaulterModel = props => {
  const [selectedOption, setSelectedOption] = useState("")
  const { isOpen, toggle, GetAllInvoice, requestedData } = props
  const [filteredInvoiceList, setfilteredInvoiceList] = useState([])
  const [debtorIdArrayForPreview, setdebtorIdArrayForPreview] = useState([])
  const isCustomerFeedbackModalOpen = useSelector(selectFeedbackModalOpen)
  const toggleViewModal1 = () => dispatch(setIsCustomerFeedbackModalOpen(!selectFeedbackModalOpen));



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
  const handleInputChange = inputValue => {
    // Handle input change here
  }
  const [totalValue, settotalValue] = useState([])
  const [showModal, setShowModal] = useState(false)
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  const [showConfirmModal, setshowConfirmModal] = useState(false)
  const handleConfirmClose = () => setshowConfirmModal(false)
  const handleConfirmshow = () => setshowConfirmModal(true)

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

  const getDebtrosList = getDebtrosLists(GetAllDebtors)



  useEffect(() => {
    dispatch(getAllDebtors());
    dispatch(addInvoiceBillSuccess())
    // window.location.reload()
  }, [])


  const [uploadTransportId, setuploadTransportId] = useState('')
  const [uploadpurchaseId, setuploadpurchaseId] = useState('')
  const [uploadInvoiceId, setuploadInvoiceId] = useState('')
  const [uploadChallanId, setuploadChallanId] = useState('')
  const [allInvoiceList, setallInvoiceList] = useState([])
  const [filteredCustomerDetail, setfilteredCustomerDetail] = useState([])
  const [isChangedCustomername, setisChangedCustomername] = useState(false)
  const [faqsRow, setFaqsRow] = useState(1)
  const [currenIndex, setCurrentIndex] = useState(0)
  const [isDisabled, setisDisabled] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null);
  const [total, setTotal] = useState(0)

  const invoiceStateValue = allInvoiceList

  const [data, setData] = useState([])


  const calculateSubtotal = newData => {
    // Calculate the subtotal

    let totleamount = 0

    newData.forEach((row, i) => {

      if (row.amount !== "") {
        const amountValue = parseFloat(row.amount)

        totleamount += amountValue
      }
      setTotal(totleamount)

    })


  }

  function getDocumentId(doc) {

    return doc != null && doc._id != undefined ? doc._id :
      doc != null && doc.documentId != undefined ? doc.documentId :
        '';
  }

  const submitInvoice = (setvalu) => {

    setCurrentIndex(setvalu + 1);
    calculateSubtotal(data);

    const date = moment();
    const selectedData = data[setvalu];
    const isRequiredFieldsFilled = selectedData.amount !== undefined &&
      selectedData.invoiceDocument !== undefined &&
      selectedData.itemDetail !== undefined &&
      selectedData.amount !== "" &&
      selectedData.invoiceDocument !== "" &&
      selectedData.itemDetail !== "";

    const originalDate = selectedData.date;
    const [day, month, year] = originalDate.split('-');
    const convertedDate = `${year}-${month}-${day}`

    const createInvoiceObject = () => {
      return {
        debtorId: requestedData.debtor._id,
        billDate: date.format("YYYY-MM-DD"),
        billDescription: "Bill for things",
        billNumber: "",
        creditAmount: selectedData.amount !== undefined ? Number(selectedData.amount) : '',
        remainingAmount: selectedData.amount !== undefined ? Number(selectedData.amount) : '',
        status: "OPEN",
        interestRate: "",
        creditLimitDays: "",
        remark: "",
        items: [],
        subTotal: selectedData.amount !== undefined ? selectedData.amount : '',
        tax: "",
        referenceNumber: '',
        invoiceNumber: selectedData.itemDetail !== undefined ? selectedData.itemDetail : '',
        dueDate: selectedData.date ? convertedDate : date.format("YYYY-MM-DD"),
        percentage: "",
        purchaseOrderDocument: getDocumentId(selectedData.purchaseOrderDocument),
        challanDocument: getDocumentId(selectedData.DispatchDocument),
        invoiceDocument: getDocumentId(selectedData.invoiceDocument),
        transportationDocument: getDocumentId(selectedData.DeliveryDocument),
      };
    };


    if (allInvoiceList.length > 0) {
      const findIndex = data.findIndex((x) => x.id === selectedData.id);
      if (findIndex !== -1) {
        allInvoiceList[findIndex] = createInvoiceObject();
        toast.success("Invoice Added Successfully");
      } else {
        if (isRequiredFieldsFilled) {
          setallInvoiceList((items) => [...items, createInvoiceObject()]);
          setisDisabled(false);
          toast.success("Invoice Added Successfully");
        } else {
          toast.error("Please Fill All Required Fields");
        }
      }
    } else {
      if (isRequiredFieldsFilled) {
        setallInvoiceList((items) => [...items, createInvoiceObject()]);
        setisDisabled(false);
        toast.success("Invoice Added Successfully");
      } else {
        toast.error("Please Fill All Required Fields");
      }
    }
  };


  const [newPayload, setNewPayload] = useState([])

  const CreatePayload = () => {

    const newData = data.map((selectedData, index) => {
      const isRequiredFieldsFilled = selectedData.amount !== undefined &&
        selectedData.invoiceDocument !== undefined &&
        selectedData.itemDetail !== undefined &&
        selectedData.amount !== "" &&
        selectedData.invoiceDocument !== "" &&
        selectedData.itemDetail !== "";

      if (!isRequiredFieldsFilled) return

      const date = moment();

      const originalDate = selectedData.date;
      const [day, month, year] = originalDate.split('-');
      const convertedDate = `${year}-${month}-${day}`

      return {
        debtorId: requestedData.debtor._id,
        billDate: date.format("YYYY-MM-DD"),
        billDescription: "Bill for things",
        billNumber: "",
        creditAmount: selectedData.amount !== undefined ? Number(selectedData.amount) : '',
        remainingAmount: selectedData.amount !== undefined ? Number(selectedData.amount) : '',
        status: "OPEN",
        interestRate: "",
        creditLimitDays: "",
        remark: "",
        items: [],
        subTotal: selectedData.amount !== undefined ? selectedData.amount : '',
        tax: "",
        referenceNumber: '',
        invoiceNumber: selectedData.itemDetail !== undefined ? selectedData.itemDetail : '',
        dueDate: selectedData.date ? convertedDate : date.format("YYYY-MM-DD"),
        percentage: "",
        purchaseOrderDocument: getDocumentId(selectedData.purchaseOrderDocument),
        challanDocument: getDocumentId(selectedData.DispatchDocument),
        invoiceDocument: getDocumentId(selectedData.invoiceDocument),
        transportationDocument: getDocumentId(selectedData.DeliveryDocument),
      }

    })

    if (newData.includes(undefined)) {
      toast.error("Please Fill All Required Fields");
      return
    } else {
      toast.success("Invoice Added Successfully");
    }

    setNewPayload(newData)
    dispatch(setIsCustomerFeedbackModalOpen(!isCustomerFeedbackModalOpen))

  }



  const TotalDebtorPayment = (item) => {
    if (item != undefined) {
      settotalValue(item.remainingAmount)
    }
  }
  const handleFilterInvoiceList = (item) => {
    var filteredArrays = []
    filteredArrays = GetAllInvoice.filter(value => value.debtorId == item.value)
    if (filteredArrays[0] != undefined) {
      setfilteredInvoiceList([filteredArrays[0]])
    }
    else {
      setfilteredInvoiceList(undefined)

    }
  }


  const handleSelectCustomer = (item) => {

    setisChangedCustomername(true)
    settotalValue([])
    setSelectedOption(item)

    var filteredArray = []
    filteredArray = GetAllDebtors.filter((value) => value.id == item.value)
    setfilteredCustomerDetail(filteredArray[0])

    handleFilterInvoiceList(item)
  }


  const handleItemDetailChange = (index, value) => {
    setCurrentIndex(index)


    /*  const newData = [...data]
     newData[index].itemDetail = value */

    const newData = data.map((item, i) => {
      if (i === index) {
        return { ...item, itemDetail: value };
      }
      return item;
    });
    setData(newData)
  }
  const handleAmountChange = (index, value) => {
    const newData = [...data]; // Create a copy of the original data array
    newData[index].amount = value; // Update the amount at the specified index

    const parsedAmount = parseFloat(newData[index].amount); // Parse the amount to a float

    if (!isNaN(parsedAmount)) {
      newData[index].amount = parsedAmount; // Format the amount to 2 decimal places if it's a valid number
    } else {
      newData[index].amount = ""; // Set amount to empty string if it's not a valid number
    }

    setData(newData);
    calculateSubtotal(newData)
    // Update the state with the modified data array
  };


  const addFaqsRow = () => {
    setisDisabled(true)
    // Check if any of the previous row's fields are empty
    const lastIndex = data.length - 1
    const lastRow = data[lastIndex]

    if (
      lastRow.itemDetail === "" ||
      lastRow.date === "" ||
      lastRow.amount === ""
    ) {
      setTimeout(() => {
      }, 3000)
      // Exit without adding a new row
    }


    setFaqsRow(faqsRow + 1)
    setData([
      ...data,
      {
        id: generateUniqueId(),
        itemDetail: "",
        date: "",
        amount: 0,
        invoiceDocument: "",
        DispatchDocument: "",
        DeliveryDocument: "",
        generalDocuments: "",
        purchaseOrderDocument: "",
        GSTDocument: ""

      },
    ])
  }
  const handleFeedbackModal = () => {
    // dispatch(addInvoiceArray(debtorIdArrayForPreview))
    let checkValue = false

    if (allInvoiceList.length == 0) {
      toast.error("Please Save Invoices")
      return
    }

    data.forEach((value) => {
      if (value.itemDetail == "" || value.invoiceDocument == undefined || value.amount == 0) {
        toast.error("Please Fill All Required Fields")
        checkValue = true
      }
    })

    if (allInvoiceList.length != data.length) {
      toast.error("Please Save all Invoices")
      return
    }

    if (!checkValue) {
      dispatch(setIsCustomerFeedbackModalOpen(!isCustomerFeedbackModalOpen))
    }
  }
  const removeFaqsRow = index => {

    /*  const newData = [...data] */
    /*   const newDatas = [...allInvoiceList]
      newData.splice(index, 1)
     newDatas.splice(index, 1) */
    const newData = data.filter((value, i) => i != index)
    const newDatas = allInvoiceList.filter((value, i) => i != index)
    setData(newData)
    setisDisabled(false)
    setallInvoiceList(newDatas)
    setFaqsRow(faqsRow - 1)
    calculateSubtotal(newData)
    return newData
  }

  const handleDateChange = (value, index) => {
    const newData = [...data]
    newData[index].date = moment(value[0]).format("DD-MM-YYYY")
    setData(newData)
    setSelectedDate(value)

  };

  const handleFileChange = (event, fieldName, index) => {
    let folderName = {}
    const files = event.target.files
    const formData = new FormData();
    formData.append('file', files[0]);
    if (files[0]) {
      folderName = files[0].name;
    }
    //append the values with key, value pair
    formData.append('fieldName', fieldName);
    uploadFile(formData, index, folderName)
  }

  function uploadFile(formData, index, folderName) {
    const token = sessionStorage.getItem("tokenemployeeRegister")
    const headers = {
      'x-access-token': token != null ? token : '',
    };


    axios.post('https://msmesuraksha-backend.azurewebsites.net/api/files/upload', formData, {
      headers: headers
    })
      .then((response) => {
        /* toast.success("file upload successfully") */
        // setisDisabled(false)
        if (response.data.response.fieldName == "uploadInvoice") {

          setuploadInvoiceId(response.data.response)
          const newData = [...data]
          const responses = response.data.response
          newData[index].invoiceDocument = { ...responses, folderName }
          setData(newData)
        }
        if (response.data.response.fieldName == "uploadPurchaseOrder") {
          // setuploadpurchaseId(response.data.response)
          const newData = [...data]
          const responses = response.data.response
          newData[index].purchaseOrderDocument = { ...responses, folderName }
          setData(newData)
        }
        if (response.data.response.fieldName == "uploadchallanDispatchDocument") {
          // setuploadChallanId(response.data.response)
          const newData = [...data]
          const responses = response.data.response
          newData[index].DispatchDocument = { ...responses, folderName }

          setData(newData)
        }
        if (response.data.response.fieldName == "uploadTransportationDocumentDeliveryReceipt~`") {
          // setuploadTransportId(response.data.response)
          const newData = [...data]
          const responses = response.data.response
          newData[index].DeliveryDocument = { ...responses, folderName }
          setData(newData)
        }
        if (response.data.response.fieldName == "generalDocuments") {
          // setuploadTransportId(response.data.response)
          const newData = [...data]
          const responses = response.data.response
          newData[index].generalDocuments = { ...responses, folderName }
          setData(newData)
        }
        if (response.data.response.fieldName == "GSTDocument") {
          // setuploadTransportId(response.data.response)
          const newData = [...data]
          const responses = response.data.response
          newData[index].GSTDocument = { ...responses, folderName }
          setData(newData)
        }
      })
      .catch((error) => {
        // toast.error({error})

      })
  }



  function setAllInvoice() {

    const editData = requestedData.invoices.map((item, index) => {

      const dateMoment = moment.utc(item.dueDate)
      return {
        id: generateUniqueId(),
        itemDetail: item.invoiceNumber,
        date: dateMoment.format('DD-MM-YYYY'),
        amount: item.remainingAmount,
        invoiceDocument: item.invoiceDocument,
        DispatchDocument: item.challanDocument,
        DeliveryDocument: item.transportationDocument,
        purchaseOrderDocument: item.purchaseOrderDocument,
        generalDocuments: "",
        GSTDocument: ""
      }
    })
    setData(editData)
    calculateSubtotal(editData)
  }

  function generateUniqueId() {
    const randomPart = Math.random().toString(36).substr(2, 5);
    const timestamp = new Date().getTime();
    const uniqueId = timestamp.toString(36) + randomPart;
    return uniqueId;
  }

  useEffect(() => {
    setAllInvoice(requestedData)
    setfilteredCustomerDetail(requestedData.debtor)
  }, [requestedData])




  const handleCancel = (name, index) => {

    const DeleteUpdate = data.map((value, number) => {
      if (index == number) {
        if ("invoiceDocument" == name) {
          value.invoiceDocument = ''
        }
        if ("DispatchDocument" == name) {
          value.DispatchDocument = ''
        }
        if ("DeliveryDocument" == name) {
          value.DeliveryDocument = ''
        }
        if ("purchaseOrderDocument" == name) {
          value.purchaseOrderDocument = ''
        }
        return value
      } else {
        return value
      }

    })

    setData(DeleteUpdate)
  }



  useEffect(() => {
    if (requestedData != '' && requestedData.status != "DRAFT") {
      debugger
      const payload = {
        "invoiceId": requestedData.invoices[0]._id
      }
      dispatch(requestInvoiceDefEdit(payload))
      toast.success("Edit Request Sent Successfully")
    }

  }, [requestedData])



  const today = new Date();

  const disableFutureDates = (date) => {
    return date > today;
  };

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
        <ModalHeader toggle={toggle} className="font-weight-bold" ><b style={{ fontSize: '18px' }}>Request Edit </b></ModalHeader>
        {isCustomerFeedbackModalOpen && <ReportedDebtorsModel isOpen={isCustomerFeedbackModalOpen} toggle={toggleViewModal1} filteredCustomerDetail={filteredCustomerDetail} allInvoiceList={newPayload} dataForPreview={data} debtorId={requestedData.debtor._id} moduleName={'editInvoice'} defaulterId={requestedData.id} />}
        <ModalBody className="" >




          {requestedData.status != "DRAFT" ? <div>
            <p>
              You will be notified when you are given access to edit the documents by email.
              For any queries please reach out to us on <a className="text-info">support@anandrishi.com</a>.
              <br />
              Please note the access will be available to you only for a period of 7 days
              during which your post status will be under process.
            </p>
          </div> :
            <div>
              {
                filteredCustomerDetail.length != 0 ? <Row >
                  <div className="mb-2" ><b className="" style={{ fontSize: '15px' }}>Buyer Details -</b></div>

                  <Label className="text-capitalize">
                    <b> Name : </b>{filteredCustomerDetail.companyName}
                  </Label>
                  <Label className="text-capitalize">
                    <b>Address :</b> {filteredCustomerDetail.address1 != '' ? filteredCustomerDetail.address1 + "," : ''} {filteredCustomerDetail.address2 != '' ? filteredCustomerDetail.address2 + "," : ''} {filteredCustomerDetail.city != '' ? filteredCustomerDetail.city + "," : ''} {filteredCustomerDetail.state != '' ? filteredCustomerDetail.state + "," : ''}{filteredCustomerDetail.zipcode}
                  </Label>
                  <Label className="text-capitalize">
                    <b> Mobile (Primary ) : </b>{filteredCustomerDetail.customerMobile}
                  </Label>
                  <Label className="text-capitalize">
                    <b> Mobile (Secondary ) : </b>{filteredCustomerDetail.secCustomerMobile != undefined && filteredCustomerDetail.secCustomerMobile != null ? filteredCustomerDetail.secCustomerMobile : ''}
                  </Label>
                  <Label className="text-capitalize">
                    <b>Email :</b> {filteredCustomerDetail.customerEmail}
                  </Label>

                  <Label className="text-capitalize">
                    <b> GST Number :</b> {filteredCustomerDetail.gstin}
                  </Label>
                  <Label className="text-capitalize">
                    <b>  PAN Number :</b> {filteredCustomerDetail.companyPan}
                  </Label>
                </Row> : ""}

              <Row className="tableRow">

                <Row className=" mt-3">
                  {data.map((row, index) => {
                    /* 
                     const filename = row?.invoiceDocument?.fileUrl?.split("-")[-1]
                
                     console.log('demo_check', filename); */


                    return (
                      <Row key={index}>

                        <Card className="shadow-lg AddiNVOICEcARD" >
                          <CardBody>
                            <Row  >
                              <Col md={4} className="p-2"><b>Invoice Number  <span className="text-danger">*</span></b></Col>
                              <Col md={4} className="p-2"><b>Invoice Date  <span className="text-danger">*</span></b></Col>
                              <Col md={4} className="p-2"><b>Due Amount  <span className="text-danger">*</span></b></Col>
                            </Row>
                            <Row className="">
                              <Col md={4} className="p-2">
                                <Input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter  Invoice Number"
                                  value={data[index].itemDetail}
                                  onChange={e =>
                                    handleItemDetailChange(index, e.target.value)
                                  }
                                />
                              </Col>

                              <Col md={4} className="p-2">
                                <InputGroup>
                                  <Flatpickr
                                    className="form-control d-block"
                                    value={data[index].date == '' ? new Date() : data[index].date}
                                    // placeholder="dd M,yyyy"
                                    options={{
                                      /*  altInput: true, */
                                      altFormat: "F j, Y",
                                      dateFormat: "d-m-Y",
                                      disable: [
                                        disableFutureDates
                                      ]
                                    }}
                                    onChange={(date) =>
                                      handleDateChange(date, index)
                                    }
                                  />
                                </InputGroup>
                              </Col>
                              <Col md={4} className="p-2">
                                <Input
                                  type="number"
                                  className="form-control"
                                  placeholder="Enter Due Amount"
                                  value={data[index].amount}
                                  onChange={e =>
                                    handleAmountChange(index, e.target.value)
                                  }
                                />
                              </Col>
                            </Row>
                            <Row className="">
                              <Col md={4} className="p-2">
                                <Label><strong>Invoice</strong> <span className="text-danger">*</span></Label>
                                {row.invoiceDocument != null && row.invoiceDocument != '' ? <>
                                  <Row>
                                    <Col md={5}>{row.invoiceDocument.name == undefined ? row.invoiceDocument.folderName : row.invoiceDocument.name}</Col>
                                    <Col md={6}> <button className="btn btn-sm btn-danger" onClick={() => handleCancel('invoiceDocument', index)}>Delete</button></Col>
                                  </Row>
                                </> : <InputGroup>
                                  <input
                                    type="file"
                                    className="form-control"
                                    id="uploadInvoice"
                                    accept=".pdf, .doc, xls, xlsx,  .png, .jpg, .jpeg"
                                    aria-describedby="fileUploadHelp"

                                    onChange={e =>
                                      handleFileChange(e, "uploadInvoice", index)
                                    }
                                  />
                                </InputGroup>}

                              </Col>
                              <Col md={4} className="p-2">
                                <Label> <strong>Challan / Dispatch Document</strong></Label>
                                {row.DispatchDocument != null && row.DispatchDocument != '' ? <>
                                  <Row>
                                    <Col md={5}>{row.DispatchDocument.name == undefined ? row.DispatchDocument.folderName : row.DispatchDocument.name}</Col>
                                    <Col md={6}> <button className="btn btn-sm btn-danger" onClick={() => handleCancel('DispatchDocument', index)}>Delete</button></Col>
                                  </Row>
                                </> : <InputGroup>
                                  <input
                                    type="file"
                                    className="form-control"
                                    id="uploadchallanDispatchDocument"
                                    accept=".pdf, .doc, xls, xlsx,  .png, .jpg, .jpeg"
                                    aria-describedby="fileUploadHelp"

                                    onChange={e =>
                                      handleFileChange(
                                        e,
                                        "uploadchallanDispatchDocument", index
                                      )
                                    }
                                  />
                                </InputGroup>}

                              </Col>
                              <Col md={4} className="p-2">
                                <Label> <strong>Delivery / Transportation Document</strong></Label>
                                {row.DeliveryDocument != null && row.DeliveryDocument != '' ? <>
                                  <Row>
                                    <Col md={5}>{row.DeliveryDocument.name == undefined ? row.DeliveryDocument.folderName : row.DeliveryDocument.name}</Col>
                                    <Col md={6}> <button className="btn btn-sm btn-danger" onClick={() => handleCancel('DeliveryDocument', index)}>Delete</button></Col>
                                  </Row>
                                </> : <InputGroup>
                                  <input
                                    type="file"
                                    className="form-control"
                                    id="uploadTransportationDocumentDeliveryReceipt"
                                    accept=".pdf, .doc, xls, xlsx,  .png, .jpg, .jpeg"
                                    aria-describedby="fileUploadHelp"

                                    onChange={e =>
                                      handleFileChange(
                                        e,
                                        "uploadTransportationDocumentDeliveryReceipt~`", index
                                      )
                                    }
                                  />
                                </InputGroup>}

                              </Col>
                            </Row>
                            <Row>
                              <Col md={4} className="p-2">
                                <Label><strong>Purchase Order Document</strong></Label>
                                {row.purchaseOrderDocument != null && row.purchaseOrderDocument != '' ? <>
                                  <Row>
                                    <Col md={5}>{row.purchaseOrderDocument.name == undefined ? row.purchaseOrderDocument.folderName : row.purchaseOrderDocument.name}</Col>
                                    <Col md={6}> <button className="btn btn-sm btn-danger" onClick={() => handleCancel('purchaseOrderDocument', index)}>Delete</button></Col>
                                  </Row>
                                </> : <InputGroup className="text-capitalize">
                                  <input
                                    type="file"
                                    className="form-control"
                                    id="uploadPurchaseOrder"
                                    accept=".pdf, .doc, xls, xlsx,  .png, .jpg, .jpeg"
                                    aria-describedby="fileUploadHelp"

                                    onChange={e =>
                                      handleFileChange(e, "uploadPurchaseOrder", index)
                                    }
                                  />
                                </InputGroup>}

                              </Col>
                              <Col md={4}></Col>
                              <Col md={4}></Col>
                              <Col md={4} className="p-2">
                              </Col>
                              <Col md={4} className="p-2">
                              </Col>
                              <Col md={4} className="p-2 text-end pt-4">
                                {/* <Button className="btn btn-info mt-2" onClick={() => submitInvoice(index)}>
                                  Save Invoice
                                </Button> &nbsp; */}
                                {index > 0 ? <Button className="btn btn-danger mt-2 " onClick={() => removeFaqsRow(index)}>
                                  Delete
                                </Button> : ''}
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Row>
                    )
                  })}

                  <Row>
                    <Col md={12} className="text-end">
                      <Button
                        className="btn btn-info"
                        onClick={addFaqsRow}
                      /* disabled={isDisabled == true} */
                      >
                        Add Another Invoice
                        {/* <span className="mdi mdi-plus icon-yellow"></span> */}
                      </Button>
                    </Col>
                  </Row>
                  <Row className="text-end mt-3">
                    <Col md={12}>
                      <h5> <div> Total Amount = {numberFormat(total)}</div>
                      </h5>
                    </Col>
                  </Row>
                </Row>
              </Row>

            </div>

          }
          <Row>
            <Col md={10}></Col>
            <Col md={2} className="text-end">

              {requestedData.status != "DRAFT" ? '' : <Button className="btn  btn-info" onClick={() => CreatePayload()}
              /* disabled={isDisabled == true} */
              ><span className="h5">Next</span></Button>}


            </Col>
          </Row>


        </ModalBody>


      </div>
      <ToastContainer />

    </Modal>
  )
}

EditReportedDefaulterModel.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default EditReportedDefaulterModel
