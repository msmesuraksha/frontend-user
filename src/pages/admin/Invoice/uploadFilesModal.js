import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import moment from 'moment'
import axios from "axios";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  InputGroup,
  Row, Col
} from "reactstrap"
import { updatePendingDocumentss, getAllInvoice } from "../../../store/debtors/debtors.actions"
import { updatePendingDocsSelector } from "store/debtors/debtors.selecter"
import { useSelector, useDispatch } from "react-redux"
import fileImg1 from '../../../assets/images/newImg/png-file-.png'
import fileImg2 from '../../../assets/images/newImg/pdf.png'
import fileImg3 from '../../../assets/images/newImg/jpg-icon.png'
import fileImg4 from '../../../assets/images/newImg/jpeg.png'
import fileImg5 from '../../../assets/images/newImg/doc-icon.png'
import fileImg6 from '../../../assets/images/newImg/xls.png'
import fileImg7 from '../../../assets/images/newImg/xlsx.png'

import { numberFormat } from "../uploadPendingDoucument/uploadPendingDoc";

import { DocumentViewModule } from "../documentViewer.js/documentView";

import { pdfImgType } from "../reportDefaulterModule/pdfImgType";

export const ImageIcons = {
  'png': fileImg1,
  'pdf': fileImg2,
  'jpg': fileImg3,
  'jpeg': fileImg4,
  'doc': fileImg5,
  'xls': fileImg6,
  'xlsx': fileImg7,
}


const UploadPendingFiles = props => {
  const { isOpen, toggle, uploadFilesModelDataForUpload } = props
  const [uploadTransportId, setuploadTransportId] = useState('')
  const [uploadpurchaseId, setuploadpurchaseId] = useState('')
  const [uploadInvoiceId, setuploadInvoiceId] = useState('')
  const [uploadChallanId, setuploadChallanId] = useState('')
  const updatePendingDocs = useSelector(updatePendingDocsSelector)


  const handleFileChange = (event, fieldName, index) => {
    const files = event.target.files
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('fieldName', fieldName);
    uploadFile(formData, index)
  }


  function uploadFile(formData, index) {
    const token = sessionStorage.getItem("tokenemployeeRegister")
    const headers = {
      'x-access-token': token != null ? token : '',
    };

    axios.post('https://msmesuraksha-backend.azurewebsites.net/api/files/upload', formData, {
      headers: headers
    })
      .then((response) => {
        if (response.data.response.fieldName == "uploadInvoice") {
          setuploadInvoiceId(response.data.response)
        }
        if (response.data.response.fieldName == "uploadPurchaseOrder") {
          setuploadpurchaseId(response.data.response)
        }
        if (response.data.response.fieldName == "uploadchallanDispatchDocument") {
          setuploadChallanId(response.data.response)
        }
        if (response.data.response.fieldName == "uploadTransportationDocumentDeliveryReceipt~`") {
          setuploadTransportId(response.data.response)
        }
      })
      .catch((error) => {
      })
  }

  const dispatch = useDispatch()

  const handleSubmit = (item) => {

    const payload = {
      "invoiceId": item._id,
      "purchaseOrderDocument": uploadpurchaseId != "" ? uploadpurchaseId.documentId : item.purchaseOrderDocument?._id || '',
      "challanDocument": uploadChallanId != "" ? uploadChallanId.documentId : item.challanDocument?._id || '',
      "invoiceDocument": uploadInvoiceId != "" ? uploadInvoiceId.documentId : item.invoiceDocument?._id || '',
      "transportationDocument": uploadTransportId != "" ? uploadTransportId.documentId : item.transportationDocument?._id || '',
    }

    dispatch(updatePendingDocumentss(payload))

    setTimeout(() => {
      dispatch(getAllInvoice());
    }, 1000)
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
          <ModalHeader toggle={toggle}>Upload Pending Files</ModalHeader>

          <ModalBody>

            {uploadFilesModelDataForUpload?.invoices?.map((item) => {

              return <Row className="bg-light p-3 mt-2" key={item}>
                <Row>
                  <Col md={3}>Invoice Number : {item.invoiceNumber}</Col>
                  <Col md={3}>Due Date : {moment(item.dueDate).format("DD-MM-YYYY")}</Col>
                  <Col md={4}><span className="d-flex">Due Amount : {numberFormat(item.remainingAmount)}</span></Col>
                  <Col md={2}>

                  </Col>

                </Row>


                <Row className="mt-4">
                  {
                    item.invoiceDocument == null ?
                      <Col md={3}>
                        <Col className="d-flex justify-content-center ">
                          <b>Invoice Document</b>
                        </Col>
                        <Col md={12} className='pt-2'>
                          <InputGroup className="text-capitalize">
                            <input
                              type="file"
                              className="form-control"
                              id="uploadInvoice"
                              accept=".pdf, .doc, xls, xlsx, .png, .jpg, .jpeg"

                              aria-describedby="fileUploadHelp"
                              onChange={e =>
                                handleFileChange(e, "uploadInvoice")
                              }
                            />
                          </InputGroup>
                        </Col>
                      </Col>
                      :
                      <Col md={2} className="text-center" style={{ marginLeft: '-15px' }}>
                        <Col className="d-flex justify-content-center">
                          <b>Invoice Document</b>
                        </Col>
                        <Col className='pt-2'>
                          <img src={pdfImgType(item.invoiceDocument)} className="iconsImage" style={{ cursor: 'pointer' }} onClick={() => documentView(item.invoiceDocument)} />

                        </Col>

                      </Col>
                  }


                  {item.challanDocument == null ?
                    <Col md={3}>

                      <Col className="d-flex justify-content-center ">
                        <b>Dispatch Document</b>
                      </Col>
                      <Col md={12} className='pt-2'>

                        <InputGroup className="text-capitalize">
                          <input
                            type="file"
                            className="form-control"
                            id="uploadPurchaseOrder"
                            accept=".pdf, .doc, xls, xlsx, .png, .jpg, .jpeg"
                            aria-describedby="uploadchallanDispatchDocument"
                            onChange={e =>
                              handleFileChange(e, "uploadchallanDispatchDocument")
                            }
                          />
                        </InputGroup>
                      </Col>



                    </Col>
                    :

                    <Col md={2} className="text-center">
                      <Col className="d-flex justify-content-center">
                        <b>Dispatch Document</b>
                      </Col>
                      <Col className='pt-2'>
                        <img src={pdfImgType(item.challanDocument)} className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(item.challanDocument)} />
                      </Col>

                    </Col>
                  }

                  {item.transportationDocument == null ?


                    <Col md={3}>
                      <Col className="d-flex justify-content-center ">
                        <b>Transportation Document</b>
                      </Col>
                      <Col md={12} className='pt-2'>
                        <InputGroup className="text-capitalize">
                          <input
                            type="file"
                            className="form-control"
                            id="uploadPurchaseOrder"
                            accept=".pdf, .doc, xls, xlsx, .png, .jpg, .jpeg"

                            aria-describedby="uploadTransportationDocumentDeliveryReceipt~`"
                            onChange={e =>
                              handleFileChange(e, "uploadTransportationDocumentDeliveryReceipt~`")
                            }
                          />
                        </InputGroup>
                      </Col>



                    </Col>
                    :
                    <Col md={2} className="text-center">
                      <Col className="d-flex justify-content-center">
                        <b>Transportation Document</b>
                      </Col>
                      <Col className='pt-2'>
                        <img src={pdfImgType(item.transportationDocument)} className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(item.transportationDocument)} />
                      </Col>

                    </Col>

                  }

                  {item.purchaseOrderDocument == null ?


                    <Col md={3}>
                      <Col className="d-flex justify-content-center">
                        <b>Purchase Order</b>
                      </Col>
                      <Col md={12} className='pt-2'>
                        <InputGroup className="text-capitalize">
                          <input
                            type="file"
                            className="form-control"
                            id="uploadPurchaseOrder"
                            accept=".pdf, .doc, xls, xlsx, .png, .jpg, .jpeg"

                            aria-describedby="uploadPurchaseOrder"
                            onChange={e =>
                              handleFileChange(e, "uploadPurchaseOrder")
                            }
                          />
                        </InputGroup>
                      </Col>


                    </Col>
                    :
                    <Col md={2} className="text-center">
                      <Col className="d-flex justify-content-center">
                        <b>Purchase Order</b>
                      </Col>
                      <Col className='pt-2'>
                        <img src={pdfImgType(item.purchaseOrderDocument)} className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(item.purchaseOrderDocument)} />
                      </Col>

                    </Col>
                  }
                </Row>


                <Row className="mt-3">
                  <Col md={10}></Col>
                  <Col md={2} className="text-end">
                    <Button className="btn btn-info" onClick={() => handleSubmit(item)}>Submit</Button>

                  </Col>
                </Row>
              </Row>
            })}
          </ModalBody>
        </div>
      </Modal>

    </>

  )
}

UploadPendingFiles.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default UploadPendingFiles
