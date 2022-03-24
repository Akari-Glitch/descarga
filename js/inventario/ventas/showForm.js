const formContain = document.getElementById("form-contain");
const form = document.getElementById("form");
formContain.style.display = "none";

function showForm() {
  if (formContain.style.display === "none") {
    formContain.style.display = "block";
  }
}

function hiddenForm() {
  if (formContain.style.display === "block") {
    formContain.style.display = "none";
  }
}
