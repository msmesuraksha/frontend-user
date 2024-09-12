import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { Link } from 'react-router-dom';
// import SidebarContent from '../../../components/VerticalLayout/SidebarContent';
import { useMenu } from '../../../components/VerticalLayout/MenuContext';
import {
  Button,
  Card,
  CardBody,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";

import {
  Col,
  Row,
} from "reactstrap";
import {
  PANCARD,
  GST,
} from "./ApprovedTransactionCol";

import { getCompanyList } from "../../../store/actions";

import TableContainer from "../../../components/Common/TableContainer";

import AddCompanyModel from "./addCompanyModel"

import { SelectCompnay } from "store/selectCompany/selectCompany.selecter";
import { setSelectCopenOpen } from "store/selectCompany/selectCompany.actiontype";

import { selectUpdatedToken } from "store/auth/login/Login.selecter";

import { setData } from "store/utils/reducer/sessionStorage";

const AddedCompanyList = props => {
  const dispatch = useDispatch();
  const [modal1, setModal1] = useState(false);
  const toggleViewModal = () => setModal1(!modal1);
  const SelectCompnayOpen = useSelector(SelectCompnay)

  const checkUpdateToken = useSelector(selectUpdatedToken)

  const handleEyeIconClick = (item) => {
    setData("COMPANY-ID", item.id)
    setData("COMPANY", item.companyName)
    // sessionStorage.setItem("COMPANY-ID", item.id)
    // sessionStorage.setItem("COMPANY", item.companyName)
    const newPageUrl = '/company-dashboard';
    window.location.href = newPageUrl;
    dispatch(setSelectCopenOpen(!SelectCompnayOpen))
  };
  const columns = useMemo(
    () => [
      {
        Header: "Sr No",
        filterable: false,
        disableFilters: true,
        Cell: (index, i) => {
          return <span>

            {index.data.length - index.row.index}
          </span>
        }
      },
      {
        Header: "Company Name",
        accessor: "companyName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return (
            <Link to="/company-dashboard"> <div
              className="company-name-cell text-capitalize"
              onClick={() => handleEyeIconClick(cellProps.row.original)}
              style={{ cursor: 'pointer' }}
            >
              {cellProps.value}
            </div>
            </Link>
          );
        },
      },
      {
        Header: "Pan Card",
        accessor: "companyPan",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <PANCARD {...cellProps} />;
        },
      },

      {
        Header: "GST NO.",
        accessor: "gstin",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <GST {...cellProps} />;
        },
      },

    ],
    []
  );

  const { getList } = useSelector(state =>
  ({
    getList: state.companyList.companyList != undefined && state.companyList.companyList.length != 0 ? state.companyList.companyList.data.response : [],
  })
  );



  useEffect(() => {
    sessionStorage.removeItem("COMPANY")
    dispatch(getCompanyList());
  }, [])
  return (
    <React.Fragment>

      <AddCompanyModel isOpen={modal1} toggle={toggleViewModal} getCompanyList={getList} />

      <br />
      <br />
      <Card style={{ marginTop: '5%' }}>



        <CardBody>


          <div>
            <Row>
              <h5 >My Companies</h5>

            </Row>
            <Row>
              <Col md="10">

              </Col>
              <Col md="2" className="text-right pl-2" >

                <Button
                  type="button"
                  color="primary"
                  className="btn-md mt-3 "
                  onClick={() => setModal1(true)}
                >
                  + Add Company
                </Button>

              </Col>
            </Row>
          </div>
          <div style={{ marginTop: '-35px' }}>
            <TableContainer
              columns={columns}
              data={getList.length > 0 ? getList : []}
              isGlobalFilter={true}
              isAddOptions={false}
              customPageSize={10}
            />
          </div>

        </CardBody>
      </Card>

    </React.Fragment>
  );
};

AddedCompanyList.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(AddedCompanyList);
