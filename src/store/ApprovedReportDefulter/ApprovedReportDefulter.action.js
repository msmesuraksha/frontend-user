import {
  FETCH_APPROVE_REPORT_DEFAULTER_START,
  FETCH_APPROVE_REPORT_DEFAULTER_SUCCESS,
  FETCH_APPROVE_REPORT_DEFAULTER_FAILED,
} from "./ApprovedReportDefulter.type"
import { createAction } from "store/utils/reducer/reducer.utils"

export const fetchApproveReportDefaulterStart = () => createAction(FETCH_APPROVE_REPORT_DEFAULTER_START)

export const fetchApproveReportDefaulterSuccess = values => createAction(FETCH_APPROVE_REPORT_DEFAULTER_SUCCESS, values)

export const fetchApproveReportDefaulterFailure = error => createAction(FETCH_APPROVE_REPORT_DEFAULTER_FAILED, error)

