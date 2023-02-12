import moment from 'moment'
import i18n from 'i18n'

export const convertTimeToDateAndSplit = (
  date?: string | Date | undefined,
  dateFormat?: string,
  timeFormat?: string
) => {
  if (!date) {
    return {
      date: '-',
      time: '-'
    }
  }
  //eslint-disable-next-line
  console.log(i18n.language)
  const dateString = moment(date)
    .locale(i18n.language)
    .format(dateFormat ?? 'll')
  const timeString = moment(date)
    .locale(i18n.language)
    .format(timeFormat ?? 'LT')

  return {
    date: dateString,
    time: timeString
  }
}
