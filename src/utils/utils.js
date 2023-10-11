export function formatDate(date) {
  const formattedDate = new Date(date);
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

 return formattedDate.toLocaleDateString('en-US', options);
}

export function getRandomColor() {
  const letters = '0123456789ABCDEF'; // Hexadecimal characters
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Example usage
// const alphabetColors = {};
// for (let letter = 'A'; letter <= 'Z'; letter = String.fromCharCode(letter.charCodeAt(0) + 1)) {
//   alphabetColors[letter] = getRandomColor();
// }