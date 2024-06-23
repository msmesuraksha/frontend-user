import { createSelector } from 'reselect';
import moment from 'moment'
import { number } from 'prop-types';
const selectGstNoDetailsReducer = (state) => state.FetchGstDetailsReducer;


export const selectGstNoDetailsList = createSelector(
  [selectGstNoDetailsReducer],
  (gstData) => gstData?.userDetailsSuccess == null && gstData?.userDetailsSuccess == undefined ? [] : gstData?.userDetailsSuccess
);

