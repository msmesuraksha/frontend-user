import React, { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from 'react-redux'

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

import { getAllInvoice } from "store/actions";





export const RecordPaymentSubmit = ({ isOpen, toggle }) => {
    const dispatch = useDispatch()

    const closePop = () => {


        setTimeout(() => {
            dispatch(getAllInvoice());
        }, 1000);

        toggle()
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
                <ModalHeader toggle={() => closePop()}>Thank you</ModalHeader>

                <ModalBody>
                    <Row className="mt-3">
                        <div >
                            <Label style={{ marginLeft: '0.5em ' }}>
                                Thank you for responding to the complaint. Admin will review your submissions and update their judgements on the complaint accordingly.
                            </Label>
                        </div>

                    </Row>
                    <Row className="mt-3">
                        <Col md={10} className="text-center mt-2">
                        </Col>
                        <Col md={2} className="text-end">
                            <Button onClick={() => closePop()}>Close</Button>
                        </Col>
                    </Row>
                </ModalBody>
            </div>
        </Modal>
    )
}


