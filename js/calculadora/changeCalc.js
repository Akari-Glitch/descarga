const calcSystem = document.getElementById("calc-system");
document.getElementById("add-venta").style.display = "none";
function changeCalc() {
  if (calcNormal.style.display === "none") {
    calcNormal.style.display = "block";
    calcSystem.style.display = "none";
  } else {
    calcNormal.style.display = "none";
    calcSystem.style.display = "block";
  }
}
