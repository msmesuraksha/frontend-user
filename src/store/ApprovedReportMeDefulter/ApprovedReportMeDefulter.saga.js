import { takeLatest, call, put, all, fork, takeEvery } from "redux-saga/effects"

import { fetchApproveReportMeDefaulterSuccess, fetchApproveReportMeDefaulterFailure } from "./ApprovedReportMeDefulter.action"

import { FETCH_APPROVE_REPORT_ME_DEFAULTER_START } from "./ApprovedReportMeDefulter.type"

import { getApproveReportMeDefaulterList } from "helpers/fakebackend_helper"


export function* fetchApproveReportMeDefaulterAsync() {
  try {
    const ApproveReportMeDefaulterArray = yield call(getApproveReportMeDefaulterList)
    yield put(fetchApproveReportMeDefaulterSuccess(ApproveReportMeDefaulterArray.response))
  } catch (error) {
    yield put(fetchApproveReportMeDefaulterFailure(error))
  }
}

export function* onFetchApproveReportMeDefaulter() {
  yield takeEvery(FETCH_APPROVE_REPORT_ME_DEFAULTER_START, fetchApproveReportMeDefaulterAsync)
}

export function* ApproveReportMeDefaulterSaga() {
  yield all([fork(onFetchApproveReportMeDefaulter)])
}
