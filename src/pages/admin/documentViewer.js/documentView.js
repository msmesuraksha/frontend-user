import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import axios from "axios";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { getData } from "store/utils/reducer/sessionStorage";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  InputGroup,
  Input,
  Label,
  Table,
  Row, Col
} from "reactstrap";

import './documentView.css'

export const DocumentViewModule = props => {
  const { isOpen, toggle, currentUrl, document, moduleName } = props;

  let currentUrlArr = ''

  let docs = []

  if (moduleName == 'preview') {
    currentUrlArr = currentUrl.fileUrl.split('.');
    docs = [
      {
        uri: currentUrl.fileUrl,
        fileType: currentUrlArr[currentUrlArr.length - 1],
        fileName: currentUrl.fieldName + `.${currentUrlArr[currentUrlArr.length - 1]}`,
      }
    ];
  } else {
    currentUrlArr = currentUrl.name.split('.');

    docs = [
      {
        uri: currentUrl.url,
        fileType: currentUrlArr[currentUrlArr.length - 1],
        fileName: currentUrl.name,
      }
    ];
  }



  let token = '';
  try {
    const authUser = getData("authUser")
    token = authUser.token || '';
  } catch (error) {
    console.error("Failed to parse authUser from sessionStorage", error);
  }

  const config = {};

  const headers = {
    ...config.headers,
    'x-access-token': token,
  };

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
      <div className="modal-content custom-page">
        <ModalHeader toggle={toggle}>Document View</ModalHeader>
        <ModalBody>
          <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} prefetchMethod="GET" requestHeaders={headers} />
        </ModalBody>
      </div>
    </Modal>
  );
};

DocumentViewModule.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  currentUrl: PropTypes.shape({
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  document: PropTypes.object,
};
