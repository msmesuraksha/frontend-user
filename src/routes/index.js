import React from "react";
import { Navigate } from "react-router-dom";
import DiputedBillings from "../pages/admin/DisputedBillings/DiputedBillings";
import AddedCompanyList from "../pages/admin/ApprovedTransaction/addedCompanyList";
import Subscription from "../pages/admin/Subscription/subscription";
import CompanySearch from "../pages/admin/company-search/companysearch";
import { ReportDebtor } from "../pages/admin/Invoice/ReportaDebtor";
import AddCustomer from "pages/admin/AddCustomer/addCustomer";
import Document from "../pages/Dashboard/users/Documents/documents";
import ContactsProfile from "../pages/Dashboard/users/profile";
import ReportMedefulterComponent from "../pages/admin/ReportMeDefualter/ReportaMeDefaulter";
import UploadPendingListModule from "../pages/admin/uploadPendingDoucument/uploadPendingDoucment"

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import CompanyDashboard from "../../src/pages/Dashboard/index";
import ApprovedReportedTranction from "../../src/pages/Dashboard/users/approvedRequest";
import ChangeNewPassword from "../pages/Authentication/ChangeNewPassword"
import { UploadPendingLinkModule } from "pages/admin/uploadPendingDocLink/uploadPendingDocLink";
import { OrderManagementModule } from "pages/admin/orderManagement/orderManagementModule";


const authProtectedRoutes = [
  //User Panel Step 1
  { path: "/companies", component: <AddedCompanyList /> },
  { path: "/Subscription", component: <Subscription /> },
  { path: "/documents", component: <Document /> },
  { path: "/profile", component: <ContactsProfile /> },
  //USer Panel Step 2
  { path: "/company-dashboard", component: <CompanyDashboard /> },
  { path: "/ApprovedReportedTranction", component: <ApprovedReportedTranction /> },
  { path: "/company-search", component: <CompanySearch /> },
  { path: "/Recieved-Payment", component: <DiputedBillings /> },
  { path: "/Report-defaulter", component: <ReportDebtor /> },
  { path: "/Report-me-defaulter", component: <ReportMedefulterComponent /> },
  { path: "/Customer-list", component: <AddCustomer /> },
  { path: "/upload-pending-documents", component: <UploadPendingListModule /> },
  { path: "/order-management", component: <OrderManagementModule /> },

  {
    path: "/",
    exact: true,
    component: <Navigate to="/login" />,
  },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
  { path: "/changePassword", component: <ChangeNewPassword /> },
  { path: "/newChangePassword", component: <ChangeNewPassword /> },
  { path: "/upload-supporting-document-direct", component: <UploadPendingLinkModule /> },

];

export { authProtectedRoutes, publicRoutes };
