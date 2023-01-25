import dayjs from 'dayjs';
import { Varsler } from 'store/reducers/varselinnboks-duck';

export const sortByEventTidspunkt = (a: Varsler, b: Varsler) =>
    dayjs(a.tidspunkt).isAfter(dayjs(b.tidspunkt)) ? -1 : 1;
