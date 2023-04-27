function getTimeAgo(dateString: Date): string {
  const ONE_DAY_MS = 86400000;
  const ONE_WEEK_MS = 604800000;
  const ONE_MONTH_MS = 2592000000;

  const date = new Date(dateString);
  const timezoneOffsetMs = date.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(date.getTime() + timezoneOffsetMs);

  const now = new Date();
  const nowOffsetMs = now.getTimezoneOffset() * 60000;
  const adjustedNow = new Date(now.getTime() + nowOffsetMs);
  const timeDiffMs = adjustedNow.getTime() - adjustedDate.getTime();

  // Calculate difference in days, weeks, and months
  const daysAgo = Math.floor(timeDiffMs / ONE_DAY_MS);
  const weeksAgo = Math.floor(timeDiffMs / ONE_WEEK_MS);
  const monthsAgo = Math.floor(timeDiffMs / ONE_MONTH_MS);

  // Format time ago string
  let timeAgo;
  if (monthsAgo > 1) {
    timeAgo = `${monthsAgo} months ago`;
  } else if (weeksAgo > 1) {
    timeAgo = `${weeksAgo} weeks ago`;
  } else if (daysAgo > 1) {
    timeAgo = `${daysAgo} days ago`;
  } else if (daysAgo === 1) {
    timeAgo = "1 day ago";
  } else {
    timeAgo = "today";
  }

  return timeAgo;
}

export default getTimeAgo;
