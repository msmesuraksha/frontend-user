import {
  FETCH_REPORT_ME_DEFULTER_START,
  FETCH_REPORT_ME_DEFULTER_SUCCESS,
  FETCH_REPORT_ME_DEFULTER_FAILED,
  REPORT_ME_DEFULTER_DATA_BLANK
} from "./ReportMeDefulter.type"
import { createAction } from "store/utils/reducer/reducer.utils"

export const fetchReportMeDefulterStart = () => createAction(FETCH_REPORT_ME_DEFULTER_START)

export const fetchReportMeDefulterSuccess = ReportMeDefulterArray => createAction(FETCH_REPORT_ME_DEFULTER_SUCCESS, ReportMeDefulterArray)

export const fetchReportMeDefulterFailure = error => createAction(FETCH_REPORT_ME_DEFULTER_FAILED, error)

export const ReportDefulterDataBlank = blank => createAction(REPORT_ME_DEFULTER_DATA_BLANK, blank)

