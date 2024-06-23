import {
  DELETE_INVOICE_START,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAILED,
} from "./inviceDelete.type"
import { createAction } from "store/utils/reducer/reducer.utils"



export const deleteInvoiceStart = (data) => createAction(DELETE_INVOICE_START, data)

export const deleteInvoiceSuccess = (data) => createAction(DELETE_INVOICE_SUCCESS, data)

export const deleteInvoiceFailure = error => createAction(DELETE_INVOICE_FAILED, error)
