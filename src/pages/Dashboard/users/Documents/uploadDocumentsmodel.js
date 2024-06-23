import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import axios from "axios";

import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Container,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Modal,
  InputGroup,

  Button,
} from "reactstrap";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import TableContainer from "./TableContainer";
import UploadDocumentModel from './uploadDocumentsmodel'
import { getGeneralDoucments } from "../../../../store/Documents/documents.actions"
import { useDispatch, useSelector } from "react-redux";



const uploadDocumentsModel = props => {
  const { isOpen, toggle, additionalValue } = props
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [error, setError] = useState('');
  const [uploadDocumentID, setuploadDocumentID] = useState('');
  const [uploadedFile, setuploadedFile] = useState([]);
  const toggleViewModal = () => setModal1(!modal1);
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const files = event.target.files
    const formData = new FormData();

    formData.append('file', files[0]);   //append the values with key, value pair
    formData.append('fieldName', "");
    formData.append('type', "GENERAL");


    // uploadFile(formData)
    if (files.length > 0) {
      setUploadSuccess(true)
    } else {
      setUploadSuccess(false)
    }

    setuploadDocumentID(formData)
  }







  function uploadFile(formData) {
    const token = sessionStorage.getItem("tokenemployeeRegister")
    const headers = {
      'x-access-token': token != null ? token : '',
    };


    axios.post('https://bafana-backend.azurewebsites.net/api/files/upload', formData, {
      headers: headers
    })
      .then((response) => {
        setuploadedFile(response.data.response)
        // toggle()

      })
      .catch((error) => {

      })
  }

  const handleSubmit = () => {
    uploadFile(uploadDocumentID)

    setTimeout(() => {
      dispatch(getGeneralDoucments())
      toggle()
    }, 1000);

    // dispatch(uploadCACertificateID(payload))


  }


  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Upload Document</ModalHeader>
        <ModalBody>
          {/* <h6 className="card-title"></h6> */}




          {/* 
<div {...getRootProps()}  className='text-center'>
      <input {...getInputProps()} 
      type='file'
    //  accept="image/png, image/gif, image/jpeg"
    accept=
"application/msword, application/vnd.ms-excel,text/plain, application/pdf, image/*"
      min={"200002"}
      max={2303020}
      />
   <i className="display-4 text-muted bx bxs-cloud-upload" />

      {
        isDragActive ?
        
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files
<br/>
<span>
    {selectedFiles.length != 0 ? selectedFiles[0].name:''}

</span>
<br/>
<span className='text-danger'>
    {error}
</span>

          </p>
      }
    </div> */}


          <Row className="mt-4 mb-4">
            <Col md={3}></Col>
            <Col md={6}>


              <InputGroup className="text-capitalize">
                <input
                  type="file"
                  className="form-control"
                  id="uploadPurchaseOrder"
                  accept=".pdf, .doc, xls, xlsx,  .png, .jpg, .jpeg"
                  aria-describedby="fileUploadHelp"
                  onChange={e =>
                    handleFileChange(e)
                  }
                />
              </InputGroup>

              <div id="fileUploadHelp" className="form-text">
                Choose a file to upload (PDF, PNG, JPG, JPEG, DOC, XLS, XLSX).
              </div>


            </Col>
            <Col md={3}></Col>
          </Row>



        </ModalBody>
        <ModalFooter>
          <div className="text-center">
            <Button
              type="button"
              color="primary"
              onClick={() => handleSubmit()


              }
              disabled={uploadSuccess == false}
            >
              submit
            </Button>
          </div>
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}

uploadDocumentsModel.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default uploadDocumentsModel
