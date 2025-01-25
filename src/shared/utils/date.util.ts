export const formatHumanReadableDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const formatDateTime = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const formatDateTimeWithMilliseconds = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const getDates = (type: dateType) => {
    const today = new Date().toISOString().split('T')[0];
    let dates = { fromDate: today, toDate: today };
    switch (type) {
        case 'YESTERDAY':
            // dates.fromDate = 
            break;
        case 'DAY_BEFORE_YESTERDAY':
            dates.fromDate = dayBeforeYesterDayStartDate();
            break;
    }

    return dates;
}

const dayBeforeYesterDayStartDate = () => {
    // Get the current date
    const currentDate = new Date();

    // Calculate the date for the day before yesterday
    const dayBeforeYesterday = new Date(currentDate);
    dayBeforeYesterday.setDate(currentDate.getDate() - 2); // Subtract 2 days

    // Format the date as "YYYY-MM-DD"
    const formattedDate = dayBeforeYesterday.toISOString().split('T')[0];

    return formattedDate;

};

export type dateType = 'TODAY' | 'YESTERDAY' | 'DAY_BEFORE_YESTERDAY';