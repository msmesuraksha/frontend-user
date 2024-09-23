import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { isEmpty } from "lodash";

import { Button, Card, CardBody, CardHeader, Label, } from "reactstrap";
import { getOrders as onGetOrders } from "store/actions";
import Select from "react-select"
import { selectDebtorsList } from "store/debtors/debtors.selecter";
import { useDispatch, useSelector } from "react-redux";
import { getAllInvoice, setIsReportDefOpen, setUploadFilesOpen, setCACertificateOpen, requestInvoiceDefEdit } from "../../../store/debtors/debtors.actions"
import { selectReportDefOpen, selectInvoiceList, uploadFilesModalOpen, selectCACertificateOpen, requestEditSelector } from "store/debtors/debtors.selecter"
import { addInvoiceBill, addInvoiceBillSuccess } from '../../../store/actions'
import UploadPendingFiles from "../Invoice/uploadFilesModal";

import ReportedDefaulterModel from "../Invoice/ReportDefaulterModel";
import UploadCACertificateModel from "../Invoice/uploadCACertificateModel";
import moment from 'moment'
import CurrencyFormat from 'react-currency-format';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import {

  Col,
  InputGroup,

  Row,

  Input,

} from "reactstrap";
import CaImg from '../../../assets/images/newImg/CA-BG_Remove.png'
import { numberFormat } from "../uploadPendingDoucument/uploadPendingDoc";
import TableContainer from "../../../components/Common/TableContainer";
import DisputedViewModal from "./NewPaymentModel";
import { selectInvoiceListMap } from "store/debtors/debtors.selecter";
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
} from ".././company-search/companyssearchColl";

const DiputedBillings = props => {
  const [selectedOption, setSelectedOption] = useState("")
  const [selected, setSelected] = useState('');
  const [modal2, setModal2] = useState(false);
  const [invoiceIdsForCAcertificate, setinvoiceIdsForCAcertificate] = useState('')
  const [getDaysArray, setgetDaysArray] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const dispatch = useDispatch();
  const toggleViewModal = () => setModal1(!modal1);
  const toggleViewModal1 = () => setModal2(!modal2);
  const isReportDefOpen = useSelector(selectReportDefOpen);
  const uploadFilesModalShow = useSelector(uploadFilesModalOpen);
  const selectCACertificate = useSelector(selectCACertificateOpen);

  const toggleViewModal2 = () => dispatch(setCACertificateOpen(!selectCACertificate));
  const toggleViewModal3 = () => dispatch(setIsReportDefOpen(!isReportDefOpen));
  const toggleUploiadFiles = () => dispatch(setUploadFilesOpen(!uploadFilesModalShow));



  const GetAllInvoice = useSelector(selectInvoiceListMap)
  useEffect(() => {
    dispatch(getAllInvoice());

    getDays()

  }, [])
  document.title = "Record Payment | MSME Suraksha"

  const handleUploadFiles = () => {
    dispatch(setUploadFilesOpen(!uploadFilesModalShow))
  }

  const viewModel = (value) => {
    setSelected(value)
    setModal2(true)
  }

  const additionalValue = "Hello from additional prop!";
  const colourStyles = {
    menuList: styles => ({
      ...styles,
      background: '#FFFFFF'
    })

  }
  const customStyles = {

    control: (provided, state) => ({
      ...provided,
      background: "#FAFAFA",
      width: "300px",
      // match with the menu
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // Overwrittes the different states of border
      borderColor: state.isFocused ? " #4da6ff" : " #80d4ff",
      // Removes weird border around container  
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? " #4da6ff" : " #80d4ff"
      }
    }),
    option: (provided, state) => ({

      // Your custom option styles here
      backgroundColor: state.isFocused ? '#80bfff' : '#FAFAFA',
      ':hover': {
        backgroundColor: '#80bfff', // Change background color on hover
      },


      menu: base => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        marginTop: 2
      }),
      menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 2,
        margin: 2
      })
    }),
    // Add more styles as needed for other parts of the Select component
  };
  const handleSelectCustomer = (item) => {

    setSelectedOption(item)


  }
  const [modal1, setModal1] = useState(false);

  const getDays = () => {
    GetAllInvoice != undefined ? GetAllInvoice.map((item) => {

      const a = moment(item.debtor != null ? item.debtor.createdAt : "").format("YYYY-MM-DD")
      const today = new Date();
      const newDate = a.split("-").reverse().join("-");
      const currentDate = new Date(a);
      const differenceInMilliseconds = today - currentDate;
      const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
      setgetDaysArray(items => [...items, differenceInDays])
    }) : []

  }




  function getDebtrosLists(responsData) {
    return (responsData && (
      responsData.map((item) => {
        return (
          {
            "value": item.id, "label": item.firstname + ", " + item.companyName,
          }

        )
      })
    )
    )
  }
  const checkboxStyle = {
    border: '2px solid #3498db', // Set the border color (change #3498db to your desired color)
    borderRadius: '4px', // Optional: Add rounded corners for a nicer look
    padding: '5px', // Optional: Add padding to the checkbox
    marginRight: '5px', // Optional: Add some spacing between the checkbox and label
  };
  const [salutations, setsalutations] = useState([
    { label: "Cash", value: "Cash" },
    { label: "Credit Card", value: "Credit Card" },
    { label: "Chaque", value: "Chaque" },
    { label: "Bank Transfer", value: "Bank Transfer" },

  ])
  const GetAllDebtors = useSelector(selectDebtorsList)

  const getDebtrosList = getDebtrosLists(GetAllDebtors)

  const handleFilterdata = (filters) => {
    if (GetAllInvoice) {
      if (filters === "") {
        setFilteredData(GetAllInvoice)
      } else {
        const filteredResults = GetAllInvoice.filter(item => {
          return item.debtor.companyName.toLocaleLowerCase().includes(filters);
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


  const DueSincedate = (cell) => {
    const today = new Date();
    const currentDate = new Date(cell.cell.row.original.debtor != null ? cell.cell.row.original.debtor.createdAt : '');
    let e = ""
    const calculateDateDifference = () => {
      const differenceInMilliseconds = today - currentDate;
      const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
      e = differenceInDays
      return differenceInDays;
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
          <div className="text-capitalize" >{moment(cell.cell.row.original.invoices[0].dueDate).format("DD-MM-YYYY")}</div>
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
        Header: "COMPANY NAME",
        accessor: "customerName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div className="text-capitalize">
            {cellProps.cell.row.original.customerName}
          </div>

        },
      },
      {
        Header: "INVOICE No.",
        accessor: "invoiceList",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div>
            {/* {cellProps.cell.row.original.invoices.map((x, i) => {
              return <span key={x}>{i > 0 ? ', ' : ''}{x.invoiceNumber}</span>
            })} */}
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
          const address = cellProps.cell.row.original.Address.substring(0, 20) + '...';
          return <div style={{ width: '160px' }}>             {address}

            {/* {cellProps.cell.row.original.debtor != null ?<>   {cellProps.cell.row.original.debtor.address1}<br />{cellProps.cell.row.original.debtor.address2}</>:""}<br /> */}
          </div>
        },
      },
      {
        Header: "DUE AMOUNT",
        accessor: "totalAmount",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <DueAmount {...cellProps} />;
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
            <div className="d-flex">
              <div className="pt-2">
                <button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                  title="Record Payment" href={cellProps.cell.row.original.url} rel='noreferrer'
                  target='_blank' onClick={() => viewModel(cellProps.cell.row.original)
                  }>
                  <i className='bx bx-wallet-alt textsizing' ></i>
                </button>
                {/*           &nbsp; */}
                {/*                 <button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                  title="Request Edit" href={cellProps.cell.row.original.url} rel='noreferrer'
                  target='_blank' onClick={() => requestEdit(cellProps.cell.row.original)
                  }>
                  <i className='bx bx-edit textsizing' ></i>
                </button> */}
                {/*                 &nbsp;
                <button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top"
                  title="Upload CA Certificate" href={cellProps.cell.row.original.url} rel='noreferrer'
                  target='_blank' onClick={() => {
                    toggleViewModal2()
                    setinvoiceIdsForCAcertificate(cellProps.cell.row.original.invoices[0].invoiceNumber)
                  }
                  }>
                  <img src={CaImg} className="" style={{ height: "22.5px" }} />
                </button>
                &nbsp; */}


              </div>
            </div>
          );
        },
      },
    ],
    []
  );






  return (
    <React.Fragment>
      <ReportedDefaulterModel isOpen={modal2} toggle={toggleViewModal1} selected={selected} customerName={invoiceIdsForCAcertificate} requestor={'CREDITOR'} />
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title"></div>
          <br />
          <br />
          <br />


          <Row>
            <Col md={10} className="pl-3" style={{ textTransform: "capitalize" }}>
              <h5 className="m-1"><b>Record Payment</b></h5>
            </Col>
          </Row>

          <Row className="p-4  ml-5">
            {/* <br/> */}

            {GetAllInvoice != undefined && (<TableContainer
              columns={columns}
              data={GetAllInvoice.length > 0 ? GetAllInvoice : []}
              isGlobalFilter={true}
              isAddOptions={false}
              customPageSize={10}
            />)}

          </Row>
          <p className="">Due From : The number of due days is calculated from date of oldest invoice.
          </p>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};


DiputedBillings.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(DiputedBillings);
