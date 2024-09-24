import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from "moment";
import { Badge } from 'reactstrap';
import { numberFormat } from '../uploadPendingDoucument/uploadPendingDoc';

import { CapitalizeWords } from "pages/Dashboard";


const CheckBox = (cell) => {
    return cell.value ? cell.value : '';
};

const DueAmount = (cell) => {


    return cell.value ? <div className='text-end'>{numberFormat(cell.value)}</div> : <div className='text-end'>₹0.00</div>;
};

const Reating = (cell) => {
    return cell.value ? <div className='text-end'>{cell.value}</div> : '';
};
const SrNo = (cell) => {
    return cell.value ? cell.value : '';
};

const CompanyName = (cell) => {
    return cell.value ? CapitalizeWords(cell.value) : '';
};
const Adddresss = (cell) => {
    // const address = cell.value.substring(0, 80) + '...';'
    const address = cell.value.length > 30 ? cell.value.substring(0, 30) + '...' : cell.value;

    return cell.value ? <div style={{ width: '160px' }}>{address} </div> : '';
};
const GST = (cell) => {
    const divStyle = {
        textTransform: "uppercase"
    };
    return <div style={divStyle}>{cell.value}
    </div>
};
const AADHAR = (cell) => {
    return cell.value ? cell.value : '';
};
const PANCARD = (cell) => {

    // return cell.value ? cell.value : '';
    const divStyle = {
        textTransform: "uppercase"
    };
    return <div style={divStyle}>{cell.value}</div>

};
const daysSinceReference = (cellValue, referenceDate) => {
    if (cellValue) {
        const currentDate = new Date(cellValue);
        const timeDifference = referenceDate - currentDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference;
    }
    return '';
};

const DueSince = (cell) => {
    const today = new Date(); // Current date

    const daysSince = daysSinceReference(cell.value, today);

    let badgeClassName = "font-size-11 badge ";
    if (daysSince > 1 && daysSince < 800) {
        badgeClassName += "bg-danger text-white";
    } else if (daysSince > 800) {
        badgeClassName += "bg-warning text-dark";
    } else {
        badgeClassName += "bg-danger text-white";
    }
    const newDate = cell.value != undefined ? cell.value.split("-").reverse().join("-") : "";
    const currentDate = new Date(newDate);
    let e = ""
    const calculateDateDifference = () => {
        const differenceInMilliseconds = today - currentDate;
        const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        e = differenceInDays

        return differenceInDays;

    };

    return (
        <div className="" style={{ padding: "2px 2px", fontSize: "12px", width: "90px", margin: "0px" }}>
            {cell.value != null ? <div className=" text-center  p-1 rounded " style={{
                background: calculateDateDifference() < 30 ? "#FDFDFD" : calculateDateDifference() >= 30 && calculateDateDifference() < 90 ? "#ffff80" : calculateDateDifference() > 90 && calculateDateDifference() < 180 ? " #ff944d" : " #ff4d4d",
                color: calculateDateDifference() < 30 ? "#000" : calculateDateDifference() >= 30 && calculateDateDifference() < 90 ? "#000" : calculateDateDifference() > 90 && calculateDateDifference() < 180 ? " #FAFAFA" : " #FAFAFA"
            }}>
                <div className="text-capitalize">
                    {calculateDateDifference()}  &nbsp;
                    <span className="ml-1">Days</span> </div>
                <div className="text-capitalize" >{cell.cell.row.original.dueFrom}</div>
            </div> : ""}
        </div>
    );
};

export {
    CheckBox,
    SrNo,
    PANCARD,
    AADHAR,
    GST,
    CompanyName,
    DueSince,
    DueAmount,
    Reating,
    Adddresss
};