import React, { useState, useEffect, useMemo } from "react"
import "react-datepicker/dist/react-datepicker.css"
import withRouter from "components/Common/withRouter"
import "../../Dashboard/users/send-bill-transaction/sendbillTransaction"
import 'react-table-6/react-table.css'
import { AddcustomerFomr } from "./addCustomerForm"
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,

} from "reactstrap"

import TableContainer from "components/Common/TableContainer"

import { useDispatch, useSelector } from "react-redux";
import { getAllDebtors } from "../../../store/debtors/debtors.actions"
import { selectDebtorsList, selectDebtorsListMap } from "store/debtors/debtors.selecter"
import { SelectAddCustomer } from "store/addCustomer/addCustomer.selecter"
import { setAddCustomerOpen } from "store/addCustomer/addCustomer.actiontype"
import { SelectAddCustomerList } from "store/actions"

import { CapitalizeWords } from "pages/Dashboard"



const AddCustomer = props => {

  const [getDaysArray, setgetDaysArray] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();

  const isAddCustomerOpen = useSelector(SelectAddCustomer);
  const toggleAddCustomer = () => dispatch(setAddCustomerOpen(!isAddCustomerOpen));

  const GetAllDebtors = useSelector(selectDebtorsList)
  let GetAllDebtorsMap = useSelector(selectDebtorsListMap)

  GetAllDebtorsMap = GetAllDebtorsMap.sort((a, b) => b.customerName.localeCompare(a.customerName));
  /*   const selectNewCustomerList = useSelector(SelectAddCustomerList) */

  /*   let GetAllDebtors
    if (selectNewCustomerList.length > 0) {
      GetAllDebtors = [...selectGetAllDebtors, ...selectNewCustomerList]
    } else {
      GetAllDebtors = selectGetAllDebtors
    } */

  document.title = "Customer list | MSME Suraksha"

  useEffect(() => {
    dispatch(getAllDebtors());
    setFilteredData(GetAllDebtorsMap)
  }, [])



  const handleFilterdata = (filters) => {
    if (GetAllDebtorsMap.length > 0) {
      const filteredResults = GetAllDebtorsMap.filter(item => {
        const fullname = item.customerName.toLocaleLowerCase()
        return fullname.toLocaleLowerCase().includes(filters);
      });
      setFilteredData(filteredResults);
    }

  };

  const CompanyName = (cell, index) => {

    return cell.value ? <div className="text-capitalize">{cell.value}</div> : '';
  };
  const EMAILCustomer = (cell, index) => {

    return cell.value ? <div className="">{cell.value}</div> : '';
  };

  const GSTNo = (cell, index) => {
    return <span className='text-uppercase'>{cell.value ? cell.value : ''}</span>;
  };

  const WordCapital = (cell) => {

    return cell.value ? CapitalizeWords(cell.value) : '';
  }

  const columns = useMemo(
    () => [
      // {
      //   Header: "Sr No",
      //   accessor: "SrNo",
      //   filterable: false,
      //   disableFilters: true,
      //   Cell: cellProps => {
      //     return <CompanyName {...cellProps} />;
      //   },
      // },
      {
        Header: "Members NAME",
        accessor: "customerName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <WordCapital {...cellProps} />;
        },
      },
      {
        Header: "COMPANY NAME",
        accessor: "companyName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <WordCapital {...cellProps} />;
        },
      },
      {
        Header: "ADDRESS",
        accessor: "address",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <CompanyName {...cellProps} />;
        },
      },
      {
        Header: "GST No.",
        accessor: "gstin",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <GSTNo {...cellProps} />;
        },
      },
      {
        Header: "MOBILE No.",
        accessor: "customerMobile",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <CompanyName {...cellProps} />;
        },
      },
      {
        Header: "EMAIL",
        accessor: "customerEmail",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <EMAILCustomer {...cellProps} />;
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
            <Col md={10} className="pl-3" style={{ textTransform: "capitalize" }}>
              <h5 className="m-1"> <b>Members / Company</b></h5>
            </Col>
            <Col md={2}>
              <Button className="btn btn-md btn-info" onClick={() => toggleAddCustomer()}>Add New Member</Button>
            </Col>
          </Row>
          <Row className="p-4  ml-5">
            <TableContainer
              columns={columns}
              data={GetAllDebtorsMap}
              isGlobalFilter={true}
              isAddOptions={false}
              customPageSize={10}
            />
          </Row>
        </CardBody>
      </Card>
      {isAddCustomerOpen && <AddcustomerFomr isAddCustomercheck={isAddCustomerOpen} />}
    </React.Fragment>
  );
}


export default withRouter(AddCustomer)
