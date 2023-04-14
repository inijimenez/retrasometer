// Helper function to calculate difference in minutes between two Date objects
export const getDifferenceInMinutes = (date1, date2) => {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / (1000 * 60));
  };
  
  // Helper function to format a duration in minutes to a string (e.g. '2h 30min')
  export const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };
  