import React, { useEffect, useState, useCallback } from "react"
import PropTypes from "prop-types"
import moment from 'moment'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { setUploadPednigDocOpen, uploadUploadPednigDocID } from "../../../store/UploadPendingDocList/UploadPendingDocList.action"
import { selectUploadPendigDocOpen, uploadPendigDocSelector } from "store/UploadPendingDocList/UploadPendingDocList.selecter"
import CurrencyFormat from 'react-currency-format';
import { useDropzone } from 'react-dropzone'


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

import fileImg2 from '../../../assets/images/newImg/pdf.png'
import fileImg1 from '../../../assets/images/newImg/png-file-.png'

import { getAllInvoice } from "../../../store/debtors/debtors.actions";

export const InvoiceThankYouPop = ({ isOpen, toggle, closeAllTable, handleThankYouPop }) => {
    debugger


    const closePop = () => {
        closeAllTable()
        handleThankYouPop()
    }

    return (
        <Modal
            isOpen={isOpen}
            role="dialog"
            size="sm"
            autoFocus={true}
            centered={true}
            className="exampleModal"
            tabIndex="-1"
            toggle={toggle}
        >
            <div className="modal-content">
                <ModalHeader toggle={() => closePop()}>Complaint Register Successfully </ModalHeader>

                <ModalBody>
                    <Row className="mt-3">
                        <div >
                            <Label style={{ marginLeft: '0.5em ' }}>
                                Thank you for submitting your complaint. We will notify the relevant parties. If they do not respond within the next four days, our team will review your submitted documents and your complaint will be published on the MSME Suraksha portal. If the buyer responds before that, we will consider all information and update the status accordingly. You can check your emails for notifications or visit your account on MSME Suraksha to check the updated status.
                            </Label>
                        </div>
                    </Row>
                    <Row className="mt-3">
                        <Col md={10} className="text-center mt-2">
                        </Col>
                        <Col md={2} className="text-end">
                            <Button className="btn btn-info" onClick={() => closePop()}>Cancel</Button>
                        </Col>
                    </Row>
                </ModalBody>
            </div>
        </Modal>
    )
}


