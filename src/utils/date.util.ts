import dayjs from "dayjs";

export function smartDate(inputDate: any) {
  const date = dayjs(inputDate);
  const now = dayjs();
  const daysOfWeek = [
    "Duminica",
    "Luni",
    "Marti",
    "Miercuri",
    "Joi",
    "Vineri",
    "Sambata",
  ];
  console.log(
    now.isSame(date, "day"),
    now.subtract(1, "day").isSame(date, "day"),
    now.diff(date, "day") < 7
  );

  if (now.isSame(date, "day")) {
    return "Azi " + date.format("HH:mm");
  } else if (now.subtract(1, "day").isSame(date, "day")) {
    return "Ieri " + date.format("HH:mm");
  } else if (now.diff(date, "day") < 7 && now.diff(date, "day") > 0) {
    return daysOfWeek[date.day()] + " " + date.format("HH:mm");
  } else {
    return date.format("DD/MM/YYYY HH:mm");
  }
}
