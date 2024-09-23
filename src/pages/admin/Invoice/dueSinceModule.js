import React from "react";



export const DueSinceApprove = (cell) => {
    const valueFordate = cell.row.original?.dueFrom
    const today = new Date(); // Current date
    const newDate = valueFordate != undefined ? valueFordate.split("-").reverse().join("-") : "";
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
            <div className=" text-center  p-1 rounded " style={{
                background: calculateDateDifference() < 30 ? "#FDFDFD" : calculateDateDifference() >= 30 && calculateDateDifference() < 90 ? "#ffff80" : calculateDateDifference() > 90 && calculateDateDifference() < 180 ? " #ff944d" : " #ff4d4d",
                color: calculateDateDifference() < 30 ? "#000" : calculateDateDifference() >= 30 && calculateDateDifference() < 90 ? "#000" : calculateDateDifference() > 90 && calculateDateDifference() < 180 ? " #FAFAFA" : " #FAFAFA"
            }}>
                <div className="text-capitalize">
                    {calculateDateDifference()}  &nbsp;
                    <span className="ml-1">Days</span> </div>
                <div className="text-capitalize" >{cell.cell.row.original.dueFrom}</div>
            </div>
        </div>
    );
};