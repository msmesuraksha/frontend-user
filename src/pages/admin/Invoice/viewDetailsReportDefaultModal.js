import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import moment from 'moment'


import {
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Row, Col
} from "reactstrap"


const ViewDetailsReportDefaultModal = props => {

  const { isOpen, toggle, viewModalData, name } = props

  const filteredCustomerDetail = name == 'Seller' ? viewModalData.creditor : viewModalData.debtor

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
          {filteredCustomerDetail && <>
            <Row className="">
              <div className="mb-2"><b className="" style={{ fontSize: '15px' }}>{name} Detail :</b></div>
              <Label className="text-capitalize">
                <b>  Customer Name :</b> {name == 'Seller' ? filteredCustomerDetail.companyOwner.name : filteredCustomerDetail.firstname}
              </Label>
              <Label className="text-capitalize">
                <b>Company Name : </b>{filteredCustomerDetail.companyName}
              </Label>
              <Label className="text-capitalize">
                <b>Address : </b>
                {[filteredCustomerDetail.address1, filteredCustomerDetail.address2, filteredCustomerDetail.city, filteredCustomerDetail.state, filteredCustomerDetail.zipcode]
                  .filter(Boolean)
                  .join(', ')}
              </Label>
              <Label className="text-capitalize">
                <b>  Mobile No. (Primary ) :</b> {name == 'Seller' ? filteredCustomerDetail.phoneNumber : filteredCustomerDetail.customerMobile}
              </Label>
              <Label className="text-capitalize">
                <b>Mobile No. (Secondary):</b>
                {name === 'Seller' ? filteredCustomerDetail.secPhoneNumber : filteredCustomerDetail.secCustomerMobile || ''}
              </Label>

              <Label className="text-capitalize">
                <b>Email:</b>
                {name === 'Seller' ? filteredCustomerDetail.emailId : filteredCustomerDetail.customerEmail}
              </Label>
              <Label className="text-capitalize">
                <b>GST No.:</b> {filteredCustomerDetail.gstin}
              </Label>

              <Label className="text-capitalize">
                <b>PAN No.:</b> {filteredCustomerDetail.companyPan}
              </Label>
            </Row>
            <Row>
              <Col md={10}>
                <div className="mb-3 mt-3"><b className="">Invoice Detail</b></div>

              </Col>
              <Col md={2} className="text-end">
              </Col>
            </Row>

            {viewModalData?.invoices.map((item, index) => {
              return <Row className="bg-light p-3 mt-1 text-dark" key={item}>
                <Row>
                  <Col md={3}> {index + 1}. &nbsp;Invoice No. : {item.invoiceNumber}</Col>
                  <Col md={3}>Due From : {moment(item.dueDate).format("DD-MMM-YYYY")}</Col>
                  <Col md={3}>Due Amount : {numberFormat(item.remainingAmount)}</Col>
                  <Col md={3}>
                  </Col>
                </Row>
              </Row>
            })
            }

            <Row className="mt-2 mb-2">
              <b>Total Due Amount : {numberFormat(viewModalData.totalAmount)}</b>
            </Row>
          </>
          }

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
