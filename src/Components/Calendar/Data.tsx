
export function getDaysForCalendar(year: number, month: number): Date[] {
    const firstDayOfMonth: Date = new Date(year, month, 1);
    const dayOfWeekForFirstDay: number = firstDayOfMonth.getDay();

    const GRID_SIZE = 7 * 6;

    const result: Date[] = [];

    if (dayOfWeekForFirstDay == 0) {
        for (let offsetDays = 0; offsetDays < GRID_SIZE - 6; ++offsetDays) {
            const day = new Date(firstDayOfMonth);
            day.setDate(day.getDate() + offsetDays);
            result.push(day);
            console.log(result)
        }
    } else {
        for (let offsetDays = 0; offsetDays <= GRID_SIZE - dayOfWeekForFirstDay; ++offsetDays) {
            const day = new Date(firstDayOfMonth);
            day.setDate(day.getDate() + offsetDays);
            result.push(day);
        }
    }

    if (dayOfWeekForFirstDay == 0) {
        for (let offsetDays = 1; offsetDays <= 6; ++offsetDays) {
            const day = new Date(firstDayOfMonth);
            console.log(day)
            day.setDate(day.getDate() - offsetDays);
            result.unshift(day);
        }
    } else {
        for (let offsetDays = 1; offsetDays < dayOfWeekForFirstDay; ++offsetDays) {
            const day = new Date(firstDayOfMonth);
            day.setDate(day.getDate() - offsetDays);
            result.unshift(day);
        }
    }

    return result
};