const projectItems = document.querySelectorAll(".project-item");

projectItems.forEach(item => {
    item.addEventListener("click", function() {
        const url = this.getAttribute("data-url");
        if (url) {
            window.open(url, "_blank");
        }
    });
});