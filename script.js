document.addEventListener("DOMContentLoaded", () => {
  // Loading Animation
  const loadingContainer = document.getElementById("loading-container")
  const loadingBar = document.getElementById("loading-bar")
  const loadingPercentage = document.getElementById("loading-percentage")
  const mainContent = document.getElementById("main-content")
  const curvvImage = document.querySelector(".curvv-image")
  const innovistaImage = document.querySelector(".innovista-image")

  let progress = 0
  const loadingDuration = 7000 // 7 seconds
  const interval = loadingDuration / 100

  const loadingInterval = setInterval(() => {
    if (progress < 100) {
      progress += 1
      loadingBar.style.width = `${progress}%`
      loadingPercentage.textContent = `${progress}%`
      const scaleValue = 1 + progress * 0.003 // Gradually scale from 1 to 1.3
      if (curvvImage) {
        curvvImage.style.transform = `scale(${scaleValue})`
      }
      if (innovistaImage) {
        innovistaImage.style.transform = `scale(${scaleValue})`
      }
    } else {
      clearInterval(loadingInterval)
      setTimeout(() => {
        loadingContainer.classList.add("fade-out")
        setTimeout(() => {
          loadingContainer.style.display = "none"
          mainContent.classList.add("active")
        }, 500)
      }, 500)
    }
  }, interval)

  // Custom Cursor
  const customCursor = document.getElementById("custom-cursor")

  if (window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
      customCursor.style.left = `${e.clientX}px`
      customCursor.style.top = `${e.clientY}px`
    })

    // Cursor hover effects
    const hoverElements = document.querySelectorAll("a, button, input, textarea, select, .faq-question, .feature-card")
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => customCursor.classList.add("hover"))
      el.addEventListener("mouseleave", () => customCursor.classList.remove("hover"))
    })
  }

  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
  const navMenu = document.getElementById("nav-menu")

  console.log("Mobile menu elements:", { mobileMenuToggle, navMenu })

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      console.log("Mobile menu toggle clicked")
      mobileMenuToggle.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Close mobile menu when clicking on a link
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuToggle.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })
  } else {
    console.error("Mobile menu elements not found:", { mobileMenuToggle, navMenu })
  }

  // Navigation highlighting and smooth scrolling
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll("section[id]")

  const updateActiveLink = () => {
    let currentActiveSectionId = ""
    const scrollY = window.scrollY

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentActiveSectionId = sectionId
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${currentActiveSectionId}`) {
        link.classList.add("active")
      }
    })
  }

  updateActiveLink()
  window.addEventListener("scroll", updateActiveLink)

  // Smooth scrolling for navigation links
  navLinks.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector(".curved-nav").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        navLinks.forEach((link) => link.classList.remove("active"))
        this.classList.add("active")
      }
    })
  })
   // Registration Form
  document.getElementById("registration-form").addEventListener("submit", function (e) {
    e.preventDefault() // prevent page reload

    const submitBtn = this.querySelector(".submit-btn")
    const originalText = submitBtn.textContent
    submitBtn.textContent = "Registering..."
    submitBtn.disabled = true

    // Get form values
    const formData = {
      userName: document.getElementById("userName").value,
      contactNumber: document.getElementById("contactNumber").value,
      emailId: document.getElementById("emailId").value,
      enrollmentNumber: document.getElementById("enrollmentNumber").value,
      branch: document.getElementById("branch").value,
      studyYear: document.getElementById("studyYear").value,
    }

    // Send data to SheetDB
    fetch("https://sheetdb.io/api/v1/m3eqlu7xax4lo", {
      // <-- apna API link daalo
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: formData }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.created === 1) {
          showRegistrationPopup(
            "success",
            "Registration Successful!",
            "🎉 Your registration has been submitted successfully! We'll contact you soon with further details about Innovista.",
            "fas fa-check-circle",
          )
          document.getElementById("registration-form").reset() // clear form
        } else {
          showRegistrationPopup(
            "error",
            "Registration Failed",
            "⚠️ Something went wrong while processing your registration. Please check your details and try again.",
            "fas fa-exclamation-triangle",
          )
        }
      })
      .catch((err) => {
        showRegistrationPopup(
          "error",
          "Connection Error",
          "❌ Unable to connect to the server. Please check your internet connection and try again.",
          "fas fa-wifi",
        )
        console.error("Registration error:", err)
      })
      .finally(() => {
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      })
  })

  function showRegistrationPopup(type, title, message, iconClass) {
    const popup = document.getElementById("registration-popup")
    const popupIcon = document.getElementById("popup-icon")
    const popupTitle = document.getElementById("popup-title")
    const popupMessage = document.getElementById("popup-message")

    // Set popup content
    popupTitle.textContent = title
    popupMessage.textContent = message

    // Set icon and styling based on type
    popupIcon.innerHTML = `<i class="${iconClass}"></i>`
    popupIcon.className = `popup-icon ${type}`

    // Show popup
    popup.classList.add("show")

    // Add click event to close button
    const closeBtn = document.getElementById("popup-close")
    closeBtn.onclick = () => {
      popup.classList.remove("show")
    }

    // Close popup when clicking outside
    popup.onclick = (e) => {
      if (e.target === popup) {
        popup.classList.remove("show")
      }
    }

    // Close popup with Escape key
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        popup.classList.remove("show")
        document.removeEventListener("keydown", handleEscape)
      }
    }
    document.addEventListener("keydown", handleEscape)
  }
  // Contact Form
  ;(() => {
    emailjs.init("n1U0WQdG85frG2EPk") // Replace with your EmailJS Public Key
  })()

  document.getElementById("contact-form").addEventListener("submit", (event) => {
    event.preventDefault()

    emailjs
      .send("service_dvfoq02", "template_lybyta4", {
        from_name: document.getElementById("contactName").value,
        from_email: document.getElementById("contactEmail").value,
        message: document.getElementById("contactMessage").value,
      })
      .then(
        () => {
          alert("Message sent successfully!")
          document.getElementById("contact-form").reset()
        },
        (error) => {
          alert("Failed to send message: " + JSON.stringify(error))
        },
      )
  })

  // FAQ Toggle
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    const answer = item.querySelector(".faq-answer")
    const toggleIcon = item.querySelector(".faq-toggle")

    question.addEventListener("click", () => {
      const isVisible = answer.style.display === "block"

      // Close all other FAQ items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.querySelector(".faq-answer").style.display = "none"
          otherItem.querySelector(".faq-toggle").textContent = "+"
          otherItem.querySelector(".faq-toggle").style.transform = "rotate(0deg)"
        }
      })

      // Toggle current item
      answer.style.display = isVisible ? "none" : "block"
      toggleIcon.textContent = isVisible ? "+" : "−"
      toggleIcon.style.transform = isVisible ? "rotate(0deg)" : "rotate(180deg)"
    })
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".feature-card, .faq-item").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroSection = document.querySelector(".hero-section")
    if (heroSection) {
      heroSection.style.transform = `translateY(${scrolled * 0.3}px)`
    }
  })

  // Dynamic floating icons
  const createFloatingIcon = () => {
    const icons = [
      "fas fa-palette",
      "fas fa-pen-nib",
      "fas fa-vector-square",
      "fas fa-bezier-curve",
      "fas fa-layer-group",
      "fas fa-magic",
      "fas fa-shapes",
      "fas fa-paint-brush",
    ]
    const floatingContainer = document.querySelector(".floating-elements")

    setInterval(() => {
      const icon = document.createElement("div")
      icon.className = "floating-icon"
      icon.innerHTML = `<i class="${icons[Math.floor(Math.random() * icons.length)]}"></i>`
      icon.style.left = Math.random() * 100 + "%"
      icon.style.animationDuration = 15 + Math.random() * 10 + "s"
      icon.style.animationDelay = "0s"

      floatingContainer.appendChild(icon)

      // Remove icon after animation
      setTimeout(() => {
        if (icon.parentNode) {
          icon.parentNode.removeChild(icon)
        }
      }, 25000)
    }, 4000)
  }

  // Start floating icons after loading
  setTimeout(createFloatingIcon, 8000)

  const rewardCards = document.querySelectorAll(".reward-card")

  rewardCards.forEach((card, index) => {
    card.addEventListener("mouseenter", () => {
      const icon = card.querySelector(".reward-icon i")
      if (icon) {
        icon.style.animationDuration = "0.5s"
        icon.style.transform = "scale(1.2) rotate(10deg)"
      }
    })

    card.addEventListener("mouseleave", () => {
      const icon = card.querySelector(".reward-icon i")
      if (icon) {
        icon.style.animationDuration = "2s"
        icon.style.transform = "scale(1) rotate(0deg)"
      }
    })
  })

  const footerLogos = document.querySelectorAll(".footer-logo-image")

  footerLogos.forEach((logo) => {
    logo.addEventListener("mouseenter", () => {
      logo.style.animationDuration = "0.5s"
      logo.style.transform = "scale(1.15) rotate(10deg)"
    })

    logo.addEventListener("mouseleave", () => {
      logo.style.animationDuration = "3s"
      logo.style.transform = "scale(1.05)"
    })
  })

  const studentIconAnimated = document.querySelector(".student-icon-animated")

  if (studentIconAnimated) {
    studentIconAnimated.addEventListener("click", () => {
      studentIconAnimated.style.animation = "studentIconFloat 0.3s ease-in-out"
      setTimeout(() => {
        studentIconAnimated.style.animation = "studentIconFloat 3s ease-in-out infinite"
      }, 300)
    })
  }

  const studentIcon = document.querySelector(".student-icon")

  if (studentIcon) {
    studentIcon.addEventListener("click", () => {
      studentIcon.style.animation = "studentIconPulse 0.3s ease-in-out"
      setTimeout(() => {
        studentIcon.style.animation = "studentIconPulse 2s ease-in-out infinite"
      }, 300)
    })
  }
})
