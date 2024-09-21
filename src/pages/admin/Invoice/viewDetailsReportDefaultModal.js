import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import moment from 'moment'
import CurrencyFormat from 'react-currency-format';

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  InputGroup,
  Input,
  Label,

  Table,
  Row, Col
} from "reactstrap"
import noFile from '../../../assets/images/newImg/no-document.png'
import pdfImg from '../../../assets/images/newImg/pdf.png'
import jpgImg from '../../../assets/images/newImg/png-file-.png'
import { numberFormat } from "../uploadPendingDoucument/uploadPendingDoc";

const ViewDetailsReportDefaultModal = props => {

  const { isOpen, toggle, viewModalData, name } = props

  const filteredCustomerDetail = name == 'Seller' ? viewModalData.creditor : viewModalData.debtor

  const allInvoiceListForPreview = viewModalData.invoices
  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);
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
        <ModalHeader toggle={toggle}><b>View Detail</b></ModalHeader>

        <ModalBody>
          {filteredCustomerDetail != undefined ? <>
            <Row className="">

              <div className="mb-2"><b className="" style={{ fontSize: '15px' }}>{name} Detail :</b></div>
              {name == 'Seller' ? <Label className="text-capitalize">
                <b>  Customer Name :</b> {filteredCustomerDetail.companyOwner.name}
              </Label> : <Label className="text-capitalize">
                <b>  Customer Name :</b> {filteredCustomerDetail.firstname}
              </Label>}
              <Label className="text-capitalize">
                <b>Company Name : </b>{filteredCustomerDetail.companyName}
              </Label>
              {name == 'Seller' ? <Label className="text-capitalize">
                <b>  Address : </b>{filteredCustomerDetail.address1 != '' && filteredCustomerDetail.address1 != undefined ? filteredCustomerDetail.address1 + "," : ''} {filteredCustomerDetail.address2 != '' && filteredCustomerDetail.address2 != undefined ? filteredCustomerDetail.address2 + "," : ''} {filteredCustomerDetail.city != '' && filteredCustomerDetail.city != undefined ? filteredCustomerDetail.city + "," : ''} {filteredCustomerDetail.state != '' && filteredCustomerDetail.state != undefined ? filteredCustomerDetail?.state + "," : ''} {filteredCustomerDetail.zipcode}
              </Label> : <Label className="text-capitalize">
                <b>  Address :</b> {filteredCustomerDetail.address1 != '' && filteredCustomerDetail.address1 != undefined ? filteredCustomerDetail.address1 + "," : ''} {filteredCustomerDetail.address2 != '' && filteredCustomerDetail.address2 != undefined ? filteredCustomerDetail.address2 + "," : ''} {filteredCustomerDetail.city != '' ? filteredCustomerDetail.city + "," : ''} {filteredCustomerDetail.zipcode}
              </Label>}

              {name == 'Seller' ? <Label className="text-capitalize">
                <b>  Mobile No. (Primary ) :</b> {filteredCustomerDetail.phoneNumber}
              </Label> : <Label className="text-capitalize">
                <b>  Mobile No. (Primary ) :</b> {filteredCustomerDetail.customerMobile}
              </Label>}
              {name == 'Seller' ? <Label className="text-capitalize">
                <b>  Mobile No. (Secondary) :</b> {filteredCustomerDetail.secPhoneNumber != undefined && filteredCustomerDetail.secPhoneNumber != null ? filteredCustomerDetail.secPhoneNumber : ''}
              </Label> : <Label className="text-capitalize">
                <b>  Mobile No. (Secondary) :</b> {filteredCustomerDetail.secCustomerMobile != undefined && filteredCustomerDetail.secCustomerMobile != null ? filteredCustomerDetail.secCustomerMobile : ''}
              </Label>}

              {name == 'Seller' ? <Label className="text-capitalize">
                <b>Email :</b> {filteredCustomerDetail.emailId}
              </Label> : <Label className="text-capitalize">
                <b>Email :</b> {filteredCustomerDetail.customerEmail}
              </Label>}


              <Label className="text-capitalize">
                <b>GST No. :</b> {filteredCustomerDetail.gstin}
              </Label>
              <Label className="text-capitalize">
                <b>PAN No. :</b> {filteredCustomerDetail.companyPan}
              </Label>
            </Row>


            <Row>
              <Col md={10}>
                <div className="mb-3 mt-3"><b className="">Invoice Detail</b></div>

              </Col>
              <Col md={2} className="text-end">

                {/* <Button className="btn btn-info">Edit Invoice</Button> */}
              </Col>
            </Row>

            {viewModalData != undefined ? viewModalData.invoices.map((item, index) => {
              return <Row className="bg-light p-3 mt-1 text-dark" key={item}>
                <Row>
                  <Col md={3}> {index + 1}. &nbsp;Invoice No. : {item.invoiceNumber}</Col>
                  <Col md={3}>Due From : {moment(item.dueDate).format("DD-MMM-YYYY")}</Col>
                  <Col md={3}>Due Amount : {numberFormat(item.remainingAmount)}</Col>
                  <Col md={3}>

                  </Col>

                </Row>

                {/* <Row className="mt-2">
                  <Col md={3}>
                    <Row    >
                      <Col md={8} className="pt-4">
                        <strong>Invoice Document</strong>
                      </Col>
                      <Col md={4} className="mt-2">
                        {item.invoiceDocument != null ?
                          <a href={item.invoiceDocument.url} rel='noreferrer' target='_blank'>
                            <img src={jpgImg} className="iconsImage shadow" />


                          </a>
                          :
                          <img src={noFile} className="iconsImage shadow" />


                        }
                      </Col>
                    </Row>

                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md={8} className="pt-4">
                        <strong>Dispatch Document</strong>
                      </Col>
                      <Col md={4}>
                        {item.challanDocument != null ? <a href={item.challanDocument.url} rel='noreferrer' target='_blank'>
                          <img src={jpgImg} className="iconsImage shadow" />


                        </a> :
                          <img src={noFile} className="iconsImage shadow" />

                        }
                      </Col>
                    </Row>

                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md={8} className="pt-4">
                        <strong>Transportation Document</strong>
                      </Col>
                      <Col md={4} className="pt-2">
                        {item.transportationDocument != null ? <a href={item.transportationDocument.url} rel='noreferrer' target='_blank'>
                          <img src={pdfImg} className="iconsImage shadow" />


                        </a>
                          :
                          <img src={noFile} className="iconsImage shadow" />

                        }
                      </Col>
                    </Row>

                  </Col>
                  <Col md={3}>
                    <Row>
                      <Col md={8} className="pt-4">
                        <strong>Purchase Document</strong>
                      </Col>
                      <Col md={4}>
                        {item.purchaseOrderDocument != null ? <a href={item.purchaseOrderDocument.url} rel='noreferrer' target='_blank'>
                          <img src={pdfImg} className="iconsImage shadow" />


                        </a> :
                          <img src={noFile} className="iconsImage shadow" />


                        }          </Col>
                    </Row>

                  </Col>
                </Row> */}


              </Row>

            })
              : ''


            }

            <Row className="mt-2 mb-2">
              <b>Total Due Amount : {numberFormat(viewModalData.totalAmount)}</b>
            </Row>
          </>
            : ""}

        </ModalBody>
      </div>
    </Modal>
  )
}

ViewDetailsReportDefaultModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default ViewDetailsReportDefaultModal
