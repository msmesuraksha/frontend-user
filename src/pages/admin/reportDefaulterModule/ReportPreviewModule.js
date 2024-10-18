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

import { useEffect } from "react";
import './style.css'

import { setConfirmReportDefaultModal, } from "../../../store/debtors/debtors.actions"
import { confirReportDefaultModel, } from "store/debtors/debtors.selecter"

import { selectReportDefPreviwData } from "store/ReportDefulterPreview/ReportDefulterPreview.selecter";

import { numberFormat } from "../uploadPendingDoucument/uploadPendingDoc";

import { DocumentViewModule } from "../documentViewer.js/documentView";



import { pdfImgType } from "./pdfImgType";

import { BuyerDetailsModule } from "./buyerDetailsModule";


export const ReportDefPreviewModule = props => {

  const { filteredCustomerDetail, feedbackPreview, dataForPreview, } = props

  const Integrity = 1
  const dispatch = useDispatch()
  const isConfirmModalOpen = useSelector(confirReportDefaultModel)
  const ReportDefulterPreviewData = useSelector(selectReportDefPreviwData)
  const toggleViewModal = () => dispatch(setConfirmReportDefaultModal(!confirReportDefaultModel));


  const [previeww, setprevieww] = useState([]);
  let cindex = 0




  const handleFeedbackModal = () => {
    dispatch(setConfirmReportDefaultModal(!isConfirmModalOpen))
  }
  const PDF = "https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf"

  useEffect(() => {

    setprevieww(
      feedbackPreview.sort((a, b) => a['indexno'] - b['indexno'])

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
      <Row className="px-3">
        <BuyerDetailsModule filteredCustomerDetail={filteredCustomerDetail} />

        <div className="mb-3 mt-3"><b style={{ fontSize: '15px' }}>Invoice Detail</b></div>

        {dataForPreview !== undefined ? (
          dataForPreview.map((item, index) => {

            return (
              <div className="bg-white pl-3" key={index}>
                <Row className="mb-3">
                  <Col md={3} className="mb-2">
                    <span>{index + 1}. Invoice Number : {item.itemDetail}</span>
                  </Col>
                  <Col md={3} className="mb-2">
                    <span>Due Date : {item.date}</span>
                  </Col>
                  <Col md={3} className="mb-2">
                    <span>Due Amount : {numberFormat(item.amount)}</span>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md={3}>
                    <Row>
                      <Col md={8} className="d-flex align-items-end mb-2">
                        <span>Invoice Document</span>
                      </Col>
                      <Col md={4} className="mb-2">
                        {item.invoiceDocument && item.invoiceDocument !== '' ? (
                          <img src={pdfImgType(item.invoiceDocument)} alt="PDF" className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(item.invoiceDocument)} />
                        ) : (
                          <i className="bx bxs-file" style={{ fontSize: '40px' }}></i>
                        )}
                      </Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md={8} className="d-flex align-items-end mb-2">
                        <span>Dispatch Document</span>
                      </Col>
                      <Col md={4} className="mb-2">
                        {item.DispatchDocument && item.DispatchDocument !== '' ? (
                          < img src={pdfImgType(item.DispatchDocument)} alt="PDF" className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(item.DispatchDocument)} />
                        ) : (
                          <i className="bx bxs-file" style={{ fontSize: '40px' }}></i>
                        )}
                      </Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md={8} className="d-flex align-items-end mb-2">
                        <span>Transportation Document</span>
                      </Col>
                      <Col md={4} className="mb-2">
                        {item.DeliveryDocument && item.DeliveryDocument !== '' ? (

                          < img src={pdfImgType(item.DeliveryDocument)} alt="PDF" className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(item.DeliveryDocument)} />
                        ) : (
                          <i className="bx bxs-file" style={{ fontSize: '40px' }}></i>
                        )}
                      </Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md={8} className="d-flex align-items-end mb-2">
                        <span>Purchase Document</span>
                      </Col>
                      <Col md={4} className="mb-2">
                        {item.purchaseOrderDocument && item.purchaseOrderDocument !== '' ? (
                          < img src={pdfImgType(item.purchaseOrderDocument)} alt="PDF" className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(item.purchaseOrderDocument)} />
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
            {feedbackPreview != undefined && feedbackPreview.length > 0 ? (
              feedbackPreview.filter((item) => item.questionType !== "RATING").map((item, index) => {
                return <tr key={item}>
                  <td >{index + 1}. {item.questionDesc}</td>
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


        <div className="mb-3 "><b className="" style={{ fontSize: '15px' }}>Rating</b></div>

        {feedbackPreview != undefined ?
          feedbackPreview.filter((item) => item.questionType === "RATING").map((item, index) => {
            let x = 0;
            return (
              <React.Fragment key={index}>
                {item.questionType === "RATING" && (
                  <div className="mb-1">
                    <Row>
                      <Col md={8}>
                        <span className="mb-2 text-capitalize" style={{ fontSize: '14px' }}>
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
    </>



  )
}

