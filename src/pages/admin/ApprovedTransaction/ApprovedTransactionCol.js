import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from "moment";
import { Badge } from 'reactstrap';



const dateFormat = (date, format) => {
    const dateFormat = format ? format : "DD MMM Y";
    const date1 = moment(new Date(date)).format(dateFormat);
    return date1;
};
const toLowerCase1 = str => {
    return (
      str === "" || str === undefined ? "" : str.toLowerCase()
    );
  };

const CheckBox = (cell) => {
    return cell.value ? cell.value : '';
};

const SrNo = (cell) => {
    return cell.value ? cell.value : '';
};

const CompanyName = (cell) => {
    return cell.value ? cell.value : '';
};
const GST = (cell) => {
    return cell.value ?<div className='text-uppercase'> {cell.value }</div>: '';
};
const AADHAR = (cell) => {
    return cell.value ? cell.value : '';
};
const PANCARD = (cell) => {
    return cell.value ? <div className='text-uppercase'>{cell.value}</div> : '';
};

export {
    CheckBox,
    SrNo,
    PANCARD,
    AADHAR,
    GST,
    CompanyName,
};