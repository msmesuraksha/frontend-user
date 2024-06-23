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

export const InvoiceDeletePop = ({ isOpen, toggle, deleteValue, DeleteInvoiceModule }) => {

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
                <ModalHeader toggle={toggle}>Delete Complaint</ModalHeader>

                <ModalBody>
                    <Row className="mt-3">
                        <div >
                            <Label style={{ marginLeft: '0.5em ' }}>
                                Are you sure you want to delete this complaint ?
                            </Label>
                        </div>

                    </Row>
                    <Row className="mt-3">
                        <Col md={10} className="text-center mt-2">
                        </Col>
                        <Col md={2} className="text-end">
                            <Button className="btn btn-danger" onClick={() => DeleteInvoiceModule(deleteValue)}>Delete</Button>
                        </Col>
                    </Row>
                </ModalBody>
            </div>
        </Modal>
    )
}


