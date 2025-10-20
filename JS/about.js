// ===============================
// Go Green About JavaScript - Enhanced Version (Bug-Free)
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
      link.addEventListener("click", () => {
        // Close mobile menu immediately
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
     ✅ Enhanced Scroll Animations with Intersection Observer
  ------------------------------*/
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -60px 0px"
  };

  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe section containers
  const sectionContainers = document.querySelectorAll(".section-container");
  sectionContainers.forEach((container, index) => {
    container.style.opacity = "0";
    container.style.transform = "translateY(30px)";
    container.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    container.style.transitionDelay = `${index * 0.1}s`;
    fadeInObserver.observe(container);
  });

  // Observe action cards with staggered animation
  const actionCards = document.querySelectorAll(".action-card");
  actionCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    card.style.transitionDelay = `${index * 0.1}s`;
    fadeInObserver.observe(card);
  });

  /* -----------------------------
     ✅ Action Card Hover Effects
  ------------------------------*/
  actionCards.forEach(card => {
    // Add click effect
    card.addEventListener("click", function() {
      this.style.animation = "cardPulse 0.5s ease";
      setTimeout(() => {
        this.style.animation = "";
      }, 500);
    });

    // Add smooth hover transition
    card.addEventListener("mouseenter", function() {
      const emoji = this.querySelector(".action-emoji");
      if (emoji) {
        emoji.style.transform = "scale(1.2) rotate(10deg)";
      }
    });

    card.addEventListener("mouseleave", function() {
      const emoji = this.querySelector(".action-emoji");
      if (emoji) {
        emoji.style.transform = "scale(1) rotate(0deg)";
      }
    });
  });

  /* -----------------------------
     ✅ Animate Section Images on Scroll
  ------------------------------*/
  const sectionImages = document.querySelectorAll(".section-image img");
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "scale(1)";
        imageObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  sectionImages.forEach(img => {
    img.style.opacity = "0";
    img.style.transform = "scale(0.95)";
    img.style.transition = "opacity 1s ease, transform 1s ease";
    imageObserver.observe(img);
  });

  /* -----------------------------
     ✅ Smooth Scroll for Hash Links (Footer links only)
  ------------------------------*/
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      const target = document.querySelector(href);
      
      // Only do smooth scroll if the target exists on this page
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
     ✅ Animate List Items in Content Sections
  ------------------------------*/
  const listItems = document.querySelectorAll(".section-content li");
  
  const listObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateX(0)";
        }, index * 100);
        listObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  listItems.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-20px)";
    item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    listObserver.observe(item);
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

    // Show/hide button based on scroll
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        btn.style.opacity = "1";
        btn.style.visibility = "visible";
      } else {
        btn.style.opacity = "0";
        btn.style.visibility = "hidden";
      }
    });

    // Scroll to top on click
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
     ✅ Reading Progress Bar
  ------------------------------*/
  const createProgressBar = () => {
    const progressBar = document.createElement("div");
    progressBar.className = "reading-progress";
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 4px;
      background: linear-gradient(90deg, #4caf50, #8bc34a);
      width: 0%;
      z-index: 1001;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + "%";
    });
  };

  createProgressBar();

  /* -----------------------------
     ✅ Animate Action Header
  ------------------------------*/
  const actionHeader = document.querySelector(".action-header");
  if (actionHeader) {
    actionHeader.style.opacity = "0";
    actionHeader.style.transform = "translateY(-20px)";
    actionHeader.style.transition = "opacity 0.8s ease, transform 0.8s ease";

    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          headerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    headerObserver.observe(actionHeader);
  }

  /* -----------------------------
     ✅ Add Loading Animation
  ------------------------------*/
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

  /* -----------------------------
     ✅ Parallax Effect for Hero Header
  ------------------------------*/
  const heroHeader = document.querySelector(".hero-header");
  if (heroHeader) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      if (scrolled < 500) {
        heroHeader.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroHeader.style.opacity = 1 - (scrolled / 500);
      }
    });
  }

  /* -----------------------------
     ✅ Add Tooltip for Action Cards (Optional Enhancement)
  ------------------------------*/
  actionCards.forEach(card => {
    card.setAttribute("tabindex", "0");
    
    // Keyboard accessibility
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  /* -----------------------------
     ✅ Console Welcome Message
  ------------------------------*/
  console.log("%c🌿 Go Green Initiative - About Us 🌿", "color: #4caf50; font-size: 20px; font-weight: bold;");
  console.log("%cLearn about our mission for a sustainable future!", "color: #2e7d32; font-size: 14px;");

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

});

// Add CSS for animations (if not in CSS file)
const style = document.createElement('style');
style.textContent = `
  @keyframes cardPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .action-emoji {
    display: inline-block;
    transition: transform 0.3s ease;
  }
  
  .section-image img {
    display: block;
    width: 100%;
    height: auto;
  }
  
  body.nav-open {
    overflow: hidden;
  }
  
  /* Smooth transitions for all interactive elements */
  a, button, .action-card {
    transition: all 0.3s ease;
  }
  
  /* Focus styles for accessibility */
  *:focus-visible {
    outline: 2px solid #4caf50;
    outline-offset: 2px;
  }
`;
document.head.appendChild(style);