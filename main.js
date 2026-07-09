document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons when DOM is ready
  if (window.lucide) {
    window.lucide.createIcons();
  }
  
  // --- HEADER SCROLL EFFECT ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- MOBILE MENU TOGGLE ---
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const menuIcon = menuToggle.querySelector('.btn-icon');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isActive = navMenu.classList.contains('active');
      
      // Update menu icon (Lucide does this dynamically by changing the data attribute or replacing the inner SVG)
      if (isActive) {
        menuToggle.innerHTML = '<i data-lucide="x" class="btn-icon"></i>';
      } else {
        menuToggle.innerHTML = '<i data-lucide="menu" class="btn-icon"></i>';
      }
      if (window.lucide) {
        window.lucide.createIcons();
      }
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i data-lucide="menu" class="btn-icon"></i>';
        if (window.lucide) {
          window.lucide.createIcons();
        }
      });
    });
  }

  // --- ACTIVE NAV LINK ON SCROLL ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  const navObserverOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the middle part of the viewport
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });

  // --- REVEAL ANIMATIONS ON SCROLL ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px', // Trigger slightly before the element enters the viewport
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Stop observing after anim triggers
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // --- CONTACT FORM SUBMISSION ---
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-message');

  if (contactForm && successMessage) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic Validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const projectType = document.getElementById('project-type').value;
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !projectType || !message) {
        alert('Bitte fülle alle erforderlichen Felder aus.');
        return;
      }

      // Change button state to loading
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Wird gesendet... <i data-lucide="loader" class="btn-icon animate-spin"></i>';
      if (window.lucide) {
        window.lucide.createIcons();
      }

      // Simulate API call
      setTimeout(() => {
        // Hide Form with transition
        contactForm.style.transition = 'opacity 0.4s ease';
        contactForm.style.opacity = '0';
        
        setTimeout(() => {
          contactForm.style.display = 'none';
          successMessage.style.display = 'block';
          successMessage.style.opacity = '0';
          
          // Fade in success message
          setTimeout(() => {
            successMessage.style.transition = 'opacity 0.4s ease';
            successMessage.style.opacity = '1';
          }, 50);
        }, 400);

      }, 1500); // 1.5s delay
    });
  }
});
