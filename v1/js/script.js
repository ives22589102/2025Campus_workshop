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

       // --- 12. Social Share Widget Logic (Unified Text for Workshop) ---
      function setupShareWidget() {
        const shareWidget = document.getElementById('social-share-widget');
        const mainShareBtn = document.getElementById('main-share-btn');
        const shareButtons = document.querySelectorAll('[data-share-network]');
        
        if (!shareWidget || !mainShareBtn) return;

        // --- Basic Widget Toggle ---
        mainShareBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          shareWidget.classList.toggle('active');
        });

        document.addEventListener('click', () => {
          shareWidget.classList.remove('active');
        });

        // --- Share Logic ---
        const shareUrl = document.querySelector('link[rel="canonical"]')?.href || window.location.href;
        const encodedUrl = encodeURIComponent(shareUrl);

       
        const customShareText = `想學水冷超頻、PCDIY 裝機？ROG 菁英工作坊免費報名中！由世界冠軍親自指導，還有盟校限定鍵盤改裝課程，成功入選還可獲得限量「ROG 菁英通行證，快來卡位！ #ROG菁英召集令 #ROG菁英工作坊 #水冷超頻 #PCDIY #鍵盤改裝 #ROG ${shareUrl}`;
        const encodedCustomShareText = encodeURIComponent(customShareText);

        shareButtons.forEach(button => {
          button.addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault(); 
            
            const network = button.dataset.shareNetwork;
            let url;

            if (window.dataLayer) {
              window.dataLayer.push({
                'event': 'data_layer_event', 'event_name_ga4': 'share',  
                'event_category_DL': 'Social Share', 'event_action_DL': 'click',             
                'event_label_DL': network.charAt(0).toUpperCase() + network.slice(1)
              });
            }

            switch (network) {
              case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;

              case 'threads':
              
                url = `https://www.threads.net/intent/post?text=${encodedCustomShareText}`;
                break;

              case 'twitter':
                
                url = `https://twitter.com/intent/tweet?text=${encodedCustomShareText}`;
                break;
              
              case 'line':
                url = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`;
                break;

              case 'copy':
                navigator.clipboard.writeText(shareUrl).then(() => {
                  button.classList.add('copied');
                  setTimeout(() => button.classList.remove('copied'), 2000);
                }).catch(err => console.error('無法複製連結:', err));
                return;
            }
            
            window.open(url, '_blank', 'noopener,noreferrer,width=600,height=450');
          });
        });
      }
      
      // 呼叫新的函式來設定分享按鈕
      setupShareWidget();

    });