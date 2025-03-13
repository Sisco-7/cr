// Mobile Navigation Toggle
function toggleNav() {
  const navMenu = document.querySelector("nav ul");
  const navToggle = document.querySelector(".nav-toggle");
  const navOverlay = document.querySelector(".nav-overlay");

  if (navMenu && navToggle) {
    navMenu.classList.toggle("active");
    // Toggle between bars and times icons
    navToggle.classList.toggle("fa-bars");
    navToggle.classList.toggle("fa-times");

    // Toggle overlay visibility (if overlay exists)
    if (navOverlay) {
      navOverlay.classList.toggle("active", navMenu.classList.contains("active"));
    }
  } else {
    console.error("Nav menu or toggle element not found.");
  }
}

// Lightbox Gallery (Facilities Page)
const galleryImages = [
  "https://via.placeholder.com/600x400?text=Classroom",
  "https://via.placeholder.com/600x400?text=Science+Lab",
  "https://via.placeholder.com/600x400?text=Library",
  "https://via.placeholder.com/600x400?text=Sports+Field",
];
let currentImageIndex = 0;

function openLightbox(index) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (lightbox && lightboxImg) {
    currentImageIndex = index;
    lightboxImg.src = galleryImages[currentImageIndex];
    lightbox.classList.add("active");
  } else {
    console.error("Lightbox or lightbox image element not found.");
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.classList.remove("active");
  }
}

function changeImage(direction) {
  currentImageIndex += direction;
  if (currentImageIndex < 0) {
    currentImageIndex = galleryImages.length - 1;
  } else if (currentImageIndex >= galleryImages.length) {
    currentImageIndex = 0;
  }
  const lightboxImg = document.getElementById("lightbox-img");
  if (lightboxImg) {
    lightboxImg.src = galleryImages[currentImageIndex];
  } else {
    console.error("Lightbox image element not found.");
  }
}

// Testimonial Slider (Student Life Page)
let currentSlide = 0;
let autoSlideInterval;

function showSlide(index) {
  const slides = document.querySelectorAll(".testimonial-slide");
  const totalSlides = slides.length;

  if (totalSlides === 0) {
    console.warn("No testimonial slides found.");
    return;
  }

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  const totalSlides = document.querySelectorAll(".testimonial-slide").length;
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function prevSlide() {
  const totalSlides = document.querySelectorAll(".testimonial-slide").length;
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Contact Form Submission (Contact Page)
function handleSubmit(event) {
  event.preventDefault();
  const form = document.getElementById("contact-form");
  if (!form) {
    console.error("Contact form not found.");
    return;
  }

  const formData = new FormData(form);
  const data = {
    name: formData.get("name")?.trim(),
    email: formData.get("email")?.trim(),
    phone: formData.get("phone")?.trim(),
    message: formData.get("message")?.trim(),
  };

  // Basic validation
  if (!data.name || !data.email || !data.message) {
    alert("Please fill in all required fields (Name, Email, Message).");
    return;
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Simulate form submission (replace with an API call if needed)
  console.log("Form submitted:", data);

  // Show a success message
  alert("Thank you for your message! We will get back to you soon.");

  // Reset the form
  form.reset();
}

// Single DOMContentLoaded Event Listener for All Initializations
document.addEventListener("DOMContentLoaded", () => {
  // Dark Mode Toggle
  const toggleButton = document.querySelector(".dark-mode-toggle");
  const body = document.body;

  if (toggleButton && body) {
    // Explicitly set light mode as default unless dark mode is saved
    const isDarkMode = localStorage.getItem("darkMode") === "enabled";
    if (!isDarkMode) {
      body.classList.remove("dark-mode"); // Ensure light mode is applied
    } else {
      body.classList.add("dark-mode"); // Apply dark mode if saved
    }

    toggleButton.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const darkModeEnabled = body.classList.contains("dark-mode");
      localStorage.setItem("darkMode", darkModeEnabled ? "enabled" : "disabled");
    });
  } else {
    console.error("Dark mode toggle button or body element not found.");
  }

  // Nav Toggle
  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", toggleNav);
  } else {
    console.error("Nav toggle element not found.");
  }

  // Header Scroll Effect
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
    });
  } else {
    console.error("Header element not found.");
  }

  // Testimonial Slider Initialization
  const slides = document.querySelectorAll(".testimonial-slide");
  const testimonialSlider = document.querySelector(".testimonial-slider");
  if (slides.length > 0 && testimonialSlider) {
    showSlide(currentSlide); // Show the first slide
    startAutoSlide(); // Start auto-slide

    // Pause auto-slide on hover
    testimonialSlider.addEventListener("mouseenter", stopAutoSlide);
    testimonialSlider.addEventListener("mouseleave", startAutoSlide);

    // Add event listeners for slider navigation buttons
    const prevButton = document.querySelector(".slider-nav .prev");
    const nextButton = document.querySelector(".slider-nav .next");
    if (prevButton && nextButton) {
      prevButton.addEventListener("click", () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
      });
      nextButton.addEventListener("click", () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
      });
    }
  } else {
    console.warn("Testimonial slider or slides not found on this page.");
  }

  // Lightbox Gallery Initialization
  const galleryItems = document.querySelectorAll(".gallery-item img");
  const lightbox = document.getElementById("lightbox");
  if (galleryItems.length > 0 && lightbox) {
    galleryItems.forEach((img, index) => {
      img.addEventListener("click", () => openLightbox(index));
    });

    const closeButton = lightbox.querySelector(".close-lightbox");
    const prevButton = lightbox.querySelector(".prev");
    const nextButton = lightbox.querySelector(".next");

    if (closeButton) closeButton.addEventListener("click", closeLightbox);
    if (prevButton) prevButton.addEventListener("click", () => changeImage(-1));
    if (nextButton) nextButton.addEventListener("click", () => changeImage(1));

    // Close lightbox on overlay click
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  } else {
    console.warn("Gallery items or lightbox not found on this page.");
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleSubmit);
  } else {
    console.warn("Contact form not found on this page.");
  }

  // Scroll Animations for Sections (using IntersectionObserver)
  const sections = document.querySelectorAll("section");
  const options = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  sections.forEach((section) => observer.observe(section));
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    const header = document.querySelector("header");
    const headerHeight = header ? header.offsetHeight : 0;

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - headerHeight, // Adjust for fixed header
        behavior: "smooth",
      });
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('nav ul');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Optional: Close menu when clicking a link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
});
