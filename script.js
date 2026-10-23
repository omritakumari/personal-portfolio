
const typingElement = document.getElementById("typing");

const roles = [
  "Frontend Developer",
  "Web Designer",
  "JavaScript Developer",
  "Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  typingElement.textContent = currentRole.substring(
    0,
    charIndex
  );

  let delay = deleting ? 45 : 90;

  if (!deleting && charIndex < currentRole.length) {
    charIndex++;
  } else if (deleting && charIndex > 0) {
    charIndex--;
  } else if (!deleting) {
    deleting = true;
    delay = 1100;
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeEffect, delay);
}

typeEffect();

// Mobile navigation
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
  const isOpen = navbar.classList.toggle("open");
  menuBtn.textContent = isOpen ? "✕" : "☰";
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

navbar.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("open");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// Dark and light theme
const themeBtn = document.getElementById("themeBtn");

function updateThemeButton() {
  themeBtn.textContent = document.body.classList.contains("light")
    ? "🌙"
    : "☀️";
}

try {
  if (localStorage.getItem("portfolio-theme") === "light") {
    document.body.classList.add("light");
  }
} catch (error) {
  // The theme toggle still works if storage is unavailable.
}

updateThemeButton();

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  updateThemeButton();

  try {
    localStorage.setItem(
      "portfolio-theme",
      document.body.classList.contains("light") ? "light" : "dark"
    );
  } catch (error) {
    // Theme preference cannot be saved in this browser.
  }
});

// Project filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach(item => {
      item.classList.toggle("active", item === button);
    });

    projectCards.forEach(card => {
      const matches =
        filter === "all" || card.dataset.category === filter;

      card.classList.toggle("hidden", !matches);
    });
  });
});

// Back to top
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 350);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Footer year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Contact form
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    formMessage.textContent = "Please complete all fields.";
    return;
  }

  formMessage.textContent =
    "Form validated! Connect an email service to send your message.";

  // This demo does not send or store the message.
});
