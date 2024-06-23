import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import { ADD_FILES, ADD_INVOICE, GET_INVOICES, GET_INVOICE_DETAIL } from "./actionTypes";
import {
  getInvoicesSuccess,
  getInvoicesFail,
  getInvoiceDetailSuccess,
  getInvoiceDetailFail,
  addInvoiceBill,
  addInvoiceBillSuccess,
  addInvoiceBillFail,
  addFiles,
  addFilesSuccess,
  addFilesFail
} from "./actions";

//Include Both Helper File with needed methods
import { getInvoices, getInvoiceDetail,addInvoiceApi, addFilesApiMethod } from "helpers/fakebackend_helper";

function* fetchInvoices() {
  try {
    const response = yield call(getInvoices)
    yield put(getInvoicesSuccess(response))
  } catch (error) {
    yield put(getInvoicesFail(error))
  }
}

function* fetchInvoiceDetail({ invoiceId }) {
  try {
    const response = yield call(getInvoiceDetail, invoiceId)
    yield put(getInvoiceDetailSuccess(response))
  } catch (error) {
    yield put(getInvoiceDetailFail(error))
  }
}
function* addInvoicesaga(payload) {
  try {
    const response = yield call(addInvoiceApi, payload.payload)
    yield put(addInvoiceBillSuccess(response))
  } catch (error) {
    yield put(addInvoiceBillFail(error))
  }
}

function* addFilesSaga(payload) {
  try {
    const response = yield call(addFilesApiMethod, payload.payload)
    yield put(addFilesSuccess(response))
  } catch (error) {
    yield put(addFilesFail(error))
  }
}


function* invoiceSaga() {
  //  
  yield takeEvery(GET_INVOICES, fetchInvoices)
  yield takeEvery(GET_INVOICE_DETAIL, fetchInvoiceDetail)
  yield takeEvery(ADD_INVOICE, addInvoicesaga)
  yield takeEvery(ADD_FILES, addFilesSaga)
}

export default invoiceSaga;
