
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
 
    return result
};