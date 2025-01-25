import { format } from 'date-fns';

export const formatDate = (date: string, formatString = 'dd-MMM-yyyy h:mm a') => {
    return format(new Date(date), formatString);
}