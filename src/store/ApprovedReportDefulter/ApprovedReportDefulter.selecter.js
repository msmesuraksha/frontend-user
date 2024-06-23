import { createSelector } from 'reselect';

const selectApproveReportMeDefaulterReducer = (state) => state.ApproveReportMeDefaulterReducer;

export const selectReportMeDefData = createSelector(
  [selectApproveReportMeDefaulterReducer],
  (ApproveReportMeDefaulter) => ApproveReportMeDefaulter.reportMeDefaulterList
);

/* export const selectDoardAdminDataLoading = createSelector(
  [selectApproveReportMeDefaulterReducer],
  (reportMeDefulter) => reportMeDefulter.loading
); */

