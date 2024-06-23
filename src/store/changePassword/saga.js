import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Crypto Redux States
import { CHANGE_FIRST_PASSWORD ,CHANGE_ONE_TIME_PASSWORD} from "./actionTypes";
import {
  changeFirstPassword,
  changeFirstPasswordSucess,
  changePasswordFail,
  changePasswordOneTime,
  changePasswordOneTimeSucess,
  changePasswordOneTimeFail,

  

} from "./actions";

//Include Both Helper File with needed methods
import { changeFirstPass ,chnageOneTimePassAPI} from "helpers/fakebackend_helper";



function* changePasswordfirsttime(user, history) {
  const pay = user.payload

  try {
    const response = yield call(changeFirstPass, user)
    yield put(changeFirstPasswordSucess(response))
    if (response.data.success) {
      // history('/companies');
      alert("Please Re login with your new password")
      const newLocation = "/login"
      window.location.href = newLocation
    }
    else {

      alert(response.data.message)
    }

  } catch (error) {
    yield put(changePasswordFail(error))
  }
}



function* changeOneTimePassSaga(user, history) {
  const pay = user.payload

  try {
    const response = yield call(chnageOneTimePassAPI, user)
    yield put(changePasswordOneTimeSucess(response))
    if (response.data.success) {
      // history('/companies');
      alert("Please Re login with your new password")
      sessionStorage.removeItem("one-time-token")
      const newLocation = "/login"
      window.location.href = newLocation
    }
    else {

      alert(response.data.message)
    }

  } catch (error) {
    yield put(changePasswordOneTimeFail(error))
  }
}

function* changePasswordSaga() {
  //  
  yield takeLatest(CHANGE_FIRST_PASSWORD, changePasswordfirsttime)
  yield takeLatest(CHANGE_ONE_TIME_PASSWORD, changeOneTimePassSaga)
}

export default changePasswordSaga;
