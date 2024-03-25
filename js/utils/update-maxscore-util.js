export const updateScore = () => {
  const doc = document.querySelector("h4");
  const maxScore = localStorage.getItem("flappy:maxScore") || "0";
  doc.innerText = `历史最高分: ${maxScore}`;
};
