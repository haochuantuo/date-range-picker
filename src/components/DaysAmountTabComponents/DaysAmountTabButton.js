import React from 'react';
import '../../styles/DaysAmountTabStyles/days-amount-tab-button.css';
import DaysAmountTabContainer from '../../containers/DaysAmountTabContainer/DaysAmountTabContainer';
import { useDaysAmountTab, useLanguage } from '../../context/InitialParametersContext';
import { getOpacityColorStyle } from '../../utils/generalUtils';

const chooseDaysAmount = require("../../images/choose-days-amount.png");

export function DaysAmountTabButton(props) {

    const { 
        selectedColor, 
        showDaysAmountTab, 
        setShowDaysAmountTab
    } = props;
    const language = useLanguage();
    const enableDaysAmountTab = useDaysAmountTab();
    const style = getOpacityColorStyle(selectedColor, 60);
    let templateClassName = "days-amount-tab-button-template";
    if (showDaysAmountTab) {
        templateClassName += " show-tab"
    }

    const handleClick = () => {
        setShowDaysAmountTab(!showDaysAmountTab);
    }

    return (
        <>
            { enableDaysAmountTab === "enabled" && 
                <div 
                    className={templateClassName} 
                    lang={language}
                >
                    <div 
                        className="days-amount-tab-button-div" 
                        style={style}
                        lang={language}
                        onClick={handleClick}
                    >
                        <img 
                            className="days-amount-icon"
                            alt="Choose Days Amount"
                            lang={language}
                            src={chooseDaysAmount}
                        />
                    </div>
                </div>
            }
            { showDaysAmountTab &&
                <DaysAmountTabContainer/>
            }
        </>
    )
}
        