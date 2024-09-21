import React, { useState, useEffect, useMemo } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import Select, { components } from "react-select"
import moment from "moment"
import "../../Dashboard/users/send-bill-transaction/sendbillTransaction"
import ReportedDebtorsModel from "../Invoice/ReportedModel"
import ReportedDefaulterModel from "../Invoice/ReportDefaulterModel"
/* import ReportIncoiceModel from './ReportInvoiceModel' */
import 'react-table-6/react-table.css'
import ReactTable from 'react-table-6'
import CurrencyFormat from 'react-currency-format';
// import ReactTooltip from "react-tooltip";
/* import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton"; */
import { ToastContainer, toast } from "react-toastify"
import {
    Row,
    Col,
    Card,
    CardBody,

} from "reactstrap"
import TableContainer from "../../../components/Common/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchUploadPendingListStart } from "store/UploadPendingDocList/UploadPendingDocList.action"
import { selectTransactionsRaisedByMeDataMap, selectTransactionsSentToMeDataMap } from "store/UploadPendingDocList/UploadPendingDocList.selecter"
import UploadPendingDocModel from "./uploadPendingDoc"
import { numberFormat } from "./uploadPendingDoc"
import { selectUploadPendigDocOpen } from "store/UploadPendingDocList/UploadPendingDocList.selecter"
import { setUploadPednigDocOpen } from "store/UploadPendingDocList/UploadPendingDocList.action"

import {
    SrNo,
} from ".././company-search/companyssearchColl";

import { CapitalizeWords } from "pages/Dashboard"


const UploadPendingListModule = props => {
    const dispatch = useDispatch();
    const [selectType, setSelectType] = useState('')
    const selectTransactionsRaisedByMe = useSelector(selectTransactionsRaisedByMeDataMap);
    const selectTransactionsSentToMe = useSelector(selectTransactionsSentToMeDataMap);
    const uploadFilesModalShow = useSelector(selectUploadPendigDocOpen);
    const toggleUploiadFiles = () => dispatch(setUploadPednigDocOpen(!uploadFilesModalShow));

    useEffect(() => {
        dispatch(fetchUploadPendingListStart())
    }, [])
    document.title = "Upload Pending Files | MSME Suraksha"



    const [uploadFilesModelDataForUpload, setuploadFilesModelDataForUpload] = useState('')

    const handleUploadFiles = (item) => {
        setuploadFilesModelDataForUpload(item)
        dispatch(setUploadPednigDocOpen(!uploadFilesModalShow))
    }


    const Reatings = (cell) => {
        return <div>4.2</div>;
    };

    const DueSincedate = (cell) => {
        const today = new Date();
        const newDate = cell.cell.row.original.paymentDate != undefined ? cell.cell.row.original.paymentDate.split("-").reverse().join("-") : "";
        const currentDate = new Date(newDate);
        let e = ''
        const calculateDateDifference = () => {
            const differenceInMilliseconds = today - currentDate;
            const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
            e = differenceInDays
            return differenceInDays;
        };

        return (
            <div className="" style={{ padding: "2px 10px", fontSize: "12px" }}>
                <div className=" text-center  p-1 rounded " style={{
                    background: e < 30 ? "#FDFDFD" : e > 30 && e < 90 ? "#ffff80" : e > 90 && e < 180 ? " #ff944d" : " #ff4d4d",
                    color: e < 30 ? "#000" : e > 30 && e < 90 ? "#000" : e > 90 && e < 180 ? " #FAFAFA" : " #FAFAFA"
                }}>                    <div className="text-capitalize">
                        {calculateDateDifference()}  &nbsp;
                        <span className="ml-1">Days</span> </div>
                    <div className="text-capitalize" >{cell.cell.row.original.paymentDate}</div>
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
                    return <SrNo {...cellProps} />;
                },
            },
            {
                Header: "complaint DATE",
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
                accessor: "",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <div>

                        {cellProps.cell?.row?.original?.complaintNumber}
                    </div>
                },
            },
            {
                Header: "COMPANY NAME",
                accessor: "CompanyName",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <div>
                        {CapitalizeWords(cellProps.cell.row.original.creditor.companyName)}
                    </div>

                },
            },
            {
                Header: "INVOICE NO.",
                accessor: "PANCARD",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <div>
                        {cellProps.cell.row.original.invoices.map((x, i) => {
                            return <span key={x}>{i > 0 ? ', ' : ''}{x.invoiceNumber}</span>
                        })}
                    </div>

                },
            },
            {
                Header: "ADDRESS",
                accessor: "GST",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <div className="d-flex text-capitalize">{cellProps.cell.row.original.creditor.companyName}
                        <br />
                        {cellProps.cell.row.original.creditor.address1} {cellProps.cell.row.original.creditor.address2}, {cellProps.cell.row.original.creditor.city}
                    </div>
                },
            },
            {
                Header: "DUE AMOUNT",
                accessor: "totalAmount",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <div className="text-end">
                        {numberFormat(cellProps.cell.row.original.totalAmount)}
                    </div>;
                },
            },
            {
                Header: "DUE FROM",
                accessor: "dueFrom",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <DueSincedate {...cellProps} />;
                },
            },
            /*      {
                     Header: "Member RATINGS",
                     accessor: "RATINGS",
                     disableFilters: true,
                     filterable: false,
                     Cell: cellProps => {
                         return <Reatings {...cellProps} />;
                     },
                 }, */


            {
                Header: "ACTION",
                disableFilters: true,
                accessor: "view",
                Cell: cellProps => {
                    return (
                        <div className="d-flex">
                            <div className="pt-2">
                                &nbsp;
                                <button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                                    title="Upload Pending Files" href={cellProps.cell.row.original.url} rel='noreferrer'
                                    target='_blank' onClick={() => { handleUploadFiles(cellProps.cell.row.original), setSelectType('CREDITOR') }

                                    }>
                                    <i className='bx bx-cloud-upload textsizing' ></i>
                                </button>
                                &nbsp;


                            </div>
                        </div>
                    );
                },
            },
        ],
        []
    );
    const columns2 = useMemo(
        () => [
            {
                Header: "Sr No.",
                accessor: "SrNo",
                filterable: false,
                disableFilters: true,
                Cell: cellProps => {
                    return <SrNo {...cellProps} />;
                },
            },
            {
                Header: "complaint DATE",
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
                accessor: "",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <div>

                        {cellProps.cell?.row?.original?.complaintNumber}
                    </div>
                },
            },
            {
                Header: "COMPANY NAME",
                accessor: "CompanyName",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <div>
                        {CapitalizeWords(cellProps.cell.row.original.debtor.companyName)}
                    </div>

                },
            },
            {
                Header: "INVOICE NO.",
                accessor: "PANCARD",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <div>
                        {cellProps.cell.row.original.invoices.map((x, i) => {
                            return <span key={x}>{i > 0 ? ', ' : ''}{x.invoiceNumber}</span>
                        })}
                    </div>

                },
            },
            {
                Header: "ADDRESS",
                accessor: "GST",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <div className=" d-flex text-capitalize">
                        {cellProps.cell.row.original.debtor.companyName}
                        <br />
                        {cellProps.cell.row.original.debtor.address1} {cellProps.cell.row.original.debtor.address2 == undefined ? '' : cellProps.cell.row.original.debtor.address2 + ', '} {cellProps.cell.row.original.debtor.city}, {cellProps.cell.row.original.debtor.state}
                    </div>
                },
            },
            {
                Header: "DUE AMOUNT",
                accessor: "totalAmount",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <div className="text-end">
                        {numberFormat(cellProps.cell.row.original.totalAmount)}
                    </div>;
                },
            },
            {
                Header: "DUE FROM",
                accessor: "dueFrom",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <DueSincedate {...cellProps} />;
                },
            },



            {
                Header: "ACTION",
                disableFilters: true,
                accessor: "view",
                Cell: cellProps => {
                    return (
                        <div className="d-flex">
                            <div className="pt-2">
                                &nbsp;
                                <button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                                    title="Upload Pending Files" href={cellProps.cell.row.original.url} rel='noreferrer'
                                    target='_blank' onClick={() => { handleUploadFiles(cellProps.cell.row.original), setSelectType('DEBTOR') }
                                    }>
                                    <i className='bx bx-cloud-upload textsizing' ></i>
                                </button>
                                &nbsp;


                            </div>
                        </div>
                    );
                },
            },
        ],
        []
    );

    const submitCheck = (value) => {
        if (value) toast.success("File Upload Successfully")

        setImmediate(() => {
            dispatch(fetchUploadPendingListStart())
        }, 1000)
    }

    return (
        <React.Fragment>
            {uploadFilesModalShow && (<UploadPendingDocModel isOpen={uploadFilesModalShow} toggle={toggleUploiadFiles} uploadFilesModelDataForUpload={uploadFilesModelDataForUpload} selectType={selectType} submitCheck={submitCheck} />)}
            <Card>
                <CardBody className="p-1">
                    <div className="mb-4 h4 card-title"></div>
                    <br />
                    <br />
                    <br />
                    <Row>
                        <Col md={10} className="pl-3" style={{ textTransform: "capitalize" }}>
                            <h5 className="m-1"><b>My Complaints</b></h5>
                        </Col>
                    </Row>
                    <Row className="p-2  ml-5">
                        <TableContainer
                            columns={columns}
                            data={selectTransactionsRaisedByMe}
                            isGlobalFilter={false}
                            isAddOptions={false}
                            customPageSize={10}
                        />

                    </Row>
                    <Row>
                        <Col md={10} className="pl-3">
                            <h5 className="m-1"><b>Complaints Against Me</b> </h5>
                        </Col>
                    </Row>
                    <Row className="p-2  ml-5">
                        <TableContainer
                            columns={columns2}
                            data={selectTransactionsSentToMe}
                            isGlobalFilter={false}
                            isAddOptions={false}
                            customPageSize={10}
                        />
                    </Row>
                </CardBody>

            </Card>
            <ToastContainer />
        </React.Fragment>
    );
}



export default withRouter(UploadPendingListModule)
