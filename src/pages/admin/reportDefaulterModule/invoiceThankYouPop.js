import React from "react"
import { useDispatch } from 'react-redux'

import {
    Button,
    Label,
    Row, Col
} from "reactstrap"


import { getAllInvoice } from "../../../store/debtors/debtors.actions";

import { currentInvoiceClear } from "../../../store/debtors/debtors.actions";

export const InvoiceThankYouPop = ({ toggle }) => {

    const dispatch = useDispatch()

    const closePop = () => {
        toggle()
        setTimeout(() => {
            dispatch(getAllInvoice())
            dispatch(currentInvoiceClear())
        }, 1000);
    }

    return (
        <>
            <Row className="mt-5">
                <div >
                    <Label style={{ marginLeft: '0.5em ' }}>
                        Thank you for submitting your complaint. We will notify the relevant parties. If they do not respond within the next four days, our team will review your submitted documents and your complaint will be published on the MSME Suraksha portal. If the buyer responds before that, we will consider all information and update the status accordingly. You can check your emails for notifications or visit your account on MSME Suraksha to check the updated status.
                    </Label>
                </div>
            </Row>
            <Row className="mt-5">
                <Col md={10} className="text-center mt-2">
                </Col>
                <Col md={2} className="text-end">
                    <Button className="btn btn-info" onClick={() => closePop()}>Close</Button>
                </Col>
            </Row>
        </>
    )
}


