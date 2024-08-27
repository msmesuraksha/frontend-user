import React, { useState } from "react"
import { FcCheckmark, FcClock, FcCancel } from "react-icons/fc";
import PropTypes from "prop-types"
import {
    Button,
    FormGroup,
    Input,
    Label,
    Modal,
    Card,
    CardBody,
    ModalBody,
    ModalFooter,
    ModalHeader, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Table,
    Row, Col
} from "reactstrap"
import { Link } from 'react-router-dom';
import moment from 'moment'

const CompnayViewDetails = props => {
    const { isOpen, toggle, selected, currenViewList, selectCompanySearchListMap } = props


    const [attachments, setAttachments] = useState([
        { name: 'document.pdf', type: 'application/pdf' },
        { name: 'image.jpg', type: 'image/jpeg' },
        { name: 'document.pdf', type: 'application/pdf' },
        { name: 'document.pdf', type: 'application/pdf' },
        { name: 'document.pdf', type: 'application/pdf' },
        { name: 'document.pdf', type: 'application/pdf' },
        // Add more attachments as needed
    ]);
    const [sellerattachments, setSellerattachments] = useState([
        { name: 'document.pdf', type: 'application/pdf' },
        { name: 'image.jpg', type: 'image/jpeg' },
        { name: 'document.pdf', type: 'application/pdf' },

        // Add more attachments as needed
    ]);
    const renderStarRating = (rating) => {
        const starCount = 5; // Number of stars
        const fullStarCount = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        const stars = [];

        for (let i = 0; i < fullStarCount; i++) {
            stars.push(<i key={i} className="fas fa-star"></i>);
        }

        if (hasHalfStar) {
            stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
        }

        const remainingStars = starCount - fullStarCount - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
        }

        return stars;
    };
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(null);
    // console.log("selectselecteded", selected)
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggleModal = () => setModalOpen(!modalOpen);

    const handleLevelSelection = (level) => {
        setSelectedLevel(level);
        toggleModal();
    };
    const isReferDisabled = selectedLevel === '';
    const existingReviews = [
        { rating: 3.5, comment: "I have been using this product for a while now, and I am incredibly impressed with its features and performance. From the moment I started using it, I could tell that the team behind this product is dedicated to delivering top-notch quality.!" },
        // { rating: 3, comment: "Average quality." },
        // ... other review objects
    ];

    const StatusOpinion = {
        APPROVED: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'red' }}> Complaint Approved : </b>
            From the information gathered thus far, BUYER seems to be a defaulter.</span>,
        COMPLAINT_APPROVED: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'red' }}> Complaint Approved : </b>
            From the information gathered thus far, BUYER seems to be a defaulter.</span>,
        PENDING: <span style={{ fontSize: '13px', }}> <b className="" style={{ color: ' #ff794d' }}> Awaiting Buyer Response : </b>
            If buyer does not respond within 4 days from the date of complaint, the case will be assessed based on information available and that time.
        </span>,
        DISPUTED: <span style={{ fontSize: '13px', }}> <b className="" style={{ color: 'red ' }}> Inconclusive : </b>
            The presented evidence is insufficient to definitively establish that the buyer is in default.</span>,
        BuyerMayBeaDefaulter: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>Buyer May Be a Defaulter : </b>
            Buyer has failed to respond despite repeated reminders OR Buyer has failed to provide sufficient proofs to demonstrate that he is not a defaulter.</span>,
        fraudulentComplaintSeller: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>Fraudulent Complaint Lodged by Seller : </b>
            The supplier has submitted false documents as part of their complaint.</span>,
        documentUnderVerification: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>Documents Under Verification : </b>
            The documents provided by both parties are currently under verification.</span>,
        Complaintsfiledwithoutevidence: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>Complaints Filed Without Sufficient Evidence : </b>Complaint filed without adequate evidence to support the claim.</span>,
        PENDING_INVESTIGATION: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>Pending Investigation : </b>
            The complaint is currently under investigation. Relevant parties are reviewing the evidence and assessing the situation.</span>,
        AWAITING_ADDITIONAL_DOCUMENTS: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>Awaiting Additional Documentation : </b>The complaint requires further documentation or evidence from either party. Once submitted, the process will continue.</span>,
        DOCUMENTS_NEEDED: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>Awaiting Additional Documentation : </b>The complaint requires further documentation or evidence from either party. Once submitted, the process will continue.</span>,
        DOCUMENTS_NOT_UPLOADED: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>Awaiting Additional Documentation : </b>The complaint requires further documentation or evidence from either party. Once submitted, the process will continue.</span>,
        ESCLATED_COMPLAIN: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>Complaint Escalated : </b>
            The complaint has escalated to a higher level due to complexity, urgency, or unresolved issues.</span>,
        FULLY_RESOLVED_PAYMENT_RECIEVED: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>Complaint Resolved : </b>
            The complaint has been successfully resolved, and the agreed-upon payment has been received by the relevant party.</span>,
        PARTIALLY_RESOLVED_PARTIAL_PAYMENT_RECEIVED: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>Partial payment received : </b>While the complaint is not fully resolved, progress has been made. A partial payment has been received, but further negotiations or actions are still required.</span>,
        PAYMENT_PENDING_AGREEMENT_REACHED: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>Payment Pending - Agreement Reached : </b>Both parties have reached an agreement, but the actual payment is pending. The resolution process is in its final stages.</span>,

    }

    const StatusOpinionInTable = {
        APPROVED: <td style={{ color: "red" }}> <b>{/* <FcCheckmark /> */}Complaint Approved </b></td>,
        COMPLAINT_APPROVED: <td style={{ color: "red" }}> <b>{/* <FcCheckmark /> */}Complaint Approved </b></td>,
        PENDING: <td style={{ color: "#ff794d" }}> <b>{/* <FcClock /> */} Awaiting Buyer Response</b></td>,
        DISPUTED: <td style={{ color: "red", filter: "2px" }}><b>{/* <FcCancel /> */} Inconclusive</b></td>,
        BuyerMayBeaDefaulter: <td style={{ color: 'red' }}><b>Buyer May Be a Defaulter</b></td>,
        fraudulentComplaintSeller: <td style={{ color: 'red' }}><b>Fraudulent complaint lodged by seller</b></td>,
        documentUnderVerification: <td style={{ color: 'blue' }}><b>Documents Under Verification</b></td>,
        AWAITING_REVIEW: <td style={{ color: 'blue' }}><b>Documents Under Verification</b></td>,
        Complaintsfiledwithoutevidence: <td style={{ color: '#ffc61a' }}><b>Complaints Filed Without Sufficient Evidence</b></td>,
        PENDING_INVESTIGATION: <td style={{ color: 'blue' }}><b>Pending Investigation</b></td>,
        AWAITING_ADDITIONAL_DOCUMENTS: <td style={{ color: 'blue' }}><b>Awaiting Additional Documentation</b></td>,
        DOCUMENTS_NOT_UPLOADED: <td style={{ color: 'blue' }}><b>Awaiting Additional Documentation</b></td>,
        DOCUMENTS_NEEDED: <td style={{ color: 'blue' }}><b>Awaiting Additional Documentation</b></td>,
        ESCLATED_COMPLAIN: <td style={{ color: 'blue' }}><b>Complaint Escalated</b></td>,
        FULLY_RESOLVED_PAYMENT_RECIEVED: <td style={{ color: 'green' }}><b>Complaint Resolved </b></td>,
        PARTIALLY_RESOLVED_PARTIAL_PAYMENT_RECEIVED: <td style={{ color: 'green' }}><b> Partial payment received</b></td>,
        PAYMENT_PENDING_AGREEMENT_REACHED: <td style={{ color: 'orange' }}><b>Payment Pending - Agreement Reached</b></td>,

    }

    return (
        <Modal
            isOpen={isOpen}
            role="dialog"
            autoFocus={true}
            centered={true}
            className="invoiceModal modal-xl"
            tabIndex="-1"
            toggle={toggle}
            size="xl"
        >
            <div className="modal-content">
                <ModalHeader toggle={toggle}>
                    <div className="modal-header-title me-auto "><b>Complaints Details</b></div>
                </ModalHeader>
                <ModalBody>
                    <Row >
                        {/*                         <Col md="12">
                            <Card className="mb-1">
                                <CardBody className="buyer-card-body">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <h5>
                                                    Date: <span className="text-primary">{selected != "" ? moment(selected.DueSince).format("DD-MM-YYYY") : ''}</span>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>

                                </CardBody>
                            </Card>
                        </Col> */}
                        <Col /* md="6" */ className="mt-4">

                            <Card className="mb-3">
                                <CardBody className="buyer-card-body">
                                    <h4>Complaints Against :-</h4>
                                    {/*                                 <p className="mb-2">
                                        Billing Name: <span className="text-primary">{selected != "" ? selected.CompanyName : ''}</span>
                                    </p> */}
                                    {console.log('selected', selected)}
                                    <p className="mb-2">
                                        <b>Buyer Name :</b>   <span className="text-primary">{selected != "" ? selected.FullName : ''}</span>
                                    </p>
                                    <p className="mb-2">
                                        <b>Company Name :</b>   <span className="text-primary">{selected != "" ? selected.CompanyName : ''}</span>
                                    </p>
                                    <p className="mb-2">
                                        <b> Address :</b> <span className="text-primary">{selected != "" && selected.address1 != undefined ? selected.address1 + ', ' : ''} {selected != "" && selected.address2 != undefined && selected.address2 != '' ? selected.address2 + ', ' : ''} {selected != "" ? selected.city : ''}, {selected != "" ? selected.state : ''} </span>
                                    </p>
                                    <p className="mb-2">
                                        <b>Mobile (Primary )  :</b> <span className="text-primary">{selected != "" ? selected.customerMobile : ''}</span>
                                    </p>
                                    <p className="mb-2">
                                        <b>Mobile (Secondary ) :</b> <span className="text-primary">{selected != "" ? selected?.secCustomerMobile : ''}</span>
                                    </p>
                                    <p className="mb-2">
                                        <b>Email :</b> <span className="text-primary">{selected != "" ? selected.email : ''}</span>
                                    </p>
                                    <p className="mb-2">
                                        <b>GST Number :</b> <span className="text-primary">{selected != "" ? selected.GST : ''}</span>
                                    </p>
                                    <p className="mb-2">
                                        <b>PAN Number :</b> <span className="text-primary">{selected != "" ? selected.PANCARD : ''}</span>
                                    </p>


                                </CardBody>
                            </Card>
                        </Col>

                        <Col /* md="6" */ className="mt-4" >
                            <Card className="mb-1 shadow-lg" >
                                <CardBody className="seller-card-body">
                                    <Row>
                                        <Col md={12}>
                                            <span style={{ fontSize: '13px', }}> <b className="" style={{ color: '#ffc61a ' }}>Member Rating : </b>
                                                The buyer's creditworthiness is depicted on a scale of 0 to 5, where zero signifies the lowest creditworthiness and five indicates the highest.</span>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            <Card className="mb-3 shadow-lg" style={{ height: "220px", overflow: "scroll", overflowX: "hidden" }}>
                                <CardBody className="seller-card-body" /* style={{ height: "270px", overflow: 'scroll', overflowX: 'hidden' }} */>
                                    <b className="mb-2" style={{ fontSize: '13px' }}>Status Definitions</b>


                                    <Row>
                                        <Col md={12}>
                                            <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'red' }}>1. Complaint Approved : </b>
                                                From the information gathered thus far, BUYER seems to be a defaulter.</span>
                                        </Col>
                                        <Col md={12}>
                                            <span style={{ fontSize: '13px', }}> <b className="" style={{ color: ' orange' }}>2. Awaiting Buyer Response : </b>
                                                If buyer does not respond within 4 days from the date of complaint, the case will be assessed based on information available and that time.</span>
                                        </Col>
                                        <Col md={12}>
                                            <span style={{ fontSize: '13px', }}> <b className="" style={{ color: 'blue ' }}>3. Inconclusive  : </b>
                                                The presented evidence is insufficient to definitively establish that the buyer is in default.</span>
                                        </Col>

                                        <Col md={12}>
                                            <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'red' }}>4. Buyer May Be a Defaulter : </b>
                                                Buyer has failed to respond despite repeated reminders OR Buyer has failed to provide sufficient proofs to demonstrate that he is not a defaulter.</span>
                                        </Col>
                                        <Col md={12}>
                                            <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'red' }}>5. Fraudulent Complaint Lodged by Seller : </b>
                                                The supplier has submitted false documents as part of their complaint.
                                            </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>6. Documents Under Verification : </b>
                                                The documents provided by both parties are currently under verification.
                                            </span>
                                        </Col>
                                        <Col md={12}>
                                            <span style={{ fontSize: '13px' }}> <b className="" style={{ color: '#ffc61a' }}>7. Complaints Filed Without Sufficient Evidence : </b>
                                                Complaint filed without adequate evidence to support the claim.
                                            </span>
                                        </Col>
                                        {/*             <Col md={12}>
                                            <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>8.Pending Investigation : </b>
                                                The complaint is currently under investigation. Relevant parties are reviewing the evidence and assessing the situation.
                                            </span>
                                        </Col> */}
                                        <Col md={12}>
                                            <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>8. Awaiting Additional Documentation : </b>
                                                The complaint requires further documentation or evidence from either party. Once submitted, the process will continue.
                                            </span>
                                        </Col>
                                        <Col md={12}>
                                            <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>9. Complaint Escalated : </b>
                                                The complaint has escalated to a higher level due to complexity, urgency, or unresolved issues.
                                            </span>
                                        </Col>
                                        <Col md={12}>
                                            <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'green' }}>10. Complaint Resolved
                                                : </b>
                                                The complaint has been successfully resolved, and the agreed-upon payment has been received by the relevant party.
                                            </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'green' }}>11. Partial Payment Received : </b>
                                                While the complaint is not fully resolved, progress has been made. A partial payment has been received, but further negotiations or actions are still required.                                    </span>
                                        </Col>
                                        <Col md={12}>
                                            <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'orange' }}>12. Payment Pending - Agreement Reached : </b>
                                                Both parties have reached an agreement, but the actual payment is pending. The resolution process is in its final stages.</span>
                                        </Col>
                                    </Row>


                                    {/* <Row className="mb-2"><Col md={3}><h5>2. InProcess :</h5></Col> <Col md={9}>The evaluation of the buyer's defaulter status is pending until their response is received or one week has passed from the complainant's date, whichever occurs first.
                                    </Col></Row> */}
                                    {/* <Row className="mb-2"><Col md={3}><h5>3. Disputed :</h5></Col> <Col md={9}>The presented evidence is insufficient to definitively establish that the buyer is in default</Col></Row> */}
                                    {/* <Row className="mb-2"><Col md={3}><h5>4. Reating :</h5></Col> <Col md={9}>The buyer's creditworthiness is depicted on a scale of 0 to 5, where zero signifies the lowest creditworthiness and five indicates the highest.</Col></Row> */}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>

                    </Row>
                    <Card className="mb-3 mt-4">
                        {currenViewList != undefined ? currenViewList.map((item, i) => {

                            if (item.latestStatus == undefined) return
                            if (item.latestStatus == "COMPLAINT_DELETED") return


                            let ratingValue = ''
                            const ratingArray = selectCompanySearchListMap.filter((value, index) => {
                                if (value.ratings != undefined && value.ratings.length > 0) {
                                    if (value.ratings[0].ratingCompany == item.id) {

                                        const ratingValues = value.ratings
                                            .filter((rating) => rating.question !== undefined && rating.question.questionType == "RATING")
                                            .map((rating) => Number(rating.response));

                                        if (ratingValues.length > 0) {
                                            const sumOfRatings = ratingValues.reduce((sum, rating) => sum + rating, 0);
                                            const numberOfRatings = ratingValues.length;
                                            const calculatedAverage = sumOfRatings / numberOfRatings;

                                            ratingValue = Math.min(calculatedAverage, 5).toFixed(2);
                                        }


                                    }
                                }
                            })
                            const totalAmount = item.latestStatus == "COMPLAINT_APPROVED" ? item.totalAmount : "*******"
                            let status = ''
                            let statusintable = ''

                            for (const key in StatusOpinion) {
                                if (key === item.latestStatus) {
                                    status = StatusOpinion[key];
                                    break;
                                }
                            }

                            for (const key in StatusOpinionInTable) {
                                if (key === item.latestStatus) {
                                    statusintable = StatusOpinionInTable[key];
                                    break;
                                }
                            }

                            return <CardBody className="invoice-items-card-body" key={i}>
                                {/* <h4>Seller Information</h4> */}
                                <div className="table-responsive">
                                    <Table className="table align-middle table-nowrap">
                                        <thead>
                                            <tr>
                                                <th scope="col">Buyer</th>
                                                <th scope="col">Seller</th>
                                                <th scope="col">Due Amount</th>
                                                <th scope="col">Due fROM</th>
                                                <th scope="col">Member Rating</th>
                                                <th scope="col">Status / Opinion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr >
                                                <td>{selected?.CompanyName}</td>
                                                <td>{item.companyName}</td>
                                                <td>{item.totalAmount != undefined ? totalAmount : ""}</td>
                                                <td>{item.dueFrom != undefined ? item.dueFrom : ""}</td>
                                                <td >{ratingValue}</td>
                                                {statusintable == '' && <td></td>}
                                                {statusintable}

                                            </tr>

                                        </tbody>
                                    </Table>
                                    {status != '' ? <Card>
                                        <Col /* md={12} */>
                                            {status}
                                        </Col>
                                    </Card> : ''}
                                </div>

                            </CardBody>
                        }) : ''}
                    </Card>
                    <p className="">Due From : The number of due days is calculated from date of oldest invoice.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="secondary" onClick={toggle}>
                        Close
                    </Button>
                </ModalFooter>
            </div>
        </Modal>
    )
}

CompnayViewDetails.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default CompnayViewDetails
