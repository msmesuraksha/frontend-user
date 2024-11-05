import React, { useState, useEffect, useMemo } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import Select, { components } from "react-select"

import ReportedDefaulterModel from "../Invoice/ReportDefaulterModel"
import UploadCACertificateModel from "../Invoice/uploadCACertificateModel"

import "react-table-6/react-table.css"
import ReactTable from "react-table-6"
import CurrencyFormat from "react-currency-format"
// import ReactTooltip from "react-tooltip";
/* import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton"; */
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
import TableContainer from "../../../components/Common/TableContainer"
import { getInvoices as ongetInvoices } from "../../../store/actions"
import { useDispatch, useSelector } from "react-redux"
import { success } from "toastr"
//import { getAllInvoice as ongetAllInvoice } from '../../../../src/store/actions'
import {
  getAllInvoice,
  setIsReportDefOpen,
  setUploadFilesOpen,
  setCACertificateOpen,
  requestInvoiceDefEdit,
  setIsViewDetailModalOpen,
  setRequestEditModalOpen,
} from "../../../store/debtors/debtors.actions"
import {
  selectReportDefOpen,
  selectInvoiceList,
  uploadFilesModalOpen,
  selectCACertificateOpen,
  requestEditSelector,
  isViewDetailMOdalOpenSelector,
  requestModelSelector,
  selectInvoiceListMap,
} from "store/debtors/debtors.selecter"
import UploadPendingFiles from "../Invoice/uploadFilesModal"
import moment from "moment"
import { ToastContainer, toast } from "react-toastify"
import ViewDetailsReportDefaultModal from "../Invoice/viewDetailsReportDefaultModal"
// import CaImg from '../../../assets/images/newImg/ca.png'
import RecordPayImg from "../../../assets/images/newImg/credit-card.png"
import fileImg from "../../../assets/images/newImg/file (1).png"
import fileImg2 from "../../../assets/images/newImg/file.png"
import CaImg from "../../../assets/images/newImg/CA-BG_Remove.png"
import profileimg from "../../../assets/images/newImg/profile.png"
import { numberFormat } from "../uploadPendingDoucument/uploadPendingDoc"

import "./style.css"
// import { ToastContainer } from "react-toastify"

import { DueAmount, SrNo } from ".././company-search/companyssearchColl"

import { CapitalizeWords } from "pages/Dashboard"

import { deleteInvoiceStart } from "store/inviceDelete/inviceDelete.action"

import { InvoiceDeletePop } from "../Invoice/invoiceDeletePop"

import { StatusAndOpinionObj } from "pages/Dashboard"

import ViewDetailsOrderManagementModal from "./viewModuleOrder"

export const SalesOrderModule = props => {
  const [modal1, setModal1] = useState(false)
  const [getDaysArray, setgetDaysArray] = useState([])
  const [modal2, setModal2] = useState(false)
  const [modal3, setModal3] = useState(false)
  const [selected, setSelected] = useState("")
  const [customerType, setCustomerType] = useState()
  const toggleViewModal = () => setModal1(!modal1)
  const toggleViewModal1 = () => setModal2(!modal2)
  //const [modal4, setModal4] = useState(false);
  /*   */
  const dispatch = useDispatch()
  const [viewModalData, setViewModalData] = useState("")

  const isViewDetailModal = useSelector(isViewDetailMOdalOpenSelector)
  const isRequestEditModalOpen = useSelector(requestModelSelector)
  const isReportDefOpen = useSelector(selectReportDefOpen)
  const uploadFilesModalShow = useSelector(uploadFilesModalOpen)
  const selectCACertificate = useSelector(selectCACertificateOpen)

  const toggleViewModal2 = () =>
    dispatch(setCACertificateOpen(!selectCACertificate))
  const toggleViewModal3 = () => pGErElo()
  const toggleUploiadFiles = () =>
    dispatch(setUploadFilesOpen(!uploadFilesModalShow))
  const toggleDetailView = () =>
    dispatch(setIsViewDetailModalOpen(!isViewDetailModal))
  const toggleReqEdit = () =>
    dispatch(setRequestEditModalOpen(!isRequestEditModalOpen))
  const [isRequestedEdit, setisRequestedEdit] = useState(false)

  const GetAllInvoice = useSelector(selectInvoiceListMap)

  const pGErElo = () => {
    dispatch(setIsReportDefOpen(!isReportDefOpen))
    // window.location.reload()
  }

  useEffect(() => {
    dispatch(getAllInvoice())
    dispatch(setIsViewDetailModalOpen())
    dispatch(setRequestEditModalOpen())

    getDays()
  }, [])

  const viewModel = value => {
    setSelected(value)
    setModal2(true)
  }

  const viewModels = value => {
    setModal3(true)
  }

  const additionalValue = "Hello from additional prop!"
  const [invoiceIdsForCAcertificate, setinvoiceIdsForCAcertificate] =
    useState("")
  const [filteredData, setFilteredData] = useState([])
  const handleReportDefaulter = () => {
    // window.location.href = "/ReportDefaulter"
    //setModal4(true)
    dispatch(setIsReportDefOpen(!isReportDefOpen))
  }

  /*   const handleViewDetail = (item) => {
  
          // window.location.href = "/ReportDefaulter"
          //setModal4(true)
          setViewModalData(item)
          dispatch(setIsViewDetailModalOpen(!isViewDetailModal))
  
      } */

  const [uploadFilesModelDataForUpload, setuploadFilesModelDataForUpload] =
    useState("")

  const handleUploadFiles = item => {
    setuploadFilesModelDataForUpload(item)
    dispatch(setUploadFilesOpen(!uploadFilesModalShow))
  }
  const getDays = () => {
    GetAllInvoice != undefined
      ? GetAllInvoice.map(item => {
          const a = moment(item.invoices[0].dueDate)
          const b = moment()
          const c = moment(b).diff(a)
          const d = moment.duration(c)

          if (getDaysArray.length != GetAllInvoice.length) {
            getDaysArray.push(d.days())
          }
        })
      : []
  }
  const RequestEditData = useSelector(requestEditSelector)
  const [requestedData, setrequestedData] = useState("")

  const requestEdit = item => {
    setrequestedData(item)
    dispatch(setRequestEditModalOpen(!isRequestEditModalOpen))
    const payload = {
      invoiceId: item.invoices[0].invoiceNumber,
    }

    setisRequestedEdit(true)

    // dispatch(requestInvoiceDefEdit(payload))
  }

  const handleFilterdata = filters => {
    if (GetAllInvoice) {
      if (filters === "") {
        const revArr = GetAllInvoice.reverse()
        setFilteredData(revArr)
      } else {
        const filteredResults = GetAllInvoice.filter(item => {
          return item.debtor.companyName.toLocaleLowerCase().includes(filters)
        })
        setFilteredData(filteredResults)
      }
    }
  }

  const DueSincedate = cell => {
    const today = new Date()
    const currentDate = new Date(cell.cell.row.original.debtor.createdAt)
    let e = ""
    const calculateDateDifference = () => {
      const differenceInMilliseconds = today - currentDate
      const differenceInDays = Math.floor(
        differenceInMilliseconds / (1000 * 60 * 60 * 24)
      )
      e = differenceInDays
      return differenceInDays
    }

    return (
      <div
        className=""
        style={{ padding: "2px 2px", fontSize: "12px", width: "100px" }}
      >
        <div
          className=" text-center  p-1 rounded "
          style={{
            background:
              e < 30
                ? "#FDFDFD"
                : e > 30 && e < 90
                ? "#ffff80"
                : e > 90 && e < 180
                ? " #ff944d"
                : " #ff4d4d",
            color:
              e < 30
                ? "#000"
                : e > 30 && e < 90
                ? "#000"
                : e > 90 && e < 180
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

  const DueSinceApprove = cell => {
    const valueFordate = cell.row.original?.dueFrom
    /*  const [startDate, setStartDate] = useState(new Date('1965-04-05')); */
    //const startDate = new Date('2019-10-07'); // October 7, 2019
    const today = new Date() // Current date
    // const currentDate = moment(today).format('YYYY-MM-DD')
    const daysSince = daysSinceRefe(valueFordate, today)

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
      padding: "3px", // Adjust the padding value as needed
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
    if (cellValue != undefined) {
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
        Header: "Sr No",
        accessor: "SrNo",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return (
            <div className="company-name-cell" style={{ width: "15px" }}>
              {cellProps.data.length - cellProps.cell.row.index}
            </div>
          )
        },
      },
      {
        Header: "Order no.",
        accessor: "complaintNumber",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div style={{ width: "120px" }}>{cellProps.cell?.row?.original?.complaintNumber}</div>
        },
      },
      {
        Header: "Order Date",
        accessor: "dueFrom",
        disableFilters: true,
        filterable: false,

        Cell: cellProps => {
          return (
            <div style={{ width: "80px" }}>
              {" "}
              {cellProps.cell?.row?.original?.dueFrom}
            </div>
          )
        },
      },
      {
        Header: "BUYER NAME",
        accessor: "customerName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return (
            <div style={{ width: "110px" }} className="text-capitalize">
              {cellProps.cell?.row?.original?.customerName}
            </div>
          )
        },
      },
      {
        Header: "ADDRESS",
        accessor: "Address",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          const address =
            cellProps.cell.row.original.Address.length > 30
              ? cellProps.cell.row.original.Address.substring(0, 30) + "..."
              : cellProps.cell.row.original.Address
          return <div style={{ width: "150px" }}>{address}</div>
        },
      },
      {
        Header: "Item",
        accessor: "invoiceList",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return (
            <div className="" style={{ width: "100px" }}>
              {cellProps.cell.row.original.invoiceList}
              {/* {cellProps.cell.row.original?.invoices.map((x, i) => {
              return <div key={x} className="d-flex">
                < >{x.invoiceNumber } {i != cellProps.cell.row.original.invoices.length-1 ? ",":''} </>
              </div>

            })} */}
            </div>
          )
        },
      },
      {
        Header: "Quantity",
        accessor: "totalAmount",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return (
            <div style={{ width: "" /* textAlign: 'right' */ }}>
              {cellProps.cell?.row?.original?.totalAmount}
            </div>
          )
        },
      },
      {
        Header: "Unit",
        accessor: "",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div style={{ width: "" /* textAlign: 'right' */ }}>Bls</div>
        },
      },
      {
        Header: "Rate",
        accessor: "",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return (
            <div style={{ width: "", textAlign: "right" }}>
              <DueAmount {...cellProps} />
            </div>
          )
        },
      },
      {
        Header: "Taxes",
        accessor: "",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div style={{ width: "", textAlign: "right" }}>16%</div>
        },
      },
      {
        Header: "STATUS",
        accessor: "STATUS",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return (
            <div className="text-capitalize">
              <span
                style={{
                  color: checkColor(cellProps.cell.row.original?.status),
                }}
              >
                {cellProps.cell.row.original?.status}
              </span>
            </div>
          )
        },
      },
      {
        Header: "ACTION",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          return (
            <div className="d-flex">
              <Row
                className="text-center"
                style={{ gap: "0.1rem", flexWrap: "nowrap" }}
              >
                <Col className="p-1">
                  <Button
                    type="button"
                    className="btn btn-info"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="View Details"
                    href={cellProps.cell.row.original?.url}
                    rel="noreferrer"
                    target="_blank"
                    onClick={() =>
                      handleViewDetail(cellProps.cell.row.original)
                    }
                  >
                    <i className="fa fa-eye textsizing"></i>

                    {/* <img src={profileimg} className="iconsImage"/> */}
                  </Button>
                </Col>
                {/* <Col className="p-1">
                                    <Button type="button" style={{ color: '#FAFAFA', }} className="btn btn-info" data-toggle="tooltip" data-placement="top"
                                        title="Delete Invoice"

                                        onClick={() => openDeletePop(cellProps.cell.row.original)}>
                                        <i className="fa fa-trash textsizing"></i>

                                        


                                    </Button>

                                </Col> */}
              </Row>
            </div>
          )
        },
      },
    ],
    []
  )

  const checkColor = text => {
    if (text === "Approved") return "green"
    if (text === "Pending your confirmation") return "orange"
    if (text === "Pending buyer confirmation") return "blue"
    if (text === "cancelled") return "red"
    if (text === "Reject") return "blue"
  }

  const dummyData = [
    {
      SrNo: 1,
      customerName: "anand",
      id: "669931451503057df7bbe168",
      invoices: [
        {
          _id: "669931451503057df7bbe165",
          billDate: "2024-07-18",
          billDescription: "Bill for things",
          billNumber: null,
          creditAmount: 1258,
          remainingAmount: 1258,
          interestRate: null,
          creditLimitDays: null,
          remark: "",
          items: [],
          subTotal: 1258,
          tax: null,
          referenceNumber: "",
          invoiceNumber: "inc-1",
          dueDate: "2024-07-10T00:00:00.000Z",
          percentage: "",
          type: "EXTERNAL",
          purchaseOrderDocument: null,
          challanDocument: null,
          invoiceDocument: {
            _id: "669930910deb82e2e0bcd173",
            userId: "6688c0b8a17e2168679a1905",
            name: "dummy.pdf",
            url: "https://msmesurakshabackend.blob.core.windows.net/uploaded-files-container/1721315473003-33cdd7df3b907fbc-dummy.pdf",
            uniqueName: "1721315473003-33cdd7df3b907fbc-dummy.pdf",
            createdAt: "2024-07-18T15:11:13.702Z",
            updatedAt: "2024-07-18T15:11:13.702Z",
            __v: 0,
          },
          transportationDocument: null,
          otherDocuments: null,
          createdAt: "2024-07-18T15:14:13.849Z",
          updatedAt: "2024-07-18T15:14:13.849Z",
          __v: 0,
        },
      ],
      status: "Approved",
      dueFrom: "10-07-2024",
      Address: "90 feet, sakinka, Bamboo Flat, Andaman and Nicobar Islands",
      totalAmount: 2,
      creditor: {
        _id: "6688c0b8a17e2168679a1907",
        companyName: "zobble",
        gstin: "29GGGGG1314R9Z6",
        companyPan: "GGGGG1314R",
        city: "Mumbai Suburban",
        state: "Maharashtra",
        zipcode: "400072",
        emailId: "premchoudary9@gmail.com",
        phoneNumber: "9869151229",
        secPhoneNumber: "",
        companyOwner: {
          _id: "6688c0b8a17e2168679a1905",
          userName: "premchoudary9@gmail.com",
          name: "Prem Choudhary",
          aadharCardNo: "",
          emailId: "premchoudary9@gmail.com",
          phoneNumber: "9869151229",
          secPhoneNumber: "",
          password:
            "$2a$10$PWiFDRMlnbF.7QkhfkPjVOWY85Yza02ypyoeTyQ7iYU05NewmIlBK",
          role: "OWNER",
          passwordChangeNeeded: false,
          city: "Mumbai Suburban",
          state: "Maharashtra",
          isActiveAccount: "ACTIVE",
          permissions: [],
          companies: ["6688c0b8a17e2168679a1907", "668fd3733bce4610a48434b6"],
          createdAt: "2024-07-06T03:57:44.802Z",
          updatedAt: "2024-07-19T07:28:38.548Z",
          __v: 0,
        },
        createdAt: "2024-07-06T03:57:44.872Z",
        updatedAt: "2024-07-06T03:57:44.872Z",
        __v: 0,
      },
      invoiceList: ["5020"],
      debtor: {
        _id: "668fd3ee3bce4610a48434ef",
        companyName: "anand",
        gstin: "29GGGGG1514R9Z6",
        companyPan: "GGGGG1514R",
        creditorCompanyId: "6688c0b8a17e2168679a1907",
        firstname: "Premchandra Choudhary",
        customerEmail: "premchoudary9@gmail.com",
        customerMobile: "9869151229",
        secCustomerMobile: "",
        address1: "90 feet",
        address2: "sakinka",
        city: "Bamboo Flat",
        state: "Andaman and Nicobar Islands",
        zipcode: "400072",
        joinedOn: "2024-07-11T00:00:00.000Z",
        createdAt: "2024-07-11T12:45:34.857Z",
        updatedAt: "2024-07-19T10:27:33.106Z",
        __v: 0,
      },
      complaintNumber: "BAF-29GG1202-73746vn9",
    },
    {
      SrNo: 1,
      customerName: "anand",
      id: "669931451503057df7bbe168",
      invoices: [
        {
          _id: "669931451503057df7bbe165",
          billDate: "2024-07-18",
          billDescription: "Bill for things",
          billNumber: null,
          creditAmount: 1258,
          remainingAmount: 1258,
          interestRate: null,
          creditLimitDays: null,
          remark: "",
          items: [],
          subTotal: 1258,
          tax: null,
          referenceNumber: "",
          invoiceNumber: "inc-1",
          dueDate: "2024-07-10T00:00:00.000Z",
          percentage: "",
          type: "EXTERNAL",
          purchaseOrderDocument: null,
          challanDocument: null,
          invoiceDocument: {
            _id: "669930910deb82e2e0bcd173",
            userId: "6688c0b8a17e2168679a1905",
            name: "dummy.pdf",
            url: "https://msmesurakshabackend.blob.core.windows.net/uploaded-files-container/1721315473003-33cdd7df3b907fbc-dummy.pdf",
            uniqueName: "1721315473003-33cdd7df3b907fbc-dummy.pdf",
            createdAt: "2024-07-18T15:11:13.702Z",
            updatedAt: "2024-07-18T15:11:13.702Z",
            __v: 0,
          },
          transportationDocument: null,
          otherDocuments: null,
          createdAt: "2024-07-18T15:14:13.849Z",
          updatedAt: "2024-07-18T15:14:13.849Z",
          __v: 0,
        },
      ],
      status: "Pending your confirmation",
      dueFrom: "10-07-2024",
      Address: "90 feet, sakinka, Bamboo Flat, Andaman and Nicobar Islands",
      totalAmount: 4,
      creditor: {
        _id: "6688c0b8a17e2168679a1907",
        companyName: "zobble",
        gstin: "29GGGGG1314R9Z6",
        companyPan: "GGGGG1314R",
        city: "Mumbai Suburban",
        state: "Maharashtra",
        zipcode: "400072",
        emailId: "premchoudary9@gmail.com",
        phoneNumber: "9869151229",
        secPhoneNumber: "",
        companyOwner: {
          _id: "6688c0b8a17e2168679a1905",
          userName: "premchoudary9@gmail.com",
          name: "Prem Choudhary",
          aadharCardNo: "",
          emailId: "premchoudary9@gmail.com",
          phoneNumber: "9869151229",
          secPhoneNumber: "",
          password:
            "$2a$10$PWiFDRMlnbF.7QkhfkPjVOWY85Yza02ypyoeTyQ7iYU05NewmIlBK",
          role: "OWNER",
          passwordChangeNeeded: false,
          city: "Mumbai Suburban",
          state: "Maharashtra",
          isActiveAccount: "ACTIVE",
          permissions: [],
          companies: ["6688c0b8a17e2168679a1907", "668fd3733bce4610a48434b6"],
          createdAt: "2024-07-06T03:57:44.802Z",
          updatedAt: "2024-07-19T07:28:38.548Z",
          __v: 0,
        },
        createdAt: "2024-07-06T03:57:44.872Z",
        updatedAt: "2024-07-06T03:57:44.872Z",
        __v: 0,
      },
      invoiceList: ["5021"],
      debtor: {
        _id: "668fd3ee3bce4610a48434ef",
        companyName: "anand",
        gstin: "29GGGGG1514R9Z6",
        companyPan: "GGGGG1514R",
        creditorCompanyId: "6688c0b8a17e2168679a1907",
        firstname: "Premchandra Choudhary",
        customerEmail: "premchoudary9@gmail.com",
        customerMobile: "9869151229",
        secCustomerMobile: "",
        address1: "90 feet",
        address2: "sakinka",
        city: "Bamboo Flat",
        state: "Andaman and Nicobar Islands",
        zipcode: "400072",
        joinedOn: "2024-07-11T00:00:00.000Z",
        createdAt: "2024-07-11T12:45:34.857Z",
        updatedAt: "2024-07-19T10:27:33.106Z",
        __v: 0,
      },
      complaintNumber: "BAF-29GG1202-73746vn9",
    },
    {
      SrNo: 1,
      customerName: "kalpash",
      id: "669931451503057df7bbe168",
      invoices: [
        {
          _id: "669931451503057df7bbe165",
          billDate: "2024-07-18",
          billDescription: "Bill for things",
          billNumber: null,
          creditAmount: 1258,
          remainingAmount: 1258,
          interestRate: null,
          creditLimitDays: null,
          remark: "",
          items: [],
          subTotal: 1258,
          tax: null,
          referenceNumber: "",
          invoiceNumber: "inc-1",
          dueDate: "2024-07-10T00:00:00.000Z",
          percentage: "",
          type: "EXTERNAL",
          purchaseOrderDocument: null,
          challanDocument: null,
          invoiceDocument: {
            _id: "669930910deb82e2e0bcd173",
            userId: "6688c0b8a17e2168679a1905",
            name: "dummy.pdf",
            url: "https://msmesurakshabackend.blob.core.windows.net/uploaded-files-container/1721315473003-33cdd7df3b907fbc-dummy.pdf",
            uniqueName: "1721315473003-33cdd7df3b907fbc-dummy.pdf",
            createdAt: "2024-07-18T15:11:13.702Z",
            updatedAt: "2024-07-18T15:11:13.702Z",
            __v: 0,
          },
          transportationDocument: null,
          otherDocuments: null,
          createdAt: "2024-07-18T15:14:13.849Z",
          updatedAt: "2024-07-18T15:14:13.849Z",
          __v: 0,
        },
      ],
      status: "Pending buyer confirmation",
      dueFrom: "10-07-2024",
      Address: "90 feet, sakinka, Bamboo Flat, Andaman and Nicobar Islands",
      totalAmount: 5,
      creditor: {
        _id: "6688c0b8a17e2168679a1907",
        companyName: "zobble",
        gstin: "29GGGGG1314R9Z6",
        companyPan: "GGGGG1314R",
        city: "Mumbai Suburban",
        state: "Maharashtra",
        zipcode: "400072",
        emailId: "premchoudary9@gmail.com",
        phoneNumber: "9869151229",
        secPhoneNumber: "",
        companyOwner: {
          _id: "6688c0b8a17e2168679a1905",
          userName: "premchoudary9@gmail.com",
          name: "Prem Choudhary",
          aadharCardNo: "",
          emailId: "premchoudary9@gmail.com",
          phoneNumber: "9869151229",
          secPhoneNumber: "",
          password:
            "$2a$10$PWiFDRMlnbF.7QkhfkPjVOWY85Yza02ypyoeTyQ7iYU05NewmIlBK",
          role: "OWNER",
          passwordChangeNeeded: false,
          city: "Mumbai Suburban",
          state: "Maharashtra",
          isActiveAccount: "ACTIVE",
          permissions: [],
          companies: ["6688c0b8a17e2168679a1907", "668fd3733bce4610a48434b6"],
          createdAt: "2024-07-06T03:57:44.802Z",
          updatedAt: "2024-07-19T07:28:38.548Z",
          __v: 0,
        },
        createdAt: "2024-07-06T03:57:44.872Z",
        updatedAt: "2024-07-06T03:57:44.872Z",
        __v: 0,
      },
      invoiceList: ["5028"],
      debtor: {
        _id: "668fd3ee3bce4610a48434ef",
        companyName: "anand",
        gstin: "29GGGGG1514R9Z6",
        companyPan: "GGGGG1514R",
        creditorCompanyId: "6688c0b8a17e2168679a1907",
        firstname: "Premchandra Choudhary",
        customerEmail: "premchoudary9@gmail.com",
        customerMobile: "9869151229",
        secCustomerMobile: "",
        address1: "90 feet",
        address2: "sakinka",
        city: "Bamboo Flat",
        state: "Andaman and Nicobar Islands",
        zipcode: "400072",
        joinedOn: "2024-07-11T00:00:00.000Z",
        createdAt: "2024-07-11T12:45:34.857Z",
        updatedAt: "2024-07-19T10:27:33.106Z",
        __v: 0,
      },
      complaintNumber: "BAF-29GG1202-73746vn9",
    },
    {
      SrNo: 1,
      customerName: "anand",
      id: "669931451503057df7bbe168",
      invoices: [
        {
          _id: "669931451503057df7bbe165",
          billDate: "2024-07-18",
          billDescription: "Bill for things",
          billNumber: null,
          creditAmount: 1258,
          remainingAmount: 1258,
          interestRate: null,
          creditLimitDays: null,
          remark: "",
          items: [],
          subTotal: 1258,
          tax: null,
          referenceNumber: "",
          invoiceNumber: "inc-1",
          dueDate: "2024-07-10T00:00:00.000Z",
          percentage: "",
          type: "EXTERNAL",
          purchaseOrderDocument: null,
          challanDocument: null,
          invoiceDocument: {
            _id: "669930910deb82e2e0bcd173",
            userId: "6688c0b8a17e2168679a1905",
            name: "dummy.pdf",
            url: "https://msmesurakshabackend.blob.core.windows.net/uploaded-files-container/1721315473003-33cdd7df3b907fbc-dummy.pdf",
            uniqueName: "1721315473003-33cdd7df3b907fbc-dummy.pdf",
            createdAt: "2024-07-18T15:11:13.702Z",
            updatedAt: "2024-07-18T15:11:13.702Z",
            __v: 0,
          },
          transportationDocument: null,
          otherDocuments: null,
          createdAt: "2024-07-18T15:14:13.849Z",
          updatedAt: "2024-07-18T15:14:13.849Z",
          __v: 0,
        },
      ],
      status: "cancelled",
      dueFrom: "10-07-2024",
      Address: "90 feet, sakinka, Bamboo Flat, Andaman and Nicobar Islands",
      totalAmount: 2,
      creditor: {
        _id: "6688c0b8a17e2168679a1907",
        companyName: "zobble",
        gstin: "29GGGGG1314R9Z6",
        companyPan: "GGGGG1314R",
        city: "Mumbai Suburban",
        state: "Maharashtra",
        zipcode: "400072",
        emailId: "premchoudary9@gmail.com",
        phoneNumber: "9869151229",
        secPhoneNumber: "",
        companyOwner: {
          _id: "6688c0b8a17e2168679a1905",
          userName: "premchoudary9@gmail.com",
          name: "Prem Choudhary",
          aadharCardNo: "",
          emailId: "premchoudary9@gmail.com",
          phoneNumber: "9869151229",
          secPhoneNumber: "",
          password:
            "$2a$10$PWiFDRMlnbF.7QkhfkPjVOWY85Yza02ypyoeTyQ7iYU05NewmIlBK",
          role: "OWNER",
          passwordChangeNeeded: false,
          city: "Mumbai Suburban",
          state: "Maharashtra",
          isActiveAccount: "ACTIVE",
          permissions: [],
          companies: ["6688c0b8a17e2168679a1907", "668fd3733bce4610a48434b6"],
          createdAt: "2024-07-06T03:57:44.802Z",
          updatedAt: "2024-07-19T07:28:38.548Z",
          __v: 0,
        },
        createdAt: "2024-07-06T03:57:44.872Z",
        updatedAt: "2024-07-06T03:57:44.872Z",
        __v: 0,
      },
      invoiceList: ["5020"],
      debtor: {
        _id: "668fd3ee3bce4610a48434ef",
        companyName: "anand",
        gstin: "29GGGGG1514R9Z6",
        companyPan: "GGGGG1514R",
        creditorCompanyId: "6688c0b8a17e2168679a1907",
        firstname: "Premchandra Choudhary",
        customerEmail: "premchoudary9@gmail.com",
        customerMobile: "9869151229",
        secCustomerMobile: "",
        address1: "90 feet",
        address2: "sakinka",
        city: "Bamboo Flat",
        state: "Andaman and Nicobar Islands",
        zipcode: "400072",
        joinedOn: "2024-07-11T00:00:00.000Z",
        createdAt: "2024-07-11T12:45:34.857Z",
        updatedAt: "2024-07-19T10:27:33.106Z",
        __v: 0,
      },
      complaintNumber: "BAF-29GG1202-73746vn9",
    },
    {
      SrNo: 1,
      customerName: "Prem",
      id: "669931451503057df7bbe168",
      invoices: [
        {
          _id: "669931451503057df7bbe165",
          billDate: "2024-07-18",
          billDescription: "Bill for things",
          billNumber: null,
          creditAmount: 1258,
          remainingAmount: 1258,
          interestRate: null,
          creditLimitDays: null,
          remark: "",
          items: [],
          subTotal: 1258,
          tax: null,
          referenceNumber: "",
          invoiceNumber: "inc-1",
          dueDate: "2024-07-10T00:00:00.000Z",
          percentage: "",
          type: "EXTERNAL",
          purchaseOrderDocument: null,
          challanDocument: null,
          invoiceDocument: {
            _id: "669930910deb82e2e0bcd173",
            userId: "6688c0b8a17e2168679a1905",
            name: "dummy.pdf",
            url: "https://msmesurakshabackend.blob.core.windows.net/uploaded-files-container/1721315473003-33cdd7df3b907fbc-dummy.pdf",
            uniqueName: "1721315473003-33cdd7df3b907fbc-dummy.pdf",
            createdAt: "2024-07-18T15:11:13.702Z",
            updatedAt: "2024-07-18T15:11:13.702Z",
            __v: 0,
          },
          transportationDocument: null,
          otherDocuments: null,
          createdAt: "2024-07-18T15:14:13.849Z",
          updatedAt: "2024-07-18T15:14:13.849Z",
          __v: 0,
        },
      ],
      status: "Reject",
      dueFrom: "10-07-2024",
      Address: "90 feet, sakinka, Bamboo Flat, Andaman and Nicobar Islands",
      totalAmount: 50,
      creditor: {
        _id: "6688c0b8a17e2168679a1907",
        companyName: "zobble",
        gstin: "29GGGGG1314R9Z6",
        companyPan: "GGGGG1314R",
        city: "Mumbai Suburban",
        state: "Maharashtra",
        zipcode: "400072",
        emailId: "premchoudary9@gmail.com",
        phoneNumber: "9869151229",
        secPhoneNumber: "",
        companyOwner: {
          _id: "6688c0b8a17e2168679a1905",
          userName: "premchoudary9@gmail.com",
          name: "Prem Choudhary",
          aadharCardNo: "",
          emailId: "premchoudary9@gmail.com",
          phoneNumber: "9869151229",
          secPhoneNumber: "",
          password:
            "$2a$10$PWiFDRMlnbF.7QkhfkPjVOWY85Yza02ypyoeTyQ7iYU05NewmIlBK",
          role: "OWNER",
          passwordChangeNeeded: false,
          city: "Mumbai Suburban",
          state: "Maharashtra",
          isActiveAccount: "ACTIVE",
          permissions: [],
          companies: ["6688c0b8a17e2168679a1907", "668fd3733bce4610a48434b6"],
          createdAt: "2024-07-06T03:57:44.802Z",
          updatedAt: "2024-07-19T07:28:38.548Z",
          __v: 0,
        },
        createdAt: "2024-07-06T03:57:44.872Z",
        updatedAt: "2024-07-06T03:57:44.872Z",
        __v: 0,
      },
      invoiceList: ["5020"],
      debtor: {
        _id: "668fd3ee3bce4610a48434ef",
        companyName: "anand",
        gstin: "29GGGGG1514R9Z6",
        companyPan: "GGGGG1514R",
        creditorCompanyId: "6688c0b8a17e2168679a1907",
        firstname: "Premchandra Choudhary",
        customerEmail: "premchoudary9@gmail.com",
        customerMobile: "9869151229",
        secCustomerMobile: "",
        address1: "90 feet",
        address2: "sakinka",
        city: "Bamboo Flat",
        state: "Andaman and Nicobar Islands",
        zipcode: "400072",
        joinedOn: "2024-07-11T00:00:00.000Z",
        createdAt: "2024-07-11T12:45:34.857Z",
        updatedAt: "2024-07-19T10:27:33.106Z",
        __v: 0,
      },
      complaintNumber: "BAF-29GG1202-73746vn9",
    },
  ]

  const [deletePop, setDeletePop] = useState(false)
  const [deleteValue, setDeleteValue] = useState("")

  const openDeletePop = value => {
    setDeleteValue(value)
    toggleDeletePop()
  }

  const toggleDeletePop = () => setDeletePop(!deletePop)

  const DeleteInvoiceModule = Value => {
    toggleDeletePop()

    const payload = {
      defaulterEntryId: Value.id,
    }

    dispatch(deleteInvoiceStart(payload))

    setTimeout(() => {
      toast.success("Defaulter Entry Deleted")
      dispatch(getAllInvoice())
    }, 1000)
  }

  const [viewModuleOpen, setViewModuleOpen] = useState(false)

  const toggleViewModuleOpen = () => setViewModuleOpen(!viewModuleOpen)

  const handleViewDetail = item => {
    setViewModalData(item)
    setViewModuleOpen(!viewModuleOpen)
  }

  return (
    <React.Fragment>
      {viewModuleOpen && (
        <ViewDetailsOrderManagementModal
          isOpen={viewModuleOpen}
          toggle={toggleViewModuleOpen}
          viewModalData={viewModalData}
          name={"Buyer"}
        />
      )}
      <Card
        style={{
          padding:
            props.isClickedToOrder != undefined && props.isClickedToOrder
              ? "0px"
              : "0px",
        }}
      >
        <CardBody
          style={{
            padding:
              props.isClickedToOrder != undefined && props.isClickedToOrder
                ? "0px"
                : "0px",
          }}
        >
          {props.isClickedToOrder == undefined && !props.isClickedToOrder ? (
            <>
              {" "}
              <div className="mb-4 h4 card-title"></div>
              <br />
              <br />
              <br />
            </>
          ) : (
            ""
          )}

          <Row className="">
            {GetAllInvoice != undefined && (
              <TableContainer
                columns={columns}
                data={dummyData}
                isGlobalFilter={true}
                isAddOptions={false}
                customPageSize={10}
              />
            )}
          </Row>
        </CardBody>
      </Card>
      <ToastContainer />
    </React.Fragment>
  )
}
