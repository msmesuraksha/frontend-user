import React, { useEffect, useState, useCallback } from "react"
import PropTypes from "prop-types"
import moment from 'moment'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { setUploadPednigDocOpen, uploadUploadPednigDocID } from "../../../store/UploadPendingDocList/UploadPendingDocList.action"
import { selectUploadPendigDocOpen, uploadPendigDocSelector } from "store/UploadPendingDocList/UploadPendingDocList.selecter"
import CurrencyFormat from 'react-currency-format';
import { useDropzone } from 'react-dropzone'


import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  InputGroup,
  Input,
  Label,
  Card,
  CardBody,
  Table,
  Row, Col
} from "reactstrap"

import fileImg2 from '../../../assets/images/newImg/pdf.png'
import fileImg1 from '../../../assets/images/newImg/png-file-.png'

import { UploadDocCheckBoxPopModule } from "../uploadPendingDocLink/uploadDocCheckBoxPop";
import { UploadDocSuccessModule } from "../uploadPendingDocLink/uploadDocSuccessPop";

const UploadPendingDocModel = props => {
  const { isOpen, toggle, uploadFilesModelDataForUpload, selectType, submitCheck } = props

  const dispatch = useDispatch()
  const [uploadCAId, setuploadCAId] = useState('')
  const [uploadAdditionId, setuploadAdditionId] = useState([])
  const [warongText, setWarongText] = useState(false)
  const [isSubmt, setIsSubmt] = useState(false)
  const [popchecked, setPopChecked] = useState(false);
  const [successPop, setSuccessPop] = useState(false);


  const cuuretchek = 1

  const [docData, setDocData] = useState([])
  const [checked, setChecked] = useState(false);
  const handleCheckboxChange = () => {
    setChecked(!checked);
  };
  const handleFileChange = (event, fieldName, currenIndex) => {
    setIsSubmt(true)
    const files = event.target.files
    const formData = new FormData();
    formData.append('file', files[0]);   //append the values with key, value pair
    formData.append('fieldName', fieldName);
    uploadFile(formData, currenIndex)

  }

  function uploadFile(formData, currenIndex) {
    const token = sessionStorage.getItem("tokenemployeeRegister")
    const headers = {
      'x-access-token': token != null ? token : '',
    };
    axios.post('https://msmesuraksha-backend.azurewebsites.net/api/files/upload', formData, {
      headers: headers
    })
      .then((response) => {

        if (response.data.response.fieldName == "invoiceDocument") {
          const newData = [...docData]
          newData[currenIndex].invoiceDocument = response.data.response.documentId
          setDocData(newData)
        }
        if (response.data.response.fieldName == "purchaseOrderDocument") {
          const newData = [...docData]
          newData[currenIndex].purchaseOrderDocument = response.data.response.documentId
          setDocData(newData)
        }
        if (response.data.response.fieldName == "paymentRecordDocument") {
          const newData = [...docData]
          newData[currenIndex].paymentRecordDocument = response.data.response.documentId
          setDocData(newData)
        }
        if (response.data.response.fieldName == "transportationDocument") {
          const newData = [...docData]
          newData[currenIndex].transportationDocument = response.data.response.documentId
          setDocData(newData)
        }
        if (response.data.response.fieldName == "cacertificate") {

          setuploadCAId(response.data.response)
        }
        if (response.data.response.fieldName == "additionaldocuments") {
          setuploadAdditionId((item) => [...item, response.data.response.documentId])
        }
      })
      .catch((error) => {

      })
  }

  const creditorcacertificateNeed = uploadFilesModelDataForUpload.documentsRequiredFromCreditor?.includes('cacertificate')
  const debtorcacertificateNeed = uploadFilesModelDataForUpload.documentsRequiredFromDebtor?.includes('cacertificate')

  const handleSubmit = (item) => {

    const payload = {
      "paymentId": uploadFilesModelDataForUpload._id,
      "defaulterEntryId": uploadFilesModelDataForUpload._id,
      "type": selectType, // DEBTOR/CREDITOR
      // Below documents are required for type DEBTOR
      "debtorcacertificate": selectType == 'DEBTOR' ? uploadCAId.documentId : '',
      "debtoradditionaldocuments": selectType == 'DEBTOR' ? uploadAdditionId : '',
      // Below documents are required for type CREDITOR
      "creditorcacertificate": selectType == 'CREDITOR' ? uploadCAId.documentId : '',
      "creditoradditionaldocuments": selectType == 'CREDITOR' ? uploadAdditionId : '',
      "attachment": selectType == 'DEBTOR' ? '' : docData
    }

    if (!popchecked) {
      if (selectType == "CREDITOR") {
        let checkvalue = false
        docData.map((obj) => {
          checkvalue = Object.values(obj).includes('')
        })
        if (checkvalue) {
          setChecked(!checked);
          setWarongText(true)
          return
        }
      }

      if (selectType == "DEBTOR") {
        if (debtorcacertificateNeed) {
          const uploadCA = Object.keys(uploadCAId).length;
          if (uploadCA == 0 || uploadAdditionId.length == 0) {
            setChecked(!checked);
            setWarongText(true)
            return
          } else {
            setWarongText(false)
          }
        }
      }

      if (selectType == "CREDITOR") {
        if (creditorcacertificateNeed) {
          const uploadCA = Object.keys(uploadCAId).length;
          if (uploadCA == 0) {
            setChecked(!checked);
            setWarongText(true)
            return
          } else {
            setWarongText(false)
          }
        }
      }
    }



    submitCheck(true)
    dispatch(uploadUploadPednigDocID(payload))

    setSuccessPop(!successPop)

  }

  const notSubmitAllDoc = () => {


    const payload = {
      "paymentId": uploadFilesModelDataForUpload._id,
      "defaulterEntryId": uploadFilesModelDataForUpload._id,
      "type": selectType, // DEBTOR/CREDITOR
      // Below documents are required for type DEBTOR
      "debtorcacertificate": selectType == 'DEBTOR' ? uploadCAId.documentId : '',
      "debtoradditionaldocuments": selectType == 'DEBTOR' ? uploadAdditionId : '',
      // Below documents are required for type CREDITOR
      "creditorcacertificate": selectType == 'CREDITOR' ? uploadCAId.documentId : '',
      "creditoradditionaldocuments": selectType == 'CREDITOR' ? uploadAdditionId : '',
      "attachment": selectType == 'DEBTOR' ? '' : docData
    }

    submitCheck(true)
    dispatch(uploadUploadPednigDocID(payload))

    setSuccessPop(!successPop)



  }

  const createinvoiceObj = () => {
    const newDataArray = uploadFilesModelDataForUpload.invoices.map((item, currentIndex) => {
      const docObj = {};
      uploadFilesModelDataForUpload.documentsRequiredFromCreditor.forEach((value) => {
        if (value !== "cacertificate" && value !== "additionaldocuments" && value !== "PaymentSeller") {
          docObj[value] = '';
        }
      });
      docObj.invoiceId = item._id;
      return docObj;
    });
    const updatedDocData = [...docData, ...newDataArray];
    setDocData(updatedDocData);
  };

  useEffect(() => {
    if (uploadFilesModelDataForUpload != '' && uploadFilesModelDataForUpload.invoices != undefined) {
      createinvoiceObj()
    }

  }, [cuuretchek])


  const [uploadedDocs, setuploadedDocs] = useState([])
  const onDrop = useCallback((acceptedFiles) => {
    setIsSubmt(true)
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      // setuploadedDocs(acceptedFiles)
      uploadedDocs.push(acceptedFiles[0])
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result

      }
      reader.readAsArrayBuffer(file)
    })

    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);   //append the values with key, value pair
    formData.append('fieldName', 'additionaldocuments')
    uploadFile(formData)

  }, [])

  const handleRemove = (item, inde) => {
    const index = uploadedDocs.indexOf(item);
    if (index > -1) {
      uploadedDocs.splice(index, 1); // 2nd parameter means remove one item only
      const newData = [...uploadAdditionId]
      newData.splice(index, 1);
      setuploadAdditionId(newData)
    }
    return uploadedDocs
  }
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const footerStyles = {
    //   backgroundColor: '#333',
    color: '#333',
    padding: '20px',
    textAlign: 'center',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
  };

  const successPopToggle = () => {
    toggle()
    setSuccessPop(!successPop)
  }
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      {checked && <UploadDocCheckBoxPopModule isOpen={checked} toggle={handleCheckboxChange} setPopChecked={setPopChecked} popchecked={popchecked} notSubmitAllDoc={notSubmitAllDoc} />}
      {successPop && <UploadDocSuccessModule isOpen={successPop} submitType={'submitMenu'} toggle={successPopToggle} />}
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Upload Pending Files</ModalHeader>

        <ModalBody>
          {selectType == 'CREDITOR' &&
            <Row>
              <Col md={10} className="">
                <h3 className="" style={{ fontSize: '20px' }}>{uploadFilesModelDataForUpload.adminRemarksForCreditor != '' && `Message from MSME Suraksha : ${uploadFilesModelDataForUpload.adminRemarksForCreditor}`}</h3>
              </Col>
            </Row>}
          {selectType == 'DEBTOR' &&
            <Row>
              <Col md={10} className="">
                <h3 className="" style={{ fontSize: '20px' }}>{uploadFilesModelDataForUpload.adminRemarksForDebtor != '' && `Message from MSME Suraksha : ${uploadFilesModelDataForUpload.adminRemarksForDebtor}`}</h3>
              </Col>
            </Row>}

          {uploadFilesModelDataForUpload != '' && uploadFilesModelDataForUpload.invoices != undefined ? uploadFilesModelDataForUpload.invoices.map((item, currenIndex) => {

            return <Row className="bg-light p-3 mt-2" key={item}>
              <Row>
                <Col md={3}><span style={{ fontSize: '15px' }}> {currenIndex + 1}. &nbsp;Invoice Number : {item.invoiceNumber}</span></Col>
                <Col md={3}><span style={{ fontSize: '15px' }}>Date : {moment(item.dueDate).format("DD-MM-YYYY")}</span></Col>
                <Col md={4}><span className="d-flex" style={{ fontSize: '15px' }}>Invoice Amount : {numberFormat(item.remainingAmount)}</span></Col>
                <Col md={2}>

                </Col>

              </Row>
              <Row className="mt-4">
                {selectType == 'CREDITOR' && (<>
                  {uploadFilesModelDataForUpload.documentsRequiredFromCreditor?.map((value, indix) => {
                    return (value !== "cacertificate" && value !== "additionaldocuments" && value !== "PaymentSeller" && (
                      <Col md={3} key={value}>
                        <Row>
                          <Col md={12}>

                            <div style={{ fontSize: '15px' }}>{value == "purchaseOrderDocument" && ('Purchase Order Document')}
                              {value == "paymentRecordDocument" && ('Payment Record Document')}
                              {value == "invoiceDocument" && ('Invoice Document')}
                              {value == "transportationDocument" && ('Transportation Document')}
                            </div>

                          </Col>
                          <Col md={12}>
                            <InputGroup className="text-capitalize mt-2">
                              <input
                                type="file"
                                className="form-control"
                                id={value}
                                accept=".pdf, .doc, xls, xlsx,  .png, .jpg, .jpeg"
                                aria-describedby="fileUploadHelp"
                                onChange={e =>
                                  handleFileChange(e, value, currenIndex)
                                }
                              />
                            </InputGroup>

                          </Col>

                        </Row>
                      </Col>
                    )

                    )
                  })}</>)}

              </Row>
            </Row>
          }) : ""}

          {selectType == 'CREDITOR' && (
            <>
              {uploadFilesModelDataForUpload && uploadFilesModelDataForUpload.documentsRequiredFromCreditor?.map((value, indix) => {
                return (
                  <>   {value == "additionaldocuments" ?
                    <Row>
                      <Col md={12}>
                        <Row className="selectionListss">
                          <Col md={5}>
                            <div className="mb-2"><b className="mt-2">Other Document<span style={{ color: 'red' }}>*</span></b></div>
                          </Col>
                          <Col md={12}>
                            <div className="d-inline ">
                              <div {...getRootProps()} style={{ border: "1px solid #e6e6e6" }} className="p-3  pt-5 pb-5 rounded text-center">
                                <input {...getInputProps()} />
                                <i className='bx bxs-cloud-upload' style={{ fontSize: '30px' }}></i>
                                <p >Drag 'n' drop some files here, or click to select files</p>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          {uploadedDocs.length != 0 ? uploadedDocs.map((item, index) => {
                            return <Col md={3} key={item} ><Card className=" p-2"><Row>
                              <Col className="d-flex align-items-end" md={10} >{item.name} </Col>
                              <Col md={2}>  <i className='bx bxs-trash text-danger mt-2' style={{ fontSize: '20px', cursor: "pointer" }} onClick={() => handleRemove(item, index)}></i></Col>
                            </Row></Card></Col>
                          }) : ""}
                        </Row>
                      </Col>
                    </Row> : ""}
                  </>)
              })}


              {selectType == 'CREDITOR' && (<>
                {uploadFilesModelDataForUpload && uploadFilesModelDataForUpload.documentsRequiredFromCreditor?.map((value, indix) => {
                  return (
                    <>
                      {value == "cacertificate" ? (
                        <Row className="bg-light p-3 mt-2">
                          <Row className="mt-4 mb-4">
                            <Col md={3} key={value}>
                              <Row>
                                <Col md={12}>
                                  <span style={{ fontSize: '15px' }}>
                                    {value == "cacertificate" && ('CA Certificate Document')}
                                  </span>
                                  <InputGroup className="text-capitalize mt-2">
                                    <input
                                      type="file"
                                      className="form-control"
                                      id={value}
                                      accept=".pdf, .doc, xls, xlsx,  .png, .jpg, .jpeg"
                                      aria-describedby="fileUploadHelp"
                                      onChange={e =>
                                        handleFileChange(e, value)
                                      }
                                    />
                                  </InputGroup>

                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Row>) : ""}
                    </>
                  )
                })}</>)}


            </>

          )}


          <Row className="bg-light ">
            {selectType == 'DEBTOR' && (<>
              {uploadFilesModelDataForUpload.documentsRequiredFromDebtor?.map((value, indix) => {

                return (value !== "cacertificate" && value !== "additionaldocuments" && value !== "PaymentSeller" && (
                  <Col md={3} key={value}>
                    <Row>
                      <Col md={12}>

                        <div style={{ fontSize: '15px' }}>{value == "PaymentRecord" && ('Payment Record Document')}
                          {value == "challanDocument" && ('Challan Document')}
                          {value == "invoiceDocument" && ('Invoice Document')}
                          {value == "transportationDocument" && ('Transportation Document')}
                        </div>

                      </Col>
                      <Col md={12}>
                        <InputGroup className="text-capitalize mt-2 mb-4">
                          <input
                            type="file"
                            className="form-control"
                            id={value}
                            accept=".pdf, .doc, xls, xlsx,  .png, .jpg, .jpeg"
                            aria-describedby="fileUploadHelp"
                            onChange={e =>
                              handleFileChange(e, value, currenIndex)
                            }
                          />
                        </InputGroup>

                      </Col>



                    </Row>

                  </Col>
                )

                )
              })}</>)}
          </Row>

          {selectType == 'DEBTOR' && (
            <>
              {uploadFilesModelDataForUpload && uploadFilesModelDataForUpload.documentsRequiredFromDebtor?.map((value, indix) => {
                return (
                  <>   {value == "additionaldocuments" ?
                    <Row>
                      <Col md={12}>
                        <Row className="selectionListss">
                          <Col md={5}>
                            <div className="mb-2"><b className="mt-2">Other Document / Payment Record Document<span style={{ color: 'red' }}>*</span></b></div>
                          </Col>
                          <Col md={12}>
                            <div className="d-inline ">



                              <div {...getRootProps()} style={{ border: "1px solid #e6e6e6" }} className="p-3  pt-5 pb-5 rounded text-center">
                                <input {...getInputProps()} />
                                <i className='bx bxs-cloud-upload' style={{ fontSize: '30px' }}></i>
                                <p >Drag 'n' drop some files here, or click to select files</p>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row className="mt-2">

                          {uploadedDocs.length != 0 ? uploadedDocs.map((item, index) => {
                            return <Col md={3} key={item} ><Card className=" p-2"><Row>
                              <Col className="d-flex align-items-end" md={10} >{item.name} </Col>
                              <Col md={2}>  <i className='bx bxs-trash text-danger mt-2' style={{ fontSize: '20px', cursor: "pointer" }} onClick={() => handleRemove(item, index)}></i></Col>
                            </Row></Card></Col>
                          }) : ""}
                        </Row>
                      </Col>
                    </Row> : ""}
                  </>)
              })}

              {selectType == 'DEBTOR' && (<>
                {uploadFilesModelDataForUpload && uploadFilesModelDataForUpload.documentsRequiredFromDebtor?.map((value, indix) => {
                  return (
                    <>
                      {value == "cacertificate" ? (
                        <Row className="bg-light p-3 mt-2">
                          <Row className="mt-4">
                            <Col md={3} key={value}>
                              <Row>
                                <Col md={12}>
                                  <span style={{ fontSize: '15px' }}>
                                    {value == "cacertificate" && ('CA Certificate Document')}
                                  </span>
                                  <InputGroup className="text-capitalize mt-2">
                                    <input
                                      type="file"
                                      className="form-control"
                                      id={value}
                                      accept=".pdf, .doc, xls, xlsx,  .png, .jpg, .jpeg"
                                      aria-describedby="fileUploadHelp"
                                      onChange={e =>
                                        handleFileChange(e, value)
                                      }
                                    />
                                  </InputGroup>

                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Row>
                      ) : ""}
                    </>
                  )
                })}</>)}

            </>

          )}

          {/*                           <Row className="mt-3">
                                <div >
                                    <Input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={handleCheckboxChange}
                                    />
                                    <Label style={{ marginLeft: '0.5em ' }}>
                                        You have not uploaded all documents are you sure you want to continue.
                                    </Label>
                                </div>

                            </Row> */}

          <Row className="mt-3">
            <Col md={10} className="text-center mt-2">
              {warongText && <b className="text-danger ">Please Upload All Pending Documents</b>}

            </Col>
            <Col md={2} className="text-end">
              <Button className="btn btn-success" disabled={!isSubmt} onClick={() => handleSubmit()}>Submit</Button>
            </Col>
          </Row>
        </ModalBody>
      </div>
    </Modal>
  )
}









export const numberFormat = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(value);

UploadPendingDocModel.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default UploadPendingDocModel
