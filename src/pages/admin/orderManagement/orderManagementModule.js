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
import ReportMedefulterComponent from "../ReportMeDefualter/ReportaMeDefaulter"
import { ReportDebtor } from "pages/admin/Invoice/ReportaDebtor"
import { SalesOrderModule } from "./salesOrderModule"
import { PurchaseOrderModule } from "./purchesOrderModule"

import Breadcrumbs from "../../../components/Common/Breadcrumb"

import "./style.css"

export const OrderManagementModule = props => {
  const [isClickedToOrder, setisClickedToOrder] = useState(false)

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Order Management"
            breadcrumbItem="Order Management"
          />
          <Card>
            <CardBody>
              <div style={{ border: "1px solid gray" }} className="p-3">
                <Row className="text-center">
                  <Col md={12}>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <Button
                        className="btn btn-info  "
                        style={{
                          background:
                            isClickedToOrder == false ? " #1aa3ff" : "#707274",
                          border: "none",
                          width: "",
                        }}
                        onClick={() => setisClickedToOrder(false)}
                      >
                        Sales Order (Received order)
                      </Button>
                      <Button
                        className="btn btn-info  "
                        style={{
                          background:
                            isClickedToOrder != false ? "#1aa3ff" : "#707274",
                          border: "none",
                          width: "",
                        }}
                        onClick={() => setisClickedToOrder(true)}
                      >
                        Purchase Order (Sent orders)
                      </Button>
                    </div>
                  </Col>
                  <Col md={12} className="">
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <span
                        style={{
                          width: "70px",
                          height: "5px",
                          background:
                            isClickedToOrder == false ? " #1aa3ff" : "",
                          marginLeft: "30px",
                        }}
                      ></span>
                      <span
                        style={{
                          width: "70px",
                          height: "5px",
                          background:
                            isClickedToOrder != false ? " #1aa3ff" : "",
                          marginLeft: "30px",
                        }}
                      ></span>
                    </div>
                    <br />
                  </Col>
                </Row>

                {isClickedToOrder != true ? (
                  <Row style={{ display: "contents" }} className="p-0">
                    <SalesOrderModule isClickedToOrder={isClickedToOrder} />
                  </Row>
                ) : (
                  <>
                    <Row className="p-1 ml-5" style={{ display: "contents" }}>
                      <PurchaseOrderModule
                        isClickedToOrder={isClickedToOrder}
                      />
                    </Row>
                  </>
                )}
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}
