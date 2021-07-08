import { useState } from "react";
import { getDaysForCalendar } from "./Data";

function Datepicker(): JSX.Element {
    const [visible, setVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

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
                    <Calendar
                        onDateChanged={(d: Date) => setSelectedDate(d)}
                        date={selectedDate}
                    />
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

function Calendar(props: {
    date: Date,
    onDateChanged: (date: Date) => void
}): JSX.Element {
    const MONTHS: { [key: number]: string } = {
        0: 'Январь',
        1: 'Февраль',
        2: 'Март',
        3: 'Апрель',
        4: 'Май',
        5: 'Июнь',
        6: 'Июль',
        7: 'Август',
        8: 'Сентябрь',
        9: 'Октябрь',
        10: 'Ноябрь',
        11: 'Декабрь'
    };
    const today: string = props.date.toLocaleDateString();
    const [selectedDate, setSelectedDate] = useState('');
    const [currentDay, setCurrentDay] = useState(today);
    const [selectedWindow, setSelectedWindow] = useState(props.date);
    const monthName: string = MONTHS[selectedWindow.getMonth()];
    const renderedMonth: string = monthName[0].toUpperCase() + monthName.slice(1);

    function changeSelectedDate(date: Date): void {
        setSelectedDate(date.toDateString());
        props.onDateChanged(date);
    }

    function openPreviousMonth(): void {
        const value = selectedWindow.setMonth(selectedWindow.getMonth() - 1);
        setSelectedWindow(new Date(value));
    };

    function openNextMonth(): void {
        const value = selectedWindow.setMonth(selectedWindow.getMonth() + 1);
        setSelectedWindow(new Date(value));
    };

    const listDays: Date[] = getDaysForCalendar(selectedWindow.getFullYear(), selectedWindow.getMonth());

    const renderedlistDays: JSX.Element[] = listDays.map((day, index) => {
        const classesActiveMonth = day.toLocaleDateString() == today
            ? 'datepicker__day_active-month datepicker__day_selected-day'
            : 'datepicker__day_active-month';

        const classesInActiveMonth = day.toLocaleDateString() == today
            ? 'datepicker__day_inactive-month datepicker__day_selected-day'
            : 'datepicker__day_inactive-month';

        if (day.getMonth() == selectedWindow.getMonth()) {
            if (day.toLocaleDateString() == currentDay) {
                return <li
                    className="datepicker__day_active-month datepicker__day_current-day"
                    onClick={() => changeSelectedDate(day)}
                    key={index}>
                    {day.getDate()}
                </li>
            } else {
                return <li
                    className={classesActiveMonth}
                    onClick={() => changeSelectedDate(day)}
                    key={index}>
                    {day.getDate()}
                </li>
            }
        } else {
            return <li className={classesInActiveMonth}
                onClick={() => changeSelectedDate(day)}
                key={index}>
                {day.getDate()}
            </li>
        }
    });

    ShowSelectedData(selectedDate);

    return (
        <>
            <div className="datepicker__slider">
                <button className="btn-arrow datepicker__control" onClick={openPreviousMonth}>
                    <span className="btn-arrow__arrow-left"></span>
                </button>
                <p className="datepicker__title">
                    {renderedMonth} {selectedWindow.getFullYear()}
                </p>
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
        const classes = (index == 6 || index == 5)
            ? "datepicker__day-week datepicker__day-week_holiday"
            : "datepicker__day-week";

        return <li className={classes} key={index}>{day}</li>
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