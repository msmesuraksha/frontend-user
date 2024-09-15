import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";


import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,

} from "reactstrap"


const TermsandconditionsModal = props => {


  const { isOpen, toggle } = props



  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      // show={show}
      size="lg"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Terms and Conditions</ModalHeader>
        <ModalBody>
          <p>


            Welcome to MSME Suraksha! These Terms and Conditions govern your use of MSME Suraksha's Website and Services, operated by MSME Suraksha, in compliance with the laws and regulations of India.
            <br />
            By accessing this website and utilizing our services, you agree to abide by these terms and conditions. If you do not agree with any part of these terms and conditions, please refrain from using MSME Suraksha's services.
            <br />
            The following terms apply to these Terms and Conditions, Privacy Statement, and Disclaimer Notice: "User", "You", and "Your" refer to you, the individual accessing this website and compliant with the Company’s terms and conditions. "The Company", "We", "Our", and "Us" refer to MSME Suraksha. "Parties" refer to both the User and MSME Suraksha.
            <br />
            <b>Cookies</b>
            <br />

            MSME Suraksha uses cookies to enhance user experience. By accessing MSME Suraksha, you agree to our use of cookies in accordance with the MSME Suraksha Privacy Policy.
            <br />
            <b>License</b>

            <br />

            Unless otherwise stated, MSME Suraksha and/or its licensors own the intellectual property rights for all material on MSME Suraksha. All intellectual property rights are reserved. You may access this from MSME Suraksha for your own personal use, subject to restrictions set in these terms and conditions.
            <br />
            <b>You must not:</b>
            <br />


            - Republish material from MSME Suraksha
            - Sell, rent, or sub-license material from MSME Suraksha
            - Reproduce, duplicate, or copy material from MSME Suraksha
            - Redistribute content from MSME Suraksha
            <br />
            <b>User Permissions</b>
            <br />

            By using MSME Suraksha's services, you grant us permission to utilize all information provided by you as we deem necessary to fulfill our services. However, we shall not be liable for any information provided by you that infringes on the rights of others.

            <br />
            <b>Limitation of Liability</b>
            <br />

            MSME Suraksha shall not be held liable for publishing information provided by its members if such information infringes on the rights of another party. Users hereby release MSME Suraksha from any liabilities arising from claims by third parties related to the use of our services.

            <br />
            <b>Governing Law</b>
            <br />



            These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.

            <br />
            <b>Changes</b>
            <br />


            MSME Suraksha reserves the right to amend these terms and conditions at any time. By continuing to access or use our services after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the service.
            <br />
            By using MSME Suraksha's services, you acknowledge that you have read and understood these terms and conditions and agree to be bound by them. If you do not agree to abide by these terms and conditions, please refrain from using MSME Suraksha's services.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>Close</Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}

TermsandconditionsModal.propTypes =
{
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default TermsandconditionsModal
