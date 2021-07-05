import { useState } from "react";
import { getDaysWeek, getDaysForCalendar } from "./Data";

const DAYS_IN_MONTH: {} = { 'Январь': 31, 'Февраль': 28, 'Март': 31, 'Апрель': 30, 'Май': 31, 'Июнь': 30, 'Июль': 31, 'Август': 31, 'Сентябрь': 30, 'Октябрь': 31, 'Ноябрь': 30, 'Декабрь': 31, }
const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',];

function Datepicker(): JSX.Element {
    const d: Date = new Date();
    let today = d.toLocaleDateString();

    let [visible, setVisible] = useState(false);
    let [currentYear, setYear] = useState(d.getFullYear());
    let [currentMonth, setMonth] = useState(d.getMonth());
    let [currentDate, setDay] = useState(d.getDate());      
    let [value, setValue] = useState(today);
    let [selectedDate, setSelectedDate] = useState(currentDate);
   
    const className = "datepicker__day_active-month" + (value ? "datepicker__day_selected-day" : "");

    function showItems(): void {
        setVisible(true);
    };

    function closeItems(): void {
        setVisible(false);
    };

    function openPreviousMonth(): void {
        setMonth(currentMonth - 1)
    };

    function openNextMonth(): void {
        setMonth(currentMonth + 1)
    };

    let month: string = '';
    for (let i = 0; i < MONTHS.length; i++) {
        if (i == currentMonth) {
            month = MONTHS[i];
        }
    }
    const renderedMonth: string = month[0].toUpperCase() + month.slice(1);
    const renderedlistDaysWeek: JSX.Element[] = getDaysWeek();

    const listDays: Date[] = getDaysForCalendar(currentYear, currentMonth);
    const renderedlistDays = listDays.map((day, index) => {
        if (day.getMonth() == currentMonth) {
            if (day.getDate() == currentDate) {
                return <li className="datepicker__day_active-month datepicker__day_current-day" onClick={() => setValue(day.toLocaleDateString())} key={index}>{day.getDate()}</li>
            } else {
                return <li className="datepicker__day_active-month" onClick={() => setValue (day.toLocaleDateString())} key={index} >{day.getDate()}</li>
            }
        } else {
            return <li className="datepicker__day_inactive-month" onClick={() => setValue (day.toLocaleDateString())} key={index}>{day.getDate()}</li>
        }
    }

    )

    if (visible == true) {
        return (
            <div className="wrap">
                <p className="title">Datepicker</p>
                <div className="datepicker">
                    <div className="datepicker__current-item">{value}</div>
                    <button className="btn-arrow datepicker__control" onClick={closeItems}><span className="btn-arrow__arrow-up"></span></button>
                </div>
                <div className="datepicker__datepicker-visible">
                    <div className="datepicker__slider">
                        <button className="btn-arrow datepicker__control" onClick={openPreviousMonth}><span className="btn-arrow__arrow-left"></span></button>
                        <p className="datepicker__title"> {renderedMonth} {currentYear}</p>
                        <button className="btn-arrow datepicker__control" onClick={openNextMonth}><span className="btn-arrow__arrow-right"></span></button>
                    </div>
                    <div className="datepicker__calendar">
                        <ul className="datepicker__list">
                            {renderedlistDaysWeek}
                        </ul>
                        <ul className="datepicker__days">
                            {renderedlistDays}
                        </ul>
                    </div>
                    {/* <Button></Button> */}
                </div>
            </div>)
    } else {
        return (
            <div className="wrap">
                <p className="title">Datepicker</p>
                <div className="datepicker">
                    <div className="datepicker__current-item">{value}</div>
                    <button className="btn-arrow datepicker__control" onClick={showItems}><span className="btn-arrow__arrow-down"></span></button>
                </div>
            </div>
        )
    }
}

function Button() {
    let [value, setValue] = useState(false);
    let [choice, setСhoice] = useState('Data');

    function cancelAction(): void {
        setValue(true);
    };

    function chooseDate(): void {
        setСhoice('Другая дата');
    };

    return (
        <div className="datepicker__btn-action">
            <button className="btn datepicker__btn-action" onClick={cancelAction}>Cancel</button>
            <button className="btn datepicker__btn-action" onClick={chooseDate}>Choose Date</button>
        </div>
    )
}

// function Transition(){
//     let [visible, setVisible] = useState(false);

//     function showItems(): void {
//         setVisible(true);
//     };

//     function closeItems(): void {
//         setVisible(false);
//     };
//         if (visible == true) {
//             return <button className="btn-arrow datepicker__control" onClick={closeItems}><span className="btn-arrow__arrow-up"></span></button>
//         } else {
//             return <button className="btn-arrow datepicker__control" onClick={showItems}><span className="btn-arrow__arrow-down"></span></button>
//         }
// }

// const DATES =  years: [2017, 2018, 2019, 2020, 2021],};


export default Datepicker;

// const renderedlistDaysWeek: JSX.Element[] = DAYES_IN_WEEK.map((day: string, index: number) =>
    //     <li className="datepicker__day-week" key={index} onClick={(e) => { setValue(value = day) }}>
    //         {day}
    //     </li>);

        // const month = d.toLocaleString('ru', { month: 'long' })
    // const renderedMonth = month[0].toUpperCase() + month.slice(1);

     // let month: number = 12;
    // let mon: number = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12