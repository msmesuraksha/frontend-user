import {
  DELETE_INVOICE_START,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAILED,
} from "./inviceDelete.type"

export const DELETE_INVOICE_STATE = {
  deleteInvoicePayload: {},
  deleteInvoiceSuccess: [],
  loading: false,
  error: null,
}

export const DeleteInvoiceReducer = (
  state = DELETE_INVOICE_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case DELETE_INVOICE_START:
      return { ...state, loading: true, deleteInvoicePayload: payload }
    case DELETE_INVOICE_SUCCESS:
      return { ...state, loading: false, deleteInvoiceSuccess: payload }
    case DELETE_INVOICE_FAILED:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
