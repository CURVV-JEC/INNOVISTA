
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

  mobileMenuToggle.addEventListener("click", () => {
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

  // Navigation highlighting and smooth scrolling
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll("main section")

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
  const registrationForm = document.getElementById("registration-form")
  registrationForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = {
      userName: document.getElementById("userName").value,
      contactNumber: document.getElementById("contactNumber").value,
      enrollmentNumber: document.getElementById("enrollmentNumber").value,
      emailId: document.getElementById("emailId").value,
      branch: document.getElementById("branch").value,
      studyYear: document.getElementById("studyYear").value,
    }

    console.log("Registration Data:", formData)

    const submitBtn = registrationForm.querySelector(".submit-btn")
    const originalText = submitBtn.textContent
    submitBtn.textContent = "Successfully Registered!"
    submitBtn.style.background = "linear-gradient(45deg, #10b981, #34d399)"

    alert("Successfully Registered! Welcome to Innovista.")

    setTimeout(() => {
      submitBtn.textContent = originalText
      submitBtn.style.background = "linear-gradient(45deg, var(--primary-blue), var(--neon-blue))"
      registrationForm.reset()
    }, 3000)
  })

  // Contact Form
  const contactForm = document.getElementById("contact-form")
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = {
      contactName: document.getElementById("contactName").value,
      contactEmail: document.getElementById("contactEmail").value,
      contactMessage: document.getElementById("contactMessage").value,
    }

    console.log("Contact Data:", formData)

    const submitBtn = contactForm.querySelector(".submit-btn")
    const originalText = submitBtn.textContent
    submitBtn.textContent = "Message Sent!"
    submitBtn.style.background = "linear-gradient(45deg, #10b981, #34d399)"

    alert("Your message has been sent successfully! We'll get back to you soon.")

    setTimeout(() => {
      submitBtn.textContent = originalText
      submitBtn.style.background = "linear-gradient(45deg, var(--primary-blue), var(--neon-blue))"
      contactForm.reset()
    }, 3000)
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

