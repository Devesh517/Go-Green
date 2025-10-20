// ===============================
// Go Green Index JavaScript - Enhanced Version
// ===============================

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------
     ✅ Mobile Navigation Toggle with Cross Button
  ------------------------------*/
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".navmenu a");

  // Toggle menu visibility
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isActive = navToggle.classList.toggle("active");
      navMenu.classList.toggle("active", isActive);
      document.body.classList.toggle("nav-open", isActive);
      
      // Update aria-label for accessibility
      navToggle.setAttribute("aria-label", isActive ? "Close navigation" : "Toggle navigation");
      navToggle.setAttribute("aria-expanded", isActive);
    });

    // Close menu on link click
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        // Smooth scroll
        const href = link.getAttribute("href");
        if (href.startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth"
            });
          }
        }
        
        // Close mobile menu
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", false);
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      const isClickInsideNav = navMenu.contains(e.target) || navToggle.contains(e.target);
      if (!isClickInsideNav && navMenu.classList.contains("active")) {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", false);
      }
    });

    // Close menu on ESC key press
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("active")) {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", false);
      }
    });
  }

  /* -----------------------------
     ✅ Navbar Scroll Effect
  ------------------------------*/
  const navbar = document.querySelector(".navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (navbar) {
      navbar.classList.toggle("scrolled", currentScroll > 50);
    }

    lastScroll = currentScroll;
  });

  /* -----------------------------
     ✅ Enhanced Slider Functionality
  ------------------------------*/
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  const slider = document.querySelector(".slider");
  
  let currentSlide = 0;
  let autoSlideInterval;
  let isTransitioning = false;

  const showSlide = (index) => {
    if (isTransitioning) return;
    isTransitioning = true;

    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });

    // Update slider indicators if they exist
    updateIndicators(index);

    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  };

  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  };

  // Button event listeners
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  // Auto-slide functionality
  const startAutoSlide = () => {
    autoSlideInterval = setInterval(nextSlide, 6000);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  // Pause on hover
  if (slider) {
    slider.addEventListener("mouseenter", stopAutoSlide);
    slider.addEventListener("mouseleave", startAutoSlide);
  }

  // Keyboard navigation for slider
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
      stopAutoSlide();
      setTimeout(startAutoSlide, 10000);
    } else if (e.key === "ArrowRight") {
      nextSlide();
      stopAutoSlide();
      setTimeout(startAutoSlide, 10000);
    }
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  if (slider) {
    slider.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }

  const handleSwipe = () => {
    if (touchEndX < touchStartX - 50) {
      nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
      prevSlide();
    }
  };

  // Create slide indicators
  const createSlideIndicators = () => {
    const indicatorContainer = document.createElement("div");
    indicatorContainer.className = "slide-indicators";
    indicatorContainer.style.cssText = `
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
      z-index: 10;
    `;

    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "indicator-dot";
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.style.cssText = `
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        border: 2px solid rgba(255, 255, 255, 0.8);
        cursor: pointer;
        transition: all 0.3s ease;
      `;

      dot.addEventListener("click", () => {
        currentSlide = index;
        showSlide(currentSlide);
        stopAutoSlide();
        startAutoSlide();
      });

      indicatorContainer.appendChild(dot);
    });

    if (slider) {
      slider.appendChild(indicatorContainer);
    }
  };

  const updateIndicators = (activeIndex) => {
    const dots = document.querySelectorAll(".indicator-dot");
    dots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.style.background = "rgba(255, 255, 255, 1)";
        dot.style.transform = "scale(1.2)";
      } else {
        dot.style.background = "rgba(255, 255, 255, 0.5)";
        dot.style.transform = "scale(1)";
      }
    });
  };

  createSlideIndicators();
  startAutoSlide();

  /* -----------------------------
     ✅ Animate Tips Cards on Scroll
  ------------------------------*/
  const cards = document.querySelectorAll(".card");
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0) scale(1)";
        }, index * 100);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

  cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px) scale(0.95)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    cardObserver.observe(card);

    // Add hover effect
    card.addEventListener("mouseenter", function() {
      const icon = this.querySelector(".card-icon");
      if (icon) {
        icon.style.transform = "scale(1.3) rotate(10deg)";
      }
    });

    card.addEventListener("mouseleave", function() {
      const icon = this.querySelector(".card-icon");
      if (icon) {
        icon.style.transform = "scale(1) rotate(0deg)";
      }
    });

    // Click effect
    card.addEventListener("click", function() {
      this.style.animation = "cardPulse 0.5s ease";
      setTimeout(() => {
        this.style.animation = "";
      }, 500);
    });
  });

  /* -----------------------------
     ✅ Smooth Scroll for All Anchor Links
  ------------------------------*/
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  /* -----------------------------
     ✅ Active Link Highlighting Based on Scroll Position
  ------------------------------*/
  const sections = document.querySelectorAll("section[id]");
  
  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  /* -----------------------------
     ✅ Add Scroll to Top Button
  ------------------------------*/
  const createScrollToTopButton = () => {
    const btn = document.createElement("button");
    btn.innerHTML = "↑";
    btn.className = "scroll-to-top";
    btn.setAttribute("aria-label", "Scroll to top");
    btn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background: #4caf50;
      color: white;
      border: none;
      border-radius: 50%;
      font-size: 24px;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 999;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(btn);

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        btn.style.opacity = "1";
        btn.style.visibility = "visible";
      } else {
        btn.style.opacity = "0";
        btn.style.visibility = "hidden";
      }
    });

    btn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    // Hover effect
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "scale(1.1) rotate(360deg)";
      btn.style.transition = "transform 0.5s ease";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "scale(1) rotate(0deg)";
    });
  };

  createScrollToTopButton();

  /* -----------------------------
     ✅ Animate Tips Section Header
  ------------------------------*/
  const tipsSection = document.querySelector(".tips-section");
  if (tipsSection) {
    const heading = tipsSection.querySelector("h2");
    const subtitle = tipsSection.querySelector(".subtitle");

    if (heading) {
      heading.style.opacity = "0";
      heading.style.transform = "translateY(-20px)";
      heading.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    }

    if (subtitle) {
      subtitle.style.opacity = "0";
      subtitle.style.transform = "translateY(-15px)";
      subtitle.style.transition = "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s";
    }

    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (heading) {
            heading.style.opacity = "1";
            heading.style.transform = "translateY(0)";
          }
          if (subtitle) {
            subtitle.style.opacity = "1";
            subtitle.style.transform = "translateY(0)";
          }
          headerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    headerObserver.observe(tipsSection);
  }

  /* -----------------------------
     ✅ Add Loading Animation
  ------------------------------*/
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

  /* -----------------------------
     ✅ Parallax Effect for Slider
  ------------------------------*/
  if (slider) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      if (scrolled < 800) {
        slider.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    });
  }

  /* -----------------------------
     ✅ Add Card Icons Transition
  ------------------------------*/
  const cardIcons = document.querySelectorAll(".card-icon");
  cardIcons.forEach(icon => {
    icon.style.display = "inline-block";
    icon.style.transition = "transform 0.3s ease";
  });

  /* -----------------------------
     ✅ Performance: Debounce Function
  ------------------------------*/
  function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /* -----------------------------
     ✅ Console Welcome Message
  ------------------------------*/
  console.log("%c🌿 Go Green Initiative - Home 🌿", "color: #4caf50; font-size: 20px; font-weight: bold;");
  console.log("%cWelcome to a greener future!", "color: #2e7d32; font-size: 14px;");
  console.log("%c✨ Current Slide: " + (currentSlide + 1) + "/" + slides.length, "color: #66bb6a; font-size: 12px;");

});

// Add CSS for animations (if not in CSS file)
const style = document.createElement('style');
style.textContent = `
  @keyframes cardPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .slide {
    animation: fadeIn 1s ease;
  }
  
  body.nav-open {
    overflow: hidden;
  }
  
  .card-icon {
    display: inline-block;
    transition: transform 0.3s ease;
  }
  
  /* Smooth transitions */
  a, button, .card {
    transition: all 0.3s ease;
  }
  
  /* Focus styles for accessibility */
  *:focus-visible {
    outline: 2px solid #4caf50;
    outline-offset: 2px;
  }
  
  /* Slider navigation buttons hover */
  .nav-btn:hover {
    background: rgba(76, 175, 80, 0.9);
    transform: scale(1.1);
  }
  
  .nav-btn:active {
    transform: scale(0.95);
  }
  
  /* Slide indicators hover */
  .indicator-dot:hover {
    background: rgba(255, 255, 255, 0.8) !important;
    transform: scale(1.3) !important;
  }
`;
document.head.appendChild(style);