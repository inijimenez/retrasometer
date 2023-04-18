// Helper function to calculate difference in minutes between two Date objects
export const getDifferenceInMinutes = (time1, time2) => {
  const [h1, m1] = time1.split(':');
  const [h2, m2] = time2.split(':');
  const date1 = new Date();
  date1.setHours(h1, m1, 0, 0);
  const date2 = new Date();
  date2.setHours(h2, m2, 0, 0);
  const diff = (date2.getTime() - date1.getTime()) / (1000 * 60);
  return diff;
};

// Helper function to format a duration in minutes to a string (e.g. '2h 30min')
export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}min`;
};
