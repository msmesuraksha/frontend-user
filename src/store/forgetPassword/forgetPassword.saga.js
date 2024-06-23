import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Crypto Redux States
import { CHANGE_PASSWORD } from "./forgetPassword.actionTypes";
import {
  changePasswordSucess,
  changePasswordFail

} from "./forgetPassword.actions";

//Include Both Helper File with needed methods
import { changeorgetPassword } from "helpers/fakebackend_helper";



function* changePassword(user, history) {
  const pay = user.payload

  try {
    const response = yield call(changeorgetPassword, user)
    yield put(changePasswordSucess(response))
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

function* ForgetchangePasswordSaga() {
  //  
  yield takeLatest(CHANGE_PASSWORD, changePassword)
}

export default ForgetchangePasswordSaga;
