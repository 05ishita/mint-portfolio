/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});


/* =========================
   DARK / LIGHT THEME
========================= */

const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");

    themeBtn.textContent =
        isLight ? "☀️" : "🌙";

    localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
    );
});


/* =========================
   TYPING EFFECT
========================= */

const typingText =
    document.getElementById("typingText");

const roles = [
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Software Engineer"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;

        if (characterIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeEffect, 1300);

            return;
        }

    } else {

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex =
                (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(
        typeEffect,
        deleting ? 55 : 90
    );
}

typeEffect();


/* =========================
   PROJECT MODAL
========================= */

const modal =
    document.getElementById("projectModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalTech =
    document.getElementById("modalTech");

const modalClose =
    document.getElementById("modalClose");

const modalOverlay =
    document.getElementById("modalOverlay");


document.querySelectorAll(".project-btn")
    .forEach((button) => {

        button.addEventListener("click", () => {

            modalTitle.textContent =
                button.dataset.title;

            modalDescription.textContent =
                button.dataset.description;

            modalTech.innerHTML = "";

            const technologies =
                button.dataset.tech.split(",");

            technologies.forEach((tech) => {

                const span =
                    document.createElement("span");

                span.textContent =
                    tech.trim();

                modalTech.appendChild(span);
            });

            modal.classList.add("active");

            modal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow =
                "hidden";
        });
    });


function closeModal() {

    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";
}


modalClose.addEventListener(
    "click",
    closeModal
);

modalOverlay.addEventListener(
    "click",
    closeModal
);


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeModal();
    }

});


/* =========================
   CONTACT FORM VALIDATION
========================= */

const contactForm =
    document.getElementById("contactForm");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const messageInput =
    document.getElementById("message");


const nameError =
    document.getElementById("nameError");

const emailError =
    document.getElementById("emailError");

const messageError =
    document.getElementById("messageError");

const formSuccess =
    document.getElementById("formSuccess");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formSuccess.textContent = "";

    let isValid = true;

    const name =
        nameInput.value.trim();

    const email =
        emailInput.value.trim();

    const message =
        messageInput.value.trim();


    if (name.length < 2) {

        nameError.textContent =
            "Please enter your name.";

        isValid = false;
    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        emailError.textContent =
            "Please enter a valid email address.";

        isValid = false;
    }


    if (message.length < 10) {

        messageError.textContent =
            "Message must contain at least 10 characters.";

        isValid = false;
    }


    if (!isValid) {
        return;
    }


    formSuccess.textContent =
        "Thank you! Your message has been validated successfully.";

    contactForm.reset();
});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections =
    document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 120;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");
        }

    });


    navigationLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");
        }

    });

});