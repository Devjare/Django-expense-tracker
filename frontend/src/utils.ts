
export const generateColors = (n: number)  => {
  const colors = [];
  
  for (let i = 0; i < n; i++) {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    colors.push(randomColor);
  }
  return colors
}
