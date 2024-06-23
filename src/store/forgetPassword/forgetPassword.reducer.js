

import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL
} from './forgetPassword.actionTypes'

const INIT_STATE = {

  error: {},
  changepswrd: false
}

const ForgetchangePasswordReducer = (state = INIT_STATE, action) => {
  //  
  switch (action.type) {

    case CHANGE_PASSWORD:
      return {
        ...state,
        changepswrd: false,

      }
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changepswrd: true

      }
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        changepswrd: false

      }

    default:
      return state
  }
}

export default ForgetchangePasswordReducer
