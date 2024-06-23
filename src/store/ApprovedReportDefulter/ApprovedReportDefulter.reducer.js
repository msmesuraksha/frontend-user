import {
  FETCH_APPROVE_REPORT_DEFAULTER_START,
  FETCH_APPROVE_REPORT_DEFAULTER_SUCCESS,
  FETCH_APPROVE_REPORT_DEFAULTER_FAILED,
} from "./ApprovedReportDefulter.type"

export const APPROVE_REPORT_DEFAULTER_INITIAL_STATE = {
  approveReportDefaulterList: [],
  loading: false,
  error: null,
}

export const ApproveReportDefaulterReducer = (
  state = APPROVE_REPORT_DEFAULTER_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_APPROVE_REPORT_DEFAULTER_START:
      return { ...state, loading: true }
    case FETCH_APPROVE_REPORT_DEFAULTER_SUCCESS:
      return { ...state, loading: false, approveReportDefaulterList: payload }
    case FETCH_APPROVE_REPORT_DEFAULTER_FAILED:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
