import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const CustomDatePickerInput = ({ value, onClick }) => (
  <div className="custom-date-picker-input" onClick={onClick}>
    <input type="text" value={value} readOnly />
    <FaCalendarAlt className="calendar-icon" />
  </div>
);

export default CustomDatePickerInput;
