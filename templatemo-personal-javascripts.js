/*

TemplateMo 593 personal shape

https://templatemo.com/tm-593-personal-shape

*/

// JavaScript Document

        // Mobile menu functionality
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close mobile menu when clicking on links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Enhanced Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Staggered animation for portfolio items
        const portfolioObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.portfolio-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.1 });

        // Observe all animation elements
        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
            animatedElements.forEach(el => observer.observe(el));

            const portfolioSection = document.querySelector('.portfolio-grid');
            if (portfolioSection) {
                portfolioObserver.observe(portfolioSection);
            }
        });

        // Enhanced smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Enhanced form submission with better UX
        document.querySelector('.contact-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.target;
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
        
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });
        
                if (response.ok) {
                    submitBtn.textContent = 'Message Sent! ✓';
                    form.reset();
                } else {
                    submitBtn.textContent = 'Error ❌';
                }
            } catch (error) {
                submitBtn.textContent = 'Network Error ❌';
            }
        
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
        


       // Subtle parallax for hero background image
       let ticking = false;

       function updateParallax() {
         const heroImg = document.querySelector('.hero-bg img');
         if (!heroImg) return;
       
         const scrolled = window.pageYOffset;
       
         if (window.innerWidth > 768) {
           // smooth subtle parallax for desktop
           const rate = scrolled * -0.3;
           heroImg.style.transform = `translateY(${rate}px) scale(1.05)`;
         } else {
           // disable on mobile for smoothness
           heroImg.style.transform = 'translateY(0) scale(1.05)';
         }
       
         ticking = false;
       }
       
       window.addEventListener('scroll', () => {
         if (!ticking) {
           requestAnimationFrame(updateParallax);
           ticking = true;
         }
       });
       

       // Our Work //

 // Our Work //

 document.querySelectorAll('.portfolio-item').forEach(item => {
  const slides = item.querySelectorAll('.portfolio-slide');
  const next = item.querySelector('.next-slide');
  const prev = item.querySelector('.prev-slide');
  let index = 0;

  function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    index = (n + slides.length) % slides.length;
    slides[index].classList.add('active');
  }

  if (next) next.addEventListener('click', () => showSlide(index + 1));
  if (prev) prev.addEventListener('click', () => showSlide(index - 1));

  /* Swipe gesture for mobile */
  let startX = 0;
  item.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  item.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) showSlide(index - 1); // swipe right
    else if (startX - endX > 50) showSlide(index + 1); // swipe left
  });
});


const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-image');
const closeBtn = document.querySelector('.lightbox-close');
const nextBtn = document.querySelector('.lightbox-next');
const prevBtn = document.querySelector('.lightbox-prev');

let currentImages = [];
let currentIndex = 0;

// open lightbox when any image slider is clicked
document.querySelectorAll('.portfolio-slider').forEach(slider => {
  slider.addEventListener('click', () => {
    currentImages = slider.dataset.images.split(',');
    currentIndex = 0;
    openLightbox(currentImages[currentIndex]);
  });
});

function openLightbox(src) {
  lightbox.classList.add('active');
  lightboxImg.src = src;
}

function closeLightbox() {
  lightbox.classList.remove('active');
}

function showImage(index) {
  if (!currentImages.length) return;
  currentIndex = (index + currentImages.length) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex];
}

nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
closeBtn.addEventListener('click', closeLightbox);

// Close when clicking outside the image
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

// Swipe for mobile
let startX = 0;
lightbox.addEventListener('touchstart', e => startX = e.touches[0].clientX);
lightbox.addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;
  if (endX - startX > 50) showImage(currentIndex - 1); // swipe right
  else if (startX - endX > 50) showImage(currentIndex + 1); // swipe left
});

