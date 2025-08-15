    document.addEventListener('DOMContentLoaded', () => {
      // --- 1. AOS Initialization ---
      AOS.init({
        duration: 800,
        once: true,
        offset: 100,
      });

      // --- 2. Navbar & Mobile Menu Logic ---
      const nav = document.getElementById('main-nav');
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      const mobileMenu = document.getElementById('mobile-menu');
      const hamburgerIcon = document.getElementById('hamburger-icon');
      const closeIcon = document.getElementById('close-icon');
      const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

      if (nav) {
        window.addEventListener('scroll', () => {
          if (window.scrollY > 50) {
            nav.classList.add('scrolled');
          } else {
            nav.classList.remove('scrolled');
          }
        });
      }

      if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
          const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
          mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
          mobileMenu.classList.toggle('hidden');
          hamburgerIcon.classList.toggle('hidden');
          closeIcon.classList.toggle('hidden');
        });
      }
      
      mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
          hamburgerIcon.classList.remove('hidden');
          closeIcon.classList.add('hidden');
          mobileMenuButton.setAttribute('aria-expanded', 'false');
        });
      });

      // --- 3. Elite Pass Modal Logic ---
      const openModalBtn = document.getElementById('open-pass-modal');
      const closeModalBtn = document.getElementById('close-pass-modal');
      const passModal = document.getElementById('pass-modal');

      const toggleModal = (show) => {
        if(passModal) {
            passModal.classList.toggle('hidden', !show);
            document.body.style.overflow = show ? 'hidden' : '';
        }
      };

      if (openModalBtn) openModalBtn.addEventListener('click', () => toggleModal(true));
      if (closeModalBtn) closeModalBtn.addEventListener('click', () => toggleModal(false));
      if (passModal) {
        passModal.addEventListener('click', (event) => {
          if (event.target === passModal) toggleModal(false);
        });
      }
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !passModal.classList.contains('hidden')) {
          toggleModal(false);
        }
      });
      
      // --- 4. Terms Accordion Logic ---
      const termsButton = document.getElementById('terms-accordion-button');
      const termsContent = document.getElementById('terms-accordion-content');
      const termsIcon = document.getElementById('terms-accordion-icon');

      if (termsButton && termsContent && termsIcon) {
        termsButton.addEventListener('click', () => {
          const isExpanded = termsButton.getAttribute('aria-expanded') === 'true';
          termsButton.setAttribute('aria-expanded', !isExpanded);
          
          if (isExpanded) {
            termsContent.style.maxHeight = null;
            termsIcon.style.transform = 'rotate(0deg)';
          } else {
            termsContent.style.maxHeight = termsContent.scrollHeight + 'px';
            termsIcon.style.transform = 'rotate(180deg)';
          }
        });
      }
    });