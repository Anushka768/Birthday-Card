let isOpen = false;

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        isOpen = !isOpen;
        document.querySelector(".card").classList.toggle("open", isOpen);
    }
});
