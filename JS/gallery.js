// ===============================
// Go Green Gallery JavaScript - Enhanced Version
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
            target.scrollIntoView({ behavior: "smooth", block: "start" });
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

    // Optional: Hide navbar on scroll down, show on scroll up
    // Uncomment if you want this feature
    /*
    if (currentScroll > lastScroll && currentScroll > 100) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }
    */

    lastScroll = currentScroll;
  });

  /* -----------------------------
     ✅ Gallery Item Fade-In Animation with Intersection Observer
  ------------------------------*/
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -60px 0px"
  };

  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Stop observing once visible
      }
    });
  }, observerOptions);

  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item, index) => {
    // Stagger animation delay
    item.style.transitionDelay = `${index * 0.1}s`;
    fadeInObserver.observe(item);
  });

  /* -----------------------------
     ✅ Gallery Item Click Handler (Optional Enhancement)
  ------------------------------*/
  galleryItems.forEach(item => {
    item.addEventListener("click", function() {
      // Add a subtle pulse effect on click
      this.style.animation = "pulse 0.5s ease";
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
  const sections = document.querySelectorAll("section[id], header[id]");
  
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
     ✅ Add Loading Animation
  ------------------------------*/
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

  /* -----------------------------
     ✅ Gallery Image Lazy Loading Enhancement
  ------------------------------*/
  const images = document.querySelectorAll(".gallery-image img");
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => {
    imageObserver.observe(img);
  });

  /* -----------------------------
     ✅ Add Scroll to Top Button (Optional Enhancement)
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
  };

  // Initialize scroll to top button
  createScrollToTopButton();

  /* -----------------------------
     ✅ Performance: Debounce Scroll Events
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

  // Apply debounce to scroll-heavy operations if needed
  // Example: window.addEventListener("scroll", debounce(yourFunction, 20));

  /* -----------------------------
     ✅ Console Welcome Message
  ------------------------------*/
  console.log("%c🌿 Go Green Initiative 🌿", "color: #4caf50; font-size: 20px; font-weight: bold;");
  console.log("%cThanks for visiting our eco-friendly gallery!", "color: #2e7d32; font-size: 14px;");

});

// Add CSS for pulse animation (if not in CSS file)
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;
document.head.appendChild(style);