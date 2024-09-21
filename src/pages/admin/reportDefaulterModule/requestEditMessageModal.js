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
import { toast } from 'react-toastify';


import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

import { useEffect } from "react";
import { getAllDebtors } from '../../../store/debtors/debtors.actions'

import * as moment from "moment";

import 'react-datepicker/dist/react-datepicker.css';

import { addInvoiceBillSuccess } from '../../../store/actions'

import { numberFormat } from "../uploadPendingDoucument/uploadPendingDoc";

import { requestInvoiceDefEdit } from "../../../store/debtors/debtors.actions";
import { BuyerDetailsModule } from "./buyerDetailsModule";


export const EditReportedDefaulterModel = props => {
  const { filteredCustomerDetail, setfilteredCustomerDetail, requestedData, handleNext, setNewPayload, data, setData } = props

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(addInvoiceBillSuccess())
  }, [])


  const [allInvoiceList, setallInvoiceList] = useState([])

  const [faqsRow, setFaqsRow] = useState(1)

  const [total, setTotal] = useState(0)




  const calculateSubtotal = newData => {
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
    }

    setNewPayload(newData)
    handleNext()

  }


  const handleItemDetailChange = (index, value) => {

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



  const removeFaqsRow = index => {

    const newData = data.filter((value, i) => i != index)
    const newDatas = allInvoiceList.filter((value, i) => i != index)
    setData(newData)

    setallInvoiceList(newDatas)
    setFaqsRow(faqsRow - 1)
    calculateSubtotal(newData)
    return newData
  }

  const handleDateChange = (value, index) => {
    const newData = [...data]
    newData[index].date = moment(value[0]).format("DD-MM-YYYY")
    setData(newData)


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

        if (response.data.response.fieldName == "uploadInvoice") {

          // setuploadInvoiceId(response.data.response)
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
    <div>
      {filteredCustomerDetail.length != 0 && <BuyerDetailsModule filteredCustomerDetail={filteredCustomerDetail} />}

      <Row className="tableRow">

        <Row className=" mt-3">
          {data.map((row, index) => {

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

      <Row>
        <Col md={10}></Col>
        <Col md={2} className="text-end">

          {requestedData.status != "DRAFT" ? '' : <Button className="btn  btn-info" onClick={() => CreatePayload()}
          /* disabled={isDisabled == true} */
          ><span className="h5">Next</span></Button>}


        </Col>
      </Row>

    </div>
  )
}


