import axios from "axios";
import { del, get, post, put, addEmployeeAPImethod, getAfter, forgetPasswordthroughToken, forgetPasswordAPI, getwithToken, getMethodResponse, getUser, addEmployeeAPImethodRating, updateData } from "./api_helper";
import * as url from "./url_helper";

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = sessionStorage.getItem("authUser");
  if (user) return JSON.parse(user);
  return null;
};

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
const postFakeRegister = data => post(url.POST_FAKE_REGISTER, data);
// search company on belhf of company id 
export const searchCompanyAPI = data => post("/api/companies/selectCompany", data);

// Login Method
const postFakeLogin = data => post(url.POST_FAKE_LOGIN, data);
export const forgetPassword = data => forgetPasswordAPI(url.PASSWORD_FORGET, data);
export const addFilesApiMethod = data => addEmployeeAPImethod("/api/files/upload", data);
export const addInVoiceDefaulter = data => addEmployeeAPImethod("/api/defaulters/create", data);

export const getRequestEditApi = data => addEmployeeAPImethod("/api/defaulters/updateDefaulterEntry", data);

// postForgetPwd
const postFakeForgetPwd = data => post(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
const postJwtProfile = data => post(url.POST_EDIT_JWT_PROFILE, data);

const postFakeProfile = data => post(url.POST_EDIT_PROFILE, data);

// Register Method
const postJwtRegister = data => post(url.POST_FAKE_REGISTER, data);

// Login Method
const postJwtLogin = data => getUser(url.POST_FAKE_JWT_LOGIN, data);

// postForgetPwd
const postJwtForgetPwd = data => post(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// postSocialLogin
export const postSocialLogin = data => post(url.SOCIAL_LOGIN, data);

// get Products
export const getProducts = () => get(url.GET_PRODUCTS);
export const getAllDebtorsAPI = () => getAfter(url.GET_ALL_DEBTORS);
export const getAllSubscription = () => getwithToken('/api/subscription/getAllSubscriptionPkgsForUser');

export const getAllInvoiceList = () => getAfter("/api/defaulters/getAllDefaultInvoicesRaisedByMe")
export const getGeneralDoucmentsAPI = () => getwithToken("/api/files/getGeneralDocuments")
export const getFeebBackQuestionListAPI = () => getwithToken("/api/questions/getAllQuestions")




export const getAllCompany = data => post(url.GET_COMPNAY_SEARCH_LIST);
// get Product detail
export const getProductDetail = id =>
  get(`${url.GET_PRODUCTS_DETAIL}/${id}`, { params: { id } });

// get Events
export const getEvents = () => get(url.GET_EVENTS);

// add Events
export const addNewEvent = event => post(url.ADD_NEW_EVENT, event);

// update Event
export const updateEvent = event => put(url.UPDATE_EVENT, event);

// delete Event
export const deleteEvent = event =>
  del(url.DELETE_EVENT, { headers: { event } });

// get Categories
export const getCategories = () => get(url.GET_CATEGORIES);

// get chats
export const getChats = () => get(url.GET_CHATS);

// get groups
export const getGroups = () => get(url.GET_GROUPS);

// get Contacts
export const getContacts = () => get(url.GET_CONTACTS);

// get messages
export const getMessages = (roomId = "") =>
  get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } });

// post messages
export const getselectedmails = (selectedmails) => post(url.GET_SELECTED_MAILS, selectedmails);

//post setfolderonmails
export const setfolderonmails = (selectedmails, folderId, activeTab) => post(url.SET_FOLDER_SELECTED_MAILS, { selectedmails, folderId, activeTab });

// get orders
export const getOrders = () => get(url.GET_ORDERS);

// getCompany list

export const getCompanyList = data => post(url.GET_COMPANY);
export const addCompanyListApi = data => post(url.ADD_NEW_COMPANY_API_STRING, data.payload);
export const changeFirstPass = (data) => forgetPasswordthroughToken(url.CHANGE_PASSWORD, data.payload);
export const chnageOneTimePassAPI = (data) => post("/api/user/changePasswordUsingToken", data.payload);
export const changeorgetPassword = (data) => post("/api/user/changePasswordUsingToken", data.payload);


// ADD company

export const addEmployeeList = data => addEmployeeAPImethod(url.ADD_EMPLOYEE_LIST, data);
export const addCustomerListAPI = data => addEmployeeAPImethod(url.ADD_CUSTOMER_LIST, data);
export const recordPaymentAPIMethod = data => addEmployeeAPImethod("api/defaulters/initiatePaymentVerification", data);
export const updatePendingDocument = data => addEmployeeAPImethod("api/transactions/updateInvoiceDocuments", data);
export const addSubscriptionApiMethod = data => post("/api/subscription/addSubscription", data);

//company Search
export const getCompanySearchList = (data) => addEmployeeAPImethod("/api/debtors/search", data)
// Get employee

export const getEmployeeList = data => addEmployeeAPImethod(url.GET_EMPLOYEE);
export const addDebtorIdToarrayForPreviewAPI = data => addEmployeeAPImethod("/api/transactions/getAllInvoicesForIds");
export const addRatingofdebtor = data => addEmployeeAPImethodRating("/api/ratings/add", data);
export const addInitiatePaymentVerification = data => addEmployeeAPImethod("/api/defaulters/initiatePaymentVerificationGeneral");
export const uploadCACertificateAPIMethod = data => addEmployeeAPImethod("/api/transactions/updateInvoiceDocumentsCACertificate", data);
export const requestAEdit = data => addEmployeeAPImethod("/api/transactions/requestDefaultInvoiceEdit", data);
export const getcompanySerachViewDatils = data => addEmployeeAPImethod("/api/debtors/getAllCreditorsByDebtorId", data);
export const uploadPendingDocMethod = data => addEmployeeAPImethod("/api/user/uploadSupportingDocuments", data);

// find details on gst number api
export const getGstDetailsData = data => addEmployeeAPImethod("/api/debtors/getDebtorDetails", data);

export const EditProfileData = data => updateData("/api/user/userProfileUpdate", data);



//ADD invoice
export const addInvoiceApi = data => addEmployeeAPImethod(url.ADD_INVOICE, data);

// add order
export const addNewOrder = order => post(url.ADD_NEW_ORDER, order);

// update order
export const updateOrder = order => put(url.UPDATE_ORDER, order);

// delete order
export const deleteOrder = order =>
  del(url.DELETE_ORDER, { headers: { order } });

// get cart data
export const getCartData = () => get(url.GET_CART_DATA);

// get customers
export const getCustomers = () => get(url.GET_CUSTOMERS);

// add CUSTOMER
export const addNewCustomer = customer => post(url.ADD_CUSTOMER_LIST, customer);

// update CUSTOMER
export const updateCustomer = customer => put(url.UPDATE_CUSTOMER, customer);

// delete CUSTOMER
export const deleteCustomer = customer =>
  del(url.DELETE_CUSTOMER, { headers: { customer } });

// get shops
export const getShops = () => get(url.GET_SHOPS);

// get wallet
export const getWallet = () => get(url.GET_WALLET);

// get crypto order
export const getCryptoOrder = () => get(url.GET_CRYPTO_ORDERS);

// get crypto product
export const getCryptoProduct = () => get(url.GET_CRYPTO_PRODUCTS);

// get invoices
export const getInvoices = () => get(url.GET_INVOICES);



// get invoice details
export const getInvoiceDetail = id =>
  get(`${url.GET_INVOICE_DETAIL}/${id}`, { params: { id } });

// get jobs
export const getJobList = () => get(url.GET_JOB_LIST);

// get Apply Jobs
export const getApplyJob = () => get(url.GET_APPLY_JOB);

// get project
export const getProjects = () => get(url.GET_PROJECTS);

// get project details
export const getProjectsDetails = id =>
  get(`${url.GET_PROJECT_DETAIL}/${id}`, { params: { id } });

// get tasks
export const getTasks = () => get(url.GET_TASKS);

// get contacts
export const getUsers = () => get(url.GET_USERS);

// add user
export const addNewUser = user => post(url.ADD_NEW_USER, user);

// update user
export const updateUser = user => put(url.UPDATE_USER, user);

// delete user
export const deleteUser = user => del(url.DELETE_USER, { headers: { user } });

// add jobs
export const addNewJobList = job => post(url.ADD_NEW_JOB_LIST, job);

// update jobs
export const updateJobList = job => put(url.UPDATE_JOB_LIST, job);

// delete jobs
export const deleteJobList = job => del(url.DELETE_JOB_LIST, { headers: { job } });

// Delete Apply Jobs
export const deleteApplyJob = data => del(url.DELETE_APPLY_JOB, { headers: { data } });

/** PROJECT */
// add user
export const addNewProject = project => post(url.ADD_NEW_PROJECT, project);


// update user
export const updateProject = project => put(url.UPDATE_PROJECT, project);

// delete user
export const deleteProject = project =>
  del(url.DELETE_PROJECT, { headers: { project } });

export const getUserProfile = () => get(url.GET_USER_PROFILE);

// get maillist
export const getMailsLists = filter => post(url.GET_MAILS_LIST, {
  params: filter,
});

//update mail
export const updateMail = mail => put(url.UPDATE_MAIL, mail);

// get folderlist
export const selectFolders = () => get(url.SELECT_FOLDER);

// post messages
export const addMessage = message => post(url.ADD_MESSAGE, message);

// get dashboard charts data
export const getWeeklyData = () => get(url.GET_WEEKLY_DATA);
export const getYearlyData = () => get(url.GET_YEARLY_DATA);
export const getMonthlyData = () => get(url.GET_MONTHLY_DATA);

export const walletBalanceData = month =>
  get(`${url.GET_WALLET_DATA}/${month}`, { params: { month } });

export const getStatisticData = duration =>
  get(`${url.GET_STATISTICS_DATA}/${duration}`, { params: { duration } });

export const visitorData = duration =>
  get(`${url.GET_VISITOR_DATA}/${duration}`, { params: { duration } });

export const topSellingData = month =>
  get(`${url.TOP_SELLING_DATA}/${month}`, { params: { month } });

export const getEarningChartsData = month =>
  get(`${url.GET_EARNING_DATA}/${month}`, { params: { month } });

const getProductComents = () => get(url.GET_PRODUCT_COMMENTS);

const onLikeComment = (commentId, productId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}`, {
    params: { commentId, productId },
  });
};
const onLikeReply = (commentId, productId, replyId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}/${replyId}`, {
    params: { commentId, productId, replyId },
  });
};

const onAddReply = (commentId, productId, replyText) => {
  return post(`${url.ON_ADD_REPLY}/${productId}/${commentId}`, {
    params: { commentId, productId, replyText },
  });
};

const onAddComment = (productId, commentText) => {
  return post(`${url.ON_ADD_COMMENT}/${productId}`, {
    params: { productId, commentText },
  });
};

export const getAllInvoiceFolder = () => get(url.GET_ALL_INVOICE_FOLDER)
export const getReportMeDefulterList = () => getAfter(url.GET_REPORT_ME_DEFULTER_LIST)
export const getUploaddocpendigrList = () => getAfter(url.GET_UPLOAD_PENDING_LIST)

// approved report me defaulter

export const getApproveReportMeDefaulterList = () => getAfter(url.GET_APPROVED_REPORT_ME_DEFAULTER_LIST);
export const getApproveReportDefaulterList = () => getAfter(url.GET_APPROVED_REPORT_DEFAULTER_LIST);
export const postApproveTransactionReopen = (data) => post(url.POST_APPROVED_TRANSACTION_REOPEN, data);
export const deleteInvoiceApi = (data) => post('/api/defaulters/deleteDefaulterEntryById', data);


export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeRegister,
  postFakeLogin,
  postFakeProfile,
  postFakeForgetPwd,
  postJwtRegister,
  postJwtLogin,
  postJwtForgetPwd,
  postJwtProfile,
  getProductComents,
  onLikeComment,
  onLikeReply,
  onAddReply,
  onAddComment,
};
