// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        
        // Change icon based on menu state
        const icon = menuToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Handle window resize to fix navigation display issues
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            mainNav.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (window.innerWidth < 768) {
                    mainNav.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                
                // Scroll to element with offset for fixed header
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    const formMessage = document.getElementById('form-message');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            
            // Very basic email validation
            if (!validateEmail(email)) {
                formMessage.textContent = 'Please enter a valid email address.';
                formMessage.style.color = '#f8d7da';
                return;
            }
            
            // Simulate form submission success
            // In a real application, you would send this to your server
            formMessage.textContent = 'Thank you for subscribing to our newsletter!';
            formMessage.style.color = '#d4edda';
            newsletterForm.reset();
            
            // Clear success message after 3 seconds
            setTimeout(() => {
                formMessage.textContent = '';
            }, 3000);
        });
    }
    
    
    // Pattern card hover effects
    const patternCards = document.querySelectorAll('.pattern-card');
    
    patternCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Handle active navigation state
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('header').offsetHeight;
        
        // Get all sections that have IDs
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100; // Add some buffer
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                document.querySelectorAll('nav ul li a').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's link
                const activeLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Call once on page load
    updateActiveNavLink();
    
    // Helper function for email validation
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Add touch support for mobile devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Make card links more accessible on touch devices
        document.querySelectorAll('.pattern-card').forEach(card => {
            const cardLink = card.querySelector('.btn');
            
            card.addEventListener('click', function(e) {
                if (e.target !== cardLink) {
                    e.preventDefault();
                    cardLink.click();
                }
            });
        });
    }
});