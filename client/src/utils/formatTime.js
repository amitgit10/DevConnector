function time(
  date = "99/99/1999",
  timeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
) {
  return new Intl.DateTimeFormat(undefined, timeFormatOptions).format(
    new Date(date)
  );
}

export default time;
