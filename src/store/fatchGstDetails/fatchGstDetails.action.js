import {
  FETCH_GST_DETAIL_START,
  FETCH_GST_DETAIL_SUCCESS,
  FETCH_GST_DETAIL_FAILED,
} from "./fatchGstDetails.type"
import { createAction } from "store/utils/reducer/reducer.utils"



export const fetchGstDetailsStart = (data) => createAction(FETCH_GST_DETAIL_START, data)

export const fetchGstDetailsSuccess = (data) => createAction(FETCH_GST_DETAIL_SUCCESS, data)

export const fetchGstDetailsFailure = error => createAction(FETCH_GST_DETAIL_FAILED, error)

export const dataresetGstDetailsSuccess = (data) => createAction(FETCH_GST_DETAIL_SUCCESS, [])
