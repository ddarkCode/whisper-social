export function formatDate(date) {
  const formattedDate = new Date(date);
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

 return formattedDate.toLocaleDateString('en-US', options);
}


function hsvToRgb(h, s, v) {
  let r, g, b;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return [r, g, b];
}

export function getRGBColorForLetter(letter) {
  const letterAscii = letter.toUpperCase().charCodeAt(0);
  const colorRange = 26;
  const hue = (letterAscii - 'A'.charCodeAt(0)) / colorRange;
  const [r, g, b] = hsvToRgb(hue, 1, 1);
  const scaledColor = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];

  return `rgb(${scaledColor.join(", ")})`;
}

