import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import moment from 'moment'
import CurrencyFormat from 'react-currency-format';

import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    InputGroup,
    Input,
    Label,
    Row, Col
} from "reactstrap"

import { Table } from 'react-bootstrap';

import Select from "react-select"

const ViewDetailsOrderManagementModal = props => {

    const { isOpen, toggle, viewModalData, name } = props

    const filteredCustomerDetail = name == 'Seller' ? viewModalData.creditor : viewModalData.debtor

    const allInvoiceListForPreview = viewModalData.invoices
    const numberFormat = (value) =>
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(value);

    const [selectAction, setSelectAction] = useState([
        { label: "Approve", value: "Approve" },
        { label: "Reject", value: "Reject" },
        { label: "Revise & send for customer approval", value: "ampere" },
    ])

    const customStyles = {

        control: (provided, state) => ({
            ...provided,
            background: "#FAFAFA",
            width: "300px",
            // match with the menu
            borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
            // Overwrittes the different states of border
            borderColor: state.isFocused ? " #4da6ff" : " #80d4ff",
            // Removes weird border around container  
            boxShadow: state.isFocused ? null : null,
            "&:hover": {
                // Overwrittes the different states of border
                borderColor: state.isFocused ? " #4da6ff" : " #80d4ff"
            }
        }),
        option: (provided, state) => ({

            // Your custom option styles here
            backgroundColor: state.isFocused ? '#80bfff' : '#FAFAFA',
            ':hover': {
                backgroundColor: '#80bfff', // Change background color on hover
            },


            menu: base => ({
                ...base,
                // override border radius to match the box
                borderRadius: 0,
                // kill the gap
                marginTop: 2
            }),
            menuList: base => ({
                ...base,
                // kill the white space on first and last option
                padding: 2,
                margin: 2
            })
        }),
        // Add more styles as needed for other parts of the Select component
    };


    const [unitSelect, setUnitSelect] = useState('')

    const unitSelectFunction = (select) => {
        setUnitSelect(select)
    }
    return (
        <Modal
            isOpen={isOpen}
            role="dialog"
            size="xl"
            autoFocus={true}
            centered={true}
            className="exampleModal"
            tabIndex="-1"
            toggle={toggle}
        >
            <div className="modal-content">
                <ModalHeader toggle={toggle}><b>View Detail</b></ModalHeader>

                <ModalBody>
                    {filteredCustomerDetail != undefined ? <>
                        <Row className="">
                            {console.log('filteredCustomerDetail', filteredCustomerDetail)}
                            <div className="mb-2"><b className="" style={{ fontSize: '15px' }}>{name} Detail :</b></div>
                            {name == 'Seller' ? <Label className="text-capitalize">
                                <b>  Customer Name :</b> {filteredCustomerDetail.companyOwner.name}
                            </Label> : <Label className="text-capitalize">
                                <b>  Customer Name :</b> {filteredCustomerDetail.firstname}
                            </Label>}
                            <Label className="text-capitalize">
                                <b>Company Name : </b>{filteredCustomerDetail.companyName}
                            </Label>
                            {name == 'Seller' ? <Label className="text-capitalize">
                                <b>  Address : </b>{filteredCustomerDetail.address1 != '' && filteredCustomerDetail.address1 != undefined ? filteredCustomerDetail.address1 + "," : ''} {filteredCustomerDetail.address2 != '' && filteredCustomerDetail.address2 != undefined ? filteredCustomerDetail.address2 + "," : ''} {filteredCustomerDetail.city != '' && filteredCustomerDetail.city != undefined ? filteredCustomerDetail.city + "," : ''} {filteredCustomerDetail.state != '' && filteredCustomerDetail.state != undefined ? filteredCustomerDetail?.state + "," : ''} {filteredCustomerDetail.zipcode}
                            </Label> : <Label className="text-capitalize">
                                <b>  Address :</b> {filteredCustomerDetail.address1 != '' && filteredCustomerDetail.address1 != undefined ? filteredCustomerDetail.address1 + "," : ''} {filteredCustomerDetail.address2 != '' && filteredCustomerDetail.address2 != undefined ? filteredCustomerDetail.address2 + "," : ''} {filteredCustomerDetail.city != '' ? filteredCustomerDetail.city + "," : ''} {filteredCustomerDetail.zipcode}
                            </Label>}

                            {name == 'Seller' ? <Label className="text-capitalize">
                                <b>  Mobile No. (Primary ) :</b> {filteredCustomerDetail.phoneNumber}
                            </Label> : <Label className="text-capitalize">
                                <b>  Mobile No. (Primary ) :</b> {filteredCustomerDetail.customerMobile}
                            </Label>}
                            {name == 'Seller' ? <Label className="text-capitalize">
                                <b>  Mobile No. (Secondary) :</b> {filteredCustomerDetail.secPhoneNumber != undefined && filteredCustomerDetail.secPhoneNumber != null ? filteredCustomerDetail.secPhoneNumber : ''}
                            </Label> : <Label className="text-capitalize">
                                <b>  Mobile No. (Secondary) :</b> {filteredCustomerDetail.secCustomerMobile != undefined && filteredCustomerDetail.secCustomerMobile != null ? filteredCustomerDetail.secCustomerMobile : ''}
                            </Label>}

                            {name == 'Seller' ? <Label className="text-capitalize">
                                <b>Email :</b> {filteredCustomerDetail.emailId}
                            </Label> : <Label className="text-capitalize">
                                <b>Email :</b> {filteredCustomerDetail.customerEmail}
                            </Label>}


                            <Label className="text-capitalize">
                                <b>GST No. :</b> {filteredCustomerDetail.gstin}
                            </Label>
                            <Label className="text-capitalize">
                                <b>PAN No. :</b> {filteredCustomerDetail.companyPan}
                            </Label>
                        </Row>


                        <Row>
                            <Col md={10}>
                                <div className="mb-3 mt-3"><b className="">Order Detail</b></div>

                            </Col>
                            <Col md={2} className="text-end">

                                {/* <Button className="btn btn-info">Edit Invoice</Button> */}
                            </Col>
                        </Row>

                        <div className="table-responsive mt-1 text-dark">
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Order No.</th>
                                        <th>Order Date</th>
                                        <th>{name == 'Buyer' ? 'Buyer Name' : 'Seller Name'}</th>
                                        <th>Address</th>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                        <th>Unit</th>
                                        <th>Description</th>
                                        <th>Rate</th>
                                        <th>Taxes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewModalData.invoices.map((item, index) => (
                                        <tr key={item.invoiceNumber}>
                                            <td>{index + 1}</td>
                                            <td>{item.invoiceNumber}</td>
                                            <td>{moment(item.dueDate).format("DD-MM-YYYY")}</td>
                                            <td>Prem</td>
                                            <td>90 feet, Sakinka</td>
                                            <td>5020</td>
                                            <td>50</td>
                                            <td>bls</td>
                                            <td>5020/1.5/20</td>
                                            <td>500</td>
                                            <td>16%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>

                        {name == 'Buyer' &&
                            <Row className="mt-3 d-flex align-items-end">
                                <Col xs="auto">
                                    <Label> <strong>Action</strong><span className="text-danger">*</span></Label>
                                    <Select
                                        options={selectAction}
                                        styles={customStyles}
                                        value={unitSelect}
                                        placeholder='Select Action'
                                        onChange={selected => unitSelectFunction(selected)}
                                    />

                                </Col>
                                <Col>
                                    <Button className="btn btn-info" /* onClick={() => CreatePayload()} */
                                    ><span className="h6">Submit</span></Button>
                                </Col>
                            </Row>
                        }
                        {name == 'Seller' &&
                            <Row className="mt-3 d-flex align-items-end">
                                <Col xs="auto">
                                    <Button className="btn btn-info" /* onClick={() => CreatePayload()} */
                                    ><span className="h6">Approve</span></Button>
                                </Col>
                                <Col xs="auto">
                                    <Button className="btn btn-info" /* onClick={() => CreatePayload()} */
                                    ><span className="h6">Edit</span></Button>
                                </Col>
                                <Col xs="auto">
                                    <Button className="btn btn-info" /* onClick={() => CreatePayload()} */
                                    ><span className="h6">Cancel</span></Button>
                                </Col>
                                <Col ></Col>
                            </Row>
                        }


                    </>
                        : ""}

                </ModalBody>
            </div>
        </Modal>
    )
}

ViewDetailsOrderManagementModal.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default ViewDetailsOrderManagementModal
