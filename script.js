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

// ========== TYPEWRITER EFFECT ==========
const textElement = document.querySelector('.home__desc');
const textContent = textElement.textContent;
textElement.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < textContent.length) {
        textElement.textContent += textContent.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
    }
};

window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// ========== CONTACT FORM HANDLING ==========
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formStatus.style.display = 'block';
        formStatus.textContent = 'Message sent successfully! ✅';
        contactForm.reset();
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 3000);
    });
}

// ========== PROJECT MODAL LOGIC ==========
const projectsData = {
    'server': {
        title: 'Server Maintenance & Optimization',
        mainImg: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
        desc: 'Proyek ini melibatkan perawatan rutin dan optimalisasi performa server lokal perusahaan. Kegiatan meliputi pembersihan *hardware* dari debu, penggantian *thermal paste* pada CPU, penambahan kapasitas RAM, serta konfigurasi ulang RAID untuk redundansi data. Selain itu, dilakukan pembaruan sistem operasi dan penutupan celah keamanan (patching) untuk memastikan server tetap stabil dan aman dari serangan siber.',
        tags: ['Hardware', 'Linux Server', 'RAID Config', 'Security Patch']
    },
    'motion': {
        title: '3D Motion Graphic Asset',
        mainImg: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
        desc: 'Pembuatan aset visual multimedia 3D untuk kebutuhan *company profile* klien. Proses dimulai dari pembuatan *storyboard*, pemodelan 3D (3D Modeling), pemberian tekstur dan pencahayaan (Texturing & Lighting), hingga proses *rendering* akhir. Hasil akhir dipadukan dengan video live-action untuk menciptakan efek transisi mekanik dan futuristik yang memukau audiens.',
        tags: ['Blender', 'After Effects', '3D Modeling', 'Motion Tracking']
    },
    'network': {
        title: 'Office Network Cabling',
        mainImg: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop',
        desc: 'Instalasi infrastruktur jaringan untuk kantor cabang baru. Pekerjaan mencakup penarikan kabel UTP Cat6 melalui jalur pipa (conduit) yang rapi, pemasangan colokan RJ45, serta *crimping* standar T568B. Setelah kabel terpasang, dilakukan konfigurasi Router Mikrotik untuk manajemen *bandwidth*, pembagian VLAN, dan pengaturan *firewall* agar jaringan lokal aman dan terdistribusi dengan baik ke setiap workstation.',
        tags: ['Mikrotik', 'LAN/WAN', 'UTP Cat6', 'VLAN']
    },
    'video': {
        title: 'Social Media Video Campaign',
        mainImg: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?q=80&w=800&auto=format&fit=crop',
        desc: 'Produksi video pendek (Reels/TikTok) untuk kampanye peluncuran produk terbaru. Bertanggung jawab penuh dalam proses *editing* video, *color grading*, penambahan *sound effect* (SFX), serta menyusun ritme video agar selaras dengan musik latar (BGM). Video diberi sentuhan *glitch effect* dan teks bergaya mekanik untuk menarik perhatian generasi muda.',
        tags: ['Premiere Pro', 'Color Grading', 'Sound Design', 'Glitch Effect']
    }
};

const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalDesc = document.getElementById('modal-desc');
const modalTags = document.getElementById('modal-tags');
const workCards = document.querySelectorAll('.work__card');

const openModal = (projectId) => {
    const project = projectsData[projectId];
    
    if (project) {
        modalTitle.textContent = project.title;
        modalImg.src = project.mainImg;
        modalDesc.textContent = project.desc;
        
        modalTags.innerHTML = '';
        project.tags.forEach(tag => {
            const span = document.createElement('span');
            span.classList.add('modal__tag');
            span.textContent = tag;
            modalTags.appendChild(span);
        });

        modal.classList.add('show-modal');
        document.body.style.overflow = 'hidden';
    }
};

const closeModal = () => {
    modal.classList.remove('show-modal');
    document.body.style.overflow = 'auto';
};

workCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        openModal(projectId);
    });
});

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show-modal')) {
        closeModal();
    }
});
