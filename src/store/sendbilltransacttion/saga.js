import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { ADD_NEW_CUSTOMER_SUCCESS, ADD_NEW_CUSTOMER_LIST, ADD_NEW_CUSTOMER_FAIL } from "./sendbilltransacttion.actionTypes"

import { addNewCustomerSuccess, addNewCustomerFail } from "./actions";

import { addCustomerListAPI } from '../../helpers/fakebackend_helper'


function* addCustomerListsaga(data) {
  try {
    const response = yield call(addCustomerListAPI, data.payload)
    yield put(addNewCustomerSuccess(response))

  } catch (error) {
    yield put(addNewCustomerFail(error))
  }
}


function* employeeListsagaCustomer() {
  //  
  yield takeLatest(ADD_NEW_CUSTOMER_LIST, addCustomerListsaga)
}

export default employeeListsagaCustomer;
