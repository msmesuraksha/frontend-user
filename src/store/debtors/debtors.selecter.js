import { createSelector } from 'reselect';
import { DebtorsReducer } from './debtors.reducer';

const selectDebtorsReducer = (state) => state.DebtorsReducer;

export const selectDebtorsList = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.debtors != undefined ? DebtorsReducer.debtors.response : []
)

export const selectDebtorsListMap = createSelector(
    [selectDebtorsList],
    (DebtorsReducers) => {
        if (DebtorsReducers == undefined) return []
        let SrNo = DebtorsReducers.length + 1
        const debtorMap = DebtorsReducers.map((item, indexx) => {
            const SrNo = indexx + 1
            const { companyName, gstin, customerEmail, customerMobile } = item
            let customerName = item.firstname + ''
            const address2 = item.address2 == undefined ? '' : item.address2 + ', '
            const address = item.address1 + ", " + address2 + item.city + ", " + item.state
            return { SrNo, companyName, gstin, customerEmail, customerMobile, customerName, address, address2 }
        })
        return debtorMap
    }
)

export const selectInvoiceList = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.getInvoiceList != undefined ? DebtorsReducer.getInvoiceList.response : []
)


export const selectInvoiceListMap = createSelector(
    [selectInvoiceList],
    (DebtorsReducer) => {

        if (DebtorsReducer == undefined) return []
        let SrNo = DebtorsReducer.length + 1
        const mapinvoicelist = DebtorsReducer.map((item) => {
            SrNo--
            const customerName = item?.debtor != null ? item.debtor.companyName : ''
            const invoices = item.invoices
            const status = item.latestStatus
            const dueFrom = item.dueFrom
            const totalAmount = item.totalAmount
            const address2 = item?.debtor != null && item?.debtor.address2 != undefined && item?.debtor.address2 != null ? item.debtor.address2 + ', ' : ''
            const Address = item.debtor != null ? item.debtor.address1 + ", " + address2 + item.debtor.city + ", " + item.debtor.state : ""
            const invoiceList = item.invoices.map((data, i) => {
                return item.invoices.length > i + 1 ? data.invoiceNumber + ", " : data.invoiceNumber
            })
            const debtor = item.debtor
            const creditor = item.creditor
            const id = item.id
            const complaintNumber = item.complaintNumber != undefined ? item.complaintNumber : ''

            return { SrNo, customerName, id, invoices, status, dueFrom, Address, totalAmount, creditor, invoiceList, debtor, complaintNumber }
        })
        return mapinvoicelist
    }
)
export const getRequestEditSelector = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.getRequestEdit != undefined ? DebtorsReducer.getRequestEdit.response : []
)

/* export const selectInvoiceListMap = createSelector(
    [selectInvoiceList],
    (DebtorsReducer) => {
        if (DebtorsReducer) {
            DebtorsReducer.map(data => {
                const { debtor: { companyName, address1, address2, firstname, lastname, }, invoices, totalAmount: amount, } = data;
                const status = "Pending"
                if (data.status === undefined) {
                    status = "Approved"
                } else {
                    status = data.status
                }
                const InvoiceNUmber = invoices[0].invoiceNumber
                const DueFrom = invoices[0].dueDate

                return { companyName, InvoiceNUmber, address1, address2, amount, DueFrom, firstname, lastname, status }
            })
        }
    }
) */

export const selectReportDefOpen = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.isReportDefOpen
)

export const uploadCAcertificateSelector = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.uploadCACertifateID != undefined ? DebtorsReducer.uploadCACertifateID.response : []
)
export const requestEditSelector = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.requestAeditdefId != undefined ? DebtorsReducer.requestAeditdefId.response : []
)

export const selectFeedbackModalOpen = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.isCustomerFeedbackModalOpen
)

export const confirReportDefaultModel = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.isConfirmReportDefaultModal
)
export const markAsDisputedModalOpenSelector = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.isMarkAsDisputedOpen
)

export const ReportDefPreviewModal = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.isPreviewModalOpen
)
export const uploadFilesModalOpen = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.uploadPendingFilesModalOpen
)

export const addInvoiceReportDefaulterSelector = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.addInvoiceReportDefaulter
)

export const selectCACertificateOpen = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.isCACACertificateOpen
)

export const addInvoiceReportDebtorSelector = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.addInvoice
)
/* export const selectDebtorsList = (state) => state.DebtorsReducer.debtors != undefined ? state.DebtorsReducer.debtors.response : [];
export const selectInvoiceList = (state) => state.DebtorsReducer.getInvoiceList != undefined ? state.DebtorsReducer.getInvoiceList.response : []

export const selectReportDefOpen = (state) => state.DebtorsReducer.isReportDefOpen; */

export const addInvoiceIdtoArray = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.addInvoiceArray
)

export const addRatingofDebtor = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.addRating
)
export const recordPaymentReportDefaulter = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.recordPaymentAddReportDef
)

export const updatePendingDocsSelector = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.updatePendingDocs
)



export const isViewDetailMOdalOpenSelector = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.isViewDetailsModalOpen
)

export const getFeebBackQuestionListSelector = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.getFeedbackQuestionListReducer != undefined ? DebtorsReducer.getFeedbackQuestionListReducer : []
)
// 

export const requestModelSelector = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.isrequestEditModalReducerOpen
)

export const selectCreateInvoice = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.createInvoiceSuccess != undefined ? DebtorsReducer.createInvoiceSuccess : []
)