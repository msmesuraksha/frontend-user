import { createSelector } from 'reselect';
import { companyList } from './Company.reducer';

const selectcompanyListReducer = (state) => state.companyList;

export const selectDebtorsList = createSelector(
    [selectcompanyListReducer],
    (DebtorsReducer) => DebtorsReducer.addCompanyMessage != undefined ? DebtorsReducer.addCompanyMessage.response : []
)

