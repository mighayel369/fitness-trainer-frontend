export const generateTimes = () => {
  const times: string[] = [];
  let minutes = 0;

  while (minutes < 24 * 60) {
    const hrs24 = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const period = hrs24 >= 12 ? "PM" : "AM";
    const hrs12 = hrs24 % 12 === 0 ? 12 : hrs24 % 12;

    times.push(
      `${hrs12}:${mins.toString().padStart(2, "0")} ${period}`
    );

    minutes += 15;
  }

  return times;
};
