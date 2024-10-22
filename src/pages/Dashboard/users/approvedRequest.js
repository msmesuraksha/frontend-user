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
//Import Breadcrumb
import TableContainer from "../../../components/Common/TableContainer"

import Breadcrumbs from "../../../components/Common/Breadcrumb"

import { getAllInvoice } from "../../../store/actions"
import { selectInvoiceList } from "store/debtors/debtors.selecter"
import moment from "moment"

import { searchCompany as onsearchCompany } from "../../../store/actions"

//i18n
import { withTranslation } from "react-i18next"
import "../Dashboard.css"
//redux
import { useSelector, useDispatch } from "react-redux"
import ApprovedReportMeDefaulterComponent from "../../../pages/admin/ReportMeDefualter/ApprovedTransactioncomplaintAgainstme"
import ApprovedRaiseTicketModel from "../../admin/ReportMeDefualter/ApprovedRaiseTicketModel"

import { SelectCompnay } from "store/selectCompany/selectCompany.selecter"
import { setSelectCopenOpen } from "store/selectCompany/selectCompany.actiontype"
import { numberFormat } from "pages/admin/uploadPendingDoucument/uploadPendingDoc"

import { selectCompanyloding } from "store/auth/companySearch/companySearch.selecter"
import {
  setUploadFilesOpen,
  setCACertificateOpen,
  requestInvoiceDefEdit,
  setIsViewDetailModalOpen,
  markAsDisputedModalOpenAction,
} from "../../../store/debtors/debtors.actions"
import {
  uploadFilesModalOpen,
  selectCACertificateOpen,
  isViewDetailMOdalOpenSelector,
  markAsDisputedModalOpenSelector,
} from "store/debtors/debtors.selecter"
import { Spinner } from "pages/admin/spinner/spinner"

import { selectCompaintsByMes } from "store/ApprovedReportMeDefulter/ApprovedReportMeDefulter.selecter"

import { fetchApproveReportMeDefaulterStart } from "store/ApprovedReportMeDefulter/ApprovedReportMeDefulter.action"
import { getData } from "store/utils/reducer/sessionStorage"

const ApprovedTransaction = props => {
  const companyIdSession = getData("COMPANY-ID")
  const companyid = companyIdSession
  const [subscribemodal, setSubscribemodal] = useState(false)
  const [isreload, setisreload] = useState(false)
  const [filteredData, setFilteredData] = useState([])
  const [getDaysArray, setgetDaysArray] = useState([])
  const [isClickedToReported, setisClickedToReported] = useState(false)

  const [currentIndexData, setCurrentIndexData] = useState([])

  const dispatch = useDispatch()

  const SelectCompnayOpen = useSelector(SelectCompnay)

  const isLodingCompany = useSelector(selectCompanyloding)

  const selectCompaintsByMeList = useSelector(selectCompaintsByMes)

  useEffect(() => {
    dispatch(fetchApproveReportMeDefaulterStart())
  }, [])

  const handleSignUp = () => {
    setSubscribemodal(false)
  }

  const markAsDisputed = useSelector(markAsDisputedModalOpenSelector)
  const toggleMarkAsDisputed = () =>
    dispatch(markAsDisputedModalOpenAction(!markAsDisputed))
  const getDays = () => {
    selectCompaintsByMeList != undefined
      ? selectCompaintsByMeList.map(item => {
          const a = moment(item.invoices[0].dueDate)
          const b = moment()
          const c = moment(b).diff(a)
          const d = moment.duration(c)
          if (getDaysArray.length != selectCompaintsByMeList.length) {
            getDaysArray.push(d.days())
          }
        })
      : []
  }

  document.title = "ApprovedTransaction | MSME Suraksha"

  const handleMainDashboard = () => {
    /*   sessionStorage.removeItem("tokenemployeeRegister") */
    dispatch(setSelectCopenOpen(!SelectCompnayOpen))
  }

  const viewModel = value => {
    setCurrentIndexData(value)
    toggleMarkAsDisputed()
  }

  const DueSinceApprove = cell => {
    const valueFordate = cell.row.original?.dueFrom

    /*  const [startDate, setStartDate] = useState(new Date('1965-04-05')); */
    //const startDate = new Date('2019-10-07'); // October 7, 2019
    const today = new Date() // Current date
    // const currentDate = moment(today).format('YYYY-MM-DD')
    const daysSince = daysSinceRefe(valueFordate, today)

    let badgeClassName = "font-size-11 badge "
    if (daysSince > 1 && daysSince < 800) {
      badgeClassName += "bg-danger text-white"
    } else if (daysSince > 800) {
      badgeClassName += "bg-warning text-dark"
    } else {
      badgeClassName += "bg-danger text-white"
    }
    /*     const formattedDate = new Date(cell.value).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }); */

    const newDate =
      valueFordate != undefined
        ? valueFordate.split("-").reverse().join("-")
        : ""
    const currentDate = new Date(newDate)
    let e = ""
    const calculateDateDifference = () => {
      const differenceInMilliseconds = today - currentDate
      const differenceInDays = Math.floor(
        differenceInMilliseconds / (1000 * 60 * 60 * 24)
      )
      e = differenceInDays
      return differenceInDays
    }
    const divStyle = {
      padding: "1px",
      fontSize: "12px", // Adjust the padding value as needed
    }

    return (
      <div
        className=""
        style={{
          padding: "2px 2px",
          fontSize: "12px",
          width: "90px",
          margin: "0px",
        }}
      >
        <div
          className=" text-center  p-1 rounded "
          style={{
            background:
              calculateDateDifference() < 30
                ? "#FDFDFD"
                : calculateDateDifference() >= 30 &&
                  calculateDateDifference() < 90
                ? "#ffff80"
                : calculateDateDifference() > 90 &&
                  calculateDateDifference() < 180
                ? " #ff944d"
                : " #ff4d4d",
            color:
              calculateDateDifference() < 30
                ? "#000"
                : calculateDateDifference() >= 30 &&
                  calculateDateDifference() < 90
                ? "#000"
                : calculateDateDifference() > 90 &&
                  calculateDateDifference() < 180
                ? " #FAFAFA"
                : " #FAFAFA",
          }}
        >
          <div className="text-capitalize">
            {calculateDateDifference()} &nbsp;
            <span className="ml-1">Days</span>{" "}
          </div>
          <div className="text-capitalize">
            {cell.cell.row.original.dueFrom}
          </div>
        </div>
      </div>
    )
  }

  const daysSinceRefe = (cellValue, referenceDate) => {
    if (cellValue) {
      // Split the date string into day, month, and year components
      const [dayStr, monthStr, yearStr] = cellValue.split("-")

      // Convert the string components into integers
      const day = parseInt(dayStr, 10)
      const month = parseInt(monthStr, 10) - 1 // Months are zero-based (0 = January, 1 = February, ...)
      const year = parseInt(yearStr, 10)

      // Create a new Date object using the parsed components
      const currentDate = new Date(year, month, day)
      const timeDifference = referenceDate - currentDate
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      return daysDifference
    }
    return ""
  }

  const columns = useMemo(
    () => [
      {
        Header: "Sr No.....",
        accessor: "SrNo",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return <div>{cellProps.data.length - cellProps.cell.row.index}</div>
        },
      },
      {
        Header: "complaint DATE",
        accessor: "",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return (
            <div>
              {moment(cellProps.cell?.row?.original?.createdAt).format(
                "DD-MM-YYYY"
              )}
            </div>
          )
        },
      },
      {
        Header: "complaint no.",
        accessor: "complaintNumber",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div>{cellProps.cell?.row?.original?.complaintNumber}</div>
        },
      },
      {
        Header: "Buyer Name",
        accessor: "customerName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return (
            <div>
              {CapitalizeWords(
                cellProps.cell.row.original.defaulterEntry?.debtor?.companyName
              )}
            </div>
          )
        },
      },
      {
        Header: "Invoice No.",
        accessor: "invoiceList",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return (
            <div>
              {cellProps.cell.row.original.defaulterEntry.invoices.map(
                (x, i) => {
                  return (
                    <span key={x}>
                      {i > 0 ? ", " : ""}
                      {x.invoiceNumber}
                    </span>
                  )
                }
              )}
            </div>
          )
        },
      },
      {
        Header: "Address",
        accessor: "Address",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          const address =
            cellProps.cell.row.original.Address.substring(0, 30) + "..."
          return (
            <div style={{ width: "180px" }}>
              {address}
              {/* {cellProps.cell.row.original.defaulterEntry.debtor.address2} */}
            </div>
          )
        },
      },
      {
        Header: "Due Amount",
        accessor: "totalAmountPaid",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return (
            <div className="text-end">
              {numberFormat(cellProps.cell.row.original.totalAmount)}
            </div>
          )
        },
      },
      {
        Header: "Due From *",
        accessor: "dueFrom",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <DueSinceApprove {...cellProps} />
        },
      },
      {
        Header: "STATUS / OPINION",
        accessor: "statuss",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div>Complaint Approved</div>
        },
      },

      {
        Header: "Action",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          return (
            <div style={{ width: "180px" }}>
              <div className="pt-2">
                <Button
                  onClick={() => viewModel(cellProps.cell.row.original)}
                  className="btn btn-sm btn-info"
                >
                  Reopen This Ticket
                </Button>
              </div>
            </div>
          )
        },
      },
    ],
    []
  )
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Company Approved Transaction"
            breadcrumbItem="Company Approved Transaction"
          />
          {markAsDisputed && (
            <ApprovedRaiseTicketModel
              isOpen={markAsDisputed}
              toggle={toggleMarkAsDisputed}
              currentIndexData={currentIndexData}
              requestType={"DEBTOR"}
            />
          )}
          <Card>
            {isLodingCompany ? (
              <Spinner />
            ) : (
              <CardBody>
                <div style={{ border: "1px solid gray" }} className="p-3">
                <Row className="text-center">
                  <Col md={12}>
                    <div
                      className="btn-group buttonWidth"
                      role="group"
                      aria-label="Basic example"
                    >
                      <Button
                        type="button"
                        className="btn btn-info backtoHomeButton "
                        style={{
                          background:
                            isClickedToReported == false
                              ? " #50a5f1"
                              : "	 #707274",
                          border: "none",
                          width: "",
                        }}
                        onClick={() => setisClickedToReported(false)}
                      >
                        Complaints Against Me
                      </Button>
                      <Button
                        type="button"
                        className="btn btn-info  backtoHomeButton"
                        style={{
                          background:
                            isClickedToReported != false
                              ? "#50a5f1"
                              : "	 #707274",
                          border: "none",
                          width: "",
                        }}
                        onClick={() => setisClickedToReported(true)}
                      >
                        My Complaints
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
                            isClickedToReported == false ? " #1aa3ff" : "",
                          marginRight: "30px",
                          marginLeft: "30px",
                        }}
                      ></span>
                      <span
                        style={{
                          width: "70px",
                          height: "5px",
                          background:
                            isClickedToReported != false ? " #1aa3ff" : "",
                          marginLeft: "50px",
                        }}
                      ></span>
                    </div>
                    <br />
                  </Col>
                </Row>
                  {isClickedToReported != true ? (
                    <Row style={{ display: "contents" }} className="p-0">
                      <ApprovedReportMeDefaulterComponent
                        isClickedToReported={isClickedToReported}
                      />
                    </Row>
                  ) : (
                    <>
                      <Row className="p-0 ml-5">
                        <TableContainer
                          columns={columns}
                          data={selectCompaintsByMeList}
                          isGlobalFilter={true}
                          isAddOptions={false}
                          customPageSize={10}
                        />
                      </Row>
                    </>
                  )}
                  <p className="">
                    Due From : The number of due days is calculated from date of
                    oldest invoice.
                  </p>
                </div>
              </CardBody>
            )}
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export const CapitalizeWords = str => {
  // Split the string into an array of words
  if (!str) return
  let words = str.split(" ")

  // Iterate over each word in the array
  for (let i = 0; i < words.length; i++) {
    // Capitalize the first letter of each word and make the rest of the letters lowercase
    words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1)
  }

  // Join the words back into a single string and return it
  return words.join(" ")
}

ApprovedTransaction.propTypes = {
  t: PropTypes.any,
}

export default withTranslation()(ApprovedTransaction)
