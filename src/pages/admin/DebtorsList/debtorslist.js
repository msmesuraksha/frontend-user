import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { isEmpty } from "lodash";
import {Button,Card,CardBody,} from "reactstrap";
import { MemberData } from "../../../common/data/members";
import {
    Badge,
    Col,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    Table,
    UncontrolledDropdown,
    UncontrolledTooltip,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Input,
    FormFeedback,
    Label,
  } from "reactstrap";
import {
  SrNo,
  CustomerName,
  CompanyName,
  EmailID,
  Status,
  PhoneNumber,
  JoinedOn,
  DueAmount,
  DueSince
} from "./debttorslistcol";


import TableContainer from "../../../components/Common/TableContainer";
// import MembersViewModal from "./MembersViewModal.js";
// import { DueAmount } from "../DisputedBillings/disputedCol";

const DebtorsList = props => {


  const [modal1, setModal1] = useState(false);

  const toggleViewModal = () => setModal1(!modal1);

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
        Header: "Customer Name",
        accessor: "CustomerName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <CustomerName {...cellProps} />;
        },
      },
      {
        Header: "Company Name",
        accessor: "CompanyName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <CompanyName {...cellProps} />;
        },
      },
      {
        Header: "Amount Due",
        accessor: "amoutnDue",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <DueAmount {...cellProps} />;
        },
      },
      {
        Header: "Due From",
        accessor: "DueSince",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <DueSince {...cellProps} />;
        },
      },
    //   {
    //     Header: "Joined On",
    //     accessor: "JoinedOn",
    //     disableFilters: true,
    //     filterable: false,
    //     Cell: cellProps => {
    //       return <JoinedOn {...cellProps} />;
    //     },
    //   },
    //   {
    //     Header: "Status",
    //     accessor: "Status",
    //     disableFilters: true,
    //     filterable: false,
    //     Cell: cellProps => {
    //       return <Status {...cellProps} />;
    //     },
    //   },
      
      {
        Header: "Action",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          return (
            <UncontrolledDropdown>
                              <DropdownToggle
                                href="#"
                                className="card-drop"
                                tag="a"
                              >
                                <i className="mdi mdi-dots-horizontal font-size-18" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-end">
                              <DropdownItem
                                  href="#"
                                  onClick={toggleViewModal}
                                >
                                  <i className="mdi mdi-eye font-size-16 text-primary me-1" />{" "}
                                  View
                                </DropdownItem>
                                <DropdownItem
                                  href="#"
                                  onClick={() => handleProjectClick(project)}
                                >
                                  <i className="mdi mdi-pencil font-size-16 text-success me-1" />{" "}
                                  Edit Profile
                                </DropdownItem>
                                <DropdownItem
                                  href="#"
                                  onClick={() => onClickDelete(project)}
                                >
                                  <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />{" "}
                                  Activate/Suspend
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
          );
        },
      },
    ],
    []
  );


  return (
    <React.Fragment>
      <Card>
        <CardBody>
        <Button type="button" color="primary" className="btn-sm btn-rounded float-left-button" onClick={toggleViewModal}>
          <i className="mdi mdi-eye font-size-16 text-primary me-1" />
          View Details
          </Button>
          <div className="mb-4 h4 card-title"></div>
          <div className="mb-4 h4 card-title">Debtors List</div>
          <TableContainer
            columns={columns}
            data={MemberData}
            isGlobalFilter={false}
            isAddOptions={false}
            customPageSize={6}
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

DebtorsList.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(DebtorsList);
