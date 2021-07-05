
export function getDaysWeek(): JSX.Element[] {
    const DAYS_IN_WEEK: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    const renderedlistDaysWeek: JSX.Element[] = DAYS_IN_WEEK.map((day: string, index: number) =>
        <li className="datepicker__day-week" key={index}>
            {day}
        </li>);

    return renderedlistDaysWeek;
};

export function getDaysForCalendar(year: number, month: number): Date[] {
    const firstDayOfMonth: Date = new Date(year, month, 1);
    const dayOfWeekForFirstDay: number = firstDayOfMonth.getDay();

    const GRID_SIZE = 7 * 6;

    const result: Date[] = [];
    for (let offsetDays = 0; offsetDays <= GRID_SIZE - dayOfWeekForFirstDay; ++offsetDays) {
        const day = new Date(firstDayOfMonth);
        day.setDate(day.getDate() + offsetDays);
        result.push(day);
    }

        for (let offsetDays = 1; offsetDays < dayOfWeekForFirstDay; ++offsetDays) {
        const day = new Date(firstDayOfMonth);
        day.setDate(day.getDate() - offsetDays);
        result.unshift(day);
    }
    
    console.log(result)
    return result
}



// export function getDaysArray(year: number, month: number): JSX.Element[] {
//     const date = new Date(year, month - 1, 1);
//     const result = [];

//     while (date.getMonth() == month - 1) {
//         result.push(date.getDate());
//         date.setDate(date.getDate() + 1);
//     }

//     let renderedlistDays = result.map((day, index) =>
//         <li className="datepicker__day" key={index}>{day}</li>
//     )
//     return renderedlistDays;
// };

