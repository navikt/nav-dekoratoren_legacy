import dayjs from 'dayjs';

export const sortByEventTidspunkt = (a: any, b: any) => (dayjs(a.tidspunkt).isAfter(dayjs(b.tidspunkt)) ? -1 : 1);
