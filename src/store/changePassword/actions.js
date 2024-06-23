/* INVOICES */
// import { ADD_NEW_EMPLOYEE, ADD_NEW_EMPLOYEE_SUCCESS } from "store/Employee/actionTypes"
import {
  CHANGE_FIRST_PASSWORD_SUCCESS,
  CHANGE_FIRST_PASSWORD,
  CHANGE_FIRST_PASSWORD_FAIL,
  CHANGE_ONE_TIME_PASSWORD,
  CHANGE_ONE_TIME_PASSWORD_FAIL,
  CHANGE_ONE_TIME_PASSWORD_SUCCESS
  } from "./actionTypes"
  
  

  export const changeFirstPassword = (user, history) => {
    
    return {
      type: CHANGE_FIRST_PASSWORD,
      payload: user,
    }
  }
  
  export const changeFirstPasswordSucess = user => {
     
    return {
      type: CHANGE_FIRST_PASSWORD_SUCCESS,
      payload: user,
    }
    
  }
  export const changePasswordFail = user => {
     
    return {
      type: CHANGE_FIRST_PASSWORD_FAIL,
      // payload: user,
    }
  
  }



  export const changePasswordOneTime = (user, history) => {
    
    return {
      type: CHANGE_ONE_TIME_PASSWORD,
      payload: user,
    }
  }
  
  export const changePasswordOneTimeSucess = user => {
     
    return {
      type: CHANGE_ONE_TIME_PASSWORD_SUCCESS,
      payload: user,
    }
    
  }
  export const changePasswordOneTimeFail = user => {
     
    return {
      type: CHANGE_ONE_TIME_PASSWORD_FAIL,
      // payload: user,
    }
  
  }