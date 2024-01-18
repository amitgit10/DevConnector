function time(
  date,
  timeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
) {
  return new Intl.DateTimeFormat(undefined, timeFormatOptions).format(
    new Date(date)
  );
}

export default time;
