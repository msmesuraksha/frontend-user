import { takeLatest, call, put, all, fork, takeEvery } from "redux-saga/effects"

import { fetchApproveReportDefaulterSuccess, fetchApproveReportDefaulterFailure } from "./ApprovedReportDefulter.action"

import { FETCH_APPROVE_REPORT_DEFAULTER_START } from "./ApprovedReportDefulter.type"

import { getApproveReportDefaulterList } from "helpers/fakebackend_helper"


export function* fetchApproveReportDefaulterAsync() {
  try {
    const ApproveReportDefaulterArray = yield call(getApproveReportDefaulterList)
    yield put(fetchApproveReportDefaulterSuccess(ApproveReportDefaulterArray.response))
  } catch (error) {
    yield put(fetchApproveReportDefaulterFailure(error))
  }
}

export function* onFetchApproveReportDefaulter() {
  yield takeEvery(FETCH_APPROVE_REPORT_DEFAULTER_START, fetchApproveReportDefaulterAsync)
}

export function* ApproveReportDefaulterSaga() {
  yield all([fork(onFetchApproveReportDefaulter)])
}
