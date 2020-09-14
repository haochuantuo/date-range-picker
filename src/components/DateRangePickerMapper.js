import React, { useEffect, useRef } from "react";
import "../App.css";
import { DateRangePicker } from '../components/DateRangePicker';
import CalendarHeaderContainer from "../containers/CalendarHeaderContainer";
import { useFirstDayOfWeekIndex, useLanguage, useBoardsNum, useStartDate, useEndDate } from "../context/InitialParametersContext";


export const DateRangePickerMapper = (props) => {
    const {
      showCalendar,
      boardsNum,
    } = props;

    // const handleBlur = () => {
    //   setShowCalendar(false);
    // }
    // tabIndex="1" onBlur={handleBlur}

    const calendarsIndexes = [...Array(boardsNum).keys()];
    
    return (
    <>{showCalendar && <div className="date-range-picker">
        <CalendarHeaderContainer/>
        {calendarsIndexes.map((i) => {
            return (
            <DateRangePicker
                key={i}
                i={i}
            />)
          })}
      </div>
    }</>
    );
  };