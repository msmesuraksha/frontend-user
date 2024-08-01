import React, { useState, useEffect, useMemo } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import Select, { components } from "react-select"
import "../../Dashboard/users/send-bill-transaction/sendbillTransaction"
import ReportedDebtorsModel from "./ReportedModel"
import ReportedDefaulterModel from './ReportDefaulterModel'
import UploadCACertificateModel from './uploadCACertificateModel'
import ReportIncoiceModel from './ReportInvoiceModel'
import 'react-table-6/react-table.css'
import ReactTable from 'react-table-6'
import CurrencyFormat from 'react-currency-format';
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
import TableContainer from "../../../components/Common/TableContainer";
import { getInvoices as ongetInvoices } from '../../../store/actions'
import { useDispatch, useSelector } from "react-redux";
import { success } from "toastr"
//import { getAllInvoice as ongetAllInvoice } from '../../../../src/store/actions'
import { getAllInvoice, setIsReportDefOpen, setUploadFilesOpen, setCACertificateOpen, requestInvoiceDefEdit, setIsViewDetailModalOpen, setRequestEditModalOpen } from "../../../store/debtors/debtors.actions"
import { selectReportDefOpen, selectInvoiceList, uploadFilesModalOpen, selectCACertificateOpen, requestEditSelector, isViewDetailMOdalOpenSelector, requestModelSelector, selectInvoiceListMap } from "store/debtors/debtors.selecter"
import UploadPendingFiles from "./uploadFilesModal"
import { CompanySerchForm } from "../ApprovedTransaction/companySearchComponet"
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import ViewDetailsReportDefaultModal from './viewDetailsReportDefaultModal'
// import CaImg from '../../../assets/images/newImg/ca.png'
import RecordPayImg from '../../../assets/images/newImg/credit-card.png'
import fileImg from '../../../assets/images/newImg/file (1).png'
import fileImg2 from '../../../assets/images/newImg/file.png'
import CaImg from '../../../assets/images/newImg/CA-BG_Remove.png'
import profileimg from '../../../assets/images/newImg/profile.png'
import { numberFormat } from "../uploadPendingDoucument/uploadPendingDoc"
import RequestEditMessageModal from "./ReportInvoiceModel"
import EditReportedDefaulterModel from "./RequestEditMessageModal"
import './style.css'
// import { ToastContainer } from "react-toastify"

import {
  DueAmount,
  SrNo,
} from ".././company-search/companyssearchColl";

import { CapitalizeWords } from "pages/Dashboard"

import { deleteInvoiceStart } from "store/inviceDelete/inviceDelete.action"

import { InvoiceDeletePop } from "./invoiceDeletePop"

import { StatusAndOpinionObj } from "pages/Dashboard"

export const ReportDebtor = props => {
  const [modal1, setModal1] = useState(false);
  const [getDaysArray, setgetDaysArray] = useState([]);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [selected, setSelected] = useState('');
  const [customerType, setCustomerType] = useState();
  const toggleViewModal = () => setModal1(!modal1);
  const toggleViewModal1 = () => setModal2(!modal2);
  //const [modal4, setModal4] = useState(false);
  /*   */
  const dispatch = useDispatch();
  const [viewModalData, setViewModalData] = useState('');

  const isViewDetailModal = useSelector(isViewDetailMOdalOpenSelector);
  const isRequestEditModalOpen = useSelector(requestModelSelector);
  const isReportDefOpen = useSelector(selectReportDefOpen);
  const uploadFilesModalShow = useSelector(uploadFilesModalOpen);
  const selectCACertificate = useSelector(selectCACertificateOpen);

  const toggleViewModal2 = () => dispatch(setCACertificateOpen(!selectCACertificate));
  const toggleViewModal3 = () => pGErElo()
  const toggleUploiadFiles = () => dispatch(setUploadFilesOpen(!uploadFilesModalShow));
  const toggleDetailView = () => dispatch(setIsViewDetailModalOpen(!isViewDetailModal))
  const toggleReqEdit = () => dispatch(setRequestEditModalOpen(!isRequestEditModalOpen))
  const [isRequestedEdit, setisRequestedEdit] = useState(false)


  const GetAllInvoice = useSelector(selectInvoiceListMap)

  const pGErElo = () => {
    dispatch(setIsReportDefOpen(!isReportDefOpen));
    // window.location.reload()
  }

  useEffect(() => {
    dispatch(getAllInvoice());
    dispatch(setIsViewDetailModalOpen())
    dispatch(setRequestEditModalOpen())

    getDays()

  }, [])

  const viewModel = (value) => {
    setSelected(value)
    setModal2(true)
  }

  const viewModels = (value) => {
    setModal3(true)
  }



  const additionalValue = "Hello from additional prop!";
  const [invoiceIdsForCAcertificate, setinvoiceIdsForCAcertificate] = useState('')
  const [filteredData, setFilteredData] = useState([]);
  const handleReportDefaulter = () => {
    // window.location.href = "/ReportDefaulter"
    //setModal4(true)
    dispatch(setIsReportDefOpen(!isReportDefOpen))
  }


  const handleViewDetail = (item) => {

    // window.location.href = "/ReportDefaulter"
    //setModal4(true)
    setViewModalData(item)
    dispatch(setIsViewDetailModalOpen(!isViewDetailModal))

  }

  const [uploadFilesModelDataForUpload, setuploadFilesModelDataForUpload] = useState('')

  const handleUploadFiles = (item) => {
    setuploadFilesModelDataForUpload(item)
    dispatch(setUploadFilesOpen(!uploadFilesModalShow))
  }
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
  const RequestEditData = useSelector(requestEditSelector)
  const [requestedData, setrequestedData] = useState('')

  const requestEdit = (item) => {

    setrequestedData(item)
    dispatch(setRequestEditModalOpen(!isRequestEditModalOpen))
    const payload = {
      "invoiceId": item.invoices[0].invoiceNumber
    }

    setisRequestedEdit(true)


    // dispatch(requestInvoiceDefEdit(payload))
  }

  const handleFilterdata = (filters) => {
    if (GetAllInvoice) {
      if (filters === "") {
        const revArr = GetAllInvoice.reverse()
        setFilteredData(revArr)
      } else {
        const filteredResults = GetAllInvoice.filter(item => {
          return item.debtor.companyName.toLocaleLowerCase().includes(filters);
        });
        setFilteredData(filteredResults);
      }
    }
  };

  const DueSincedate = (cell) => {

    const today = new Date();
    const currentDate = new Date(cell.cell.row.original.debtor.createdAt);
    let e = ""
    const calculateDateDifference = () => {
      const differenceInMilliseconds = today - currentDate;
      const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
      e = differenceInDays
      return differenceInDays;
    };

    return (
      <div className="" style={{ padding: "2px 2px", fontSize: "12px", width: "100px" }}>
        <div className=" text-center  p-1 rounded " style={{
          background: e < 30 ? "#FDFDFD" : e > 30 && e < 90 ? "#ffff80" : e > 90 && e < 180 ? " #ff944d" : " #ff4d4d",
          color: e < 30 ? "#000" : e > 30 && e < 90 ? "#000" : e > 90 && e < 180 ? " #FAFAFA" : " #FAFAFA"
        }}>
          <div className="text-capitalize">
            {calculateDateDifference()}  &nbsp;
            <span className="ml-1">Days</span> </div>
          <div className="text-capitalize" >{cell.cell.row.original.dueFrom}</div>
        </div>
      </div>
    );
  };

  const DueSinceApprove = (cell) => {


    const valueFordate = cell.row.original?.dueFrom
    /*  const [startDate, setStartDate] = useState(new Date('1965-04-05')); */
    //const startDate = new Date('2019-10-07'); // October 7, 2019
    const today = new Date(); // Current date
    // const currentDate = moment(today).format('YYYY-MM-DD')
    const daysSince = daysSinceRefe(valueFordate, today);


    /*     const formattedDate = new Date(cell.value).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }); */

    const newDate = valueFordate != undefined ? valueFordate.split("-").reverse().join("-") : "";
    const currentDate = new Date(newDate);
    let e = ""

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
      <div className="" style={{ padding: "2px 2px", fontSize: "12px", width: "90px", margin: "0px" }}>
        <div className=" text-center  p-1 rounded " style={{
          background: calculateDateDifference() < 30 ? "#FDFDFD" : calculateDateDifference() >= 30 && calculateDateDifference() < 90 ? "#ffff80" : calculateDateDifference() > 90 && calculateDateDifference() < 180 ? " #ff944d" : " #ff4d4d",
          color: calculateDateDifference() < 30 ? "#000" : calculateDateDifference() >= 30 && calculateDateDifference() < 90 ? "#000" : calculateDateDifference() > 90 && calculateDateDifference() < 180 ? " #FAFAFA" : " #FAFAFA"
        }}>
          <div className="text-capitalize">
            {calculateDateDifference()}  &nbsp;
            <span className="ml-1">Days</span> </div>
          <div className="text-capitalize" >{cell.cell.row.original.dueFrom}</div>
        </div>
      </div>
    );
  };

  const daysSinceRefe = (cellValue, referenceDate) => {

    if (cellValue != undefined) {
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
            className="company-name-cell" style={{ width: "15px" }}
          >
            {cellProps.data.length - cellProps.cell.row.index}
          </div>;;
        },
      },
      {
        Header: "complaint date",
        accessor: "",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div>
            {moment(cellProps.cell?.row?.original?.createdAt).format('DD-MM-YYYY')}
          </div>


        },
      },
      {
        Header: "complaint no.",
        accessor: "complaintNumber",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div>
            {/* {console.log("cellProps.cell.row.original.debtor.companyName",cellProps.cell.row.original.debtor.companyName )} */}
            {cellProps.cell?.row?.original?.complaintNumber}
          </div>


        },
      },
      {
        Header: "BUYER NAME",
        accessor: "customerName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div style={{ width: "110px" }} className="text-capitalize">
            {/* {console.log("cellProps.cell.row.original.debtor.companyName",cellProps.cell.row.original.debtor.companyName )} */}
            {cellProps.cell?.row?.original?.customerName}
          </div>


        },
      },
      {
        Header: "INVOICE NO.",
        accessor: "invoiceList",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div className="" style={{ width: "100px" }}>
            {cellProps.cell.row.original.invoiceList}
            {/* {cellProps.cell.row.original?.invoices.map((x, i) => {
              return <div key={x} className="d-flex">
                < >{x.invoiceNumber } {i != cellProps.cell.row.original.invoices.length-1 ? ",":''} </>
              </div>

            })} */}
          </div>
        },
      },
      {
        Header: "ADDRESS",
        accessor: "Address",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {

          const address = cellProps.cell.row.original.Address.length > 30 ? cellProps.cell.row.original.Address.substring(0, 30) + '...' : cellProps.cell.row.original.Address;
          return <div style={{ width: "150px" }}>
            {address}
          </div>
        },
      },
      {
        Header: "DUE AMOUNT",
        accessor: "totalAmount",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div style={{ width: "", textAlign: 'right' }}><DueAmount {...cellProps} /></div>
        },
      },
      {
        Header: "STATUS / OPINION",
        accessor: "STATUS",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          let currentStatus = ''

          for (const key in StatusAndOpinionObj) {
            const currentUrlArr = cellProps.cell.row.original?.status;
            if (currentUrlArr == undefined) break
            if (key === currentUrlArr) {
              currentStatus = StatusAndOpinionObj[key];
              break;
            }
          }
          return <div className="  text-capitalize"><span>{currentStatus}</span></div>
        },
      },

      {
        Header: "DUE FROM *",
        accessor: "dueFrom",
        disableFilters: true,
        filterable: false,

        Cell: cellProps => {
          return <div style={{ width: "20px" }}> <DueSinceApprove {...cellProps} /></div>
        },
      },


      {
        Header: "ACTION",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          return (
            <div className="d-flex" style={{ width: "320px" }}>
              <Row className="text-center" style={{ gap: '0.1rem', flexWrap: 'nowrap' }}>
                <Col className="p-1" md={2}>
                  <button type="button" className="btn btn-info " data-toggle="tooltip" data-placement="top"
                    title="Record Payment" href={cellProps.cell.row.original?.url} rel='noreferrer'
                    target='_blank' onClick={() => viewModel(cellProps.cell.row.original)

                    }>
                    <i className='bx bx-wallet-alt textsizing' ></i>
                  </button>
                </Col>
                <Col className="p-1" md={2}>
                  <button type="button" className="btn btn-info " data-toggle="tooltip" data-placement="top"
                    title="Invoice Edit" rel='noreferrer'
                    target='_blank' onClick={() => requestEdit(cellProps.cell.row.original)
                    }
                    disabled={cellProps.cell.row.original?.status == "DRAFT" ? false : true}


                  >
                    <i className='bx bx-edit textsizing' ></i>
                    {/* <img src={ReqEdit} className="iconsImage"/> */}

                  </button>
                </Col>
                <Col className="p-1" md={2}>
                  <button type="button" className="btn btn-info " data-toggle="tooltip" data-placement="top"
                    title="Upload Pending Files" href={cellProps.cell.row.original?.url} rel='noreferrer'
                    target='_blank' onClick={() => handleUploadFiles(cellProps.cell.row.original)
                    }>
                    <i className='bx bx-cloud-upload textsizing' ></i>
                  </button>
                </Col>
                <Col className="p-1" md={2}>
                  <button type="button" className="btn btn-info " data-toggle="tooltip" data-placement="top"
                    title="Upload CA Certificate" href={cellProps.cell.row.original?.url} rel='noreferrer'
                    target='_blank' onClick={() => {
                      toggleViewModal2()
                      setinvoiceIdsForCAcertificate(cellProps.cell.row.original?.invoices[0].invoiceNumber)
                      setCustomerType("DEBTOR")
                    }

                    }>
                    {/* <i className='bx bx-file textsizing' ></i> */}
                    <img src={CaImg} className="" style={{ height: "22.5px", width: '18px' }} />
                  </button>
                </Col>

                <Col className="p-1" md={2}>
                  <Button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                    title="View Details" href={cellProps.cell.row.original?.url} rel='noreferrer'
                    target='_blank'

                    onClick={() => handleViewDetail(cellProps.cell.row.original)}>
                    <i className='fa fa-eye textsizing' style={{ fontSize: "19px" }}></i>

                    {/* <img src={profileimg} className="iconsImage"/> */}


                  </Button>

                </Col>
                <Col className="p-1" md={2}>
                  <Button type="button" style={{ color: '#FAFAFA', fontSize: "14.5px" }} className="btn btn-info" data-toggle="tooltip" data-placement="top"
                    title="Delete Invoice"

                    onClick={() => openDeletePop(cellProps.cell.row.original)}>
                    <i className="fa fa-trash " aria-hidden="true" style={{ fontSize: "18px" }}></i>

                    {/* <img src={profileimg} className="iconsImage"/> */}


                  </Button>

                </Col>
              </Row>
            </div>
          );
        },
      },
    ],
    []
  );

  const [deletePop, setDeletePop] = useState(false)
  const [deleteValue, setDeleteValue] = useState('')

  const openDeletePop = (value) => {
    setDeleteValue(value)
    toggleDeletePop()
  }

  const toggleDeletePop = () => setDeletePop(!deletePop)


  const DeleteInvoiceModule = (Value) => {
    toggleDeletePop()

    const payload = {
      "defaulterEntryId": Value.id
    }

    dispatch(deleteInvoiceStart(payload))

    setTimeout(() => {
      toast.success("Defaulter Entry Deleted")
      dispatch(getAllInvoice());
    }, 1000)

  }

  return (
    <React.Fragment>
      {deletePop && <InvoiceDeletePop isOpen={deletePop} toggle={toggleDeletePop} deleteValue={deleteValue} DeleteInvoiceModule={DeleteInvoiceModule} />}
      {modal1 && <ReportedDebtorsModel isOpen={modal1} toggle={toggleViewModal} additionalValue={additionalValue} selected={selected} />}
      {modal2 && <ReportedDefaulterModel isOpen={modal2} toggle={toggleViewModal1} selected={selected} customerName={invoiceIdsForCAcertificate} requestor={'CREDITOR'} name={'Buyer'} />}
      {selectCACertificate && <UploadCACertificateModel isOpen={selectCACertificate} toggle={toggleViewModal2} invoiceId={invoiceIdsForCAcertificate} customerType={customerType} />}
      {isReportDefOpen && <ReportIncoiceModel isOpen={isReportDefOpen} toggle={toggleViewModal3} GetAllInvoice={GetAllInvoice} invoiceIsOpen={toggleViewModal3} />}
      {uploadFilesModalShow && <UploadPendingFiles isOpen={uploadFilesModalShow} toggle={toggleUploiadFiles} uploadFilesModelDataForUpload={uploadFilesModelDataForUpload} />}
      {isViewDetailModal && <ViewDetailsReportDefaultModal isOpen={isViewDetailModal} toggle={toggleDetailView} viewModalData={viewModalData} name={'Buyer'} />}
      {isRequestEditModalOpen && <EditReportedDefaulterModel isOpen={isRequestEditModalOpen} toggle={toggleReqEdit} requestedData={requestedData} GetAllInvoice={GetAllInvoice} requestEditIsOpen={toggleReqEdit} />}

      <Card style={{ padding: props.isClickedToReported != undefined && props.isClickedToReported ? "0px" : '' }}>
        <CardBody style={{ padding: props.isClickedToReported != undefined && props.isClickedToReported ? "0px" : '20px' }}>
          {props.isClickedToReported == undefined && !props.isClickedToReported ? <>   <div className="mb-4 h4 card-title"></div>
            <br />
            <br />
            <br />
          </> : ""}


          <Row>
            <Col md={10} className="pl-2" style={{ textTransform: "capitalize" }}>
              {props.isClickedToReported == undefined && !props.isClickedToReported ? <h5 className="m-1"><b>My Complaints</b></h5> : ""}
            </Col>
            <Col md={2}>

              <Button className="btn btn-md btn-info" onClick={() => handleReportDefaulter()}>Report a Defaulter</Button>
              {/* <div data-tip="msg to show" data-for='toolTip1' data-place='top'>Tooltip</div>
<ReactTooltip id="toolTip1" /> */}
            </Col>
          </Row>
          {/* {GetAllInvoice != undefined ? <CompanySerchForm onFilter={handleFilterdata} SearchName={"Buyer"} /> : ""} */}
          <Row className="">

            {GetAllInvoice != undefined && (<TableContainer
              columns={columns}
              data={GetAllInvoice}
              isGlobalFilter={true}
              isAddOptions={false}
              customPageSize={10}
            />)}

            <p className="">Due From : The number of due days is calculated from date of oldest invoice.
            </p>
          </Row>
        </CardBody>
      </Card>
      <ToastContainer />
    </React.Fragment>
  );
}




