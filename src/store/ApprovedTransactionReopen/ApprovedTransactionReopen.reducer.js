import {
  APPROVE_TRANSACTION_REOPEN_START,
  APPROVE_TRANSACTION_REOPEN_SUCCESS,
  APPROVE_TRANSACTION_REOPEN_FAILED,
} from "./ApprovedTransactionReopen.type"

export const APPROVE_TRANSACTION_REOPEN_STATE = {
  approveTransactionReopenPayload: {},
  approveTransactionReopenSuccess: [],
  loading: false,
  error: null,
}

export const ApprovedTransactionReopenReducer = (
  state = APPROVE_TRANSACTION_REOPEN_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case APPROVE_TRANSACTION_REOPEN_START:
      return { ...state, loading: true, approveTransactionReopenPayload: payload }
    case APPROVE_TRANSACTION_REOPEN_SUCCESS:
      return { ...state, loading: false, approveTransactionReopenSuccess: payload }
    case APPROVE_TRANSACTION_REOPEN_FAILED:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
