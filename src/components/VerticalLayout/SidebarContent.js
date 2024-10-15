import React, { useEffect, useRef, useCallback, useState } from "react"
import { useLocation } from "react-router-dom"
import PropTypes from "prop-types"
import SimpleBar from "simplebar-react"
import MetisMenu from "metismenujs"
import withRouter from "components/Common/withRouter"
import { Link } from "react-router-dom"
import { withTranslation } from "react-i18next"
import { useMenu } from "./MenuContext"
import {

  Button,

} from "reactstrap"
import { useSelector, useDispatch } from "react-redux";
import { SelectCompnay } from "store/selectCompany/selectCompany.selecter"
import { setSelectCopenOpen } from "store/selectCompany/selectCompany.actiontype"

import { ReportDefulterDataBlank } from "store/ReportMeDefulter/ReportMeDefulter.action"

import { selectReportMeDefData } from "store/ReportMeDefulter/ReportMeDefulter.selecter"

const SidebarContent = props => {
  const dispatch = useDispatch();
  const [showMenuItems, setshowMenuItems] = useState(false)
  const [isShowEmployee, setisShowEmployee] = useState()
  const [isShowSales, setShowSales] = useState(false)
  const [currentPath, setCurrentpath] = useState('')

  const SelectCompnayOpen = useSelector(SelectCompnay)
  useEffect(() => {
    setCurrentpath(window.location.pathname)
    if (
      currentPath == "/companies" ||
      currentPath == "/documents" ||
      currentPath == "/profile" ||
      currentPath == "/notification" ||
      currentPath == "/Subscription"
    ) {
      dispatch(setSelectCopenOpen(false))
    } else {
      dispatch(setSelectCopenOpen(true))
    }
  }, [currentPath])
  const ref = useRef()
  const activateParentDropdown = useCallback(item => {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }, [])

  const removeActivation = items => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i]
      const parent = items[i].parentElement

      if (item && item.classList.contains("active")) {
        item.classList.remove("active")
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show")
        }

        parent.classList.remove("mm-active")
        const parent2 = parent.parentElement

        if (parent2) {
          parent2.classList.remove("mm-show")

          const parent3 = parent2.parentElement
          if (parent3) {
            parent3.classList.remove("mm-active") // li
            parent3.childNodes[0].classList.remove("mm-active")

            const parent4 = parent3.parentElement // ul
            if (parent4) {
              parent4.classList.remove("mm-show") // ul
              const parent5 = parent4.parentElement
              if (parent5) {
                parent5.classList.remove("mm-show") // li
                parent5.childNodes[0].classList.remove("mm-active") // a tag
              }
            }
          }
        }
      }
    }
  }
  const [currenstState, useCurrentState] = useState()
  const path = useLocation()
  const activeMenu = useCallback(() => {
    const pathName = path.pathname
    useCurrentState(pathName)
    let matchingMenuItem = null
    const ul = document.getElementById("side-menu")
    const items = ul.getElementsByTagName("a")
    removeActivation(items)

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  }, [path.pathname, activateParentDropdown])

  useEffect(() => {
    ref.current.recalculate()
  }, [])
  // console.log("PATHHHHHHH", pathName)

  useEffect(() => {
    const sideMenu = new MetisMenu("#side-menu")
    activeMenu()
    return () => {
      sideMenu.dispose()
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    activeMenu()
  }, [activeMenu])

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }
  const employeeListshow = () => {
    // useisShowEmployee(true)
    if (isShowEmployee == undefined || isShowEmployee == true) {
      setisShowEmployee(false)
    } else {
      setisShowEmployee(true)
    }
  }
  const salesListShow = () => {
    if (isShowSales == undefined || isShowSales == true) {
      setShowSales(false)
    } else {
      setShowSales(true)
    }
  }
  // console.log("currenstStatecurrenstStatecurrenstState", currenstState)

  const changeCompanyFunction = () => {
    dispatch(setSelectCopenOpen(false))
    dispatch(ReportDefulterDataBlank([]))
  }

  const selectReportMeDeflist = useSelector(selectReportMeDefData)


  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>

        <div id="sidebar-menu">

          {/* <li className=" mt-4" style={{  display: currenstState == "/companies"  || currentPath == "/documents" ||
      currentPath == "/profile" ||
      currentPath == "/notification" ||
      currentPath == "/Subscription"  ? "none" : "", listStyle:'none'}}>
              <Link to="/companies" >
            &nbsp; &nbsp;&nbsp;&nbsp; <a style={{ color: currenstState == "/companies" ? "#FAFAFA" : "#FAFAFA" , fontSize:"15px"}}
               className=" mt-5" 
               onClick={()=>{dispatch(setSelectCopenOpen(false))

               }}
                >
                                    <i className="bx bxs-home"></i> Change Company
                </a>
                </Link>
              </li> */}

          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>

            {SelectCompnayOpen == true ? (
              <>
                <li >
                  <Link to="/companies" onClick={() => { changeCompanyFunction() }} >

                    <i className="bx bxs-home "></i>
                    <span>{ props.t("Change Company")}</span>

                  </Link>
                </li>

                <li >
                  <Link to="/company-dashboard" style={{ color: currenstState == "/company-dashboard" ? "#FAFAFA" : "" }}>
                    <i className="bx bxs-dashboard"></i>
                    <span>{ props.t("Dashboard")}</span>
                  </Link>
                </li>
                <li >
                  <Link to="/Customer-list" style={{ color: currenstState == "/Customer-list" ? "#FAFAFA" : "" }}>
                    <i className="bx bxs-user"></i>
                    <span>{ props.t("Members / Company")}</span>
                  </Link>
                </li>
                {/*                 <li>
                  <Link to="/Report-defaulter" style={{ color :currenstState == "/Report-defaulter" ? "#FAFAFA":""}}>
                    <i className='bx bxs-report'></i>
                    {props.t("My Complaints")}
                  </Link>

                </li>
                <li>
                  <Link to="/Report-me-defaulter" style={{ color :currenstState == "/Report-me-defaulter" ? "#FAFAFA":""}}>
                    <i className='bx bx-shield-quarter'></i>
                    {props.t("Complaints Against Me")}
                  </Link>
                </li> */}
                <li>
                  <Link to="/company-search" style={{ color: currenstState == "/company-search" ? "#FAFAFA" : "" }}>
                    <i className="bx bx-search"></i>
                    <span>{ props.t("Defaulter Search")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/upload-pending-documents" style={{ color: currenstState == "/upload-pending-documents" ? "#FAFAFA" : "" }}>
                    <i className="bx bx-cloud-upload"></i>
                    <span>{ props.t("Upload Pending File")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/ApprovedReportedTranction" style={{ color: currenstState == "/ApprovedReportedTranction" ? "#FAFAFA" : "" }}>
                    <i className="bx bxs-badge-check"></i>
                    <span>{ props.t("Approved Complaints")}</span>
                  </Link>
                </li>


                {isShowSales == true ?

                  <>
                    <li>
                      <Link to="/bad-debts">
                        <i className="bx bx-rupee" style={{ paddingLeft: '15px' }}></i>
                        <span>{ props.t("Bad debts")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/debtors">
                        <i className="bx bx-user" style={{ paddingLeft: '15px' }}></i>
                        <span>{ props.t("Debtors(buyers)")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/creditors">
                        <i className="bx bx-user" style={{ paddingLeft: '15px' }}></i>
                        <span>{ props.t("Creditors(Seller)")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/Invoice">
                        <i className="bx bx-search" style={{ paddingLeft: '15px' }}></i>
                        <span>{ props.t("Invoices")}</span>
                      </Link>
                    </li>

                    {/* <li>
                  <Link to="/send-bill-transaction">
                    <i className="bx bx-send" style={{ paddingLeft:'15px'}}></i>
                    {props.t("Send Bill Transaction")}
                  </Link>
                </li> */}
                  </>
                  : ''
                }

                {/* <li>
                  <Link onClick={() => employeeListshow()}>
                    <i className="bx bxs-user-detail"></i>
                    {props.t("Employee")}

                    {isShowEmployee != undefined && isShowEmployee != false ? (
                     <i className="bx bx-chevron-up" style={{ paddingLeft:'5px'}}></i>
                    ) : (
                      <i className="bx bx-chevron-down" style={{ paddingLeft:'5px'}}></i>
                    )}
                  </Link>
                </li> */}
                {isShowEmployee != undefined && isShowEmployee != false ? (
                  <li>
                    <Link to="/employee">
                      <i className="bx bxs-notification" style={{ marginLeft: '15px' }}></i>

                      <span>{ props.t("Employee Registration")}</span>
                    </Link>

                    <Link to="/EmployeeList">
                      <i className="bx bx-list-ul" style={{ marginLeft: '15px' }}></i>
                      <span>{ props.t("Employee List")}</span>
                    </Link>
                  </li>
                ) : (
                  ""
                )}


                <li>
                  <Link to="/Recieved-Payment" style={{ color: currenstState == "/Recieved-Payment" ? "#FAFAFA" : "" }}>
                    <i className="bx bx-wallet"></i>
                    <span>{ props.t("Record Payment")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/order-management" style={{ color: currenstState == "/order-management" ? "#FAFAFA" : "" }}>
                    <i className="bx bx-basket"></i>
                    <span>{ props.t("Order Management")}</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/companies" style={{ color: currenstState == "/companies" ? "#FAFAFA" : "" }}>
                    <i className="bx bx-group"></i>
                    <span>{ props.t("Companies")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/documents" style={{ color: currenstState == "/documents" ? "#FAFAFA" : "" }}>
                    <i className="bx bxs-file-plus"></i>

                    <span>{ props.t("Documents")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/profile" style={{ color: currenstState == "/profile" ? "#FAFAFA" : "" }}>
                    <i className="bx bx-user-circle"></i>

                   <span> { props.t("Profile")}</span>
                  </Link>
                </li>


                {/*      <li>
                  <Link to="/Subscription">
                    <i className="bx bxs-crown"></i>

                    {props.t("Subscription")}
                  </Link>
                </li> */}
                {/* <li>
                  <Link to="/notification">
                    <i className="bx bxs-notification"></i>

                    {props.t("Notification")}
                  </Link>
                </li> */}

              </>
            )}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  showMenuItems: PropTypes.bool,
}

export default withRouter(withTranslation()(SidebarContent))
