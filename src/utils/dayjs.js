
import dayjs from 'dayjs'

/**
 * Is the format of the calibration date YYYY-MM-DD format
 * @param date
 * @returns {boolean}
 */
export function isValidDate(date) {
  return dayjs(date, "YYYY-MM-DD", true).isValid()
}

/**
 * Is the format of the calibration date YYYY-MM-DD HH: mm: ss
 * @param date
 * @returns {boolean}
 */
export function isValidDateTime(date) {
  return dayjs(date, "YYYY-MM-DD HH:mm:ss", true).isValid()
}

/**
 * Retrieve the current date as YYYY-MM-DD in the format of YYYY-MM-DD
 * @returns {string}
 */
export function getCurrentDate() {
  return dayjs(new Date()).format("YYYY-MM-DD")
}

/**
 * Get the current date in YYYY-MM-DD HH: mm: ss format (24-hour format, if hh is lowercase, it means 12 hour format)
 * @returns {string}
 */
export function getCurrentDateTime() {
  return dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
}

/**
 * Convert the transmitted date to YYYY-MM-DD format
 * @param date:为传过来的日期
 * @returns {string}
 */
export function getConvertDate(date) {
  return dayjs(date).format("YYYY-MM-DD")
}

/**
 * Convert the transmitted date to the format YYYY-MM-DD HH: mm: ss
 * @param date:为传过来的日期
 * @returns {string}
 */
export function getConvertDateTime(date) {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss")
}

/**
 * Add X date to the received date in the format of YYYY-MM-DD, such as getXAfterDate ('2023-11-11 ', 1,'day'), and the result is 2023-11-12
 * @param date:
 * @param num:
 * @param dateType:
 * @returns {string}
 */
export function getXAfterDate(date, num, dateType) {
  return dayjs(date).add(num, dateType).format("YYYY-MM-DD")
}

/**
 * Add X date to the received date in the format of YYYY-MM-DD HH: mm: ss, such as getXAfterDateTime ('2023-11-11 10:23:45 ', 1,'day'), and the result is 2023-11-12 10:23:45
 * @param date:
 * @param num:
 * @param dateType:
 * @returns {string}
 */
export function getXAfterDateTime(date, num, dateType) {
  return dayjs(date).add(num, dateType).format("YYYY-MM-DD HH:mm:ss")
}

/**
 * Subtract the X date from the received date in the format of YYYY-MM-DD, such as getXBeforeDate ('2023-11-11 ', 1,'day'), and the result is 2023-11-10
 * @param date:
 * @param num:
 * @param dateType:
 * @returns {string}
 */
export function getXBeforeDate(date, num, dateType) {
  return dayjs(date).subtract(num, dateType).format("YYYY-MM-DD")
}

/**
 * Subtract the X date from the received date in the format of YYYY-MM-DD HH: mm: ss, such as getXBeforeTataTime ('2023-11-11 10:23:45 ', 1,'day'), and the result is 2023-11-10 10:23:45
 * @param date:
 * @param num:
 * @param dateType:
 * @returns {string}
 */
export function getXBeforeDateTime(date, num, dateType) {
  return dayjs(date).subtract(num, dateType).format("YYYY-MM-DD HH:mm:ss")
}

/**
 * Calculate the difference between two dates
 * @param startDate:
 * @param endDate:
 * @param dateType:
 * @returns {number}
 */
export function getDateDiff(startDate, endDate, dateType) {
  return dayjs(endDate).diff(dayjs(startDate), dateType)
}

/**
 * Determine whether date 1 is before date 2, for example: date 1:2023-01-01 13:30:23, date2:2022-12-01 13:30:23, The result is false
 * @param date1
 * @param date2
 * @returns {boolean}
 */
export function isBefore(date1, date2) {
  return dayjs(date1).isBefore(dayjs(date2))
}

/**
 * Determine whether date 1 is after date 2, for example: date 1:2023-01-01 13:30:23, date2:2022-12-01 13:30:23, The result is true
 * @param date1
 * @param date2
 * @returns {boolean}
 */
export function isAfter(date1, date2) {
  return dayjs(date1).isAfter(dayjs(date2))
}

/**
 * Determine whether date 1 is the same as date 2, for example: date 1:2023-01-01 13:30:23, date2:2022-12-01 13:30:23, The result is false
 * @param date1
 * @param date2
 * @returns {boolean}
 */
export function isSame(date1, date2) {
  return dayjs(date1).isSame(dayjs(date2))
}

/**
 * Determine whether date 1 is equal to or before date 2, for example: date 1:2023-01-01 13:30:23, date2:2022-12-01 13:30:23, The result is false
 * @param date1
 * @param date2
 * @returns {boolean}
 */
export function isSameOrBefore(date1, date2) {
  return dayjs(date1).isSameOrBefore(dayjs(date2))
}

/**
 * Determine whether date 1 is equal to or after date 2, for example: date 1:2023-01-01 13:30:23, date2:2022-12-01 13:30:23, The result is true
 * @param date1
 * @param date2
 * @returns {boolean}
 */
export function isSameOrAfter(date1, date2) {
  return dayjs(date1).isSameOrAfter(dayjs(date2))
}

/**
 * Determine whether the between date falls between the startDate start date and endDate end date
 * @param startDate:
 * @param betweenDate:
 * @param endDate:
 * @returns {boolean}
 */
export function isBetween(startDate, betweenDate, endDate) {
  return dayjs(startDate).isBetween(betweenDate, dayjs(endDate))
}

/**
 * Convert the transmitted date to January 1st of the current year, January 1st of the current month, or Monday of the current week
 * @param date:
 * @param dateType,
 * @returns {string}
 */
export function getEarlyDaysDate(date, dateType) {
  return dayjs(date).startOf(dateType).format("YYYY-MM-DD")
}

/**
 * Convert the transmitted date to December 31st of the current year, the last day of the month, or the Sunday of the current week
 * @param date:
 * @param dateType,year,month,week
 * @returns {string}
 */
export function getLastDaysDate(date, dateType) {
  return dayjs(date).endOf(dateType).format("YYYY-MM-DD")
}

/**
 * Get all dates between 2 dates, including start and end dates, such as: getIntermediateDate ('2023-12-01 ','2023-12-15', 1,'day ')
 * @param startDate:
 * @param endDate:
 * @param num:
 * @param dateType,'minute','hour','day','week','month','year'
 * @returns {*[]}
 */
export function getIntermediateDate(startDate, endDate, num, dateType) {
  const daysArray = [startDate]
  while (isBefore(startDate, endDate)) {
    startDate = getXAfterDate(startDate, num, dateType)
    daysArray.push(startDate)
  }
  return daysArray
}
