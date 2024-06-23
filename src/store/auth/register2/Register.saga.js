import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { REGISTER2_LOGIN_USER } from "./Register.actionTypes";
import { registerSuccess_login, registerFail_login } from "./Register.actions";
import { apiError } from "../login/Login.actions"
import { postFakeRegister } from "../../../helpers/fakebackend_helper";

function* registerUser_login_2({ payload: { user, history } }) {

  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {

      const response = yield call(postFakeRegister, user);
      if (response != undefined && response != null) {

        // sessionStorage.setItem("authUser", JSON.stringify(response.data.response));
        yield put(registerSuccess_login(response.data.success));


      } else {

        // alert(response.data.message);

        yield put(registerFail_login("fail"));

        // window.alert("User already exists");
      }
    }

  } catch (error) {
    yield put(apiError(error));
  }
}



function* registerAuthSaga() {
  yield takeEvery(REGISTER2_LOGIN_USER, registerUser_login_2);
}

export default registerAuthSaga;
