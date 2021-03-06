import React from "react";
import '../..//styles/calendar-component.css';

import MonthDayElementsContainer from "../../containers/DayElementsContainers/DaysGridContainer";
import YearSelectorContainer from "../../containers/CalendarModesContainers/YearSelectorContainer";
import MonthSelectorContainer from "../../containers/CalendarModesContainers/MonthSelectorContainer";
import { WeekDaysNames } from "./WeekDaysNames";
import { useLanguage } from "../../context/InitialParametersContext";


export const CalendarContent = (props) => {
    const {
      mode, 
      id,
    } = props;

    const language = useLanguage();
    
    return (
    <div className="month-grid">
        <WeekDaysNames/>
        <MonthDayElementsContainer 
          id={id}
        />
        {mode === "Months" ? (
          <MonthSelectorContainer
            id={id}
            language={language}
          />
        ) : mode === "Years" && 
          <YearSelectorContainer
            id={id}
            language={language}
          />
        }
    </div>)
}