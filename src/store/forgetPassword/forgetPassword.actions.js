/* INVOICES */
// import { ADD_NEW_EMPLOYEE, ADD_NEW_EMPLOYEE_SUCCESS } from "store/Employee/actionTypes"
import {
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAIL
} from "./forgetPassword.actionTypes"



export const changePassword = (user, history) => {

  return {
    type: CHANGE_PASSWORD,
    payload: user,
  }
}

export const changePasswordSucess = user => {

  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload: user,
  }

}
export const changePasswordFail = user => {

  return {
    type: CHANGE_PASSWORD_FAIL,
    // payload: user,
  }

}