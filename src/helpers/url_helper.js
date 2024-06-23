//REGISTER
export const POST_FAKE_REGISTER = "api/user/signup";
//LOGIN
export const POST_FAKE_JWT_LOGIN = "/api/user/login";

export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd";
export const PASSWORD_FORGET = "/api/user/forgetPassword";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";
export const POST_FAKE_LOGIN = "/api/user/login";
//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/post-fake-profile";

//PRODUCTS
export const GET_PRODUCTS = "/products";
export const GET_PRODUCTS_DETAIL = "/product";
export const GET_ALL_DEBTORS = "/api/debtors/getAllDebtorsByCompanyId";

//Mails
export const GET_MAILS_LIST = "/mailslists";
export const SELECT_FOLDER = "/folders";
export const GET_SELECTED_MAILS = "/selectedmails";
export const SET_FOLDER_SELECTED_MAILS = "/setfolderonmail";
export const UPDATE_MAIL = "/update/mail";
export const ADD_INVOICE = "/api/transactions/create";

//CALENDER
export const GET_EVENTS = "/events";
export const ADD_NEW_EVENT = "/add/event";
export const UPDATE_EVENT = "/update/event";
export const DELETE_EVENT = "/delete/event";
export const GET_CATEGORIES = "/categories";

//CHATS
export const GET_CHATS = "/chats";
export const GET_GROUPS = "/groups";
export const GET_CONTACTS = "/contacts";
export const GET_MESSAGES = "/messages";
export const ADD_MESSAGE = "/add/messages";

//ORDERS
export const GET_ORDERS = "/orders";
export const ADD_NEW_ORDER = "/add/order";
export const UPDATE_ORDER = "/update/order";
export const DELETE_ORDER = "/delete/order";

//CART DATA
export const GET_CART_DATA = "/cart";

//CUSTOMERS
export const GET_CUSTOMERS = "/customers";
// export const ADD_NEW_CUSTOMER = "/add/customer";
export const UPDATE_CUSTOMER = "/update/customer";
export const DELETE_CUSTOMER = "/delete/customer";

//SHOPS
export const GET_SHOPS = "/shops";

//CRYPTO
export const GET_WALLET = "/wallet";
export const GET_CRYPTO_ORDERS = "/crypto/orders";
export const GET_CRYPTO_PRODUCTS = "/crypto-products";

//INVOICES
export const GET_INVOICES = "/invoices";
export const GET_INVOICE_DETAIL = "/invoice";

// JOBS
export const GET_JOB_LIST = "/jobs";
export const ADD_NEW_JOB_LIST = "/add/job";
export const UPDATE_JOB_LIST = "/update/job";
export const DELETE_JOB_LIST = "/delete/job";

//Apply Jobs
export const GET_APPLY_JOB = "/jobApply";
export const DELETE_APPLY_JOB = "add/applyjob";

//PROJECTS
export const GET_PROJECTS = "/projects";
export const GET_PROJECT_DETAIL = "/project";
export const ADD_NEW_PROJECT = "/add/project";
export const UPDATE_PROJECT = "/update/project";
export const DELETE_PROJECT = "/delete/project";

//TASKS
export const GET_TASKS = "/tasks";

//CONTACTS
export const GET_USERS = "/users";
export const GET_USER_PROFILE = "/user";
export const ADD_NEW_USER = "/add/user";
export const UPDATE_USER = "/update/user";
export const DELETE_USER = "/delete/user";

//Blog
export const GET_VISITOR_DATA = "/visitor-data";

//dashboard charts data
export const GET_WEEKLY_DATA = "/weekly-data";
export const GET_YEARLY_DATA = "/yearly-data";
export const GET_MONTHLY_DATA = "/monthly-data";

export const TOP_SELLING_DATA = "/top-selling-data";

//dashboard crypto
export const GET_WALLET_DATA = "/wallet-balance-data";

//dashboard jobs
export const GET_STATISTICS_DATA = "/Statistics-data";

export const GET_EARNING_DATA = "/earning-charts-data";

export const GET_PRODUCT_COMMENTS = "/comments-product";

export const ON_LIKNE_COMMENT = "/comments-product-action";

export const ON_ADD_REPLY = "/comments-product-add-reply";

export const ON_ADD_COMMENT = "/comments-product-add-comment";

// company list 

export const GET_COMPANY = "/api/companies/basedOnUserId";
export const GET_EMPLOYEE = "/api/user/getAllEmployee";


export const ADD_EMPLOYEE_LIST = "/api/user/addEmployee"
export const ADD_NEW_COMPANY_API_STRING = "/api/companies/add"
export const CHANGE_FIRST_PASSWORD = "/api/user/changePasswordUsingToken"
export const CHANGE_PASSWORD = "/api/user/password-reset"
export const ADD_CUSTOMER_LIST = "/api/debtors/add"

export const GET_ALL_INVOICE_FOLDER = "/api/transactions/getAllInvoicesForIds"
export const GET_REPORT_ME_DEFULTER_LIST = "/api/defaulters/getAllDefaultInvoicesSentToMe"
export const GET_UPLOAD_PENDING_LIST = "/api/user/getTransactionsPendingForDocs"

export const GET_COMPNAY_SEARCH_LIST = "/api/companies/"
export const GET_COMPANY_SEARCH_VIEW_LIST = '/api/debtors/getAllCreditorsByDebtorId'

export const GET_APPROVED_REPORT_ME_DEFAULTER_LIST = "/api/user/getAllApprovedTransactionsUser"
export const GET_APPROVED_REPORT_DEFAULTER_LIST = "/api/user/getAllApprovedTransactionsUser"
export const POST_APPROVED_TRANSACTION_REOPEN = "/api/user/updatePaymentHistoryStatus"


