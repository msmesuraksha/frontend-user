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
import { Link } from "react-router-dom"
import Chart from "chart.js"
import Creditors from "./users/creditors"
import Debtors from "./users/debtors"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import TableContainer from "../../components/Common/TableContainer"

import { CreditorsGraph } from "components/graph-components/creditors.componet"
import { getAllInvoice } from "../../../src/store/actions"
import { selectInvoiceList } from "store/debtors/debtors.selecter"
import { selectInvoiceListMap } from "store/debtors/debtors.selecter"
import moment from 'moment'
import {
  DebtorsGraph,
  sampleRepetedDebtors,
} from "components/graph-components/debtors.componet"
import { searchCompany as onsearchCompany } from "../../../src/store/actions";
import { CompanySerchForm } from "pages/admin/ApprovedTransaction/companySearchComponet"

//i18n
import { withTranslation } from "react-i18next"
import './Dashboard.css'
//redux
import { useSelector, useDispatch } from "react-redux"
import CurrencyFormat from 'react-currency-format';
// import { Creditor } from "pages/admin/DisputedBillings/disputedCol";
import ReportMedefulterComponent from '../../pages/admin/ReportMeDefualter/ReportaMeDefaulter'

import { SelectCompnay } from "store/selectCompany/selectCompany.selecter";
import { setSelectCopenOpen } from "store/selectCompany/selectCompany.actiontype";
import { numberFormat } from "pages/admin/uploadPendingDoucument/uploadPendingDoc"

import { selectCompanyloding } from "store/auth/companySearch/companySearch.selecter"

import { Spinner } from "pages/admin/spinner/spinner"
import {
  CheckBox,
  SrNo,
  PANCARD,
  AADHAR,
  GST,
  CompanyName,
  DueSince,
  DueAmount,
  Reating
} from "./companyssearchColl";

import { ReportDebtor } from "pages/admin/Invoice/ReportaDebtor"

const Dashboard = props => {
  const companyid = sessionStorage.getItem("COMPANY-ID")
  const [subscribemodal, setSubscribemodal] = useState(false)
  const [isreload, setisreload] = useState(false)
  const [filteredData, setFilteredData] = useState([]);
  const [getDaysArray, setgetDaysArray] = useState([]);
  const [isClickedToReported, setisClickedToReported] = useState(false);

  const [currentComany, setCurrentComany] = useState(companyid)
  const dispatch = useDispatch();

  const SelectCompnayOpen = useSelector(SelectCompnay)

  const isLodingCompany = useSelector(selectCompanyloding)

  const renderStarRating = rating => {
    const starCount = 5
    const fullStarCount = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    const stars = []

    for (let i = 0; i < fullStarCount; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>)
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>)
    }

    const remainingStars = starCount - fullStarCount - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>)
    }

    return stars
  }

  const GetAllInvoice = useSelector(selectInvoiceListMap)

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getAllInvoice());

    }, 2000);
    return () => clearTimeout(timer);
    // getDays()

  }, [])

  useEffect(() => {

    dispatch(onsearchCompany(currentComany));

    setFilteredData(GetAllInvoice ? GetAllInvoice : [])

  }, [currentComany, GetAllInvoice])
  const handleSignUp = () => {
    setSubscribemodal(false)
  }

  const handleFilterdata = (filters) => {
    if (GetAllInvoice) {
      if (filters === "") {
        setFilteredData(GetAllInvoice)
      } else {
        const filteredResults = GetAllInvoice.filter(item => {
          return item.debtor != null ? item.debtor.companyName.toLocaleLowerCase().includes(filters) : '';
        });
        setFilteredData(filteredResults);
      }
    }


  };

  const getDays = () => {
    GetAllInvoice != undefined ? GetAllInvoice.map((item) => {
      const a = moment(item.invoices[0].dueDate);
      const b = moment()
      const c = moment(b).diff(a)
      const d = moment.duration(c)
      if (getDaysArray.length != GetAllInvoice.length) {
        getDaysArray.push(d.days())

      }
    }) : []
  }

  document.title = "Dashboard | MSME Suraksha"


  const handleMainDashboard = () => {
    /*   sessionStorage.removeItem("tokenemployeeRegister") */
    dispatch(setSelectCopenOpen(!SelectCompnayOpen))
  };

  const DueSinceApprove = (cell) => {

    const valueFordate = cell.row.original?.dueFrom

    /*  const [startDate, setStartDate] = useState(new Date('1965-04-05')); */
    //const startDate = new Date('2019-10-07'); // October 7, 2019
    const today = new Date(); // Current date
    // const currentDate = moment(today).format('YYYY-MM-DD')
    const daysSince = daysSinceRefe(valueFordate, today);

    let badgeClassName = "font-size-11 badge ";
    if (daysSince > 1 && daysSince < 800) {
      badgeClassName += "bg-danger text-white";
    } else if (daysSince > 800) {
      badgeClassName += "bg-warning text-dark";
    } else {
      badgeClassName += "bg-danger text-white";
    }
    /*     const formattedDate = new Date(cell.value).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }); */

    const newDate = valueFordate != undefined ? valueFordate.split("-").reverse().join("-") : "";
    const currentDate = new Date(newDate);
    let e = ''
    const calculateDateDifference = () => {
      const differenceInMilliseconds = today - currentDate;
      const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
      e = differenceInDays
      return differenceInDays;

    };
    const divStyle = {
      padding: '3px' // Adjust the padding value as needed
    };

    return (
      <div className=" text-center  p-1 rounded " style={{
        background: e < 30 ? "#FDFDFD" : e > 30 && e < 90 ? "#ffff80" : e > 90 && e < 180 ? " #ff944d" : " #ff4d4d",
        color: e < 30 ? "#000" : e > 30 && e < 90 ? "#000" : e > 90 && e < 180 ? " #FAFAFA" : " #FAFAFA"
      }}>
        {(
          <>
            <div style={divStyle}>({calculateDateDifference()} days)</div>
            <div style={divStyle}>{cell.row.original?.dueFrom}</div>
          </>
        )}

      </div>
    );
  };

  const daysSinceRefe = (cellValue, referenceDate) => {

    if (cellValue) {
      // Split the date string into day, month, and year components
      const [dayStr, monthStr, yearStr] = cellValue.split('-');

      // Convert the string components into integers
      const day = parseInt(dayStr, 10);
      const month = parseInt(monthStr, 10) - 1; // Months are zero-based (0 = January, 1 = February, ...)
      const year = parseInt(yearStr, 10);

      // Create a new Date object using the parsed components
      const currentDate = new Date(year, month, day);
      const timeDifference = referenceDate - currentDate;
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      return daysDifference;
    }
    return '';
  };

  const columns = useMemo(
    () => [
      {
        Header: "Sr No",
        accessor: "SrNo",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return <div
            className="company-name-cell"
            style={{ cursor: 'pointer' }}
          >
            {cellProps.data.length - cellProps.cell.row.index}
          </div>;
        },
      },
      {
        Header: "Buyer Name",
        accessor: "customerName",
        disableFilters: true,
        filterable: true,
        Cell: cellProps => {
          return <span className="text-capitalize">
            {cellProps.cell.row.original.customerName}
          </span>
        },
      },
      {
        Header: "Invoice Number",
        accessor: "invoiceList",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div>{cellProps.cell.row.original.invoiceList}
            {/* {cellProps.cell.row.original.invoices.map((x, i) => {
              return <span key={x}>{i > 0 ? ', ' : ''}{x.invoiceNumber}</span>
            })} */}
          </div>
        },
      },
      {
        Header: "Address",
        accessor: "Address",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div style={{ width: "200px" }}>             {cellProps.cell.row.original.Address}

            {/* {cellProps.cell.row.original.debtor != null ? <> {cellProps.cell.row.original.debtor.address1 != undefined ? cellProps.cell.row.original.debtor.address1 + ',' : ""}{cellProps.cell.row.original.debtor.address2 != undefined ? cellProps.cell.row.original.debtor.address2 + ',' : ""}
              {cellProps.cell.row.original.debtor.city} <br />      {cellProps.cell.row.original.debtor.state}</> : ""} */}
          </div>
        },
      },
      {
        Header: "Due From",
        accessor: "dueFrom",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <DueSinceApprove {...cellProps} />;
        },
      },
      {
        Header: "Due Amount",
        accessor: "totalAmount",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <span>
            {numberFormat(cellProps.cell.row.original.totalAmount)}
          </span>
        },
      },
      {
        Header: "Status",
        accessor: "rating",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <span className={cellProps.cell.row.original?.status == undefined ? 'text-success h6' : 'text-danger h6'}>
            {cellProps.cell.row.original?.status == undefined ? "Approved" : cellProps.cell.row.original?.status} </span>
        },
      },

    ],
    []
  );
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
              {/* <Link to="/companies">
                <Button style={{ float: 'right' }} className="'btn bg-primary" onClick={() => {
                  handleMainDashboard()
                }}>
                  <i className='bx bx-arrow-back p-1'></i>Change Company
                </Button>
              </Link> */}

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

              <Row style={{}} className="p-0">
                {isLodingCompany ? <Spinner /> : <ReportMedefulterComponent isClickedToReported={isClickedToReported} />}


              </Row>
              : <>
                {GetAllInvoice != undefined ? <Row className="p-1 ml-5">
                  <ReportDebtor isClickedToReported={isClickedToReported} />


                </Row> : ""}
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
  RE_OPENED: 'RE-OPENED',
  Requesttoadditionaldocumnet: 'AWAITING ADDITIONAL DOCUMENTATION',
  DOCUMENTS_NEEDED: 'AWAITING ADDITIONAL DOCUMENTATION',
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


Dashboard.propTypes = {
  t: PropTypes.any,
}

export default withTranslation()(Dashboard)
