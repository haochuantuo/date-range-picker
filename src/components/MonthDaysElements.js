import React, { useState, useEffect } from "react";
import DayElementContainer from "../containers/DayElementContainer";

export const MonthDaysElements = (props) => { 
    const {
        viewedYear, 
        viewedMonth, 
        language, 
        id,
    } = props;
    const numOfDaysInMonth = new Date(viewedYear, viewedMonth + 1, 0).getDate();
    const dayToBeginTheMonthFrom = new Date(viewedYear, viewedMonth, 1).getDay();
    const [monthDays, setMonthDays] = useState([]);

    useEffect(() => {
        let tempMonthDaysArray = [];
        const loopStartIndex = dayToBeginTheMonthFrom === 0 ? 7 : dayToBeginTheMonthFrom;
        for (let i = -loopStartIndex; i < 42 - loopStartIndex; i++) {
            tempMonthDaysArray.push(i + 1);
        }
        setMonthDays(tempMonthDaysArray);
    }, [viewedMonth, viewedYear, dayToBeginTheMonthFrom]);

    
    return monthDays.map((day) => {
        const date = new Date(viewedYear, viewedMonth, day);
        const columnOnGrid = (day + dayToBeginTheMonthFrom + 7) % 7;
        const dayOfWeek = date.getDay();
        const isOfCurrentViewedMonth = !(day <= 0 || day > numOfDaysInMonth);
        const genericStyle = (language === "English") ? { 
            gridColumn: columnOnGrid === 0 ? 7 : columnOnGrid,
            gridRow: (day < 0 ? 2 :
                dayOfWeek >= (day % 7 ) ? 
                    Math.floor(day / 7 + 2) : 
                    Math.floor(day / 7 + 3))
        } : (language === "Hebrew") && { 
            gridColumn: columnOnGrid === 0 ? 1 : 8 - columnOnGrid,
            gridRow: (day < 0 ? 2 :
                dayOfWeek >= (day % 7 ) ? 
                    Math.floor(day / 7 + 2) : 
                    Math.floor(day / 7 + 3) )
        };

        return (
            <DayElementContainer
                key={day + viewedMonth + viewedYear}
                id={id}
                date={new Date(viewedYear, viewedMonth, day)}
                isOfCurrentViewedMonth={isOfCurrentViewedMonth}
                dayOfWeek={dayOfWeek}
                genericStyle={genericStyle}
            />
        );
        
    });
};