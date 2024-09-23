import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Container,
  Button,
  CardHeader,
} from "reactstrap";

import UploadDocumentModel from './uploadDocumentsmodel'
import { useDispatch, useSelector } from "react-redux";
import { getGeneralDoucments } from "../../../../store/Documents/documents.actions"
import { getGeneralDocumentsSelector } from "../../../../store/Documents/documents.selector"
import pdfImg from '../../../../assets/images/newImg/pdf.png'
import './Gallary.css'

const Document = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [modal1, setModal1] = useState(false);
  const toggleViewModal = () => setModal1(!modal1);

  document.title = "Documents | MSME Suraksha - React Admin & Dashboard Template";

  const dispatch = useDispatch();
  const GetDocument = useSelector(getGeneralDocumentsSelector);

  useEffect(() => {
    dispatch(getGeneralDoucments())
  }, [])

  const reciveDocument = (item) => {
    setSelectedFiles([...selectedFiles, ...item]);
  }

  return (
    <React.Fragment>
      <UploadDocumentModel isOpen={modal1} toggle={toggleViewModal} Document={reciveDocument} />
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col md="10"></Col>
            <Col md="2">
              <Button onClick={() => setModal1(true)} className="btn btn-info" style={{ fontSize: '12px', display: 'flex', padding: '10px' }}>
                + Upload Documents
              </Button>
            </Col>
          </Row>
          <br />
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader>
                  <h5>General Documents</h5>
                </CardHeader>
                <CardBody>

                  <div className="gallery mt-3 mr-5">
                    <div className="row">
                      <Row>
                        {GetDocument != undefined && GetDocument.length != 0 ?
                          GetDocument.map((item) => {
                            return <Col md={3} key={item}>
                              <Row>
                                <Col md={4} className="text-end p-3">
                                  <a href={item.url} rel='noreferrer' target='_blank'>
                                    <button type="button" className="btn btn-white" data-toggle="tooltip" data-placement="top" title="View Document" rel='noreferrer' target='_blank'>
                                      <img src={pdfImg} className="imgsizing" />
                                    </button>
                                  </a>
                                </Col>
                                <Col md={8} className="pt-3">
                                  <b>{item.name}</b>

                                </Col>
                              </Row>
                            </Col>
                          }) : <Col md={12} className="text-center">
                            <p>No Files Uploaded</p>
                          </Col>
                        }

                      </Row>

                    </div>
                  </div>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Document.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(Document);
