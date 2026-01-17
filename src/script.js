document.addEventListener("DOMContentLoaded", () => {
  /* =============================
          NAVBAR FIXED
  ============================= */
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      const fixedNav = header.offsetTop;
      header.classList.toggle("navbar-fixed", window.pageYOffset > fixedNav);
    });
  }

  /* =============================
          HAMBURGER MENU
  ============================= */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("hamburger-active");
      navMenu.classList.toggle("hidden");
    });
  }

  /* =============================
          DARK MODE
  ============================= */
  const html = document.documentElement;
  const darkToggle = document.getElementById("dark-toggle");

  if (localStorage.theme === "dark") {
    html.classList.add("dark");
  }

  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      html.classList.toggle("dark");
      localStorage.theme = html.classList.contains("dark") ? "dark" : "light";
    });
  }

  /* =============================
          BACK TO TOP
  ============================= */
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    window.addEventListener("scroll", () => {
      const show = window.scrollY > 300;
      backToTop.classList.toggle("hidden", !show);
      backToTop.classList.toggle("opacity-100", show);
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* =============================
          TYPING EFFECT
  ============================= */
  const typingText = document.getElementById("typingText");
  if (typingText) {
    const words = {
      id: [
        "Mahasiswa",
        "Sistem Informasi",
        "Universitas Subang",
        "Programmer Pemula",
        "Pemain Bola Basket",
      ],
      en: [
        "Student",
        "Information Systems",
        "Subang University",
        "Beginner Programmer",
        "Basketball Player",
      ]
    };

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typeEffect = () => {
      const currentWords = words[currentLang];
      const word = currentWords[wordIndex];
      typingText.textContent = word.substring(0, charIndex);

      if (!deleting) {
        if (charIndex < word.length) {
          charIndex++;
        } else {
          deleting = true;
        }
      } else {
        if (charIndex > 0) {
          charIndex--;
        } else {
          deleting = false;
          wordIndex = (wordIndex + 1) % currentWords.length;
        }
      }

      setTimeout(typeEffect, deleting ? 90 : 150);
    };

    typeEffect();
  }

  /* =============================
          PRELOADER
  ============================= */
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.style.opacity = "0";
      preloader.style.transition = "opacity 0.5s ease";
      setTimeout(() => (preloader.style.display = "none"), 500);
    });
  }

  /* =============================
          LOVE CONFETTI
  ============================= */
  const loveBtn = document.getElementById("loveBtn");

  if (loveBtn) {
    loveBtn.addEventListener("click", () => {
      const rect = loveBtn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      for (let i = 0; i < 10; i++) createConfetti(x, y);

      loveBtn.classList.add("scale-125");
      setTimeout(() => loveBtn.classList.remove("scale-125"), 150);
    });
  }

  function createConfetti(x, y) {
    const confetti = document.createElement("span");
    const icons = ["💙", "✨", "⭐", "🎉", "😍", "🔥", "💕"];
    confetti.textContent = icons[Math.floor(Math.random() * icons.length)];
    confetti.style.position = "fixed";
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;
    confetti.style.pointerEvents = "none";
    confetti.style.zIndex = "9999";

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 80 + 40;

    confetti.animate(
      [
        { transform: "translate(0,0)", opacity: 1 },
        {
          transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance
            }px)`,
          opacity: 0,
        },
      ],
      { duration: 900, easing: "ease-out" }
    );

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 900);
  }

  /* =============================
          LIGHTBOX GALLERY
  ============================= */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImage");
  const btnClose = document.getElementById("lightboxClose");
  const btnNext = document.getElementById("lightboxNext");
  const btnPrev = document.getElementById("lightboxPrev");
  const images = document.querySelectorAll(".portfolio-img");

  let currentIndex = 0;

  if (lightbox && lightboxImg && images.length) {
    images.forEach((img, index) => {
      img.addEventListener("click", () => openLightbox(index));
    });

    btnClose?.addEventListener("click", closeLightbox);
    btnNext?.addEventListener("click", () => changeImage(1));
    btnPrev?.addEventListener("click", () => changeImage(-1));

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (lightbox.classList.contains("hidden")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") changeImage(1);
      if (e.key === "ArrowLeft") changeImage(-1);
    });
  }

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    lightbox.classList.remove("hidden");
    lightbox.classList.add("flex");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");
    document.body.style.overflow = "";
  }

  function changeImage(step) {
    currentIndex = (currentIndex + step + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
  }
});


/* =============================
        EMAIL
============================= */
(function () {
  emailjs.init("LReyN8RNEQco_YO2z");
})();

const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");

const messages = {
  id: {
    sending: "Mengirim pesan...",
    success: "Pesan berhasil dikirim ✅",
    error: "Gagal mengirim pesan ❌"
  },
  en: {
    sending: "Sending message...",
    success: "Message sent successfully ✅",
    error: "Failed to send message ❌"
  }
};

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    statusText.textContent = messages[currentLang].sending;
    statusText.className = "text-sky-400";

    emailjs
      .send("service_jdp7ykp", "template_y5sgvr6", {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
      })
      .then(() => {
        statusText.textContent = messages[currentLang].success;
        statusText.className = "text-green-500";
        form.reset();

        setTimeout(() => {
          statusText.style.transition = "opacity 0.5s ease";
          statusText.style.opacity = "0";
          setTimeout(() => {
            statusText.textContent = "";
            statusText.style.opacity = "1";
          }, 500);
        }, 3000);
      })
      .catch(() => {
        statusText.textContent = messages[currentLang].error;
        statusText.className = "text-red-500";

        setTimeout(() => {
          statusText.style.transition = "opacity 0.5s ease";
          statusText.style.opacity = "0";
          setTimeout(() => {
            statusText.textContent = "";
            statusText.style.opacity = "1";
          }, 500);
        }, 3000);
      });
  });
}

/* =============================
      TRANSLATIONS
============================= */
const translations = {
  id: {
    'nav-home': 'Beranda',
    'hero-greeting': 'Halo Semua 👋, saya',
    'hero-desc': 'Belajar Desain Web itu mudah dan menyenagkan bukan. Bukan!',
    'hero-cta': 'Hubungi Saya',
    'about-title': 'Tentang Saya',
    'about-subtitle': 'Mahasiswa yang Penuh Semangat Belajar',
    'about-desc-1': 'Halo! Saya Arya Putra Aditya, mahasiswa Sistem Informasi semester 1 di Universitas Subang. Saya baru memulai perjalanan di dunia coding dan masih belajar banyak hal.',
    'about-desc-2': 'Meskipun masih pemula, saya sangat antusias untuk terus berkembang dalam web development, khususnya menggunakan Tailwind CSS yang menurut saya sangat menarik dan powerful!',
    'about-desc-3': 'Di luar kuliah, saya memiliki hobi bermain basket yang sudah saya geluti sejak SMP. Olahraga ini mengajarkan saya tentang teamwork, disiplin, dan tidak mudah menyerah. Dan nilai-nilai inilah yang juga saya terapkan saat belajar coding.',
    'social-title': 'Mari Berteman',
    'social-desc': 'Saya senang berbagi pengalaman dan belajar dari orang lain. Jika kamu juga mahasiswa IT pemula atau pecinta basket, yuk connect! Saya aktif di berbagai platform media sosial.',
    'gallery-subtitle': 'Koleksi Galeri',
    'gallery-desc': 'Berikut adalah kumpulan beberapa momen berharga yang telah saya abadikan.',
    'clients-subtitle': 'Yang Pernah Bekerjasama',
    'clients-desc': 'Bangga telah bekerja sama dengan berbagai organisasi dan tim basket yang luar biasa. Setiap kolaborasi membawa pengalaman berharga.',
    'blog-subtitle': 'Tulisan Terkini',
    'blog-date-1': '5 Jan 2024 • 7 menit baca',
    'blog-title-1': 'Belajar Tailwind CSS dari Nol Sampai Bisa',
    'blog-desc-1': 'Panduan praktis memahami konsep utility-first Tailwind CSS untuk membangun UI modern dan responsif dengan cepat dan efisien.',
    'blog-readmore-1': 'Baca Selengkapnya',
    'blog-date-2': '15 Jan 2026 • 7 menit baca',
    'blog-title-2': 'Hasil Project Pertamaku Membuat Website',
    'blog-desc-2': 'Berbagi pengalaman dan tantangan saat membuat website pertama kali menggunakan HTML, CSS, dan JS dalam satu project.',
    'blog-readmore-2': 'Baca Selengkapnya',
    'blog-date-3': '12 Des 2025 • 5 menit baca',
    'blog-title-3': 'Arya Putra Aditya Jadi Player of The Match pada Laga Terakhir BK Porprov',
    'blog-desc-3': ' Arya Putra Aditya tampil gemilang sepanjang pertandingan dengan mencatatkan 24 poin, 12 steal, dan 11 rebound. Statistik tersebut menunjukkan kontribusi besar baik dalam aspek menyerang maupun bertahan, sekaligus menjadi faktor penting dalam permainan Tim Basket Kabupaten Subang.',
    'blog-readmore-3': 'Baca Selengkapnya',
    'blog-desc': ' Hasil project pribadi dan Pengalaman saya dalam menjalani hobi dibidang olahraga Basket.',
    'blog-loadmore': 'Muat Artikel Lainnya',
    'contact-subtitle': 'Hubungi Kami',
    'contact-desc': 'Silakan hubungi kami untuk kolaborasi, diskusi, atau pertanyaan lainnya.',
    'contact-name': 'Nama',
    'contact-message': 'Pesan',
    'contact-email': 'Email',
    'contact-submit': 'Kirim Pesan 🚀',
    'footer-title': 'Fakultas Ilmu Komputer',
    'footer-contact': 'Hubungi Kami',
    'footer-categories': 'Kategori Tulisan',
    'footer-category-technology': 'Teknologi',
    'footer-category-lifestyle': 'Gaya Hidup',
    'footer-links': 'Tautan',
    'footer-copyright': 'Dibuat dengan oleh',
    'footer-copyright-1': 'oleh',
    'footer-copyright-2': 'menggunakan',
  },
  en: {
    'nav-home': 'Home',
    'hero-greeting': 'Hello Everyone 👋, I am',
    'hero-desc': 'Learning Web Design is easy and fun, right? No!',
    'hero-cta': 'Contact Me',
    'about-title': 'About Me',
    'about-subtitle': 'Student Passionate About Learning',
    'about-desc-1': 'Hi! I\'m Arya Putra Aditya, a first semester Information Systems student at Subang University. I\'m just starting my journey in coding and still learning many things.',
    'about-desc-2': 'Although still a beginner, I\'m very enthusiastic to continue developing in web development, especially using Tailwind CSS which I find very interesting and powerful!',
    'about-desc-3': 'Outside of college, I have a passion for playing basketball which I\'ve been doing since junior high school. This sport has taught me about teamwork, discipline, and perseverance. These are the values I also apply when learning to code.',
    'social-title': 'Let\'s Connect',
    'social-desc': 'I enjoy sharing experiences and learning from others. If you\'re also a beginner IT student or basketball lover, let\'s connect! I\'m active on various social media platforms.',
    'gallery-subtitle': 'Gallery Collection',
    'gallery-desc': 'Here is a collection of precious moments that I have captured.',
    'clients-subtitle': 'Collaboration Partners',
    'clients-desc': 'Proud to have collaborated with various organizations and amazing basketball teams. Every collaboration brings valuable experience.',
    'blog-subtitle': 'Latest Writings',
    'blog-date-1': '5 Jan 2024 • 7 minutes read',
    'blog-title-1': 'Learning Tailwind CSS from Scratch to Proficient',
    'blog-desc-1': 'A practical guide to understanding the utility-first concept of Tailwind CSS for building modern and responsive UIs quickly and efficiently.',
    'blog-readmore-1': 'Read More',
    'blog-date-2': '15 Jan 2026 • 7 minutes read',
    'blog-title-2': 'My First Project: Creating a Website',
    'blog-desc-2': 'Sharing experiences and challenges while creating my first website using HTML, CSS, and JS in one project.',
    'blog-readmore-2': 'Read More',
    'blog-date-3': '12 Dec 2025 • 5 minutes read',
    'blog-title-3': 'Arya Putra Aditya Named Player of the Match in the Last BK Porprov Game',
    'blog-desc-3': 'Arya Putra Aditya performed brilliantly throughout the match with 24 points, 12 steals, and 11 rebounds. These statistics show a significant contribution both offensively and defensively, making him a key factor in the performance of the Subang County Basketball Team.',
    'blog-readmore-3': 'Read More',
    'blog-desc': ' Personal project results and my experiences in pursuing my hobby in basketball.',
    'blog-loadmore': 'Load More Articles',
    'contact-subtitle': 'Contact Us',
    'contact-desc': 'Please contact us for collaboration, discussion, or any other questions.',
    'contact-name': 'Name',
    'contact-email': 'Email',
    'contact-message': 'Message',
    'contact-submit': 'Send Message 🚀',
    'footer-title': 'Faculty of Computer Science',
    'footer-contact': 'Contact Us',
    'footer-categories': 'Writing Categories',
    'footer-category-technology': 'Technology',
    'footer-category-lifestyle': 'Lifestyle',
    'footer-links': 'Links',
    'footer-copyright': 'Created with',
    'footer-copyright-1': 'by',
    'footer-copyright-2': 'using',
  }
};

let currentLang = localStorage.getItem('lang') || 'id';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.dataset.translate;
    if (translations[lang][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[lang][key];
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });
}

setLanguage(currentLang);

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    setLanguage(btn.dataset.lang);
  });
});
