

import {GET_COMPANY,GET_COMPANY_LIST_SUCCESS,GET_COMPANY_LIST_FAIL,
  ADD_NEW_COMPANY, ADD_NEW_COMPANY_SUCCESS, ADD_NEW_COMPANY_FAIL

} from './Company.actionTypes'

  const INIT_STATE = {
    companyList : [],
    error: {},
    addNewCompany: false,
    addCompanyMessage:{}
  }
  
  const companyList = (state = INIT_STATE, action) => {
    //  
    switch (action.type) {
      case GET_COMPANY_LIST_SUCCESS:
        return {
          ...state,
          companyList: action.payload,
        }
  
      case GET_COMPANY_LIST_FAIL:
        return {
          ...state,
          error: action.payload,
        }
          case ADD_NEW_COMPANY  :
            return {
              ...state,
              addNewCompany: false,


            }
            case ADD_NEW_COMPANY_SUCCESS  :
              return {
                ...state,
                addNewCompany: true,
                addCompanyMessage:action.payload
  
              }
  
              case ADD_NEW_COMPANY_FAIL  :
                
                return {
                  ...state,
                  addNewCompany: false,
                  error: action.payload

    
                }
      default:
        return state
    }
  }
  
  export default companyList
  