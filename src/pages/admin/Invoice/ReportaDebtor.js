import React, { useState, useEffect, useMemo } from "react"
import "react-datepicker/dist/react-datepicker.css"
import ReportedDefaulterModel from './ReportDefaulterModel'
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
import { getAllInvoice, setIsReportDefOpen, setUploadFilesOpen, setCACertificateOpen, setIsViewDetailModalOpen, setRequestEditModalOpen } from "../../../store/debtors/debtors.actions"
import { selectReportDefOpen, uploadFilesModalOpen, selectCACertificateOpen, requestEditSelector, isViewDetailMOdalOpenSelector, requestModelSelector, selectInvoiceListMap } from "store/debtors/debtors.selecter"
import UploadPendingFiles from "./uploadFilesModal"
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import ViewDetailsReportDefaultModal from './viewDetailsReportDefaultModal'
import './style.css'
import {
  DueAmount,
} from ".././company-search/companyssearchColl";

import { deleteInvoiceStart } from "store/inviceDelete/inviceDelete.action"

import { InvoiceDeletePop } from "./invoiceDeletePop"

import { StatusAndOpinionObj } from "pages/Dashboard"

import ReportDefaulterModule from "../reportDefaulterModule/reportDefaulterModul"

import { DueSinceApprove } from "./dueSinceModule"

export const ReportDebtor = props => {

  const [modal2, setModal2] = useState(false);
  const [selected, setSelected] = useState('');
  const [requestedData, setrequestedData] = useState('')
  const [viewModalData, setViewModalData] = useState('');
  const [uploadFilesModelDataForUpload, setuploadFilesModelDataForUpload] = useState('')
  const [deletePop, setDeletePop] = useState(false)
  const [deleteValue, setDeleteValue] = useState('')

  const toggleViewModal1 = () => setModal2(!modal2);
  const dispatch = useDispatch();
  const isViewDetailModal = useSelector(isViewDetailMOdalOpenSelector);
  const isReportDefOpen = useSelector(selectReportDefOpen);
  const uploadFilesModalShow = useSelector(uploadFilesModalOpen);
  const toggleUploiadFiles = () => dispatch(setUploadFilesOpen(!uploadFilesModalShow));
  const toggleDetailView = () => dispatch(setIsViewDetailModalOpen(!isViewDetailModal))

  const GetAllInvoice = useSelector(selectInvoiceListMap)

  const toggleViewModal3 = () => {
    dispatch(setIsReportDefOpen(!isReportDefOpen));
    setrequestedData('')

  }

  useEffect(() => {
    dispatch(getAllInvoice());
    dispatch(setIsViewDetailModalOpen())
    dispatch(setRequestEditModalOpen())
  }, [])

  const viewModel = (value) => {
    setSelected(value)
    setModal2(true)
  }

  const handleReportDefaulter = () => {
    dispatch(setIsReportDefOpen(!isReportDefOpen))
  }


  const handleViewDetail = (item) => {
    setViewModalData(item)
    dispatch(setIsViewDetailModalOpen(!isViewDetailModal))
  }



  const handleUploadFiles = (item) => {
    setuploadFilesModelDataForUpload(item)
    dispatch(setUploadFilesOpen(!uploadFilesModalShow))
  }

  const requestEdit = (item) => {
    setrequestedData(item)
    dispatch(setIsReportDefOpen(!isReportDefOpen))

  }



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
              <Col className="d-flex" style={{ gap: '0.6rem', flexWrap: 'nowrap' }}>

                <button type="button" className="btn btn-info " data-toggle="tooltip" data-placement="top"
                  title="Record Payment" href={cellProps.cell.row.original?.url} rel='noreferrer'
                  target='_blank' onClick={() => viewModel(cellProps.cell.row.original)

                  }>
                  <i className='bx bx-wallet-alt textsizing' ></i>
                </button>


                <button type="button" className="btn btn-info " data-toggle="tooltip" data-placement="top"
                  title="Invoice Edit" rel='noreferrer'
                  target='_blank' onClick={() => requestEdit(cellProps.cell.row.original)
                  }
                  disabled={cellProps.cell.row.original?.status == "DRAFT" ? false : true}
                >
                  <i className='bx bx-edit textsizing' ></i>
                </button>


                <button type="button" className="btn btn-info " data-toggle="tooltip" data-placement="top"
                  title="Upload Pending Files" href={cellProps.cell.row.original?.url} rel='noreferrer'
                  target='_blank' onClick={() => handleUploadFiles(cellProps.cell.row.original)
                  }>
                  <i className='bx bx-cloud-upload textsizing' ></i>
                </button>

                <Button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                  title="View Details" href={cellProps.cell.row.original?.url} rel='noreferrer'
                  target='_blank'
                  onClick={() => handleViewDetail(cellProps.cell.row.original)}>
                  <i className='fa fa-eye textsizing'></i>
                </Button>


                <Button type="button" style={{ color: '#FAFAFA', }} className="btn btn-info" data-toggle="tooltip" data-placement="top"
                  title="Delete Invoice"
                  onClick={() => openDeletePop(cellProps.cell.row.original)}>
                  <i className="fa fa-trash textsizing" ></i>
                </Button>


              </Col>
            </div >
          );
        },
      },
    ],
    []
  );



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
      {modal2 && <ReportedDefaulterModel isOpen={modal2} toggle={toggleViewModal1} selected={selected} requestor={'CREDITOR'} name={'Buyer'} />}
      {isReportDefOpen && <ReportDefaulterModule isOpen={isReportDefOpen} toggle={toggleViewModal3} GetAllInvoice={GetAllInvoice} invoiceIsOpen={toggleViewModal3} requestedData={requestedData} />}
      {uploadFilesModalShow && <UploadPendingFiles isOpen={uploadFilesModalShow} toggle={toggleUploiadFiles} uploadFilesModelDataForUpload={uploadFilesModelDataForUpload} />}
      {isViewDetailModal && <ViewDetailsReportDefaultModal isOpen={isViewDetailModal} toggle={toggleDetailView} viewModalData={viewModalData} name={'Buyer'} />}

      <Card style={{ padding: props.isClickedToReported != undefined && props.isClickedToReported ? "" : '' }}>
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
            </Col>
          </Row>

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




