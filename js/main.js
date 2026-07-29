/* ============================================
   LOLASHI - Static HTML/CSS/JS
   Main JavaScript
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // NAVIGATION
  // ============================================
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  let mobileMenuOpen = false;

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', function() {
      mobileMenuOpen = !mobileMenuOpen;
      if (mobileMenuOpen) {
        mobileMenu.classList.add('open');
      } else {
        mobileMenu.classList.remove('open');
      }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenuOpen = false;
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(function(link) {
    const href = link.getAttribute('href') || '';
    const pageName = href.replace('.html', '');
    if (currentPage === href || currentPage === pageName + '.html' || 
        (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ============================================
  // SCROLL ANIMATIONS (IntersectionObserver)
  // ============================================
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(function(el) {
    observer.observe(el);
  });

  // Hero animations with delays
  document.addEventListener('DOMContentLoaded', function() {
    const heroElements = document.querySelectorAll('.hero-fade-in, .hero-scale-in');
    heroElements.forEach(function(el, index) {
      const delay = el.getAttribute('data-delay') || 0;
      setTimeout(function() {
        el.classList.add('visible');
      }, parseInt(delay) * 1000);
    });
  });

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================
  const backToTop = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================
  // FAQ ACCORDION
  // ============================================
  document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const item = this.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const icon = this.querySelector('.faq-icon');
      const isOpen = answer.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-answer').forEach(function(a) {
        a.classList.remove('open');
      });
      document.querySelectorAll('.faq-icon svg:nth-child(1)').forEach(function(el) {
        el.style.display = 'block';
      });
      document.querySelectorAll('.faq-icon svg:nth-child(2)').forEach(function(el) {
        el.style.display = 'none';
      });

      // Toggle current
      if (!isOpen) {
        answer.classList.add('open');
        if (icon) {
          const svgs = icon.querySelectorAll('svg');
          if (svgs[0]) svgs[0].style.display = 'none';
          if (svgs[1]) svgs[1].style.display = 'block';
        }
      }
    });
  });

  // ============================================
  // ORDER FORM
  // ============================================
  const orderForm = document.getElementById('order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(orderForm);
      const quantity = parseInt(formData.get('quantity') || '1');
      const total = quantity * 20;
      const orderId = Math.floor(Math.random() * 900000) + 100000;
      const email = formData.get('email');

      // Store order in localStorage (simulated backend)
      const stored = JSON.parse(localStorage.getItem('lolashi_orders') || '[]');
      stored.push({
        id: orderId,
        name: formData.get('name'),
        email: email,
        phone: formData.get('phone') || '',
        address: formData.get('address'),
        quantity: quantity,
        total: total,
        date: new Date().toLocaleDateString(),
        status: 'Pending'
      });
      localStorage.setItem('lolashi_orders', JSON.stringify(stored));

      // Show success state
      const formSection = document.getElementById('order-form-section');
      const summarySection = document.getElementById('order-summary-section');
      if (formSection) formSection.style.display = 'none';
      if (summarySection) summarySection.style.display = 'none';

      const successEl = document.getElementById('order-success');
      if (successEl) {
        successEl.style.display = 'block';
        const orderIdEl = document.getElementById('success-order-id');
        if (orderIdEl) orderIdEl.textContent = '#' + orderId;
        const emailEl = document.getElementById('success-email');
        if (emailEl) emailEl.textContent = email;
      }
    });
  }

  // ============================================
  // CONTACT FORM
  // ============================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(contactForm);

      // Store message in localStorage (simulated)
      const messages = JSON.parse(localStorage.getItem('lolashi_messages') || '[]');
      messages.push({
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        date: new Date().toLocaleDateString()
      });
      localStorage.setItem('lolashi_messages', JSON.stringify(messages));

      // Show success
      const formSection = document.getElementById('contact-form-section');
      const infoSection = document.getElementById('contact-info-section');
      if (formSection) formSection.style.display = 'none';
      if (infoSection) infoSection.style.display = 'none';

      const successEl = document.getElementById('contact-success');
      if (successEl) successEl.style.display = 'block';
    });
  }

  // ============================================
  // TRACK ORDER
  // ============================================
  const trackForm = document.getElementById('track-form');
  if (trackForm) {
    trackForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const orderIdValue = document.getElementById('track-id').value.trim();
      const emailValue = document.getElementById('track-email').value.trim();

      const stored = localStorage.getItem('lolashi_orders');
      if (!stored) {
        alert('No orders found. Please place an order first.');
        return;
      }

      const allOrders = JSON.parse(stored);
      let found = null;

      // Search by order ID first
      if (orderIdValue) {
        const idNum = parseInt(orderIdValue.replace('#', ''));
        found = allOrders.find(function(o) { return o.id === idNum; });
      }

      // Fall back to email search
      if (!found && emailValue) {
        found = allOrders.find(function(o) {
          return o.email.toLowerCase() === emailValue.toLowerCase();
        });
      }

      if (!found) {
        alert('No order found with that ID or email. Please check and try again.');
        return;
      }

      // Show results
      document.getElementById('track-form-section').style.display = 'none';
      document.getElementById('track-results').style.display = 'block';

      document.getElementById('result-order-id').textContent = '#' + found.id;
      document.getElementById('result-name').textContent = found.name;
      document.getElementById('result-email').textContent = found.email;
      document.getElementById('result-date').textContent = found.date;
      document.getElementById('result-quantity').textContent = found.quantity;

      var today = new Date().toLocaleDateString();
      document.getElementById('step-date-placed').textContent = found.date;
      document.getElementById('step-date-payment').textContent = found.date;
      document.getElementById('step-date-processing').textContent = today;
    });
  }

  // New search button
  const newSearchBtn = document.getElementById('new-search-btn');
  if (newSearchBtn) {
    newSearchBtn.addEventListener('click', function() {
      document.getElementById('track-results').style.display = 'none';
      document.getElementById('track-form-section').style.display = 'block';
      document.getElementById('track-id').value = '';
      document.getElementById('track-email').value = '';
    });
  }

  // (No search toggle buttons in simplified track-order)

  function getStatusIndex(status) {
    var statuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];
    var idx = statuses.indexOf(status);
    return idx >= 0 ? idx : 0;
  }

  function getStatusBadgeClass(status) {
    switch(status) {
      case 'Pending': return '';
      case 'Processing': return 'bg-primary/10 text-primary';
      case 'Shipped': return 'bg-primary/10 text-primary';
      case 'Delivered': return 'bg-green-500/20 text-green-600';
      default: return '';
    }
  }

  function getStatusStepsHTML(status) {
    var steps = [
      { key: 'Pending', label: 'Order Placed' },
      { key: 'Processing', label: 'Processing' },
      { key: 'Shipped', label: 'Shipped' },
      { key: 'Delivered', label: 'Delivered' }
    ];
    var currentIdx = getStatusIndex(status);
    var html = '';
    steps.forEach(function(step, i) {
      var completed = i < currentIdx;
      var current = i === currentIdx;
      var iconClass = completed ? 'completed' : (current ? 'current' : '');
      var labelClass = completed ? 'completed' : '';
      var checkmark = completed ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' : 
                      (current ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle></svg>' :
                      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>');
      html += `<div class="status-step">
        <div class="status-step-icon ${iconClass}">${checkmark}</div>
        <p class="status-step-label ${labelClass}">${step.label}</p>
      </div>`;
    });
    return html;
  }

  // ============================================
  // NEWSLETTER
  // ============================================
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var email = document.getElementById('newsletter-email').value;
      
      // Store in localStorage
      var subscribers = JSON.parse(localStorage.getItem('lolashi_subscribers') || '[]');
      subscribers.push({ email: email, date: new Date().toLocaleDateString() });
      localStorage.setItem('lolashi_subscribers', JSON.stringify(subscribers));

      // Show success
      var formEl = document.getElementById('newsletter-form-el');
      if (formEl) formEl.style.display = 'none';
      var successEl = document.getElementById('newsletter-success');
      if (successEl) successEl.style.display = 'block';
    });
  }

  // ============================================
  // SHARE BUTTONS
  // ============================================
  document.querySelectorAll('.share-copy-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var url = window.location.href;
      navigator.clipboard.writeText(url).then(function() {
        btn.classList.add('copied');
        var icon = btn.querySelector('.copy-icon');
        if (icon) icon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        setTimeout(function() {
          btn.classList.remove('copied');
          if (icon) icon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
        }, 2000);
      });
    });
  });

  // ============================================
  // ORDER QUANTITY CALCULATION
  // ============================================
  const quantityInput = document.getElementById('order-quantity');
  const totalDisplay = document.getElementById('order-total');
  if (quantityInput && totalDisplay) {
    quantityInput.addEventListener('input', function() {
      var qty = parseInt(this.value) || 1;
      totalDisplay.textContent = '$' + (qty * 20) + ' USD';
    });
  }

  // ============================================
  // RESET ORDER BUTTON
  // ============================================
  const resetOrderBtn = document.getElementById('reset-order-btn');
  if (resetOrderBtn) {
    resetOrderBtn.addEventListener('click', function() {
      location.reload();
    });
  }

  // ============================================
  // CONTACT SUCCESS RESET
  // ============================================
  const resetContactBtn = document.getElementById('reset-contact-btn');
  if (resetContactBtn) {
    resetContactBtn.addEventListener('click', function() {
      location.reload();
    });
  }

})();
