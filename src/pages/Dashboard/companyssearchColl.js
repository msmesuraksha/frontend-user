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

const DueAmount = (cell) => {
    return cell.value ? numberFormat(cell.value) : '₹0.00';
};

const Reating = (cell) => {
    return cell.value ? cell.value : '';
};
const SrNo = (cell) => {
    return cell.value ? cell.value : '';
};

const CompanyName = (cell) => {
    return cell.value && cell.cell.row.original.debtor != null ? cell.cell.row.original.debtor.CompanyName : '';
};
const GST = (cell) => {
    const divStyle = {
        textTransform: "uppercase"
    };
    return <div>{cell.value}
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
    const valueFordate = moment(cell.row.original.createdAt).format("DD-MM-YYYY")

    /*  const [startDate, setStartDate] = useState(new Date('1965-04-05')); */
    //const startDate = new Date('2019-10-07'); // October 7, 2019
    const today = new Date(); // Current date
    // const currentDate = moment(today).format('YYYY-MM-DD')
    const daysSince = daysSinceReference(valueFordate, today);

    let badgeClassName = "font-size-11 badge ";
    if (daysSince > 1 && daysSince < 800) {
        badgeClassName += "bg-danger text-white";
    } else if (daysSince > 800) {
        badgeClassName += "bg-warning text-dark";
    } else {
        badgeClassName += "bg-danger text-white";
    }
    /*     const formattedDate = new Date(cell.value).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }); */

    const newDate = valueFordate != undefined ? valueFordate.split("-").reverse().join("-") : "";
    const currentDate = new Date(newDate);
let e = ''
    const calculateDateDifference = () => {
        const differenceInMilliseconds = today - currentDate;
        const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        e= differenceInDays
        return differenceInDays;

    };
    const divStyle = {
        padding: '3px' // Adjust the padding value as needed
    };

    return (
        <div className=" text-center  p-1 rounded " style={{ background:e < 30 ? "#FDFDFD": e > 30 && e < 90?"#ffff80":  e > 90 && e < 180?" #ff944d":" #ff4d4d" , 
        color: e < 30 ? "#000": e > 30 && e < 90?"#000":  e > 90 && e < 180?" #FAFAFA":" #FAFAFA"
            }}>
            {cell.row.original.createdAt && (
                <>
                    <div style={divStyle}>({calculateDateDifference()} days)</div>
                    <div style={divStyle}>{moment(cell.row.original.createdAt).format("DD-MM-YYYY")}</div>
                </>
            )}

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
    Reating
};