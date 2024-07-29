import { createSelector } from 'reselect';

const selectApproveReportMeDefaulterReducer = (state) => state.ApproveReportMeDefaulterReducer;

export const selectApproveReportMeDefData = createSelector(
  [selectApproveReportMeDefaulterReducer],
  (ApproveReportMeDefaulter) => ApproveReportMeDefaulter.approveReportMeDefaulterList
);

export const selectCompaintsForMe = createSelector(
  [selectApproveReportMeDefaulterReducer],
  // (ApproveReportMeDefaulter) => ApproveReportMeDefaulter.approveReportMeDefaulterList?.compaintsForMe
  (ApproveReportMeDefaulter) => {

    if (ApproveReportMeDefaulter == undefined) return []
    if (ApproveReportMeDefaulter?.approveReportMeDefaulterList.length != 0) {
      const mapinvoicelist = ApproveReportMeDefaulter?.approveReportMeDefaulterList?.compaintsForMe.map((item, index) => {
        const SrNo = index = 1
        const customerName = item.defaulterEntry.creditor.companyName
        const status = item.pHArray[0].status
        const dueFrom = item.dueFrom
        const totalAmount = item.totalAmountPaid
        // const Address = item.debtor.address1+", "+ item.debtor.address2 +", "+ item.debtor.city+", "+ item.debtor.state
        const invoiceList = item.defaulterEntry.invoices.map((data, i) => {
          return item.defaulterEntry.invoices.length > i + 1 ? data.invoiceNumber + ", " : data.invoiceNumber

        })
        const defaulterEntry = item.defaulterEntry
        const pHArray = item.pHArray
        const creditor = item.defaulterEntry?.creditor
        const address2 = item.defaulterEntry.creditor.address2 != undefined ? item.defaulterEntry.creditor.address2 + ', ' : ''
        const Address = item.defaulterEntry != null ? item.defaulterEntry.creditor.address1 + ", " + address2 + item.defaulterEntry.creditor.city + ", " + item.defaulterEntry.creditor.state : ""

        const complaintNumber = item.defaulterEntry.complaintNumber != undefined ? item.defaulterEntry.complaintNumber : ''

        // const Address = creditor.address1 != undefined ? creditor.address1 + ", " : '' +creditor.address2 != undefined ?creditor.address2 + ", " : "" + creditor.city != undefined ?creditor.city + ", " : ''  + creditor.state != undefined ? creditor.state : ''
        const createdAt = item.defaulterEntry.createdAt


        return { SrNo, customerName, Address, status, dueFrom, totalAmount, defaulterEntry, createdAt, complaintNumber, invoiceList, pHArray }
      })
      return mapinvoicelist

    }
    else {
      return []
    }

  });

export const selectCompaintsByMe = createSelector(
  [selectApproveReportMeDefaulterReducer],
  (ApproveReportMeDefaulter) => ApproveReportMeDefaulter.approveReportMeDefaulterList?.complaintsByMe
);


export const selectCompaintsByMes = createSelector(
  [selectApproveReportMeDefaulterReducer],
  (ApproveReportMeDefaulter) => {

    if (ApproveReportMeDefaulter == undefined) return []
    if (ApproveReportMeDefaulter?.approveReportMeDefaulterList.length != 0) {
      const mapinvoicelist = ApproveReportMeDefaulter?.approveReportMeDefaulterList?.complaintsByMe.map((item, index) => {
        // console.log("ITEMMMMMM", item)
        const SrNo = index = 1
        const customerName = item.defaulterEntry.debtor.companyName
        const status = item.pHArray[0].status
        const dueFrom = item.dueFrom
        const totalAmount = item.totalAmountPaid
        // const Address = item.debtor.address1+", "+ item.debtor.address2 +", "+ item.debtor.city+", "+ item.debtor.state
        const invoiceList = item.defaulterEntry.invoices.map((data, i) => {
          return item.defaulterEntry.invoices.length > i + 1 ? data.invoiceNumber + "," : data.invoiceNumber

        })

        const defaulterEntry = item.defaulterEntry
        const pHArray = item.pHArray
        const address2 = item.defaulterEntry.debtor.address2 == undefined ? '' : item.defaulterEntry.debtor.address2 + ', '
        const Address = item.defaulterEntry.debtor.address1 + ", " + address2 + item.defaulterEntry.debtor.city + ", " + item.defaulterEntry.debtor.state

        const complaintNumber = item.defaulterEntry.complaintNumber != undefined ? item.defaulterEntry.complaintNumber : ''

        const createdAt = item.defaulterEntry.createdAt


        return { SrNo, customerName, Address, status, dueFrom, totalAmount, defaulterEntry, createdAt, complaintNumber, invoiceList, pHArray }
      })
      return mapinvoicelist

    }
    else {
      return []
    }

  });

/* export const selectDoardAdminDataLoading = createSelector(
  [selectApproveReportMeDefaulterReducer],
  (reportMeDefulter) => reportMeDefulter.loading
); */

