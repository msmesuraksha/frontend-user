import React from "react";
import { Navigate } from "react-router-dom";
import UserList from "../pages/admin/UserList";
import SendBillTransaction from "../pages/Dashboard/users/send-bill-transaction/sendbillTransaction";
import MembersList from "../pages/admin/Members/memberlist/MembersList";
import RegisteredCompanyList from "../pages/admin/Members/RegisteredCompany/RegisteredCompanyList";
import DiputedBillings from "../pages/admin/DisputedBillings/DiputedBillings";
import AddedCompanyList from "../pages/admin/ApprovedTransaction/addedCompanyList";
import Subscription from "../pages/admin/Subscription/subscription";

import CompanySearch from "../pages/admin/company-search/companysearch";
import DebtorsList from "../pages/admin/DebtorsList/debtorslist";
import CrediotorList from "../pages/admin/CreditorsList/CreditorsList";
import Invoice from "../pages/admin/Invoice/Invoice";
import ReporteDefaulter from "../pages/admin/ReportDefaulter/RepoertDefaulter"
import { ReportDebtor } from "../pages/admin/Invoice/ReportaDebtor";
import AddCustomer from "pages/admin/AddCustomer/addCustomer";
import Document from "../pages/Dashboard/users/Documents/documents";
import ContactsProfile from "../pages/Dashboard/users/profile";
import Employee from "../pages/Dashboard/users/employeeRegistratiion/employee"
import EmployeeList from "../pages/Dashboard/users/employeeRegistratiion/employeeList"
import ReportMedefulterComponent from "../pages/admin/ReportMeDefualter/ReportaMeDefaulter";
import UploadPendingListModule from "../pages/admin/uploadPendingDoucument/uploadPendingDoucment"
// Pages Component
import Chat from "../pages/Chat/Chat";

// File Manager
import FileManager from "../pages/FileManager/index";

// Profile
import UserProfile from "../pages/Authentication/user-profile";

// Pages Calendar
import Calendar from "../pages/Calendar/index";

// //Tasks
import TasksList from "../pages/Tasks/tasks-list";
import TasksCreate from "../pages/Tasks/tasks-create";

// //Projects
import ProjectsGrid from "../pages/Projects/projects-grid";
import ProjectsList from "../pages/Projects/projects-list";
import ProjectsOverview from "../pages/Projects/ProjectOverview/projects-overview";
import ProjectsCreate from "../pages/Projects/projects-create";

// //Ecommerce Pages
import EcommerceProducts from "../pages/Ecommerce/EcommerceProducts/index";
import EcommerceProductDetail from "../pages/Ecommerce/EcommerceProducts/EcommerceProductDetail";
import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders/index";
import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers/index";
import EcommerceCart from "../pages/Ecommerce/EcommerceCart";
import EcommerceCheckout from "../pages/Ecommerce/EcommerceCheckout";
import EcommerceShops from "../pages/Ecommerce/EcommerceShops/index";
import EcommerceAddProduct from "../pages/Ecommerce/EcommerceAddProduct";

//Email
import EmailInbox from "../pages/Email/email-inbox";
import EmailRead from "../pages/Email/email-read";
import EmailBasicTemplte from "../pages/Email/email-basic-templte";
import EmailAlertTemplte from "../pages/Email/email-template-alert";
import EmailTemplateBilling from "../pages/Email/email-template-billing";

//Invoices
import InvoicesList from "../pages/Invoices/invoices-list";
import InvoiceDetail from "../pages/Invoices/invoices-detail";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

//  // Inner Authentication












import EmailVerification from "../pages/AuthenticationInner/auth-email-verification";




// Dashboard
import CompanyDashboard from "../../src/pages/Dashboard/index";
import ApprovedReportedTranction from "../../src/pages/Dashboard/users/approvedRequest";
import DashboardSaas from "../pages/Dashboard-saas/index";
import DashboardCrypto from "../pages/Dashboard-crypto/index";
import Blog from "../pages/Dashboard-Blog/index";
import DashboardJob from "../pages/DashboardJob/index";

//Crypto
import CryptoWallet from "../pages/Crypto/CryptoWallet/crypto-wallet";
import CryptoBuySell from "../pages/Crypto/crypto-buy-sell";
import CryptoExchange from "../pages/Crypto/crypto-exchange";
import CryptoLending from "../pages/Crypto/crypto-lending";
import CryptoOrders from "../pages/Crypto/CryptoOrders/crypto-orders";
import CryptoKYCApplication from "../pages/Crypto/crypto-kyc-application";


// Charts
import ChartApex from "../pages/Charts/Apexcharts";
import ChartistChart from "../pages/Charts/ChartistChart";
import ChartjsChart from "../pages/Charts/ChartjsChart";
import EChart from "../pages/Charts/EChart";
import SparklineChart from "../pages/Charts/SparklineChart";
import ChartsKnob from "../pages/Charts/charts-knob";
import ReCharts from "../pages/Charts/ReCharts";

// Maps









//Tables





//Blog
import BlogList from "../pages/Blog/BlogList/index";
import BlogGrid from "../pages/Blog/BlogGrid/index";


//Job


import JobCategories from "../pages/JobPages/JobCategories";
import JobList from "../pages/JobPages/JobList";
import ApplyJobs from "../pages/JobPages/ApplyJobs/index";



// Forms




import FormUpload from "../pages/Forms/FormUpload";










//Contacts
import ContactsGrid from "../pages/Contacts/contacts-grid";
import ContactsList from "../pages/Contacts/ContactList/contacts-list";
//import ContactsProfile from "../pages/Contacts/ContactsProfile/contacts-profile";
import Register2 from "pages/Authentication/register2";
import ChangeNewPassword from "../pages/Authentication/ChangeNewPassword"
import ForgetChangeNewPassword from "../pages/Authentication/forgetChangeNewPassword"
import { UploadPendingLinkModule } from "pages/admin/uploadPendingDocLink/uploadPendingDocLink";
import { OrderManagementModule } from "pages/admin/orderManagement/orderManagementModule";


const authProtectedRoutes = [
  //User Panel Step 1
  { path: "/companies", component: <AddedCompanyList /> },
  { path: "/Subscription", component: <Subscription /> },
  { path: "/documents", component: <Document /> },
  { path: "/FormUpload", component: <FormUpload /> },
  { path: "/profile", component: <ContactsProfile /> },
  { path: "/notification", component: <AddedCompanyList /> },
  //USer Panel Step 2
  { path: "/company-dashboard", component: <CompanyDashboard /> },
  { path: "/ApprovedReportedTranction", component: <ApprovedReportedTranction /> },
  { path: "/bad-debts", component: <UserList /> },
  { path: "/company-search", component: <CompanySearch /> },
  { path: "/debtors", component: <DebtorsList /> },
  { path: "/creditors", component: <CrediotorList /> },
  { path: "/send-bill-transaction", component: <SendBillTransaction /> },
  { path: "/Recieved-Payment", component: <DiputedBillings /> },
  { path: "/employee", component: <Employee /> },
  { path: "/ReportDefaulter", component: <ReporteDefaulter /> },
  { path: "/EmployeeList", component: <EmployeeList /> },
  { path: "/Invoice", component: <Invoice /> },
  { path: "/Report-defaulter", component: <ReportDebtor /> },
  { path: "/Report-me-defaulter", component: <ReportMedefulterComponent /> },
  { path: "/Customer-list", component: <AddCustomer /> },
  { path: "/upload-pending-documents", component: <UploadPendingListModule /> },
  { path: "/order-management", component: <OrderManagementModule /> },



  { path: "/login-register", component: <Register2 /> },


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






  // // Authentication Inner  















];

export { authProtectedRoutes, publicRoutes };
