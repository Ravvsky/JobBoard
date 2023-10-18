function getTimeTo(dateString: Date): string {
  const ONE_DAY_MS = 86400000;
  const ONE_WEEK_MS = 604800000;
  const ONE_MONTH_MS = 2592000000;

  const date = new Date(dateString);
  const timezoneOffsetMs = date.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(date.getTime() + timezoneOffsetMs);

  const now = new Date();
  const nowOffsetMs = now.getTimezoneOffset() * 60000;
  const adjustedNow = new Date(now.getTime() + nowOffsetMs);
  const timeDiffMs = adjustedDate.getTime() - adjustedNow.getTime();

  const daysTo = Math.floor(timeDiffMs / ONE_DAY_MS);
  const weeksTo = Math.floor(timeDiffMs / ONE_WEEK_MS);
  const monthsTo = Math.floor(timeDiffMs / ONE_MONTH_MS);

  let timeTo;
  if (monthsTo > 1) {
    timeTo = `${monthsTo} months to`;
  } else if (weeksTo > 1) {
    timeTo = `${weeksTo} weeks to`;
  } else if (daysTo > 1) {
    timeTo = `${daysTo} days to`;
  } else if (daysTo === 1) {
    timeTo = "1 day to";
  } else if (daysTo < 0) {
    timeTo = `Expired ${-daysTo} days ago`;
  } else {
    timeTo = "today";
  }
  console.log(daysTo);
  return timeTo;
}

export default getTimeTo;
