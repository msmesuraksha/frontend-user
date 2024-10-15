import React from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Row, Col, BreadcrumbItem } from "reactstrap"

import { getData } from "store/utils/reducer/sessionStorage"

const Breadcrumb = props => {
  const CompanyName = getData('COMPANY')
  return (
    <Row>
      <Col className="col-12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-sm-0 font-size-18">{props.breadcrumbItem}</h4>
          <div className="page-title-right">
            
              {CompanyName && (<ol className="breadcrumb m-0"><BreadcrumbItem>
                <Link to="#">{CompanyName}</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                <Link to="#">{props.breadcrumbItem}</Link>
              </BreadcrumbItem>
            </ol>)
              }
              
          </div>
        </div>
      </Col>
    </Row>
  )
}

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string
}

export default Breadcrumb
