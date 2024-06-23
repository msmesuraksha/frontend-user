import {
  FETCH_GST_DETAIL_START,
  FETCH_GST_DETAIL_SUCCESS,
  FETCH_GST_DETAIL_FAILED,
} from "./fatchGstDetails.type"

export const FETCH_GST_DETAIL_STATE = {
  gstDetailsPayload: {},
  userDetailsSuccess: {},
  loading: false,
  error: null,
}

export const FetchGstDetailsReducer = (
  state = FETCH_GST_DETAIL_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_GST_DETAIL_START:
      return { ...state, loading: true, gstDetailsPayload: payload }
    case FETCH_GST_DETAIL_SUCCESS:
      return { ...state, loading: false, userDetailsSuccess: payload }
    case FETCH_GST_DETAIL_FAILED:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
