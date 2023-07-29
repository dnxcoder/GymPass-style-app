export function getDifferenceInMinutes(date1: Date, date2: Date) {
  const diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime());
  const minutes = Math.floor(diffInMilliseconds / (1000 * 60));
  return minutes;
}
