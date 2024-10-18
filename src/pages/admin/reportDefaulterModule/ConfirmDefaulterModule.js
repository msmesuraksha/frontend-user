import React, { useState } from "react"
import PropTypes from "prop-types"
import axios from "axios"

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
  Row,
  Col,
} from "reactstrap"
import { ToastContainer, toast } from "react-toastify"
import { useEffect } from "react"
import "./style.css"
import { useSelector, useDispatch } from "react-redux"
import moment from "moment"
import { addInvoiceReportDefaulterInvoice } from "../../../store/debtors/debtors.actions"
import { addInvoiceReportDefaulterSelector } from "store/debtors/debtors.selecter"

import { addRatingToDebtor } from "../../../store/debtors/debtors.actions"

import { getRequestEdit } from "../../../store/debtors/debtors.actions"

import { selectCreateInvoice } from "store/debtors/debtors.selecter"

import { getAllInvoice } from "../../../store/debtors/debtors.actions"

import { currentInvoiceClear } from "../../../store/debtors/debtors.actions"

export const ConfirmDefaulterModule = props => {
  const {
    allInvoiceLists,
    handleCheckboxChange,
    isChecked,
    feedbackPayload,
    moduleName,
    defaulterId,
    handlePrevious,
    handleNext,
    toggle,
  } = props

  const handleSubmit = () => {
    handleSubmitInvoice()
  }

  const checkboxStyle = {
    border: "2px solid #3498db", // Set the border color (change #3498db to your desired color)
    borderRadius: "4px", // Optional: Add rounded corners for a nicer look
    padding: "5px", // Optional: Add padding to the checkbox
    marginRight: "5px", // Optional: Add some spacing between the checkbox and label
  }

  const createdInvoiceList = useSelector(selectCreateInvoice)
  const dispatch = useDispatch()

  const changedarray = () => {
    for (let i = 0; i < feedbackPayload.length; i++) {
      // Remove the "rollNo" property from each student object
      delete feedbackPayload[i].indexno
    }
    return feedbackPayload
  }

  useEffect(() => {
    changedarray()
    if (
      createdInvoiceList != undefined &&
      Object.keys(createdInvoiceList).length > 0
    ) {
      const feedbackPaylod = {
        defaulterEntryId: createdInvoiceList.id,
        ratingsArray: feedbackPayload,
      }

      if (feedbackPayload.length > 0) {
        dispatch(addRatingToDebtor(feedbackPaylod))
      }
    }
  }, [createdInvoiceList])

  const handleSubmitInvoice = () => {
    if (moduleName == "invoice") {
      const payload = {
        invoicesList: allInvoiceLists != undefined ? allInvoiceLists : [],
        status: "PENDING",
      }
      dispatch(addInvoiceReportDefaulterInvoice(payload))
    }

    if (moduleName == "editInvoice") {
      const payload = {
        defaulterEntryId: defaulterId,
        invoices: allInvoiceLists != undefined ? allInvoiceLists : [],
        status: "PENDING",
      }

      dispatch(getRequestEdit(payload))

      const feedbackPaylod = {
        defaulterEntryId: defaulterId,
        ratingsArray: feedbackPayload,
      }

      if (feedbackPayload.length > 0) {
        dispatch(addRatingToDebtor(feedbackPaylod))
      }

      dispatch(addRatingToDebtor(feedbackPaylod))
    }

    handleNext()
  }

  const handleDraftInvoice = () => {
    if (moduleName == "invoice") {
      const payload = {
        invoicesList: allInvoiceLists != undefined ? allInvoiceLists : [],
        status: "DRAFT",
      }
      dispatch(addInvoiceReportDefaulterInvoice(payload))
    }
    if (moduleName == "editInvoice") {
      const payload = {
        defaulterEntryId: defaulterId,
        invoices: allInvoiceLists != undefined ? allInvoiceLists : [],
        status: "DRAFT",
      }

      dispatch(getRequestEdit(payload))
    }
    // dispatch(addRatingToDebtor(feedbackPayload))
    toast.success("Invoice save as Draft")

    toggle()

    setTimeout(() => {
      dispatch(getAllInvoice())
      dispatch(currentInvoiceClear())
    }, 1000)
  }

  return (
    <div className="mt-5">
      <h5 className="text-center ">
        Are you sure you want to report following customer as a defaulter ?{" "}
      </h5>
      <br />
      <p className="text-left" style={{ fontSize: "16px" }}>
        <Input
          type="checkbox"
          onChange={() => handleCheckboxChange()}
          className="checkForConfirm"
          style={checkboxStyle}
        />
        &nbsp; &nbsp;{" "}
        <span style={{ fontWeight: "500" }}>
          By checking this box, you confirm that :
        </span>
        <br />
        <ul style={{ fontSize: "16px", lineHeight: "25px" }} className="mt-2">
          {" "}
          <li>
            All information provided by you is correct to the best of your
            knowledge.{" "}
          </li>
          <li>
            You accept full responsibility for any incorrect information
            provided by you. Any incorrect information provided by you can cause
            you to be permanently banned from this platform.{" "}
          </li>
          <li>
            {" "}
            You understand that incorrect information provided by you can lead
            to legal action against you.
          </li>
          <li>
            {" "}
            You will not use this platform with malicious intent to defame a
            third party.{" "}
          </li>
          <li>
            {" "}
            You authorize Anand Rishi Technologies Private Limited to use the
            information provided by you freely, including posting on social
            media on your behalf and using it as deemed fit.
          </li>
          <li>
            {" "}
            You absolve Anand Rishi Technologies Private Limited of any legal or
            monetary consequences regarding any information posted by them on
            the internet on your behalf.
          </li>
        </ul>
      </p>
      <ModalFooter className="mt-5">
        <Row className="backBtn ">
          <Col xs={4}>
            <Button className="btn btn-info" onClick={() => handlePrevious()}>
              <span className="h5">Back</span>
            </Button>
          </Col>
          <Col md={4} xs={8}>
            <Row>
              <Col md={8} xs={8}>
                <div className="text-sm-end">
                  <Button
                    className="text-center btn btn-secondary "
                    onClick={() => handleDraftInvoice()}
                  >
                    <span className="h5">Save as Draft</span>
                  </Button>
                </div>
              </Col>
              <Col md={4} xs={4}>
                <div className="text-sm-end">
                  <Button
                    className="text-center btn btn-info"
                    onClick={() => handleSubmit()}
                    disabled={!isChecked}
                  >
                    <span className="h5">Submit</span>
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </ModalFooter>
    </div>
  )
}
