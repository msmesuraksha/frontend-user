import { createSelector } from 'reselect';
import moment from 'moment'
const selectCompanySearchReducer = (state) => state.CompanySearchReducer;

export const selectCompanySearchList = createSelector(
  [selectCompanySearchReducer],
  (reportMeDefulter) => reportMeDefulter.companySearchList != undefined ? reportMeDefulter.companySearchList : []
);

export const selectdashboardAdminDataMap = createSelector(
  [selectCompanySearchList],
  (reportMeDefulter) => {
    if (!reportMeDefulter || reportMeDefulter.length === 0) {
      return [];
    }

    // Calculate starting SrNo based on the length of reportMeDefulter
    let SrNo = reportMeDefulter.length;

    return reportMeDefulter.map((list) => {
      const { id, dueFrom, totalAmount, city, state, ratings = [], companyName, companyPan, gstin, customerEmail, customerMobile, secCustomerMobile, address1, address2, firstname } = list;
      const ratingValues = ratings
        .filter((rating) => rating.question !== undefined && rating.question.questionType == "RATING")
        .map((rating) => Number(rating.response));

      let averageRating = '';

      if (ratingValues.length > 0) {
        const sumOfRatings = ratingValues.reduce((sum, rating) => sum + rating, 0);
        const numberOfRatings = ratingValues.length;
        const calculatedAverage = sumOfRatings / numberOfRatings;

        // Ensure the calculated average is under 5
        averageRating = Math.min(calculatedAverage, 5).toFixed(2);
      }

      const CompanyName = companyName || '';
      const PANCARD = companyPan || '';
      const GST = gstin || '';
      const email = customerEmail || '';
      const mobile = customerMobile || '';
      const secMobile = secCustomerMobile || '';
      const FullName = firstname || '';

      // Decrease SrNo for each iteration
      SrNo--;

      return {
        SrNo,
        id,
        FullName,
        CompanyName,
        GST,
        PANCARD,
        rating: averageRating,
        dueFrom,
        totalAmount,
        email,
        customerMobile: mobile,
        city,
        state,
        address1,
        address2,
        secCustomerMobile: secMobile,
      };
    });
  }
);
export const selectDoardAdminDataLoading = createSelector(
  [selectCompanySearchReducer],
  (reportMeDefulter) => reportMeDefulter.loading
);

export const getAllCompanyListSelector = createSelector(
  [selectCompanySearchReducer],
  (reportMeDefulter) => reportMeDefulter.companyList
);

export const selectCompanySearchLoder = createSelector(
  [selectCompanySearchReducer],
  (reportMeDefulter) => reportMeDefulter.loading
);
