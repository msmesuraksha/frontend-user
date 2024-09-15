import PropTypes from "prop-types"
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

import { searchCompany as onsearchCompany } from "../../../src/store/actions";
//i18n
import { withTranslation } from "react-i18next"
import './Dashboard.css'
//redux
import { useSelector, useDispatch } from "react-redux"
import ReportMedefulterComponent from '../../pages/admin/ReportMeDefualter/ReportaMeDefaulter'
import { selectCompanyloding } from "store/auth/companySearch/companySearch.selecter"

import { Spinner } from "pages/admin/spinner/spinner"

import { ReportDebtor } from "pages/admin/Invoice/ReportaDebtor"
import { getData } from "store/utils/reducer/sessionStorage"

const Dashboard = props => {
  const companyIdSession = getData("COMPANY-ID")
  const companyid = companyIdSession
  const [isClickedToReported, setisClickedToReported] = useState(false);
  const [currentComany, setCurrentComany] = useState(companyid)

  const dispatch = useDispatch();

  const isLodingCompany = useSelector(selectCompanyloding)

  useEffect(() => {
    dispatch(onsearchCompany(currentComany));
  }, [currentComany])


  document.title = "Dashboard | MSME Suraksha"

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title"></div>
          <br />
          <br />
          <br />
          <Row>
            <Col md={8}>
            </Col>
            <Col md={4}>
            </Col>
          </Row>
          <br />
          <div style={{ border: "1px solid gray" }} className="p-3">
            <Row className="text-center" >
              <Col md={12}>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-info backtoHomeButton " style={{ background: isClickedToReported == false ? " #1aa3ff" : "	 #707274", border: "none", width: "" }} onClick={() => setisClickedToReported(false)} >Complaints Against Me</button>
                  <button type="button" className="btn btn-info  backtoHomeButton" style={{ background: isClickedToReported != false ? "#1aa3ff" : "	 #707274", border: "none", width: "" }} onClick={() => setisClickedToReported(true)} >My Complaints</button>
                </div>
              </Col>
              <Col md={12} className="">
                <div className="btn-group" role="group" aria-label="Basic example">
                  <span style={{ width: '70px', height: "5px", background: isClickedToReported == false ? " #1aa3ff" : "", marginRight: "30px", marginLeft: "30px" }}></span>
                  <span style={{ width: '70px', height: "5px", background: isClickedToReported != false ? " #1aa3ff" : "", marginLeft: "50px" }}></span>
                </div>
                <br />
              </Col>
            </Row>
            {isClickedToReported != true ?
              <Row style={{ display: 'contents' }} className="p-0">
                {isLodingCompany ? <Spinner /> : <ReportMedefulterComponent isClickedToReported={isClickedToReported} />}
              </Row>
              : <>
                <Row className="p-1 ml-5" style={{ display: 'contents' }}>
                  <ReportDebtor isClickedToReported={isClickedToReported} />
                </Row>
              </>
            }
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export const StatusAndOpinionObj = {
  APPROVED: 'COMPLAINT APPROVED',
  COMPLAINT_APPROVED: 'COMPLAINT APPROVED',
  REJECTED: 'INCONCLUSIVE',
  Esclate: 'COMPLAINT ESCALATED',
  PENDING: 'PENDING',
  AWAITING_REVIEW: "AWAITING REVIEW",
  RE_OPENED: 'COMPLAINT APPROVED',
  Requesttoadditionaldocumnet: 'AWAITING ADDITIONAL DOCUMENTATION',
  DOCUMENTS_NEEDED: 'AWAITING ADDITIONAL DOCUMENTATION',
  DOCUMENTS_NOT_UPLOADED: 'AWAITING ADDITIONAL DOCUMENTATION',
  BuyerMayBeaDefaulter: 'BUYER MAY BE A DEFAULTER',
  fraudulentComplaintSeller: 'FRAUDULENT COMPLAINT LODGED BY SELLER',
  Complaintsfiledwithoutevidence: 'COMPLAINTS FILED WITHOUT SUFFICIENT EVIDENCE',
  FULLY_RESOLVED_PAYMENT_RECIEVED: 'COMPLAINT RESOLVED',
  PARTIALLY_RESOLVED_PARTIAL_PAYMENT_RECEIVED: 'PARTIAL PAYMENT RECEIVED',
  PAYMENT_PENDING_AGREEMENT_REACHED: 'PAYMENT PENDING - AGREEMENT REACHED',
  DRAFT: 'DRAFT'
}

export const CapitalizeWords = (str) => {
  // Split the string into an array of words
  let words = str.split(" ");

  // Iterate over each word in the array
  for (let i = 0; i < words.length; i++) {
    // Capitalize the first letter of each word and make the rest of the letters lowercase
    words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
  }

  // Join the words back into a single string and return it
  return words.join(" ");
}

export const OneFirstCapitalizeWords = (str) => {
  // Split the string into an array of words
  let words = str.split(" ");

  // Iterate over each word in the array

  // Capitalize the first letter of each word and make the rest of the letters lowercase
  for (let i = 0; i < words.length; i++) {
    // Capitalize the first letter of each word and make the rest of the letters lowercase
    if (i == 0) {
      words[i] = words[0].charAt(0).toUpperCase() + words[0].substring(1);
    }
    if (i > 0) {
      words[i] = words[i].toLowerCase()
    }

  }

  // Join the words back into a single string and return it
  return words.join(" ");
}


Dashboard.propTypes = {
  t: PropTypes.any,
}

export default withTranslation()(Dashboard)
