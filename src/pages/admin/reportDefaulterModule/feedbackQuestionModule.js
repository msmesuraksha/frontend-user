import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import {
  Button,
  Input,
  Row, Col
} from "reactstrap"
import { useSelector, useDispatch } from "react-redux"
import Select from "react-select"


import { OneFirstCapitalizeWords, CapitalizeWords } from "pages/Dashboard"


export const FeedbackQuestionModule = ({ debtorId, feedbackdataPaylod, setfeedbackdataPaylod, feedbackdataPaylodTwo, setfeedbackdataPaylodTwo, getFeebBackQuestion }) => {

  const dispatch = useDispatch()

  const colourStyles = {
    menuList: styles => ({
      ...styles,
      background: '#FFFFFF'
    })

  }




  const handlefinancialdifficult = (selected) => {


    const userFeedbackcheck = feedbackdataPaylod.findIndex(x => x.questionId == selected.questionId)
    if (userFeedbackcheck !== -1) {

      feedbackdataPaylod[userFeedbackcheck].response = selected.response
    } else {
      setfeedbackdataPaylod(lists => [...lists, selected])

    }
  }

  const handlefinancialdifficultTwo = (selected) => {
    const userFeedbackcheck = feedbackdataPaylodTwo.findIndex(x => x.questionDesc == selected.questionDesc)
    if (userFeedbackcheck !== -1) {
      feedbackdataPaylodTwo[userFeedbackcheck].response = selected.response
    } else {
      setfeedbackdataPaylodTwo(lists => [...lists, selected])

    }

    feedbackdataPaylod.sort((a, b) => a['indexno'] - b['indexno']);
    feedbackdataPaylodTwo.sort((a, b) => a['indexno'] - b['indexno']);
  }


  return (
    <div>
      <div className="mb-3 mt-5">
        <Row>
          <Col md={9}>  <b></b>
          </Col>
          <Col md={3}>
            <b className=" ">Answers</b>
          </Col>
        </Row>
      </div>
      {getFeebBackQuestion.length > 0 ? getFeebBackQuestion.map((item, index) => {

        const opations = item.values != null && item.values.length > 0 ? item.values.map((x) => {
          return { label: CapitalizeWords(x), value: CapitalizeWords(x) }
        }) : ''

        const quesTionText = OneFirstCapitalizeWords(item.questionDesc)

        return (item.questionType === "DROP-DOWN" ? (
          <div className="mb-1" key={index}>
            <Row>
              <Col md={9} className="pt-2">
                <span className="">
                  {index + 1}. {` ${quesTionText} `} </span>
              </Col>
              <Col md={3}>
                <Select
                  id="primaryContact"
                  className="custom-content"
                  options={opations}
                  styles={colourStyles}
                  placeholder={item.values.join(" /").toUpperCase()}
                  onChange={(selected) => (handlefinancialdifficult({
                    "debtorId": debtorId,
                    "questionId": item.id,
                    "response": selected.value,
                    "indexno": index + 1
                  }), handlefinancialdifficultTwo({
                    "questionDesc": quesTionText,
                    "questionType": item.questionType,
                    "response": selected.value,
                    "indexno": index + 1

                  }))}
                />
              </Col>
            </Row>
          </div>
        ) : item.questionType === "TEXT" ? (<div className="mb-1">
          <Row>
            <Col md={9} className="pt-1">
              {index + 1}. <span className="">
                {` ${quesTionText} `}</span>
            </Col>
            <Col md={3}>
              <span>
                <Input
                  className={`form-control custom-content`}
                  placeholder="Input in years"
                  onChange={(e) => (handlefinancialdifficult({
                    "debtorId": debtorId,
                    "questionId": item.id,
                    "response": e.target.value,
                    "indexno": index + 1

                  }), handlefinancialdifficultTwo({
                    "questionDesc": quesTionText,
                    "questionType": item.questionType,
                    "response": e.target.value,
                    "indexno": index + 1

                  }))}
                />
              </span>
            </Col>
          </Row>
        </div>) : item.questionType === "TEXT-AREA" ? ""
          : ''
        )
      }) : ""}
      <div className="mb-3 "><b className="" style={{ fontSize: '15px' }}>Rating</b></div>


      {getFeebBackQuestion.length > 0 ? getFeebBackQuestion.filter((item) => item.questionType === "RATING").map((item, indx) => {
        return (<RatingModule key={indx} indx={indx} item={item} handlefinancialdifficult={handlefinancialdifficult} handlefinancialdifficultTwo={handlefinancialdifficultTwo} debtorId={debtorId} />
        )
      }) : ''}


      {getFeebBackQuestion.length > 0 ? getFeebBackQuestion.map((item, indx) => {
        const quesTionText = OneFirstCapitalizeWords(item.questionDesc)

        return (item.questionType === "TEXT-AREA" ?
          (<div>  <Row className="pt-1">
            <Row md={9}>
              <span className="">
                {indx + 1}   {` ${quesTionText} `} </span>
            </Row>
            <Row md={12}>
              <span>
                <textarea
                  rows={5}
                  className={`form-control custom-content`}
                  placeholder="Write you Review"
                  onChange={(e) => (handlefinancialdifficult({
                    "debtorId": debtorId,
                    "questionId": item.id,
                    "response": e.target.value,
                    "indexno": indx + 1

                  }), handlefinancialdifficultTwo({
                    "questionDesc": quesTionText,
                    "questionType": item.questionType,
                    "response": e.target.value,
                    "indexno": indx + 1

                  }))}
                />
              </span>
            </Row>
          </Row> </div>) : "")
      }) : ''}

    </div>
  )
}

const RatingModule = ({ item, indx, handlefinancialdifficult, handlefinancialdifficultTwo, debtorId, }) => {
  const [Integrity, setIntegrity] = useState(0)

  return (
    <>
      <div className="mb-1 mt-2">

        <Row key={indx} className="pt-1">
          <Col md={9} >
            <span className="text-capitalize">
              {indx + 1}.   {`${item.questionDesc} `}</span>
          </Col>
          <Col md={3} className="d-flex justify-content-center">
            <span>
              <i className='bx bxs-star'
                //   onClick={()=>{
                //     setIntegrity(1)
                //  }} 
                onClick={(selected) => {
                  (handlefinancialdifficult({
                    "debtorId": debtorId,
                    "questionId": item.id,
                    "response": 1,

                  }), handlefinancialdifficultTwo({
                    "questionDesc": item.questionDesc,
                    "questionType": item.questionType,
                    "response": 1,
                    "indexno": indx + 1

                  }))
                  setIntegrity(1)
                }
                }
                style={{ color: Integrity != 0 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
              ></i></span>
            <span>
              <i className='bx bxs-star'
                onClick={(selected) => {
                  (handlefinancialdifficult({
                    "debtorId": debtorId,
                    "questionId": item.id,
                    "response": 2,

                  }), handlefinancialdifficultTwo({
                    "questionDesc": item.questionDesc,
                    "questionType": item.questionType,
                    "response": 2,
                    "indexno": indx + 1

                  }))
                  setIntegrity(2)
                }
                }
                style={{ color: Integrity != 0 && Integrity > 1 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
              ></i></span>
            <span>
              <i className='bx bxs-star'
                onClick={(selected) => {
                  (handlefinancialdifficult({
                    "debtorId": debtorId,
                    "questionId": item.id,
                    "response": 3,

                  }), handlefinancialdifficultTwo({
                    "questionDesc": item.questionDesc,
                    "questionType": item.questionType,
                    "response": 3,
                    "indexno": indx + 1

                  }))
                  setIntegrity(3)
                }
                }
                style={{ color: Integrity != 0 && Integrity > 2 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
              ></i></span>
            <span>
              <i className='bx bxs-star'
                onClick={(selected) => {
                  (handlefinancialdifficult({
                    "debtorId": debtorId,
                    "questionId": item.id,
                    "response": 4,

                  }), handlefinancialdifficultTwo({
                    "questionDesc": item.questionDesc,
                    "questionType": item.questionType,
                    "response": 4,
                    "indexno": indx + 1

                  }))
                  setIntegrity(4)
                }
                }
                style={{ color: Integrity != 0 && Integrity > 3 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
              ></i></span>
            <span>
              <i className='bx bxs-star'
                onClick={(selected) => {
                  (handlefinancialdifficult({
                    "debtorId": debtorId,
                    "questionId": item.id,
                    "response": 5,

                  }), handlefinancialdifficultTwo({
                    "questionDesc": item.questionDesc,
                    "questionType": item.questionType,
                    "response": 5,

                  }))
                  setIntegrity(5)
                }
                }
                style={{ color: Integrity != 0 && Integrity > 4 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
              ></i></span>
          </Col>
        </Row>
      </div>
    </>
  )
}

