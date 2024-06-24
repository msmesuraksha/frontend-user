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
import moment from "moment"
import { numberFormat } from "../uploadPendingDoucument/uploadPendingDoc";
import { useEffect } from "react";
import { useDropzone } from 'react-dropzone'
import pdfImg from '../../../assets/images/newImg/pdf.png'

import { DocumentViewModule } from "../documentViewer.js/documentView";


export const DragDropModule = ({ item, index, handleCheckBoxclicked, uploadFile, invoiceSupportingDocsDocument }) => {

    const [uploadAdditionId, setuploadAdditionId] = useState([])

    const [checked, setChecked] = useState(false);
    const handleCheckboxChange = () => {
        setChecked(!checked, index);
    };

    useEffect(() => {
        handleCheckBoxclicked(checked, index);
    }, [checked])

    useEffect(() => {
        invoiceSupportingDocsDocument(uploadAdditionId, index)
    }, [uploadAdditionId])

    const checkboxStyle = {
        border: '2px solid #3498db',
        borderRadius: '4px',
        padding: '5px',
        marginRight: '5px',
    };

    const [uploadedDocs, setuploadedDocs] = useState([])
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            // setuploadedDocs(acceptedFiles)
            uploadedDocs.push(acceptedFiles[0])
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result

            }
            reader.readAsArrayBuffer(file)
        })

        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);   //append the values with key, value pair
        formData.append('fieldName', 'disputeType1Doucment')
        uploadFile(formData)

    }, [])

    const handleRemove = (item, inde) => {
        const index = uploadedDocs.indexOf(item);
        if (index > -1) { // only splice array when item is found
            uploadedDocs.splice(index, 1);
            const newData = [...uploadAdditionId]
            newData.splice(index, 1);
            setuploadAdditionId(newData)
        }
        return uploadedDocs
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop })


    function uploadFile(formData) {
        const token = sessionStorage.getItem("tokenemployeeRegister")
        const headers = {
            'x-access-token': token != null ? token : '',
        };


        axios.post('https://msmesuraksha-backend.azurewebsites.net/api/files/upload', formData, {
            headers: headers
        })
            .then((response) => {
                if (response.data.response.fieldName == "disputeType1Doucment") {
                    setuploadAdditionId((item) => [...item, response.data.response.documentId])
                }
                toast.success("File Upload Successfully")
            })
            .catch((error) => {

            })
    }

    const [documentViewOpen, setDocumentViewOpen] = useState(false)
    const [currentUrl, setCurrentUrl] = useState({})

    const toggleDocumentView = () => setDocumentViewOpen(!documentViewOpen)

    const documentView = (value) => {
        setCurrentUrl(value)
        toggleDocumentView()
    }

    return (
        <>
            {documentViewOpen && <DocumentViewModule isOpen={documentViewOpen} toggle={toggleDocumentView} currentUrl={currentUrl} />}
            <div className="bg-light  mt-2" style={{ color: '#000', border: "1px solid #8f9ca8" }}>
                <Row className=" p-3" >
                    <Col md={4}>
                        <Input type="checkbox" style={checkboxStyle} onChange={() => handleCheckboxChange()} /> &nbsp; &nbsp; &nbsp;
                        <span>{index + 1}.Invoice No. : {item.invoiceNumber}</span>
                    </Col>
                    <Col md={4}>
                        <span>Due Date : {moment(item.dueDate).format("DD-MM-YYYY")}</span>
                    </Col>
                    <Col md={4}>
                        <span>Due Amount : {numberFormat(item.subTotal)}</span>
                    </Col>

                </Row>
                <Row className="p-3">

                    <Col md={3} className="text-center">
                        <span>Invoice Document</span> &nbsp;&nbsp;&nbsp;
                        {item.invoiceDocument && item.invoiceDocument !== '' ? (


                            <img src={pdfImg} alt="PDF" className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(item.invoiceDocument)} />
                        ) : (
                            <i className="bx bxs-file" style={{ fontSize: '40px' }}></i>
                        )}
                    </Col>
                </Row>
                <Row className="p-3">
                    <Col md={12}>
                        <div className="d-inline ">

                            <div className="mb-2"><b className="mt-2">Attachments<span style={{ color: 'red' }}>*</span></b></div>

                            <div {...getRootProps()} style={{ border: "1px solid #e6e6e6" }} className="p-3  pt-4 pb-4 rounded text-center bg-white" >
                                <input {...getInputProps()} />
                                <i className='bx bxs-cloud-upload' style={{ fontSize: '30px' }}></i>
                                <p >Drag 'n' drop some files here, or click to select files</p>

                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className=" selectionListss p-3">

                    {uploadedDocs.length != 0 ? uploadedDocs.map((item, index) => {
                        return <Col md={3} key={item} ><Card className="shadow-lg p-2"><Row>
                            <Col md={10} >{item.name} </Col>
                            <Col md={2}>  <i className='bx bxs-trash text-danger mt-2' style={{ fontSize: '20px', cursor: "pointer" }} onClick={() => handleRemove(item, index)}></i></Col>
                        </Row></Card></Col>
                    }) : ""}
                </Row>


            </div>
        </>

    )
}