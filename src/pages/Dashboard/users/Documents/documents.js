import React, { useEffect, useState, useMemo } from "react"
import PropTypes from "prop-types"
import withRouter from "components/Common/withRouter"
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Container,
  Button,
  CardHeader,
} from "reactstrap"

import Breadcrumbs from "../../../../components/Common/Breadcrumb"

import UploadDocumentModel from "./uploadDocumentsmodel"
import { useDispatch, useSelector } from "react-redux"
import { getGeneralDoucments } from "../../../../store/Documents/documents.actions"
import { getGeneralDocumentsSelector } from "../../../../store/Documents/documents.selector"
import pdfImg from "../../../../assets/images/newImg/pdf.png"
import "./Gallary.css"

const Document = props => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [modal1, setModal1] = useState(false)
  const toggleViewModal = () => setModal1(!modal1)

  document.title =
    "Documents | MSME Suraksha - React Admin & Dashboard Template"

  const dispatch = useDispatch()
  const GetDocument = useSelector(getGeneralDocumentsSelector)

  useEffect(() => {
    dispatch(getGeneralDoucments())
  }, [])

  const reciveDocument = item => {
    setSelectedFiles([...selectedFiles, ...item])
  }

  return (
    <React.Fragment>
      <UploadDocumentModel
        isOpen={modal1}
        toggle={toggleViewModal}
        Document={reciveDocument}
      />
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="General Documents"
            breadcrumbItem="General Documents"
          />

          <Row>
            <Col>
              <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn-rounded  mb-2 me-2"
                onClick={() => setModal1(true)}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Documents
              </Button>
            </div>
              
            </Col>
          </Row>
          <br />
          <Row>
            {GetDocument != undefined && GetDocument.length != 0 ? (
              GetDocument.map(item => {
                return (
                  <Col xl="4" sm="6" key={item}>
                    <Card>
                      <CardBody>
                        <Row className="align-items-center">
                          <Col md={4}>
                            <a href={item.url} rel="noreferrer" target="_blank">
                              <button
                                type="button"
                                className="btn btn-white"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="View Document"
                                rel="noreferrer"
                                target="_blank"
                              >
                                <img src={pdfImg} className="imgsizing" />
                              </button>
                            </a>
                          </Col>
                          <Col md={8}>
                            <b>{item.name}</b>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                )
              })
            ) : (
              <Card>
                <CardBody>
                  <Col md={12} className="text-center">
                    <p>No Files Uploaded</p>
                  </Col>
                </CardBody>
              </Card>
            )}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Document.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
}

export default withRouter(Document)
