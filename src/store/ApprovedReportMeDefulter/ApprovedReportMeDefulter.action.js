import {
  FETCH_APPROVE_REPORT_ME_DEFAULTER_START,
  FETCH_APPROVE_REPORT_ME_DEFAULTER_SUCCESS,
  FETCH_APPROVE_REPORT_ME_DEFAULTER_FAILED,
} from "./ApprovedReportMeDefulter.type"
import { createAction } from "store/utils/reducer/reducer.utils"

export const fetchApproveReportMeDefaulterStart = () => createAction(FETCH_APPROVE_REPORT_ME_DEFAULTER_START)

export const fetchApproveReportMeDefaulterSuccess = values => createAction(FETCH_APPROVE_REPORT_ME_DEFAULTER_SUCCESS, values)

export const fetchApproveReportMeDefaulterFailure = error => createAction(FETCH_APPROVE_REPORT_ME_DEFAULTER_FAILED, error)

