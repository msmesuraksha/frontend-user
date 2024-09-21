import React, { useState } from "react"
import PropTypes, { number } from "prop-types"
import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import './style.css'
import {
    Button,
    InputGroup,
    Input,
    Label,
    Card,
    CardBody,
    Row, Col
} from "reactstrap"


import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import 'react-calendar/dist/Calendar.css';
import './style.css';
import { toast } from 'react-toastify';
import { useEffect } from "react";
import * as moment from "moment";

import 'react-datepicker/dist/react-datepicker.css';
import { addInvoiceBillSuccess } from '../../../store/actions'
import { numberFormat } from "../uploadPendingDoucument/uploadPendingDoc";
import { BuyerDetailsModule } from "./buyerDetailsModule";

export const InvoiceDetailsModule = ({ filteredCustomerDetail, selectedOption, isChangedCustomername, handleNext, data, setData, newPayload, setNewPayload, generateUniqueId }) => {

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
                debtorId: selectedOption.value,
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
                purchaseOrderDocument: selectedData.purchaseOrderDocument ? selectedData.purchaseOrderDocument.documentId : '',
                challanDocument: selectedData.DispatchDocument ? selectedData.DispatchDocument.documentId : '',
                invoiceDocument: selectedData.invoiceDocument ? selectedData.invoiceDocument.documentId : '',
                transportationDocument: selectedData.DeliveryDocument ? selectedData.DeliveryDocument.documentId : ''
            };

        })

        console.log('newPayload', newPayload);
        console.log('newPayload3', newData);
        console.log('newPayload2', data);

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
        const newData = [...data];
        newData[index].amount = value; // Update the amount at the specified index

        const parsedAmount = parseFloat(newData[index].amount); // Parse the amount to a float

        if (!isNaN(parsedAmount)) {
            newData[index].amount = parsedAmount; // Format the amount to 2 decimal places if it's a valid number
        } else {
            newData[index].amount = ""; // Set amount to empty string if it's not a valid number
        }

        setData(newData);
        calculateSubtotal(data); // Update the state with the modified data array
    };


    const addFaqsRow = () => {

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
                if (response.data.response.fieldName == "uploadInvoice") {
                    const newData = [...data]
                    const responses = response.data.response
                    newData[index].invoiceDocument = { ...responses, folderName }
                    setData(newData)
                }
                if (response.data.response.fieldName == "uploadPurchaseOrder") {
                    const newData = [...data]
                    const responses = response.data.response
                    newData[index].purchaseOrderDocument = { ...responses, folderName }
                    setData(newData)
                }
                if (response.data.response.fieldName == "uploadchallanDispatchDocument") {
                    const newData = [...data]
                    const responses = response.data.response
                    newData[index].DispatchDocument = { ...responses, folderName }
                    setData(newData)
                }
                if (response.data.response.fieldName == "uploadTransportationDocumentDeliveryReceipt~`") {
                    const newData = [...data]
                    const responses = response.data.response
                    newData[index].DeliveryDocument = { ...responses, folderName }
                    setData(newData)
                }
                if (response.data.response.fieldName == "generalDocuments") {
                    const newData = [...data]
                    const responses = response.data.response
                    newData[index].generalDocuments = { ...responses, folderName }
                    setData(newData)
                }
                if (response.data.response.fieldName == "GSTDocument") {
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

    const today = new Date();

    const disableFutureDates = (date) => {
        return date > today;
    };


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

    return (
        <div className="" >
            {filteredCustomerDetail.length != 0 && <BuyerDetailsModule filteredCustomerDetail={filteredCustomerDetail} />}
            <Row className="tableRow ">
                {isChangedCustomername != true ?
                    ''
                    :
                    <Row className="Dragtable mt-3">
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
                                                            value={data[index].date === '' ? null : data[index].date}
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
                                <Button className="btn btn-info" onClick={addFaqsRow}>Add Another Invoice</Button>
                            </Col>
                        </Row>
                        <Row className="text-end mt-3">
                            <Col md={12}>
                                <h5> <div> Total Amount = {numberFormat(total)}</div>
                                </h5>
                            </Col>
                        </Row>
                    </Row>
                }
            </Row>
            <Row className={'nextBtn'} >
                <Col md={1}>
                    <Button className="btn w-100 btn-info" onClick={() => CreatePayload()}><span className="h5">Next</span></Button>
                </Col>

            </Row>
        </div>
    )
}


