import {
  PROFILE_EDIT_START,
  PROFILE_EDIT_SUCCESS,
  PROFILE_EDIT_FAILED,
} from "./profileEdit.type"

export const PROFILE_EDIT_STATE = {
  profileEditPayload: {},
  profileEditSuccess: {},
  loading: false,
  error: null,
}

export const ProfileEditReducer = (
  state = PROFILE_EDIT_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case PROFILE_EDIT_START:
      return { ...state, loading: true, profileEditPayload: payload }
    case PROFILE_EDIT_SUCCESS:
      return { ...state, loading: false, profileEditSuccess: payload }
    case PROFILE_EDIT_FAILED:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
