import React, { useState, useEffect, useMemo } from "react"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import "../../Dashboard/users/send-bill-transaction/sendbillTransaction"
import ReportedDefaulterModel from '../Invoice/ReportDefaulterModel'
import UploadCACertificateModel from '../Invoice/uploadCACertificateModel'
import 'react-table-6/react-table.css'
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
} from "reactstrap"
import TableContainer from "../../../components/Common/TableContainer";
import InlineFilterForm from '../ApprovedTransaction/InlineFilterForm';
import { useDispatch, useSelector } from "react-redux";
import { setUploadFilesOpen, setCACertificateOpen, requestInvoiceDefEdit, setIsViewDetailModalOpen, markAsDisputedModalOpenAction } from "../../../store/debtors/debtors.actions"
import { uploadFilesModalOpen, selectCACertificateOpen, isViewDetailMOdalOpenSelector, markAsDisputedModalOpenSelector } from "store/debtors/debtors.selecter"
import { selectReportMeDefData } from "store/ReportMeDefulter/ReportMeDefulter.selecter"
import { fetchReportMeDefulterStart } from "store/ReportMeDefulter/ReportMeDefulter.action"
import UploadPendingFiles from "../Invoice/uploadFilesModal"
import { CompanySerchForm } from "../ApprovedTransaction/companySearchComponet"
import CurrencyFormat from "react-currency-format"
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import ViewDetailsReportDefaultModal from "../Invoice/viewDetailsReportDefaultModal"
import { numberFormat } from "../uploadPendingDoucument/uploadPendingDoc"
import CaImg from '../../../assets/images/newImg/CA-BG_Remove.png'
import ApprovedRaiseTicketModel from "./ApprovedRaiseTicketModel"
import { MarkDisputedPopModule } from "./markDisputedPop"
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
} from "../company-search/companyssearchColl";
import { differenceInDays, format } from 'date-fns';

import { CapitalizeWords } from "pages/Dashboard"

import { selectApproveReportMeDefData, selectCompaintsForMe, selectCompaintsByMe } from "store/ApprovedReportMeDefulter/ApprovedReportMeDefulter.selecter"
import { fetchApproveReportMeDefaulterStart } from "store/ApprovedReportMeDefulter/ApprovedReportMeDefulter.action"
import { approveTransactionReopenStart } from "store/ApprovedTransactionReopen/ApprovedTransactionReopen.action"

const ApprovedReportMeDefaulterComponent = props => {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [selected, setSelected] = useState('');
  const [getDaysArray, setgetDaysArray] = useState([]);
  const [viewModalData, setViewModalData] = useState('');
  const [invoiceIdsForCAcertificate, setinvoiceIdsForCAcertificate] = useState('')
  const [filteredData, setFilteredData] = useState([]);

  const [selectDisput, setSelectDisput] = useState('')

  const [isOpenmark, setIsOpenmark] = useState(false)
  const [isreload, setIsReloaf] = useState(false)
  const [currentindex, setCurrentindex] = useState({})

  const [currentIndexData, setCurrentIndexData] = useState([])

  const markOpenModule = (value) => {
    setIsOpenmark(!isOpenmark)
    setCurrentindex(value)

  }
  const toggleViewModal = () => setModal1(!modal1);
  const toggleViewModal1 = () => setModal2(!modal2);
  const dispatch = useDispatch();
  const selectCACertificate = useSelector(selectCACertificateOpen);
  const toggleViewModal2 = () => dispatch(setCACertificateOpen(!selectCACertificate));

  const markAsDisputed = useSelector(markAsDisputedModalOpenSelector);
  const toggleMarkAsDisputed = () => dispatch(markAsDisputedModalOpenAction(!markAsDisputed));


  const uploadFilesModalShow = useSelector(uploadFilesModalOpen);
  const toggleUploiadFiles = () => dispatch(setUploadFilesOpen(!uploadFilesModalShow));
  const isViewDetailModal = useSelector(isViewDetailMOdalOpenSelector);
  const toggleDetailView = () => dispatch(setIsViewDetailModalOpen(!isViewDetailModal))

  const selectCompaintsForMefList = useSelector(selectCompaintsForMe)





  useEffect(() => {
    dispatch(setIsViewDetailModalOpen())
    dispatch(markAsDisputedModalOpenAction())
    /* dispatch(fetchReportMeDefulterStart()) */
  }, [])

  const viewModel = (value) => {
    setCurrentIndexData(value)
    toggleMarkAsDisputed()
  }

  /*  useEffect(() => {
     dispatch(fetchApproveReportMeDefaulterStart())
   }, []) */




  const handleFilterdata = (filters) => {
    if (selectCompaintsForMefList) {
      if (filters === "") {
        const revArr = selectCompaintsForMefList.reverse()
        setFilteredData(revArr)
      } else {
        const filteredResults = selectCompaintsForMefList.filter(item => {
          return item.defaulterEntry.creditor.companyName.toLocaleLowerCase().includes(filters);
        });
        setFilteredData(filteredResults);
      }
    }
  };



  const requestEdit = (item) => {
    const payload = {
      "invoiceId": item.invoices[0].invoiceNumber
    }
    dispatch(requestInvoiceDefEdit(payload))
    toast.success("Edit Request Sent Successfully")
  }

  const markedDisputed = (item) => {
    const payload = {
      "invoiceId": item.invoices[0].invoiceNumber
    }
    setSelectDisput(item)
    dispatch(markAsDisputedModalOpenAction(payload))
  }

  const handleViewDetail = (item) => {

    // window.location.href = "/ReportDefaulter"
    //setModal4(true)
    setViewModalData(item)
    dispatch(setIsViewDetailModalOpen(!isViewDetailModal))

  }

  const daysSinceReference = (cellValue, referenceDate) => {

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

  const DueSince = (cell) => {

    const valueFordate = cell.row.original?.defaulterEntry?.dueFrom

    /*  const [startDate, setStartDate] = useState(new Date('1965-04-05')); */
    //const startDate = new Date('2019-10-07'); // October 7, 2019
    const today = new Date(); // Current date
    // const currentDate = moment(today).format('YYYY-MM-DD')
    const daysSince = daysSinceReference(valueFordate, today);

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

    const calculateDateDifference = () => {
      const differenceInMilliseconds = today - currentDate;
      const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
      return differenceInDays;

    };
    const divStyle = {
      padding: '1px',
      fontSize: "12px" // Adjust the padding value as needed
    };

    return (


      <div className="" style={{ padding: "2px 2px", fontSize: "12px", width: "90px", margin: "0px" }}>
        {cell.row.original?.defaulterEntry?.dueFrom && <div className=" text-center  p-1 rounded " style={{
          background: calculateDateDifference() < 30 ? "#FDFDFD" : calculateDateDifference() >= 30 && calculateDateDifference() < 90 ? "#ffff80" : calculateDateDifference() > 90 && calculateDateDifference() < 180 ? " #ff944d" : " #ff4d4d",
          color: calculateDateDifference() < 30 ? "#000" : calculateDateDifference() >= 30 && calculateDateDifference() < 90 ? "#000" : calculateDateDifference() > 90 && calculateDateDifference() < 180 ? " #FAFAFA" : " #FAFAFA"
        }}>
          <div className="text-capitalize">
            {calculateDateDifference()}  &nbsp;
            <span className="ml-1">Days</span> </div>
          <div className="text-capitalize" >{cell.cell.row.original.dueFrom}</div>
        </div>}
      </div>
    );
  };
  const DueSincedate = (cell) => {
    const today = new Date();
    const newDate = cell.cell.row.original.invoices != undefined ? cell.cell.row.original.invoices[0].dueDate : "";
    const currentDate = new Date(newDate);

    const calculateDateDifference = () => {
      const differenceInMilliseconds = today - currentDate;
      const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
      return differenceInDays;
    };
    const todayGet = moment(today).format("DD-MM-YYYY")
    const CurrentDatss = moment(cell.cell.row.original.invoices[0].dueDate).format("DD-MM-YYYY")

    const startDate = new Date(todayGet);
    const endDate = new Date(CurrentDatss);
    const difference = differenceInDays(startDate, endDate);



    return (
      <div className="" style={{ padding: "2px 5px" }}>
        <div className=" text-center bg-danger rounded text-light p-1">
          <div className="text-capitalize" style={{}}>
            {difference} &nbsp;
            <span className="ml-1">Days</span> </div>
          <div className="text-capitalize" >{moment(cell.cell.row.original.invoices[0].dueDate).format("DD-MM-YYYY")}</div>
        </div>
      </div>
    );
  };
  const columns = useMemo(
    () => [
      {
        Header: "Sr No.",
        accessor: "SrNo",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return <div
            className="company-name-cell"
          >
            {cellProps.data.length - cellProps.cell.row.index}
          </div>;
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
        Header: "Seller Name",
        accessor: "customerName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div >
            {CapitalizeWords(cellProps.cell.row.original.customerName)}
          </div>

        },
      },
      {
        Header: "Invoice No.",
        accessor: "invoiceList",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div >{cellProps.cell.row.original.invoiceList}
            {/* {cellProps.cell.row.original.defaulterEntry.invoices.map((x) => {
              return <span key={x}>{x.invoiceNumber}, &nbsp;</span>
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
          const address = cellProps.cell.row.original.Address.substring(0, 30) + '...';
          return <div style={{ width: "180px" }}>
            {address}
            {/* {cellProps.cell.row.original?.defaulterEntry?.debtor?.city}<br />{cellProps.cell.row.original?.defaulterEntry?.debtor?.state} */}
          </div>
        },
      },
      {
        Header: "Due Amount",
        accessor: "totalAmount",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <DueAmount {...cellProps} />;
        },
      },
      {
        Header: "Due From *",
        accessor: "",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {

          return <DueSince {...cellProps} />
        },
      },

      {
        Header: "STATUS / OPINION",
        accessor: "status",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div>
            Complaint Approved
          </div>;
        },
      },
      {
        Header: "Action",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          return (
            <div className="">
              <div className="pt-2">
                <Button onClick={() => viewModel(cellProps.cell.row.original)
                } className="btn btn-sm btn-info">
                  Reopen This Ticket
                </Button>

              </div>
            </div>
          );
        },
      },
    ],
    []
  );
  const additionalValue = "Hello from additional prop!";


  const submitCheckRqust1 = (value) => {
    if (value) toast.success("Request send Successfully")
  }

  return (
    <React.Fragment>
      {markAsDisputed && <ApprovedRaiseTicketModel isOpen={markAsDisputed} toggle={toggleMarkAsDisputed} currentIndexData={currentIndexData} />}
      <Card style={{ padding: props.isClickedToReported == undefined && props.isClickedToReported != false ? '' : "0px" }}>
        <CardBody style={{ padding: props.isClickedToReported == undefined && props.isClickedToReported != false ? '' : "0px" }}>
          <div className="mb-4 h4 card-title"></div>
          {props.isClickedToReported == undefined && props.isClickedToReported != false ?
            <div>
              <br />
              <br />


            </div>
            : ""
          }

          <Row className="">
            <Col md={12}></Col>

            {/* {selectCompaintsForMefList != undefined ? <CompanySerchForm onFilter={handleFilterdata} SearchName={"Seller"} /> : ""} */}
          </Row>
          <Row className="  ">
            {selectCompaintsForMefList != undefined && selectCompaintsForMefList != null ?
              <div>
                <TableContainer
                  columns={columns}
                  data={selectCompaintsForMefList}
                  isGlobalFilter={true}
                  isAddOptions={false}
                  customPageSize={10}
                />
              </div>
              :
              ""
            }
          </Row>
        </CardBody>
      </Card>
    </React.Fragment >
  );
}

export default withRouter(ApprovedReportMeDefaulterComponent)
