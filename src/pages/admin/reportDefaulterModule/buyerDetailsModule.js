import React, { useState } from "react"
import {
    Label,
    Row,
} from "reactstrap"


export const BuyerDetailsModule = ({ filteredCustomerDetail }) => {

    return (
        <Row className="mt-3" >
            <div className="mb-2" ><b className="" style={{ fontSize: '15px' }}>Buyer Details -</b></div>
            <Label className="text-capitalize">
                <b> Name : </b>{filteredCustomerDetail.companyName}
            </Label>
            <Label className="text-capitalize">
                <b>Address :</b>
                {[
                    filteredCustomerDetail.address1,
                    filteredCustomerDetail.address2,
                    filteredCustomerDetail.city,
                    filteredCustomerDetail.state,
                    filteredCustomerDetail.zipcode
                ].filter(Boolean).join(', ')}
            </Label>
            <Label className="text-capitalize">
                <b> Mobile (Primary ) : </b>{filteredCustomerDetail.customerMobile}
            </Label>
            <Label className="text-capitalize">
                <b> Mobile (Secondary ) : </b>{filteredCustomerDetail.secCustomerMobile || ''}
            </Label>
            <Label className="text-capitalize">
                <b>Email :</b> {filteredCustomerDetail.customerEmail}
            </Label>

            <Label className="text-capitalize">
                <b> GST Number :</b> {filteredCustomerDetail.gstin}
            </Label>
            <Label className="text-capitalize">
                <b>  PAN Number :</b> {filteredCustomerDetail.companyPan}
            </Label>
        </Row>
    )
}