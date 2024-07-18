export const formatDateString = (date: string | Date | null): string => {
  if (!date) return 'N/A';
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toDateString();
};
