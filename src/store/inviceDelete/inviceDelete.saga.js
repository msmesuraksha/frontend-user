import { takeLatest, call, put, all, fork, takeEvery } from "redux-saga/effects"

import { deleteInvoiceSuccess, deleteInvoiceFailure, } from "./inviceDelete.action"

import { DELETE_INVOICE_START } from "./inviceDelete.type"

import { deleteInvoiceApi } from "helpers/fakebackend_helper"




export function* deleteInvoiceAsync(payload) {
  try {

    const response = yield call(deleteInvoiceApi, payload.payload)
    yield put(deleteInvoiceSuccess(response.data.response))
  } catch (error) {
    yield put(deleteInvoiceFailure(error))
  }
}


export function* onDeleteInvoice() {
  yield takeEvery(DELETE_INVOICE_START, deleteInvoiceAsync)
}

export function* DeleteInvoiceSaga() {
  yield all([fork(onDeleteInvoice)])
}
