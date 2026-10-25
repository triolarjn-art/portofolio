// ========== MENU MOBILE ==========
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

document.querySelectorAll('.nav__link').forEach(n => n.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
}));

// ========== SCROLL REVEAL (ANIMASI MUNCUL) ==========
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        } else {
            reveal.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ========== ACTIVE LINK ON SCROLL ==========
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector(`.nav__list a[href*="${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active-link');
            } else {
                navLink.classList.remove('active-link');
            }
        }
    });
});

// ========== TYPEWRITER EFFECT (MULTIMEDIA TOUCH) ==========
// Efek mengetik pada deskripsi di Home
const textElement = document.querySelector('.home__desc');
const textContent = textElement.textContent;
textElement.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < textContent.length) {
        textElement.textContent += textContent.charAt(i);
        i++;
        setTimeout(typeWriter, 30); // Kecepatan mengetik (ms)
    }
};

// Mulai mengetik setelah halaman dimuat sepenuhnya (delay 1 detik)
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// ========== CONTACT FORM HANDLING ==========
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Mencegah reload halaman
        
        // Tampilkan pesan sukses
        formStatus.style.display = 'block';
        formStatus.textContent = 'Message sent successfully! ✅';
        
        // Reset form
        contactForm.reset();
        
        // Hilangkan pesan setelah 3 detik
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 3000);
    });
}
