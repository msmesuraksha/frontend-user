import React from 'react';

const GST = (cell) => {
    return cell.value ? <div className='text-uppercase'> {cell.value}</div> : '';
};

const PANCARD = (cell) => {
    return cell.value ? <div className='text-uppercase'>{cell.value}</div> : '';
};

export {
    PANCARD,
    GST,
};