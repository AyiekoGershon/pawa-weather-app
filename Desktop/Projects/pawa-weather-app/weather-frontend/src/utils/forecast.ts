export function getDailyForecasts(list: any[]): any[] {
  const daily: Record<string, any[]> = {};

  list.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0];
    if (!daily[date]) daily[date] = [];
    daily[date].push(entry);
  });

  return Object.entries(daily)
    .slice(1, 4) // skip today, take next 3 days
    .map(([date, entries]) => {
      const temps = entries.map((e) => e.main.temp);
      const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;

      const { icon, description } = entries[0].weather[0];

      return {
        date,
        temp: avgTemp,
        icon,
        description,
      };
    });
}
