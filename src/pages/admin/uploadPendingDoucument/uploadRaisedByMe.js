import React, { useState, useEffect, useMemo } from "react"
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    CardBody,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    CardHeader,
    Table,
    InputGroup,
    Form,
    CardTitle,
    FormGroup,
    Label,
} from "reactstrap"

import { ToastContainer, toast } from 'react-toastify';
import { numberFormat } from "./uploadPendingDoc"


export const ReportRaisedByMeTable = ({ GetUploadPendingList, handleUploadFiles, getDaysArray }) => {

    return (
        <>
            {

                GetUploadPendingList != undefined ? GetUploadPendingList.map((item, index) => {
                    {/* {dummyData != undefined ? dummyData.map((item, index) => { */ }
                    return <tr key={index}>

                        <th scope="row" className="pt-4">{index + 1}</th>
                        <td className="pt-4 text-capitalize">{item.creditor.companyName}</td>
                        <td className="pt-4">{item.invoices.map((x) => {
                            return <span key={x}>{x.invoiceNumber}, &nbsp;</span>
                        })}</td>

                        <td className="pt-4 d-flex text-capitalize">{item.creditor.companyName}
                            <br />
                            {item.creditor.address1} {item.creditor.address2}, {item.creditor.city}</td>

                        <td className="pt-4">
                            {numberFormat(item.totalAmount)}
                            {/* <CurrencyFormat value={item.totalAmount} thousandSpacing={2} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}{0}</div>} /> */}

                        </td>

                        <td >

                            <div className="" style={{ padding: "2px 15px" }}>

                                <div className=" text-center bg-danger rounded text-light">
                                    <div className="text-capitalize">

                                        {getDaysArray[index]}  &nbsp;


                                        <span className="ml-1">Days</span> </div>
                                    <div className="text-capitalize" >{item.paymentDate}</div>
                                </div>
                            </div>

                        </td>
                        <td className="pt-4">4.2</td>
                        <td>
                            <div className="pt-2">
                                &nbsp;
                                <button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                                    title="Upload Pending Files" href={item.url} rel='noreferrer'
                                    target='_blank' onClick={() => handleUploadFiles(item)

                                    }>
                                    <i className='bx bx-cloud-upload textsizing' ></i>
                                </button>
                                &nbsp;


                            </div>
                        </td>
                    </tr>
                }) : ''
            }
            <ToastContainer />
        </>
    )

}