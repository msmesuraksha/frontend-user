import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

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
import './style.css'
import moment from "moment";
import { setConfirmReportDefaultModal, setPreviewModalOpen } from "../../../store/debtors/debtors.actions"
import { confirReportDefaultModel, ReportDefPreviewModal } from "store/debtors/debtors.selecter"
import ConfirmReportModal from './ConfirmReportDefaulterModal'
import { selectReportDefPreviwData } from "store/ReportDefulterPreview/ReportDefulterPreview.selecter";
import { fetchReportDefulterPreviewStart } from "store/ReportDefulterPreview/ReportDefulterPreview.action";
import noFile from '../../../assets/images/newImg/no-document.png'
import pdfImg from '../../../assets/images/newImg/pdf.png'
import jpgImg from '../../../assets/images/newImg/png-file-.png'
import { numberFormat } from "../uploadPendingDoucument/uploadPendingDoc";

import { DocumentViewModule } from "../documentViewer.js/documentView";

import { ImageIcons } from "./uploadFilesModal";


const ReportDefPreviewModals = props => {
  const { isOpen, toggle, selected, filteredCustomerDetail, feedbackdataPaylod, allInvoiceList, dataForPreview, feedbackQuestion, moduleName, defaulterId } = props
  const allInvoiceListForPreview = allInvoiceList[0] != undefined ? allInvoiceList[0].allInvoiceListForPreview : []
  const Integrity = 1
  const dispatch = useDispatch()
  const isConfirmModalOpen = useSelector(confirReportDefaultModel)
  const ReportDefulterPreviewData = useSelector(selectReportDefPreviwData)
  const toggleViewModal = () => dispatch(setConfirmReportDefaultModal(!confirReportDefaultModel));

  const [isChecked, setIsChecked] = useState(false);
  const [previeww, setprevieww] = useState([]);
  let cindex = 0
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  /*  useEffect(() => {
     dispatch(fetchReportDefulterPreviewStart())
   }, []) */

  const handleFeedbackModal = () => {
    dispatch(setConfirmReportDefaultModal(!isConfirmModalOpen))
  }
  const PDF = "https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf"

  useEffect(() => {
    if (!isConfirmModalOpen) {
      setIsChecked(false)


    }
    setprevieww(
      feedbackdataPaylod.sort((a, b) => a['indexno'] - b['indexno'])

    )
  }, [isConfirmModalOpen])
  const uniqueArray = [...new Set(previeww)];

  const [documentViewOpen, setDocumentViewOpen] = useState(false)
  const [currentUrl, setCurrentUrl] = useState({})

  const toggleDocumentView = () => setDocumentViewOpen(!documentViewOpen)

  const documentView = (value) => {
    setCurrentUrl(value)
    toggleDocumentView()
  }




  return (
    <>
      {documentViewOpen && <DocumentViewModule isOpen={documentViewOpen} toggle={toggleDocumentView} currentUrl={currentUrl} moduleName={'preview'} />}
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
          <ModalHeader toggle={toggle}><b style={{ fontSize: '18px' }}>Report Defaulter Preview</b></ModalHeader>
          {isConfirmModalOpen && <ConfirmReportModal isOpen={isConfirmModalOpen} toggle={toggleViewModal} filteredCustomerDetail={filteredCustomerDetail} feedbackdataPaylod={feedbackdataPaylod} allInvoiceLists={allInvoiceList} setIsChecked={setIsChecked} isChecked={isChecked} handleCheckboxChange={handleCheckboxChange} feedbackQuestion={feedbackQuestion} moduleName={moduleName} defaulterId={defaulterId} />}

          <ModalBody className="bg-light">
            <Row className="px-3">
              <Row className="">
                <Col md={7}>

                  <div className="mb-2"><b className="" style={{ fontSize: '15px' }}>Buyer Detail :</b></div>

                  <Label className="text-capitalize">
                    <b>  Name :</b> {filteredCustomerDetail.companyName}
                  </Label><br />
                  <Label className="text-capitalize">

                    <b> Address :</b> {filteredCustomerDetail.address1 != '' ? filteredCustomerDetail.address1 + "," : ''} {filteredCustomerDetail.address2 != '' ? filteredCustomerDetail.address2 + "," : ''} {filteredCustomerDetail.city != '' ? filteredCustomerDetail.city + "," : ''} {filteredCustomerDetail.state != '' ? filteredCustomerDetail.state + ", " : ''}{filteredCustomerDetail.zipcode}
                  </Label><br />
                  <Label className="text-capitalize">
                    <b>  Mobile (Primary) : </b>{filteredCustomerDetail.customerMobile}
                  </Label><br />
                  <Label className="text-capitalize">
                    <b>  Mobile (Secondary) : </b>{filteredCustomerDetail.secCustomerMobile != undefined && filteredCustomerDetail.secCustomerMobile != null ? filteredCustomerDetail.secCustomerMobile : ''}
                  </Label><br />
                  <Label /* className="text-capitalize" */>
                    <b>  Email :</b> {filteredCustomerDetail.customerEmail}
                  </Label><br />

                  <Label className="text-capitalize">
                    <b> GST Number : </b>{filteredCustomerDetail.gstin}
                  </Label><br />

                  <Label className="text-capitalize">
                    <b> PAN Number :</b> {filteredCustomerDetail.companyPan}
                  </Label>
                </Col>
                <Col md={5}>
                </Col>

              </Row>
              <div className="mb-3 mt-3"><b style={{ fontSize: '15px' }}>Invoice Detail</b></div>

              {dataForPreview !== undefined ? (
                dataForPreview.map((item, index) => {
                  let currentImg1 = ''

                  for (const key in ImageIcons) {
                    const currentUrlArr = item.invoiceDocument?.fileUrl?.split('.');
                    if (currentUrlArr == undefined) break
                    if (key === currentUrlArr[currentUrlArr?.length - 1]) {
                      currentImg1 = ImageIcons[key];
                      break;
                    }
                  }

                  let currentImg2 = ''

                  for (const key in ImageIcons) {
                    const currentUrlArr = item.challanDocument?.fileUrl?.split('.');
                    if (currentUrlArr == undefined) break
                    if (key === currentUrlArr[currentUrlArr?.length - 1]) {
                      currentImg2 = ImageIcons[key];
                      break;
                    }
                  }

                  let currentImg3 = ''

                  for (const key in ImageIcons) {
                    const currentUrlArr = item.transportationDocument?.fileUrl?.split('.');
                    if (currentUrlArr == undefined) break
                    if (key === currentUrlArr[currentUrlArr?.length - 1]) {
                      currentImg3 = ImageIcons[key];
                      break;
                    }
                  }

                  let currentImg4 = ''

                  for (const key in ImageIcons) {
                    const currentUrlArr = item.purchaseOrderDocument?.fileUrl?.split('.');
                    if (currentUrlArr == undefined) break
                    if (key === currentUrlArr[currentUrlArr?.length - 1]) {
                      currentImg4 = ImageIcons[key];
                      break;
                    }
                  }

                  return (
                    <div className="bg-white p-3 mt-2" key={index}>
                      <Row>
                        <Col md={3}>
                          <span>{index + 1}. Invoice Number : {item.itemDetail}</span>
                        </Col>
                        <Col md={3}>
                          <span>Due Date : {item.date}</span>
                        </Col>
                        <Col md={3}>
                          <span>Due Amount : {numberFormat(item.amount)}</span>
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col md={3}>
                          <Row>
                            <Col md={8} className="d-flex align-items-end">
                              <span>Invoice Document</span>
                            </Col>
                            <Col md={4}>
                              {item.invoiceDocument && item.invoiceDocument !== '' ? (
                                /*   <a href={item.invoiceDocument.fileUrl} rel="noreferrer" target="_blank">
                                    <img src={pdfImg} alt="PDF" className="iconsImage shadow" />
                                  </a> */
                                <img src={currentImg1} alt="PDF" className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(item.invoiceDocument)} />
                              ) : (
                                <i className="bx bxs-file" style={{ fontSize: '40px' }}></i>
                              )}
                            </Col>
                          </Row>
                        </Col>
                        <Col md={3}>
                          <Row>
                            <Col md={8} className="d-flex align-items-end">
                              <span>Dispatch Document</span>
                            </Col>
                            <Col md={4}>
                              {item.DispatchDocument && item.DispatchDocument !== '' ? (
                                < img src={currentImg2} alt="PDF" className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(item.DispatchDocument)} />
                              ) : (
                                <i className="bx bxs-file" style={{ fontSize: '40px' }}></i>
                              )}
                            </Col>
                          </Row>
                        </Col>
                        <Col md={3}>
                          <Row>
                            <Col md={8} className="d-flex align-items-end">
                              <span>Transportation Document</span>
                            </Col>
                            <Col md={4}>
                              {item.DeliveryDocument && item.DeliveryDocument !== '' ? (

                                < img src={currentImg3} alt="PDF" className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(item.DeliveryDocument)} />
                              ) : (
                                <i className="bx bxs-file" style={{ fontSize: '40px' }}></i>
                              )}
                            </Col>
                          </Row>
                        </Col>
                        <Col md={3}>
                          <Row>
                            <Col md={8} className="d-flex align-items-end">
                              <span>Purchase Document</span>
                            </Col>
                            <Col md={4}>
                              {item.purchaseOrderDocument && item.purchaseOrderDocument !== '' ? (
                                < img src={currentImg4} alt="PDF" className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(item.purchaseOrderDocument)} />
                              ) : (
                                <i className="bx bxs-file" style={{ fontSize: '40px' }}></i>
                              )}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  )

                })
              ) : (
                <div>No data available</div>
              )}

              <table className="table table-bordered mt-3">
                <thead className="table-primary">
                  <tr>
                    <th scope="col" className="col-md-8">Customer Feedback</th>
                    <th scope="col" className="col-md-4">Response</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbackdataPaylod != undefined && feedbackdataPaylod.length > 0 ? (
                    feedbackdataPaylod.filter((item) => item.questionType !== "RATING").map((item, index) => {
                      return <tr key={item}>
                        <td>{index + 1}. {item.questionDesc}</td>
                        <td>{item.response}</td>
                      </tr>
                    })
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center">No feedback available</td>
                    </tr>
                  )}
                </tbody>
              </table>


              {/* <table className="table" >
              <thead>
                <tr>
                  <th scope="col" className="col-md-8">Customer Feedback</th>
                </tr>
              </thead>
              
            </table> */}


              <div className="mb-3 "><b className="" style={{ fontSize: '15px' }}>Rating</b></div>

              {feedbackdataPaylod != undefined ?
                feedbackdataPaylod.filter((item) => item.questionType === "RATING").map((item, index) => {
                  let x = 0;
                  return (
                    <React.Fragment key={index}>
                      {item.questionType === "RATING" && (
                        <div className="mb-1">
                          <Row>
                            <Col md={8}>
                              <span className="mb-2" style={{ fontSize: '14px' }}>
                                {index + 1}.   {item.questionDesc}
                              </span>
                            </Col>
                            <Col md={3} className="d-flex justify-content-start align-items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <i
                                  key={star}
                                  className={item.response >= star ? 'bx bxs-star' : 'bx bx-star'}
                                  style={{
                                    color: item.response >= star ? '#ffdb4d' : 'gray',
                                    fontSize: '18px',
                                    width: '24px', // Set the width of the star icon
                                    height: '24px', // Set the height of the star icon
                                  }}
                                /* onClick={() => handleStarClick(index, star)} */
                                ></i>
                              ))}
                            </Col>
                          </Row>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })
                : ""
              }


              <Row>
              </Row>
            </Row>
          </ModalBody>

          <ModalFooter>
            <Button type="button" color="secondary" onClick={toggle}>
              Back
            </Button>
            <Button type="button" color="primary" onClick={() => handleFeedbackModal()}>
              Next
            </Button>

          </ModalFooter>
        </div>
        <ToastContainer />

      </Modal>
    </>



  )
}

ReportDefPreviewModals.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default ReportDefPreviewModals
