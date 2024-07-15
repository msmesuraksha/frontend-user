import { takeLatest, call, put, all, fork, takeEvery } from "redux-saga/effects"

import { profileEditSuccess, profileEditFailure, } from "./profileEdit.action"

import { PROFILE_EDIT_START } from "./profileEdit.type"

import { EditProfileData } from "helpers/fakebackend_helper"

import { ToastContainer, toast } from 'react-toastify';



export function* editProfileDataAsync(payload) {
  try {
    const response = yield call(EditProfileData, payload.payload)
    yield put(profileEditSuccess(response.data.response))
  } catch (error) {
    yield put(profileEditFailure(error))
  }
}


export function* onProfileEditDetails() {
  yield takeEvery(PROFILE_EDIT_START, editProfileDataAsync)
}

export function* ProfileEditSaga() {
  yield all([fork(onProfileEditDetails)])
}
