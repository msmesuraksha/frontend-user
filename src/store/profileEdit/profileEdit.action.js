import {
  PROFILE_EDIT_START,
  PROFILE_EDIT_SUCCESS,
  PROFILE_EDIT_FAILED,
} from "./profileEdit.type"
import { createAction } from "store/utils/reducer/reducer.utils"



export const profileEditStart = (data) => createAction(PROFILE_EDIT_START, data)

export const profileEditSuccess = (data) => createAction(PROFILE_EDIT_SUCCESS, data)

export const profileEditFailure = error => createAction(PROFILE_EDIT_FAILED, error)

/* export const dataresetGstDetailsSuccess = (data) => createAction(PROFILE_EDIT_SUCCESS, []) */
