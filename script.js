//Mobile Nav Bar
let mobileButton = document.querySelector('.icon');
mobileButton.addEventListener('click', moblieNav);

function moblieNav() {
    let tab = document.getElementById("myLinks");
    if (tab.style.display === "block") {
        tab.style.display = "none";
    } else {
        tab.style.display = "block"
    }
}