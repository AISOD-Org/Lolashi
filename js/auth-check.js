/**
 * Lolashi - Auth Check
 * Handles payment status and updates UI accordingly
 */

(function() {
    'use strict';

    function updateUI() {
        const isPaid = localStorage.getItem('lolashi_paid') === 'true';
        
        if (isPaid) {
            // Update all "Buy Now" and "Order" buttons/links
            const orderLinks = document.querySelectorAll('a[href="order.html"], button[onclick*="order.html"]');
            
            orderLinks.forEach(link => {
                // Don't change the "Order" link in the main navigation menu text, 
                // but change the prominent buttons
                if (link.classList.contains('btn-primary') || link.classList.contains('mobile-nav-link') || link.classList.contains('nav-link')) {
                    if (link.innerText.toLowerCase().includes('buy') || link.innerText.toLowerCase().includes('order')) {
                        link.href = 'read.html';
                        link.innerHTML = 'Read Online <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:5px;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>';
                        
                        // Special handling for the navbar button to keep it small
                        if (link.classList.contains('btn-sm')) {
                            link.innerHTML = 'Read Online';
                        }
                    }
                }
            });

            // Update specific IDs if they exist
            const readBtn = document.getElementById('read-online-btn');
            if (readBtn) {
                readBtn.href = 'read.html';
                readBtn.classList.remove('btn-outline-primary');
                readBtn.classList.add('btn-primary');
                readBtn.style.backgroundColor = 'var(--primary)';
                readBtn.style.color = '#fff';
            }
        } else {
            // Handle non-paid access for specific buttons
            const readBtn = document.getElementById('read-online-btn');
            if (readBtn) {
                readBtn.addEventListener('click', function(e) {
                    if (localStorage.getItem('lolashi_paid') !== 'true') {
                        e.preventDefault();
                        alert('Please purchase the book to unlock the online reader.');
                        window.location.href = 'order.html';
                    }
                });
            }
        }
    }

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateUI);
    } else {
        updateUI();
    }
})();
