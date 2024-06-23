import { createSelector } from 'reselect';

const selectDeleteInvoiceReducer = (state) => state.DeleteInvoiceReducer;


export const selectCompanySearchVeiwDatilsList = createSelector(
  [selectDeleteInvoiceReducer],
  (reportMeDefulter) => reportMeDefulter.deleteInvoiceSuccess != undefined ? reportMeDefulter.deleteInvoiceSuccess : []
);

