require('./styles/main.css');

const copyrightYear = document.getElementById("copyrightYear");

copyrightYear.innerHTML = new Date().getFullYear();
