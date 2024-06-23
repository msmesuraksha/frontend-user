import { takeLatest, call, put, all, fork, takeEvery } from "redux-saga/effects"

import { approveTransactionReopenSuccess, approveTransactionReopenFailure, } from "./ApprovedTransactionReopen.action"

import { APPROVE_TRANSACTION_REOPEN_START } from "./ApprovedTransactionReopen.type"

import { postApproveTransactionReopen } from "helpers/fakebackend_helper"




export function* ApprovedTransactionReopenAsync(payload) {
  try {

    const response = yield call(postApproveTransactionReopen, payload.payload)
    yield put(approveTransactionReopenSuccess(response.data.response))
  } catch (error) {
    yield put(approveTransactionReopenFailure(error))
  }
}


export function* onApproveTransactionReopen() {
  yield takeEvery(APPROVE_TRANSACTION_REOPEN_START, ApprovedTransactionReopenAsync)
}

export function* ApproveTransactionReopenSaga() {
  yield all([fork(onApproveTransactionReopen)])
}
