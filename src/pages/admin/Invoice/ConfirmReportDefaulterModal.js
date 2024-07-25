import React, { useState } from "react"
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
import { useSelector, useDispatch } from "react-redux"
import moment from "moment";
import { addInvoiceReportDefaulterInvoice } from "../../../store/debtors/debtors.actions"
import { addInvoiceReportDefaulterSelector } from "store/debtors/debtors.selecter"

import { addRatingToDebtor } from "../../../store/debtors/debtors.actions";

import { getRequestEdit } from "../../../store/debtors/debtors.actions";

import { selectCreateInvoice } from "store/debtors/debtors.selecter";

import { getAllInvoice } from "../../../store/debtors/debtors.actions";

import { currentInvoiceClear } from "../../../store/debtors/debtors.actions";

const confirmReportModal = props => {

  const { isOpen, toggle, allInvoiceLists, handleCheckboxChange, isChecked, feedbackQuestion, moduleName, defaulterId, invoiceIsOpen, feedBackIsOpen, previewIsOpen, confirmReportIsOpen, requestEditIsOpen } = props

  console.log(confirmReportIsOpen);
  const handleSubmit = () => {
    handleSubmitInvoice()
    // toast.success("Reported Defaulter successfully")
    /*     toggle() */

    // window.location.reload()

  }


  const checkboxStyle = {
    border: '2px solid #3498db', // Set the border color (change #3498db to your desired color)
    borderRadius: '4px', // Optional: Add rounded corners for a nicer look
    padding: '5px', // Optional: Add padding to the checkbox
    marginRight: '5px', // Optional: Add some spacing between the checkbox and label
  };


  const addInvoiceReportDefaulter = useSelector(addInvoiceReportDefaulterSelector)
  const createdInvoiceList = useSelector(selectCreateInvoice)
  const dispatch = useDispatch()



  const changedarray = () => {
    for (let i = 0; i < feedbackQuestion.length; i++) {
      // Remove the "rollNo" property from each student object
      delete feedbackQuestion[i].indexno;
    }
    return feedbackQuestion
  }

  useEffect(() => {
    changedarray()
    if (createdInvoiceList != undefined && Object.keys(createdInvoiceList).length > 0) {

      const feedbackPaylod = {
        "defaulterEntryId": createdInvoiceList.id,
        "ratingsArray": feedbackQuestion,
      }

      if (feedbackQuestion.length > 0) {
        dispatch(addRatingToDebtor(feedbackPaylod))
      }

      if (moduleName == 'invoice') {
        invoiceIsOpen()

      }

      if (moduleName == 'editInvoice') {
        requestEditIsOpen()
      }




      feedBackIsOpen()
      previewIsOpen()
      confirmReportIsOpen()

      setTimeout(() => {
        dispatch(getAllInvoice())
        dispatch(currentInvoiceClear())
      }, 1000);

    }
  }, [createdInvoiceList])






  const handleSubmitInvoice = () => {

    if (moduleName == 'invoice') {
      const payload = {
        "invoicesList": allInvoiceLists != undefined ? allInvoiceLists : [],
        "status": "PENDING"
      }
      dispatch(addInvoiceReportDefaulterInvoice(payload))

    }


    if (moduleName == 'editInvoice') {
      const payload = {
        "defaulterEntryId": defaulterId,
        "invoices": allInvoiceLists != undefined ? allInvoiceLists : [],
        "status": "PENDING"
      }

      dispatch(getRequestEdit(payload))

      const feedbackPaylod = {
        "defaulterEntryId": defaulterId,
        "ratingsArray": feedbackQuestion,
      }

      if (feedbackQuestion.length > 0) {
        dispatch(addRatingToDebtor(feedbackPaylod))
      }

      dispatch(addRatingToDebtor(feedbackPaylod))

      if (moduleName == 'invoice') {
        invoiceIsOpen()

      }

      if (moduleName == 'editInvoice') {
        requestEditIsOpen()
      }

      feedBackIsOpen()
      previewIsOpen()
      confirmReportIsOpen()

      setTimeout(() => {
        dispatch(getAllInvoice())
        dispatch(currentInvoiceClear())
      }, 1000);




    }



    // window.location.reload()

  }



  const handleDraftInvoice = () => {




    if (moduleName == 'invoice') {
      const payload = {
        "invoicesList": allInvoiceLists != undefined ? allInvoiceLists : [],
        "status": "DRAFT"
      }
      dispatch(addInvoiceReportDefaulterInvoice(payload))
    }
    if (moduleName == 'editInvoice') {
      const payload = {
        "defaulterEntryId": defaulterId,
        "invoices": allInvoiceLists != undefined ? allInvoiceLists : [],
        "status": "DRAFT"
      }

      dispatch(getRequestEdit(payload))
    }
    // dispatch(addRatingToDebtor(feedbackQuestion))
    toast.success("Invoice save as Draft")

    if (moduleName == 'invoice') {
      invoiceIsOpen()

    }

    if (moduleName == 'editInvoice') {
      requestEditIsOpen()
    }
    feedBackIsOpen()
    previewIsOpen()
    confirmReportIsOpen()

    setTimeout(() => {
      dispatch(getAllInvoice())
      dispatch(currentInvoiceClear())
    }, 1000);

    // window.location.reload()


  }


  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="lg"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}><b>Confirm Report On Defaulter</b></ModalHeader>

        <ModalBody className="bg-light">

          <h5 className="text-center ">Are you sure you want to report following customer as a defaulter ? </h5>
          <br />
          {/*           <p>Confirming the report of the mentioned customer as a defaulter requires accurate information. Any inaccuracies may lead to legal action against the reporting party, impacting their credibility as a rater. </p> */}
          <p className="text-left" style={{ fontSize: "16px" }}>
            {/* <Input type="checkbox" className="checkForConfirm" style={checkboxStyle} onChange={()=>handleChecked()}/>  */}
            <Input
              type="checkbox"
              // checked={isChecked}
              onChange={() => handleCheckboxChange()}
              className="checkForConfirm"
              style={checkboxStyle}
            />
            &nbsp; &nbsp;  <span style={{ fontWeight: "500" }}>By checking this box, you confirm that :</span>
            <br />
            <ul style={{ fontSize: "16px", lineHeight: "25px" }} className="mt-2">    <li>All information provided by you is correct to the best of your knowledge. </li>
              <li>You accept full responsibility for any incorrect information provided by you. Any incorrect information provided by you can cause you to be permanently banned from this platform. </li>
              <li> You understand that incorrect information provided by you can lead to legal action against you.</li>
              <li> You will not use this platform with malicious intent to defame a third party. </li>
              <li> You authorize Anand Rishi Technologies Private Limited to use the information provided by you freely,
                including posting on social media on your behalf and using it as deemed fit.</li>
              <li> You absolve Anand Rishi Technologies Private Limited of any legal or monetary consequences regarding any information posted by them on the internet on your behalf. </li></ul>
          </p>
          {/* <p className="text-center text-danger"> <i className='bx bx-error'></i> &nbsp; If found the provided information is wrong or incorrect legal action will be taken on the reporting party.</p> */}
        </ModalBody>
        <ModalFooter>
          <Button className="text-center btn btn-secondary " onClick={() => handleDraftInvoice()}>Save as Draft</Button>
          <Button className="text-center btn btn-info" onClick={() => handleSubmit()}
            disabled={!isChecked}    >Submit</Button>
        </ModalFooter>
      </div>
      <ToastContainer />

    </Modal>
  )
}

confirmReportModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default confirmReportModal
