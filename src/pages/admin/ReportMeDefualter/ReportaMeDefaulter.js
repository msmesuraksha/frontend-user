import React, { useState, useEffect, useMemo } from "react"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
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
import { useDispatch, useSelector } from "react-redux";
import { setUploadFilesOpen, setCACertificateOpen, requestInvoiceDefEdit, setIsViewDetailModalOpen, markAsDisputedModalOpenAction } from "../../../store/debtors/debtors.actions"
import { uploadFilesModalOpen, selectCACertificateOpen, isViewDetailMOdalOpenSelector, markAsDisputedModalOpenSelector } from "store/debtors/debtors.selecter"
import { selectReportMeDefData } from "store/ReportMeDefulter/ReportMeDefulter.selecter"
import { fetchReportMeDefulterStart } from "store/ReportMeDefulter/ReportMeDefulter.action"
import UploadPendingFiles from "../Invoice/uploadFilesModal"
import CurrencyFormat from "react-currency-format"
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import ViewDetailsReportDefaultModal from "../Invoice/viewDetailsReportDefaultModal"
import { numberFormat } from "../uploadPendingDoucument/uploadPendingDoc"
import CaImg from '../../../assets/images/newImg/CA-BG_Remove.png'
import MarkDisputedMadal from "./markDisputedMadal"
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
  Adddresss,
  Reating
} from ".././company-search/companyssearchColl";
import { differenceInDays, format } from 'date-fns';

import { CapitalizeWords } from "pages/Dashboard"

import { StatusAndOpinionObj } from "pages/Dashboard"

const ReportMedefulterComponent = props => {



  const [customerType, setCustomerType] = useState();

  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [selected, setSelected] = useState('');
  const [viewModalData, setViewModalData] = useState('');
  const [invoiceIdsForCAcertificate, setinvoiceIdsForCAcertificate] = useState('')
  const [filteredData, setFilteredData] = useState([]);

  const [selectDisput, setSelectDisput] = useState('')

  const [isOpenmark, setIsOpenmark] = useState(false)
  const [isreload, setIsReloaf] = useState(false)
  const [currentindex, setCurrentindex] = useState({})

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
  const selectReportMeDeflist = useSelector(selectReportMeDefData)


  useEffect(() => {
    dispatch(setIsViewDetailModalOpen())
    dispatch(markAsDisputedModalOpenAction())
    dispatch(fetchReportMeDefulterStart())
  }, [])

  const viewModel = (value) => {
    setSelected(value)
    setModal2(true)
  }

  function sortArrayByField(dataType, array, field) {
    return array.sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];

      switch (dataType) {
        case 'string':
          return aValue.localeCompare(bValue);

        case 'number':
          return aValue - bValue;

        case 'date':
          return new Date(aValue) - new Date(bValue);

        default:
          throw new Error('Unsupported data type');
      }
    });
  }

  useEffect(() => {
    if (selectReportMeDeflist) {
      const sortedByDate = sortArrayByField('date', selectReportMeDeflist, 'createdAt');

      setFilteredData(sortedByDate)
    }

  }, [selectReportMeDeflist])



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
      const currentDate = new Date(cellValue);
      const timeDifference = referenceDate - currentDate;
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      return daysDifference;
    }
    return '';
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
    let e = ''
    const calculateDateDifference = () => {
      const differenceInMilliseconds = today - currentDate;
      const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
      // e = differenceInDays
      // e= 10000
      return differenceInDays;

    };


    let badgeClassName = "font-size-11 badge ";
    if (calculateDateDifference() > 1 && calculateDateDifference() < 30) {
      badgeClassName += "bg-white text-dark";
    } else if (calculateDateDifference() > 30 && calculateDateDifference() < 90) {
      badgeClassName += "bg-warning text-dark";
    } else if (calculateDateDifference() > 90 && calculateDateDifference() < 180) {
      badgeClassName += "bg-warning text-dark";
    } else {
      badgeClassName += "bg-danger text-white";
    }
    const divStyle = {
      padding: '1px',
      fontSize: "12px"// Adjust the padding value as needed
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
          <div className="text-capitalize" >{cell.cell.row.original?.dueFrom}</div>
        </div>
      </div>
    );
  };

  const daysSinceRefe = (cellValue, referenceDate) => {

    if (cellValue) {
      // Split the date string into day, month, and year components
      // const [dayStr, monthStr, yearStr] = cellValue.split('-');
      const [dayStr, monthStr, yearStr] = cellValue;

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
          return <div className="text-capitalize" style={{ width: "110px" }}>
            {cellProps.cell.row.original.customerName}
          </div>

        },
      },
      {
        Header: "Invoice No.",
        accessor: "invoiceList",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div style={{ width: "90px" }}>
            {cellProps.cell.row.original.invoiceList}
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
          return <Adddresss {...cellProps} />
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
        Header: "STATUS / OPINION",
        accessor: "status",
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

          return <span className="text-center">{currentStatus}</span>;
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
        Header: "Action",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          return (
            <div className="d-flex" style={{ width: "230px" }}>
              <Col /* className="text-center" */ className="d-flex" style={{ gap: '0.6rem', flexWrap: 'nowrap' }}>

                <button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                  title="Record Payment" rel='noreferrer'
                  target='_blank' onClick={() => viewModel(cellProps.cell.row.original)
                  }>
                  <i className='bx bx-wallet-alt textsizing' ></i>
                </button>


                <Button className="btn btn-info" data-toggle="tooltip" data-placement="top"
                  title="Disputed Transaction" rel='noreferrer'
                  target='_blank' onClick={() => markOpenModule(cellProps.cell.row.original)

                  }>
                  {/* <i className='bx bx-window-close textsizing'></i> */}
                  <i className='bx bx-x-circle textsizing'></i>
                </Button>

                {/* <Col className="p-1" md={2}>
                  <button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                    title="Upload CA Certificate" rel='noreferrer'
                    target='_blank' onClick={() => {
                      toggleViewModal2()
                      setinvoiceIdsForCAcertificate(cellProps.cell.row.original.invoices[0].invoiceNumber)
                      setCustomerType("CREDITOR")

                    }
                    }>
                    <img src={CaImg} className="" style={{ height: "22.5px", width: '18px' }} />
                  </button>
                </Col> */}

                <Button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                  title="View Details" rel='noreferrer'
                  target='_blank'
                  onClick={() => handleViewDetail(cellProps.cell.row.original)}>


                  <i className='fa fa-eye textsizing'></i>
                </Button>

              </Col>

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
      {modal2 && <ReportedDefaulterModel isOpen={modal2} toggle={toggleViewModal1} additionalValue={additionalValue} selected={selected} requestor={"DEBTOR"} name={'Seller'} />}
      {selectCACertificate && <UploadCACertificateModel isOpen={selectCACertificate} toggle={toggleViewModal2} invoiceId={invoiceIdsForCAcertificate} customerType={customerType} />}

      {/* <UploadPendingFiles isOpen={uploadFilesModalShow} toggle={toggleUploiadFiles} uploadFilesModelDataForUpload={uploadFilesModelDataForUpload} /> */}

      {isViewDetailModal && <ViewDetailsReportDefaultModal isOpen={isViewDetailModal} toggle={toggleDetailView} viewModalData={viewModalData} name={'Seller'} />}

      {markAsDisputed && <MarkDisputedMadal isOpen={markAsDisputed} toggle={toggleMarkAsDisputed} selected={selectDisput} setIsOpenmark={setIsOpenmark} submitCheckRqust1={submitCheckRqust1} />}
      {isOpenmark && <MarkDisputedPopModule isOpen={isOpenmark} toggle={markOpenModule} currentindex={currentindex} markedDisputed={markedDisputed} setIsOpenmark={setIsOpenmark} />}

      <Card style={{ padding: props.isClickedToReported == undefined && props.isClickedToReported != false ? "" : "" }}>
        <CardBody style={{ padding: props.isClickedToReported == undefined && props.isClickedToReported != false ? "25px" : "0px" }}>
          
          {props.isClickedToReported == undefined && props.isClickedToReported != false ?
            <div>
              <br />
              <br />


            </div>
            : ""
          }

          {props.isClickedToReported == undefined && props.isClickedToReported != false ? <Row >
            <Col md={3} className="pl-2" style={{ textTransform: "capitalize" }}>
              <h5 className="m-1"><b>Complaints Against Me</b></h5>
            </Col>

          </Row> : ""}
          <Row className="  ">
            {selectReportMeDeflist != undefined && selectReportMeDeflist != null ?
              <TableContainer
                columns={columns}
                data={filteredData}
                isGlobalFilter={true}
                isAddOptions={false}
                customPageSize={10}
              />
              :
              ""
            }
          </Row>
          <p className="">Due From : The number of due days is calculated from date of oldest invoice.
          </p>
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

export default withRouter(ReportMedefulterComponent)
