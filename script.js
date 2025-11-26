// lecture 7
const projects = [
    {
        "title": "Project 1",
        "description": "text for projects text for projects text for projects",
        "date": "2025/11/5",
        "url": "https://github.com",
    },
    {
        "title": "Project 2",
        "description": "text for projects text for projects text for projects",
        "date": "2025/11/5",
        "url": "https://github.com",
    },
    {
        "title": "Project 3",
        "description": "text for projects<br>text for projects text for projects",
        "date": "2025/11/5",
        "url": "https://github.com",
    },
]

const projectList = document.querySelector(".project-list");

function renderProjects(list) {
    projectList.innerHTML = list
        .map(p => {
            return `
            <div class="project-item" data-url="${p.url}" target="_blank">
                <div class="content">
                    <h3>${p.title}</h3>
                    <p>${p.description.replace(/\n/g, "<br>")}</p>
                    <p class="created-time">Created on ${p.date}</p>
                </div>
            </div>
            `;
        })
        .join("");
}

renderProjects(projects);

const searchInput = document.getElementById("project-search-input");
const searchBtn = document.getElementById("project-search-btn");

function searchProjects() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm)
    );
    renderProjects(filteredProjects);
}

searchBtn.addEventListener("click", searchProjects);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchProjects();
    }
});

//
const projectItems = document.querySelectorAll(".project-item");

projectItems.forEach(item => {
    item.addEventListener("click", function() {
        const url = this.getAttribute("data-url");
        if (url) {
            window.open(url, "_blank");
        }
    });
});

const typewriterElement = document.querySelector(".typewriter");
const texts = ["This is Ben,", "being a freshman of National Yang Ming Chiao Tung University", "and a member of NYCU SDC,", 
    "doing his Full Stack Intro final project,", "which is this website."
];
let textIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = texts[textIndex];
    const typingSpeed = 100; 
    const deletingSpeed = 50; 
    const pauseAfterTyping = 2000;
    const pauseAfterDeleting = 500;

    if (!isDeleting) {
        // typing
        let charIndex = 0;
        typewriterElement.textContent = "";

        const typingInterval = setInterval(() => { // finished typing
            typewriterElement.textContent += currentText[charIndex];
            charIndex++;

            if (charIndex === currentText.length) { // finished typing
                clearInterval(typingInterval);
                // pause after typing, then start deleting
                setTimeout(() => {
                    isDeleting = true;
                    typeWriter(); // go to deleting phase
                }, pauseAfterTyping);
            }
        }, typingSpeed);
    } else {
        // deleting
        let charIndex = currentText.length;

        const deletingInterval = setInterval(() => {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                clearInterval(deletingInterval);
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;

                setTimeout(() => {
                    typeWriter();
                }, pauseAfterDeleting);
            }
        }, deletingSpeed);
    }
}
typeWriter();

// lec 8
const sections = document.querySelectorAll("section");
const fadeInSections = document.querySelectorAll(".fade-in-section");
const navLinks = document.querySelectorAll(".nav-item a");

function updateActiveNav() {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 100) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px"
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
        else {
            entry.target.classList.remove("visible");
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
})
fadeInSections.forEach(section => {
    sectionObserver.observe(section);
});