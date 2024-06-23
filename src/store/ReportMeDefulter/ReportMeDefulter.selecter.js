import { createSelector } from 'reselect';

const selectReportMeDefulterReducer = (state) => state.ReportMeDefulterReducer;

export const selectReportMeDefData = createSelector(
  [selectReportMeDefulterReducer],
  (reportMeDefulter) => {
    // (reportMeDefulter) => reportMeDefulter.reportMeDefulterList
    if (reportMeDefulter == undefined) return []
    const mapinvoicelistA = reportMeDefulter.reportMeDefulterList.map((item, index) => {
      const SrNo = index + 1
      const customerName = item.creditor.companyName
      const invoices = item.invoices
      const status = item.latestStatus
      const dueFrom = item.dueFrom
      const totalAmount = item.totalAmount
      const id = item.id
      const address1 = item.creditor.address1 == undefined && item.creditor.address1 == null ? '' : item.creditor.address1 + ', '
      const address2 = item.creditor.address2 == undefined && item.creditor.address2 == null ? '' : item.creditor.address2 + ', '
      const Address = address1 + address2 + item.creditor.city + ", " + item.creditor.state
      const invoiceList = item.invoices.map((data, i) => {
        return item.invoices.length > i + 1 ? data.invoiceNumber + ", " : data.invoiceNumber
      })
      const debtor = item.debtor
      const creditor = item.creditor
      const createdAt = item.createdAt
      const complaintNumber = item.complaintNumber != undefined ? item.complaintNumber : ''

      return { SrNo, customerName, invoices, status, dueFrom, id, Address, totalAmount, creditor, invoiceList, debtor, createdAt, complaintNumber }
    })
    return mapinvoicelistA

  })










export const selectdashboardAdminDataMap = createSelector(
  [selectReportMeDefData],
  (reportMeDefulter) => reportMeDefulter
);
export const selectDoardAdminDataLoading = createSelector(
  [selectReportMeDefulterReducer],
  (reportMeDefulter) => reportMeDefulter.loading
);

