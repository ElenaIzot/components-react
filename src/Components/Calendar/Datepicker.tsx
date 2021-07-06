import { useState } from "react";
import { getDaysForCalendar } from "./Data";

function Datepicker(): JSX.Element {
    const d: Date = new Date();
    let today = d.toLocaleDateString();

    let [visible, setVisible] = useState(false);
    let [selectedDate, setSelectedDate] = useState(today);

    function showItems(): void {
        setVisible(true);
    };

    function closeItems(): void {
        setVisible(false);
    };

    if (visible == true) {
        return (
            <div className="wrap">
                <p className="title">Datepicker</p>
                <div className="datepicker" onClick={closeItems}>
                    <div className="datepicker__current-item">
                        {today}
                    </div>
                </div>
                <div className="datepicker__datepicker-visible">
                    <Calendar data={d} />
                </div>
            </div>)
    } else {
        return (
            <div className="wrap">
                <p className="title">Datepicker</p>
                <div className="datepicker" onClick={showItems}>
                    <div className="datepicker__current-item">{selectedDate}
                    </div>
                </div>
            </div>
        )
    }
}

function Calendar(props: any): JSX.Element {
    
    const MONTHS: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let today: string = props.data.toLocaleDateString();
    let [currentYear, setYear] = useState(props.data.getFullYear());//сделать замену года при переходе на другой год
    let [selectedDate, setSelectedDate] = useState(today);
    let [currentMonth, setMonth] = useState(props.data.getMonth());

    let monthName: string = '';
    for (let i = 0; i < MONTHS.length; i++) {
        if (i == currentMonth) {
            monthName = MONTHS[i];
        }
    }

    const renderedMonth: string = monthName[0].toUpperCase() + monthName.slice(1);

    function openPreviousMonth(): void {
        setMonth(currentMonth - 1)
    };

    function openNextMonth(): void {
        setMonth(currentMonth + 1)
    };

    const listDays: Date[] = getDaysForCalendar(currentYear, currentMonth);

    const renderedlistDays: JSX.Element[] = listDays.map((day, index) => {
        if (day.getMonth() == currentMonth) {
            if (day.getDate() == currentMonth) {
                return <li className="datepicker__day_active-month datepicker__day_current-day" onClick={() => setSelectedDate(day.toLocaleDateString())} key={index}>{day.getDate()}</li>
            } else {
                return <li className="datepicker__day_active-month" onClick={() => setSelectedDate(day.toLocaleDateString())} key={index} >{day.getDate()}</li>
            }
        } else {
            return <li className="datepicker__day_inactive-month" onClick={() => setSelectedDate(day.toLocaleDateString())} key={index}>{day.getDate()}</li>
        }
    });

    // const renderedSelectedwData = <div className="datepicker__current-item">{selectedDate}</div>;

    ShowSelectedData(selectedDate);

    return (
        <>
            {selectedDate}
            <div className="datepicker__slider">
                <button className="btn-arrow datepicker__control" onClick={openPreviousMonth}><span className="btn-arrow__arrow-left"></span></button>
                <p className="datepicker__title">{renderedMonth} {currentYear}</p>
                <button className="btn-arrow datepicker__control" onClick={openNextMonth}><span className="btn-arrow__arrow-right"></span></button>
            </div>
            <DaysWeek />
            <div className="datepicker__calendar">
                <ul className="datepicker__days">
                    {renderedlistDays}
                </ul>
            </div>

        </>
    )
}

function DaysWeek(): JSX.Element {
    const DAYS_IN_WEEK: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const renderedlistDaysWeek = DAYS_IN_WEEK.map((day: string, index: number) => {
        return <li className="datepicker__day-week" key={index}>
            {day}
        </li>
    });

    return <ul className="datepicker__list">{renderedlistDaysWeek}</ul>
}

function ShowSelectedData(date: string): JSX.Element {
    console.log(date)
    console.log(typeof(date))
    
    const renderedSelectedData:JSX.Element = <div className="datepicker__current-item">{{date}}</div>;

    return renderedSelectedData;
}

export default Datepicker;