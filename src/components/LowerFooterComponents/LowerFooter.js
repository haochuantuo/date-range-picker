import React from "react";
import '../../styles/LowerFooterStyles/lower-footer.css';
import { useLanguage, useFormat, usePickMethod, useSelectAllButton, useColorsPalette } from "../../context/InitialParametersContext";
import { choosenDatesCalculation } from '../../utils/generalUtils';
import SelectAllButtonContainer from "../../containers/LowerFooterContainers/SelectAllButtonContainer";
import ColorPickerPaletteContainer from "../../containers/LowerFooterContainers/ColorPickerPaletteContainer";

export const LowerFooter = (props) => {

    const {
        id,
        selectedColor,      
        selectedDays,
        boardsNum,
        storedDates,
        setShowCalendar,
        setButtonDatesText,
    } = props;

    const language = useLanguage();
    const format = useFormat();
    const pickMethod = usePickMethod();
    const selectAllButton = useSelectAllButton();
    const colorPalette = useColorsPalette();
    const idIndexes = language === "Hebrew" ? [1, 0] : [0, 1];
    const showPaletteAllowed = id === idIndexes[0] || boardsNum === 1;
    const showPickButton = ((id === idIndexes[idIndexes.length - 1]) || boardsNum === 1);
    const pickButtonStyle = {
        "backgroundColor": selectedColor + "80",
        "borderColor": selectedColor + "20",
    };
    let lowerFooterStyle = {};
    if ((language === "Hebrew" && 
        (!(showPickButton && selectAllButton === "disabled") ||
        (colorPalette === "enabled" && boardsNum === 1))) || 
        (id === 1 && selectAllButton === "disabled")) {
        lowerFooterStyle = {"flexDirection": "row-reverse"};
    }

    const handlePickClick = () => {
        setShowCalendar(false);
        
        if (pickMethod === "ranges" && storedDates.length > 0) {
            let minDate = storedDates[0][0], maxDate = storedDates[0][0];
            for (let i = 0; i < storedDates.length; i++) {
                for (let j = 0; j < storedDates[i].length; j++) {
                    if (storedDates[i][j] < minDate) {
                        minDate = storedDates[i][j];
                    } else if (storedDates[i][j] > maxDate) {
                        maxDate = storedDates[i][j];
                    }
                }
            }
            setButtonDatesText(choosenDatesCalculation(
                [minDate, maxDate],
                null, 
                format, 
                pickMethod, 
                language));
        } else {
            setButtonDatesText(choosenDatesCalculation(selectedDays, null, format, pickMethod, language));
        }
    }

    return (
    <div 
        className="lower-footer" 
        style={lowerFooterStyle}
    >
        <ColorPickerPaletteContainer 
            id={id}
            showPaletteAllowed={showPaletteAllowed}
        />

        <SelectAllButtonContainer
            id={id}
            language={language}
        />

        {showPickButton && 
            <button 
                className="pick-button"
                style={pickButtonStyle}
                onClick={handlePickClick}
            >
                {language === "Hebrew" ? "בחר" : "Pick"}
            </button>
        }
    </div>
    );
}