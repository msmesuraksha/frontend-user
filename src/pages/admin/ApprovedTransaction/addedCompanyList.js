import React, { useEffect, useState, useMemo } from "react"
import PropTypes from "prop-types"
import withRouter from "components/Common/withRouter"
import { Link } from "react-router-dom"
// import SidebarContent from '../../../components/VerticalLayout/SidebarContent';
import { useMenu } from "../../../components/VerticalLayout/MenuContext"
import { Button, Card, CardBody, Container } from "reactstrap"
import { useSelector, useDispatch } from "react-redux"

import Breadcrumbs from "../../../components/Common/Breadcrumb"

import { Col, Row } from "reactstrap"
import { PANCARD, GST } from "./ApprovedTransactionCol"

import { getCompanyList } from "../../../store/actions"

import TableContainer from "../../../components/Common/TableContainer"

import AddCompanyModel from "./addCompanyModel"

import { SelectCompnay } from "store/selectCompany/selectCompany.selecter"
import { setSelectCopenOpen } from "store/selectCompany/selectCompany.actiontype"

import { selectUpdatedToken } from "store/auth/login/Login.selecter"

import { setData } from "store/utils/reducer/sessionStorage"

import { ReportDefulterDataBlank } from "store/ReportMeDefulter/ReportMeDefulter.action"

const AddedCompanyList = props => {
  const dispatch = useDispatch()
  const [modal1, setModal1] = useState(false)
  const toggleViewModal = () => setModal1(!modal1)
  const SelectCompnayOpen = useSelector(SelectCompnay)

  const checkUpdateToken = useSelector(selectUpdatedToken)

  const handleEyeIconClick = item => {
    setData("COMPANY-ID", item.id)
    setData("COMPANY", item.companyName)

    // sessionStorage.setItem("COMPANY-ID", item.id)
    // sessionStorage.setItem("COMPANY", item.companyName)
    const newPageUrl = "/company-dashboard"
    //   window.location.href = newPageUrl;
    //  dispatch(ReportDefulterDataBlank([]))
    dispatch(setSelectCopenOpen(!SelectCompnayOpen))
  }
  const columns = useMemo(
    () => [
      {
        Header: "Sr No",
        filterable: false,
        disableFilters: true,
        Cell: (index, i) => {
          return <span>{index.data.length - index.row.index}</span>
        },
      },
      {
        Header: "Company Name",
        accessor: "companyName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return (
            <Link to="/company-dashboard">
              {" "}
              <div
                className="company-name-cell text-capitalize"
                onClick={() => handleEyeIconClick(cellProps.row.original)}
                style={{ cursor: "pointer" }}
              >
                {cellProps.value}
              </div>
            </Link>
          )
        },
      },
      {
        Header: "Pan Card",
        accessor: "companyPan",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <PANCARD {...cellProps} />
        },
      },

      {
        Header: "GST NO.",
        accessor: "gstin",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <GST {...cellProps} />
        },
      },
    ],
    []
  )

  const { getList } = useSelector(state => ({
    getList:
      state.companyList.companyList != undefined &&
      state.companyList.companyList.length != 0
        ? state.companyList.companyList.data.response
        : [],
  }))

  useEffect(() => {
    sessionStorage.removeItem("COMPANY")
    dispatch(getCompanyList())
  }, [])
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="My Companies" breadcrumbItem="My Companies" />
          <AddCompanyModel
            isOpen={modal1}
            toggle={toggleViewModal}
            getCompanyList={getList}
          />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={getList.length > 0 ? getList : []}
                    isGlobalFilter={true}
                    isAddOptions={true}
                    addCompany={setModal1}
                    customPageSize={10}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

AddedCompanyList.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
}

export default withRouter(AddedCompanyList)
