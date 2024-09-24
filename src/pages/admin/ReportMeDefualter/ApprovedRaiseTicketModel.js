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
import Select from "react-select"
import moment from "moment"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import { recoredPaymentReportDefault } from "../../../store/debtors/debtors.actions"
import { recordPaymentReportDefaulter } from "store/debtors/debtors.selecter"

import { approveTransactionReopenStart } from "store/ApprovedTransactionReopen/ApprovedTransactionReopen.action";
import { fetchApproveReportMeDefaulterStart } from "store/ApprovedReportMeDefulter/ApprovedReportMeDefulter.action";



const ApprovedRaiseTicketModel = props => {

  const { isOpen, toggle, currentIndexData, requestType } = props
  const dispatch = useDispatch()
  const [reasons, setreasons] = useState('')
  const [isSubmited, setisSubmited] = useState(false)


  useEffect(() => {
  }, [])


  const handleToggle = () => {
    toggle()
    setisSubmited(false)
    dispatch(fetchApproveReportMeDefaulterStart())
  }

  const defaulterId = currentIndexData != undefined ? currentIndexData.defaulterEntryId : ''


  const handleSubmit = () => {
    dispatch(approveTransactionReopenStart({
      "defaulterEntryId": defaulterId,
      "requester": requestType,
      "status": "RE_OPENED",
      "reopenReason": reasons
    }))

    setisSubmited(true)
  }

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xs"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Reopen Current Ticket
        </ModalHeader>

        <ModalBody>
          {!isSubmited ? <p>Reason For Reopening the Ticket *</p> : ""}
          {isSubmited == false ?
            <Row style={{ paddingRight: '30px', paddingLeft: "30px" }}>

              <Input
                type="textarea"
                id="customerEmail"
                name="customerEmail"
                onChange={(e) => setreasons(e.target.value)}
                style={{ height: "150px" }}
                placeholder="Reason for Reopen the ticket "
              />
            </Row>
            : <Row>
              <span>
                Thank you for submitting your request to reopen the current ticket.
                Our team will carefully review your request, and if approved, you will receive an email notification at your
                registered email address.
                This email will contain instructions on how to proceed, including any required documents that
                need to be uploaded. We appreciate your patience and cooperation in this matter.
              </span>
            </Row>
          }

        </ModalBody>
        <ModalFooter>
          {!isSubmited ? <Button type="button" color="primary" onClick={() => handleSubmit(true)} disabled={reasons == ""}>
            Submit
          </Button> : ""}
          <Button type="button" color="secondary" onClick={() => handleToggle()}>
            Close
          </Button>
        </ModalFooter>
      </div>
      <ToastContainer />

    </Modal>
  )
}

ApprovedRaiseTicketModel.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default ApprovedRaiseTicketModel
