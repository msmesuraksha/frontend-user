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

export const UploadDocSuccessModule = ({ isOpen, toggle, submitType }) => {

    const handleClose = () => {
        if (submitType == 'submitMenu') {
            toggle()
        } else {
            setTimeout(() => {
                window.location.href = '/login'
            }, 1000);
        }



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
                <ModalHeader toggle={() => handleClose()}>Document Upload Successfully</ModalHeader>

                <ModalBody>
                    <Row className="mt-3">
                        <p>Thank you for your submission. We will review it and get back to you as soon as possible.</p>
                    </Row>
                    <Row className="mt-3">
                        <Col md={10} className="text-center mt-2">
                        </Col>
                        <Col md={2} className="text-end">
                            <Button className="btn btn-primary" onClick={() => handleClose()}>Close</Button>
                        </Col>
                    </Row>
                </ModalBody>
            </div>
        </Modal>
    )
}


