import React from "react"

import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Label,
    Row, Col
} from "reactstrap"

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


