import {
  FETCH_APPROVE_REPORT_ME_DEFAULTER_START,
  FETCH_APPROVE_REPORT_ME_DEFAULTER_SUCCESS,
  FETCH_APPROVE_REPORT_ME_DEFAULTER_FAILED,
} from "./ApprovedReportMeDefulter.type"

export const APPROVE_REPORT_ME_DEFAULTER_INITIAL_STATE = {
  approveReportMeDefaulterList: [],
  loading: false,
  error: null,
}

export const ApproveReportMeDefaulterReducer = (
  state = APPROVE_REPORT_ME_DEFAULTER_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_APPROVE_REPORT_ME_DEFAULTER_START:
      return { ...state, loading: true }
    case FETCH_APPROVE_REPORT_ME_DEFAULTER_SUCCESS:
      return { ...state, loading: false, approveReportMeDefaulterList: payload }
    case FETCH_APPROVE_REPORT_ME_DEFAULTER_FAILED:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
