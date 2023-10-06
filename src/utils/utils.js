export function formatDate(date) {
  const formattedDate = new Date(date);
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

 return formattedDate.toLocaleDateString('en-US', options);
}