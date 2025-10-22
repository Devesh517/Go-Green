// ===============================
// Go Green Contact JavaScript - Enhanced Version
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
     ✅ Form Validation and Submission
  ------------------------------*/
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (contactForm) {
    // Real-time validation
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const subjectSelect = document.getElementById("subject");
    const messageTextarea = document.getElementById("message");

    // Validation functions
    const validators = {
      name: (value) => {
        if (!value || value.trim().length < 2) {
          return "Name must be at least 2 characters";
        }
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          return "Name should only contain letters";
        }
        return "";
      },
      
      email: (value) => {
        if (!value) {
          return "Email is required";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return "Please enter a valid email address";
        }
        return "";
      },
      
      phone: (value) => {
        if (value && !/^[0-9+\-\s()]{10,}$/.test(value)) {
          return "Please enter a valid phone number";
        }
        return "";
      },
      
      subject: (value) => {
        if (!value) {
          return "Please select a subject";
        }
        return "";
      },
      
      message: (value) => {
        if (!value || value.trim().length < 10) {
          return "Message must be at least 10 characters";
        }
        if (value.trim().length > 500) {
          return "Message must be less than 500 characters";
        }
        return "";
      }
    };

    // Show error message
    const showError = (fieldId, message) => {
      const errorElement = document.getElementById(`${fieldId}Error`);
      if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = message ? "block" : "none";
      }
      const inputElement = document.getElementById(fieldId);
      if (inputElement) {
        inputElement.classList.toggle("error", !!message);
      }
    };

    // Real-time validation on blur
    nameInput?.addEventListener("blur", () => {
      showError("name", validators.name(nameInput.value));
    });

    emailInput?.addEventListener("blur", () => {
      showError("email", validators.email(emailInput.value));
    });

    phoneInput?.addEventListener("blur", () => {
      showError("phone", validators.phone(phoneInput.value));
    });

    subjectSelect?.addEventListener("change", () => {
      showError("subject", validators.subject(subjectSelect.value));
    });

    messageTextarea?.addEventListener("blur", () => {
      showError("message", validators.message(messageTextarea.value));
    });

    // Character counter for message
    if (messageTextarea) {
      const charCounterDiv = document.createElement("div");
      charCounterDiv.className = "char-counter";
      charCounterDiv.style.cssText = "text-align: right; font-size: 0.85rem; color: #666; margin-top: 5px;";
      messageTextarea.parentElement.appendChild(charCounterDiv);

      messageTextarea.addEventListener("input", () => {
        const length = messageTextarea.value.length;
        charCounterDiv.textContent = `${length}/500 characters`;
        charCounterDiv.style.color = length > 500 ? "#f44336" : "#666";
      });
    }

    // Form submission
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // Clear previous messages
      document.querySelectorAll(".error-message").forEach(el => {
        el.style.display = "none";
      });
      
      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get("name")?.trim() || "";
      const email = formData.get("email")?.trim() || "";
      const phone = formData.get("phone")?.trim() || "";
      const subject = formData.get("subject") || "";
      const message = formData.get("message")?.trim() || "";
      
      // Validate all fields
      let isValid = true;
      const errors = {
        name: validators.name(name),
        email: validators.email(email),
        phone: validators.phone(phone),
        subject: validators.subject(subject),
        message: validators.message(message)
      };

      // Display errors
      Object.keys(errors).forEach(field => {
        if (errors[field]) {
          showError(field, errors[field]);
          isValid = false;
        }
      });

      // If form is valid, submit
      if (isValid) {
        const submitBtn = contactForm.querySelector(".submit-btn");
        const originalText = submitBtn.querySelector("span:first-child").textContent;
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.7";
        submitBtn.querySelector("span:first-child").textContent = "Sending...";
        submitBtn.querySelector("span:last-child").textContent = "⏳";
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
          // Success state
          formMessage.innerHTML = `
            <strong>✅ Success!</strong><br>
            Thank you ${name}! Your message has been sent successfully.<br>
            We'll get back to you at ${email} soon.
          `;
          formMessage.className = "form-message success";
          formMessage.style.display = "block";
          
          // Reset form
          contactForm.reset();
          if (charCounterDiv) {
            charCounterDiv.textContent = "0/500 characters";
          }
          
          // Re-enable button
          submitBtn.disabled = false;
          submitBtn.style.opacity = "1";
          submitBtn.querySelector("span:first-child").textContent = originalText;
          submitBtn.querySelector("span:last-child").textContent = "📤";
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            formMessage.style.display = "none";
          }, 5000);
          
          // Scroll to success message
          formMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
          
        }, 2000);
      } else {
        // Scroll to first error
        const firstError = contactForm.querySelector(".error-message[style*='block']");
        if (firstError) {
          firstError.previousElementSibling?.scrollIntoView({ 
            behavior: "smooth", 
            block: "center" 
          });
        }
      }
    });
  }

  /* -----------------------------
     ✅ Animate Contact Info Cards
  ------------------------------*/
  const infoCards = document.querySelectorAll(".info-card");
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 150);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  infoCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.5s ease";
    cardObserver.observe(card);
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
     ✅ Active Link Highlighting
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
      btn.style.transform = "scale(1.1)";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "scale(1)";
    });
  };

  createScrollToTopButton();

  /* -----------------------------
     ✅ Add Loading Animation
  ------------------------------*/
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

  /* -----------------------------
     ✅ Form Input Focus Effects
  ------------------------------*/
  const formInputs = document.querySelectorAll("input, textarea, select");
  
  formInputs.forEach(input => {
    input.addEventListener("focus", function() {
      this.parentElement.classList.add("focused");
    });
    
    input.addEventListener("blur", function() {
      if (!this.value) {
        this.parentElement.classList.remove("focused");
      }
    });
  });

  /* -----------------------------
     ✅ Console Welcome Message
  ------------------------------*/
  console.log("%c🌿 Go Green Initiative - Contact Page 🌿", "color: #4caf50; font-size: 20px; font-weight: bold;");
  console.log("%cWe'd love to hear from you!", "color: #2e7d32; font-size: 14px;");

});

// Add CSS for animations (if not in CSS file)
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  .error {
    animation: shake 0.3s ease;
  }
  
  .form-message {
    padding: 15px;
    border-radius: 8px;
    margin-top: 20px;
    display: none;
    animation: slideIn 0.3s ease;
  }
  
  .form-message.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }
  
  .form-message.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .error-message {
    color: #f44336;
    font-size: 0.85rem;
    margin-top: 5px;
    display: none;
  }
  
  .focused label {
    color: #4caf50;
  }
`;
document.head.appendChild(style);