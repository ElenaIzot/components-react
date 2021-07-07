import { useState } from "react";
import { getDaysForCalendar } from "./Data";

function Datepicker(): JSX.Element {
    let [visible, setVisible] = useState(false);
    let [selectedDate, setSelectedDate] = useState(new Date());

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
                        {selectedDate.toLocaleDateString()}
                    </div>
                </div>
                <div className="datepicker__datepicker-visible">
                    <Calendar onDateChanged={(d: Date) => setSelectedDate(d)} date={selectedDate} />
                </div>
            </div>)
    } else {
        return (
            <div className="wrap">
                <p className="title">Datepicker</p>
                <div className="datepicker" onClick={showItems}>
                    <div className="datepicker__current-item">
                        {selectedDate.toLocaleDateString()}
                    </div>
                </div>
            </div>
        )
    }
}

function Calendar(props: { date: Date, onDateChanged: (date: Date) => void}): JSX.Element {

    const MONTHS: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let today: string = props.date.toLocaleDateString();
    let [currentYear, setYear] = useState(props.date.getFullYear());
    let [selectedDate, setSelectedDate] = useState(today);
    let [currentMonth, setCurrentMonth] = useState(props.date.getMonth());
    let [currentDay, setCurrentDay] = useState(today);

    let monthName: string = '';
    for (let i = 0; i < MONTHS.length; i++) {
        if (i == currentMonth) {
            monthName = MONTHS[i];
        }
    }

    function changeSelectedDate(date: Date): void {
        setSelectedDate(date.toDateString());
        props.onDateChanged(date);
    }

    const renderedMonth: string = monthName[0].toUpperCase() + monthName.slice(1);

    function openPreviousMonth(): void {
        setCurrentMonth(currentMonth - 1)
    };

    function openNextMonth(): void {
        setCurrentMonth(currentMonth + 1)
    };

    const listDays: Date[] = getDaysForCalendar(currentYear, currentMonth);

    const renderedlistDays: JSX.Element[] = listDays.map((day, index) => {
        if (day.getMonth() == currentMonth) {
            if (day.toLocaleDateString() == currentDay) {
                return <li
                    className="datepicker__day_active-month datepicker__day_current-day"
                    onClick={() => changeSelectedDate(day)}
                    key={index}>
                    {day.getDate()}
                </li>
            } else if (day.toLocaleDateString() == today) {
                return <li
                    className="datepicker__day_active-month datepicker__day_selected-day"
                    onClick={() => changeSelectedDate(day)}
                    key={index}>
                    {day.getDate()}
                </li>
            } else {
                return <li className="datepicker__day_active-month"
                    onClick={() => changeSelectedDate(day)}
                    key={index}>
                    {day.getDate()}
                </li>
            }
        } else {
            if (day.toLocaleDateString() == today) {
                return <li className="datepicker__day_inactive-month datepicker__day_selected-day"
                    onClick={() => changeSelectedDate(day)}
                    key={index}>
                    {day.getDate()}
                </li>
            } else {
                return <li className="datepicker__day_inactive-month"
                    onClick={() => changeSelectedDate(day)}
                    key={index}>
                    {day.getDate()}
                </li>
            }
        }
    });

    ShowSelectedData(selectedDate);

    return (
        <>
            <div className="datepicker__slider">
                <button className="btn-arrow datepicker__control" onClick={openPreviousMonth}>
                    <span className="btn-arrow__arrow-left"></span>
                </button>
                <p className="datepicker__title">{renderedMonth} {currentYear}</p>
                <button className="btn-arrow datepicker__control" onClick={openNextMonth}>
                    <span className="btn-arrow__arrow-right"></span>
                </button>
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

    return <ul className="datepicker__list">
        {renderedlistDaysWeek}
    </ul>
}

function ShowSelectedData(date: string): JSX.Element {
    const renderedSelectedData: JSX.Element = <div className="datepicker__current-item">
        {{ date }}
    </div>;

    return renderedSelectedData;
}

export default Datepicker;