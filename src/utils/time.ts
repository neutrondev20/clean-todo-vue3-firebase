import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

export function stringToDayjs(date: string): Dayjs {
  return dayjs(date);
}

export function dateToDayjs(date: Date): Dayjs {
  return dayjs(date);
}
