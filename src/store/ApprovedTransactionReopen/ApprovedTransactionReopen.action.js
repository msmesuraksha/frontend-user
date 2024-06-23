import {
  APPROVE_TRANSACTION_REOPEN_START,
  APPROVE_TRANSACTION_REOPEN_SUCCESS,
  APPROVE_TRANSACTION_REOPEN_FAILED,
} from "./ApprovedTransactionReopen.type"
import { createAction } from "store/utils/reducer/reducer.utils"



export const approveTransactionReopenStart = (data) => createAction(APPROVE_TRANSACTION_REOPEN_START, data)

export const approveTransactionReopenSuccess = (data) => createAction(APPROVE_TRANSACTION_REOPEN_SUCCESS, data)

export const approveTransactionReopenFailure = error => createAction(APPROVE_TRANSACTION_REOPEN_FAILED, error)
