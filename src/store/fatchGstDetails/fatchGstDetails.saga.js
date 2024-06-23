import { takeLatest, call, put, all, fork, takeEvery } from "redux-saga/effects"

import { fetchGstDetailsSuccess, fetchGstDetailsFailure, } from "./fatchGstDetails.action"

import { FETCH_GST_DETAIL_START } from "./fatchGstDetails.type"

import { getGstDetailsData } from "helpers/fakebackend_helper"

import { ToastContainer, toast } from 'react-toastify';



export function* fetchGstDetailsAsync(payload) {
  try {
    const response = yield call(getGstDetailsData, payload.payload)
    yield put(fetchGstDetailsSuccess(response.data.response))

    if (response.data.response == null) {
      toast.error("GST Number not found");
    }
  } catch (error) {

    yield put(fetchGstDetailsFailure(error))
  }
}


export function* onFetchGstDetails() {
  yield takeEvery(FETCH_GST_DETAIL_START, fetchGstDetailsAsync)
}

export function* FetchGstDetailsSaga() {
  yield all([fork(onFetchGstDetails)])
}
