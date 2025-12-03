// lecture 7
const projects = [
    {
        "title": "Full-Stack-Intro Fall Final Project",
        "description": "This is my fall final project in full stack intro in NYCU SDC.\nWhich is this website.",
        "date": "2025/11/5",
        "url": "https://github.com/foizshiqer/full-stack-intro/",
    },
    {
        "title": "foizshiqer.github.io",
        "description": "My first website built using hexo.\nNothing's there.\nCurrently not published.",
        "date": "2025/9/15",
        "url": "https://github.com/foizshiqer/foizshiqer.github.io",
    },
    {
        "title": "ICT Fall Final Project",
        "description": "I actually haven't started this yet.",
        "date": "Not Determined",
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
searchInput.addEventListener("keypress", () => {
    if (e.key === "Enter") {
        searchProjects();
    }
});

searchInput.addEventListener("input", searchProjects); // real-time update

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
            entry.target.classList.remove("scrolled-up");
            entry.target.classList.add("visible");
        }
        else {
            entry.target.classList.remove("visible");
            if (entry.target.getBoundingClientRect().top < 0) {
                entry.target.classList.add("scrolled-up");
            }
            else {
                entry.target.classList.remove("scrolled-up");
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
})
fadeInSections.forEach(section => {
    sectionObserver.observe(section);
});

const toggle = document.getElementById("rgbToggle");
let rgbOn = false;

toggle.addEventListener("click", () => {
    rgbOn = !rgbOn;
    
    if (rgbOn) {
        document.body.classList.add("rgb-mode");
        toggle.classList.add("active");
        toggle.textContent = "RGB Mode: ON";
    } else {
        document.body.classList.remove("rgb-mode");
        toggle.classList.remove("active");
        toggle.textContent = "RGB Mode: OFF";
    }
});