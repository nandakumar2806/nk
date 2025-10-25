// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
let currentTheme = 'light';

themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  htmlElement.setAttribute('data-theme', currentTheme);
  themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
});

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.navbar__link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Skills Animation
const skillCards = document.querySelectorAll('.skill-card');
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBar = entry.target.querySelector('.skill-card__progress-fill');
      const width = progressBar.getAttribute('data-width');
      progressBar.style.width = width + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

skillCards.forEach(card => {
  skillObserver.observe(card);
});

// Carousel
const carouselContainer = document.getElementById('carouselContainer');
const prevSlideBtn = document.getElementById('prevSlide');
const nextSlideBtn = document.getElementById('nextSlide');
const carouselDotsContainer = document.getElementById('carouselDots');
const slides = document.querySelectorAll('.carousel__slide');
let currentSlide = 0;
let autoPlayInterval;

// Create dots
slides.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.classList.add('carousel__dot');
  if (index === 0) dot.classList.add('active');
  dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
  dot.addEventListener('click', () => goToSlide(index));
  carouselDotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.carousel__dot');

function updateCarousel() {
  carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateCarousel();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 4000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

prevSlideBtn.addEventListener('click', () => {
  prevSlide();
  stopAutoPlay();
  startAutoPlay();
});

nextSlideBtn.addEventListener('click', () => {
  nextSlide();
  stopAutoPlay();
  startAutoPlay();
});

// Pause auto-play on hover
const carousel = document.getElementById('carousel');
carousel.addEventListener('mouseenter', stopAutoPlay);
carousel.addEventListener('mouseleave', startAutoPlay);

// Start auto-play
startAutoPlay();

// Form Validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showError(input, errorId, message) {
  input.classList.add('error');
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = message;
  errorElement.classList.add('show');
}

function hideError(input, errorId) {
  input.classList.remove('error');
  document.getElementById(errorId).classList.remove('show');
}

function validateForm() {
  let isValid = true;

  // Validate name
  if (nameInput.value.trim() === '') {
    showError(nameInput, 'nameError', 'Please enter your name');
    isValid = false;
  } else {
    hideError(nameInput, 'nameError');
  }

  // Validate email
  if (emailInput.value.trim() === '') {
    showError(emailInput, 'emailError', 'Please enter your email address');
    isValid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, 'emailError', 'Please enter a valid email address');
    isValid = false;
  } else {
    hideError(emailInput, 'emailError');
  }

  // Validate message
  if (messageInput.value.trim() === '') {
    showError(messageInput, 'messageError', 'Please enter a message');
    isValid = false;
  } else {
    hideError(messageInput, 'messageError');
  }

  return isValid;
}

// Real-time validation
nameInput.addEventListener('blur', () => {
  if (nameInput.value.trim() === '') {
    showError(nameInput, 'nameError', 'Please enter your name');
  } else {
    hideError(nameInput, 'nameError');
  }
});

emailInput.addEventListener('blur', () => {
  if (emailInput.value.trim() === '') {
    showError(emailInput, 'emailError', 'Please enter your email address');
  } else if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, 'emailError', 'Please enter a valid email address');
  } else {
    hideError(emailInput, 'emailError');
  }
});

messageInput.addEventListener('blur', () => {
  if (messageInput.value.trim() === '') {
    showError(messageInput, 'messageError', 'Please enter a message');
  } else {
    hideError(messageInput, 'messageError');
  }
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (validateForm()) {
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    submitBtn.textContent = '';
    formMessage.classList.remove('show', 'success', 'error');

    // Simulate form submission
    setTimeout(() => {
      // Success
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      
      formMessage.textContent = 'Thank you! Your message has been sent successfully.';
      formMessage.classList.add('show', 'success');
      
      // Reset form
      contactForm.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        formMessage.classList.remove('show');
      }, 5000);
    }, 2000);
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});