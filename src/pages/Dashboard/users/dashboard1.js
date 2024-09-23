import React, { useState, useEffect, useMemo } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import Select, { components } from "react-select"
import ReportedDefaulterModel from '../../../../src/pages/admin/Invoice/ReportDefaulterModel'
import UploadCACertificateModel from '../../../../src/pages/admin/Invoice/uploadCACertificateModel'

import 'react-table-6/react-table.css'
import ReactTable from 'react-table-6'
import CurrencyFormat from 'react-currency-format';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,

} from "reactstrap"
import TableContainer from "../../../components/Common/TableContainer";
import { getInvoices as ongetInvoices } from '../../../store/actions'
import { useDispatch, useSelector } from "react-redux";
import { success } from "toastr"
//import { getAllInvoice as ongetAllInvoice } from '../../../../src/store/actions'
import { getAllInvoice, setIsReportDefOpen } from "../../../store/debtors/debtors.actions"
import { selectReportDefOpen, selectInvoiceList } from "../../../store/debtors/debtors.selecter"
import moment from 'moment'




const ReportDebtor = props => {
  const [modal1, setModal1] = useState(false);
  const [getDaysArray, setgetDaysArray] = useState([]);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [selected, setSelected] = useState('');
  const toggleViewModal = () => setModal1(!modal1);
  const toggleViewModal1 = () => setModal2(!modal2);
  const toggleViewModal2 = () => setModal2(!modal3);
  //const [modal4, setModal4] = useState(false);
  /*  const toggleViewModal3 = () => setModal4(!modal4); */
  const dispatch = useDispatch();

  const isReportDefOpen = useSelector(selectReportDefOpen);
  const toggleViewModal3 = () => dispatch(setIsReportDefOpen(!isReportDefOpen));

  const GetAllInvoice = useSelector(selectInvoiceList)

  useEffect(() => {
    dispatch(getAllInvoice());

    getDays()

  }, [])

  const viewModel = (value) => {
    setSelected(value)
    setModal2(true)
  }

  const viewModels = (value) => {
    setModal3(true)
  }


  const columns = useMemo(
    () => [
      {
        Header: "#",
        filterable: false,
        headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600', },
        style: { padding: "15px" },
        width: 50,

        disableFilters: true,
        Cell: cellProps => {
          return <input type="checkbox" className="form-check-input" />;
        },
      },

      {
        Header: "Refrence Number",
        accessor: "referenceNumber",
        headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600' },
        style: { padding: "15px" },


      },
      {
        Header: "Customer Name",
        accessor: "",
        headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600' },
        style: { padding: "15px" },

        Cell: cellProps => {
          return (<div className="text-capitalize" >{cellProps.original.debtor.firstname}</div>

          )
        }
      },
      {
        Header: "Invoice Number",
        accessor: "",
        headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600', pointerEvent: "none", },
        style: { padding: "15px" },

        Cell: cellProps => {
          return (<div className="text-capitalize" >{cellProps.original.invoiceNumber}</div>

          )
        }
      },
      {
        Header: "Due Amount",
        accessor: "remainingAmount",
        headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600' },
        style: { padding: "15px" },


      },
      {
        Header: 'Due From',
        disableFilters: true,
        headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600' },

        filterable: false,
        accessor: "",

        Cell: cellProps => {
          const a = moment(cellProps.original.dueDate);
          const b = moment()
          const c = moment(b).diff(a)
          const d = moment.duration(c)
          return (

            <div className="" style={{ padding: "5px 35px" }}>
              <div className=" text-center bg-success rounded text-light">
                <div className="text-capitalize">
                  {
                    d.days()

                  } Days </div>
                <div className="text-capitalize" >{moment(cellProps.original.dueDate).format("MM-DD-YY")}</div>
              </div>
            </div>
          )
        }
      },



      {
        Header: "Action",
        headerStyle: { textAlign: 'left', padding: "10px", fontWeight: '600' },
        style: { padding: "15px" },
        accessor: "",

        Cell: (cellProps) => (
          <div>
            <Button className="btn btn-info btn-sm"
              onClick={() => viewModel(cellProps.original)

              }
            >
              Report a Defaulter
            </Button>

          </div>
        )
      },



    ],
    []
  );

  const additionalValue = "Hello from additional prop!";

  const handleReportDefaulter = () => {
    // window.location.href = "/ReportDefaulter"
    //setModal4(true)
    dispatch(setIsReportDefOpen(!isReportDefOpen))
  }
  const getDays = () => {
    GetAllInvoice != undefined ? GetAllInvoice.map((item) => {
      const a = moment(item.dueDate);
      const b = moment()
      const c = moment(b).diff(a)
      const d = moment.duration(c)
      if (getDaysArray.length != GetAllInvoice.length) {
        getDaysArray.push(d.days())

      }
    }) : []
  }

  return (
    <React.Fragment>

      <ReportedDefaulterModel isOpen={modal2} toggle={toggleViewModal1} selected={selected} />
      <UploadCACertificateModel isOpen={modal3} toggle={toggleViewModal2} />


      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title"></div>
          <br />
          <br />
          <br />


          <Row>
            <Col md={10} className="pl-3">
              <h5 className="m-1">Dashboard</h5>
            </Col>
            <Col md={2}>
              <Button className="btn btn-md btn-info" onClick={() => handleReportDefaulter()}>Report a Defaulter</Button>
            </Col>
          </Row>

          <Row className="p-4  ml-5">
            {/* <br/> */}

            {/* <ReactTable
              data={GetAllInvoice != undefined ? GetAllInvoice : []}
              columns={columns}
              showPagination={true}
              defaultPageSize={5}
            /> */}

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Company Name</th>
                  {/* <th scope="col">Refrence Number</th> */}
                  <th scope="col">Invoice Number</th>
                  {/* <th scope="col">Status</th> */}
                  <th scope="col">Address</th>
                  <th scope="col">Due Amount</th>
                  <th scope="col">Due From</th>
                  <th scope="col">Action</th>
                  {/* <th scope="col">Upload Document</th> */}
                </tr>
              </thead>
              <tbody>
                {GetAllInvoice != undefined ? GetAllInvoice.map((item, index) => {
                  return <tr key={item}>

                    <th scope="row" className="pt-4">{index + 1}</th>
                    {/* <td className="pt-4">{item.debtor.firstname} {item.debtor.lastname}</td> */}
                    <td className="pt-4 text-capitalize">{item.debtor.companyName}</td>
                    {/* <td className="pt-4">{item.referenceNumber}</td> */}
                    <td className="pt-4">{item.invoiceNumber}</td>
                    <td className="pt-4 d-flex text-capitalize">{item.debtor.companyName}
                      <br />
                      {item.debtor.address1} {item.debtor.address2}, {item.debtor.city}</td>
                    {/* <td className="pt-4">{item.status}</td> */}
                    <td className="pt-4 text-end">
                      <CurrencyFormat value={item.remainingAmount} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}{0}</div>} />

                    </td>

                    <td >

                      <div className="" style={{ padding: "2px 15px" }}>

                        <div className=" text-center bg-success rounded text-light">
                          <div className="text-capitalize">

                            {getDaysArray[index]}  &nbsp;


                            <span className="ml-1">Days</span> </div>
                          <div className="text-capitalize" >{moment(item.dueDate).format("MM-DD-YY")}</div>
                        </div>
                      </div>

                    </td>
                    <td>
                      <div className="pt-2">
                        <Button className="btn btn-info btn-sm"
                          onClick={() => viewModel(item)

                          }
                        >
                          Record Payment
                        </Button>
                        &nbsp;

                        <Button className="btn btn-info btn-sm"
                        // onClick={() => viewModels()

                        // }
                        >
                          Request Edit
                        </Button>

                      </div>
                    </td>
                    {/* <td>
    <div className="pt-2">
            <Button className="btn btn-info btn-sm"
              onClick={() => viewModels()
               
              }
            >
           Upload Document
            </Button>
  
          </div>
    </td> */}
                  </tr>
                }) : ''}


              </tbody>
            </table>

          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

export default withRouter(ReportDebtor)
