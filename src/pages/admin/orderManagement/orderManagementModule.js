import React, { useEffect, useState, useRef, useMemo } from "react"
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
} from "reactstrap"
import { selectInvoiceListMap } from "store/debtors/debtors.selecter"
import { useSelector, useDispatch } from "react-redux"
import ReportMedefulterComponent from '../ReportMeDefualter/ReportaMeDefaulter'
import { ReportDebtor } from "pages/admin/Invoice/ReportaDebtor"
import { SalesOrderModule } from "./salesOrderModule"
import { PurchaseOrderModule } from "./purchesOrderModule"

export const OrderManagementModule = props => {
    const [isClickedToOrder, setisClickedToOrder] = useState(false);

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <div className="mb-4 h4 card-title"></div>
                    <br />
                    <br />
                    <br />
                    <Row>
                        <Col className="pl-3" style={{ textTransform: "capitalize" }}>
                            <h5 className="m-1"> <b>Order Management</b></h5>
                        </Col>
                    </Row>
                    <br />
                    <div style={{ border: "1px solid gray" }} className="p-3">


                        <Row className="text-center" >
                            <Col md={12}>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-info backtoHomeButton " style={{ background: isClickedToOrder == false ? " #1aa3ff" : "#707274", border: "none", width: "" }} onClick={() => setisClickedToOrder(false)} >Sales Order </button>
                                    <button type="button" className="btn btn-info  backtoHomeButton" style={{ background: isClickedToOrder != false ? "#1aa3ff" : "	 #707274", border: "none", width: "" }} onClick={() => setisClickedToOrder(true)} >Purchase Order</button>
                                </div>
                            </Col>
                            <Col md={12} className="">
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <span style={{ width: '70px', height: "5px", background: isClickedToOrder == false ? " #1aa3ff" : "", marginLeft: "30px" }}></span>
                                    <span style={{ width: '70px', height: "5px", background: isClickedToOrder != false ? " #1aa3ff" : "", marginLeft: "30px" }}></span>
                                </div>
                                <br />
                            </Col>
                        </Row>

                        {isClickedToOrder != true ?
                            <Row className="p-1 ml-5">
                                <SalesOrderModule isClickedToOrder={isClickedToOrder} />
                            </Row>
                            : <>
                                <Row className="p-1 ml-5">
                                    <PurchaseOrderModule isClickedToOrder={isClickedToOrder} />
                                </Row>
                            </>

                        }
                    </div>
                </CardBody>


            </Card>
        </React.Fragment>
    )
}







