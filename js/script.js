// ==================== INISIALISASI AOS ====================
 // Fungsi ini untuk mengaktifkan library Animate On Scroll (AOS).
 // Ini yang membuat elemen muncul (fade-up, zoom-in) saat di-scroll.
 // 'duration: 1000' berarti animasi berjalan selama 1 detik.
 // 'once: true' berarti animasi hanya berjalan sekali.
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// ==================== NAVBAR SCROLL EFFECT ====================
// Fungsi ini akan mengecilkan padding (jarak) navbar saat user scroll ke bawah.
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) { // Jika user scroll lebih dari 50px
        navbar.style.padding = '10px 0'; // Navbar mengecil
    } else {
        navbar.style.padding = '15px 0'; // Navbar kembali normal
    }
});

// ==================== SMOOTH SCROLL FOR NAVIGATION ====================
// Fungsi ini membuat halaman scroll dengan halus saat link menu di-klik,
// bukannya "lompat" ke section.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Mencegah perilaku default "lompat"
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth', // Kunci smooth scroll
                block: 'start'
            });
            // Menutup menu (hamburger) di tampilan mobile setelah di-klik
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// ==================== ACTIVE NAVIGATION ON SCROLL ====================
// Fungsi ini untuk memberi highlight (menandai) link menu yang aktif
// sesuai dengan section yang sedang dilihat user saat scroll.
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) { // -200 agar highlight pindah sedikit lebih awal
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active'); // Hapus 'active' dari semua link
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active'); // Tambah 'active' ke link yang sesuai
        }
    });
});

// ==================== FORM SUBMISSION (PENTING!) ====================
// Kode di bawah ini HANYA menampilkan pesan "alert" dan TIDAK BENAR-BENAR mengirim email.
// Ini disebut "dummy" atau "fake" submission.
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah form refresh halaman
    
    // Tampilkan alert sukses
    alert('Terima kasih! Pesan Anda telah terkirim. Saya akan segera menghubungi Anda.');
    
    // Reset form (mengosongkan input)
    this.reset();
});

// ==================== SKILL PROGRESS BAR ANIMATION ====================
// Fungsi ini untuk menganimasikan progress bar di section "Skills"
// agar terisi saat user scroll sampai ke bagian itu.
const skillsSection = document.getElementById('skills');
let animated = false; // Penanda agar animasi tidak berulang

window.addEventListener('scroll', () => {
    // Dapatkan posisi section "Skills"
    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    // Jika section "Skills" masuk ke layar dan belum dianimasikan
    if (sectionPos < screenPos && !animated) {
        animated = true; // Tandai sudah dianimasikan
        document.querySelectorAll('.progress-bar').forEach(bar => {
            const width = bar.style.width; // Ambil persentase (misal: "90%")
            bar.style.width = '0'; // Set ke 0% dulu
            setTimeout(() => {
                bar.style.width = width; // Kembalikan ke persentase asli (menciptakan efek animasi terisi)
            }, 100);
        });
    }
});

// ==================== TYPING EFFECT (EFEK KETIK) ====================
// Ini adalah fungsi untuk membuat efek ketik pada judul H1 di section Home.
const typedText = document.querySelector('.home-content h1');
const text = typedText.textContent; // Ambil teks asli (misal: "Halo, Saya Alan...")
typedText.textContent = ''; // Kosongkan teks
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typedText.textContent += text.charAt(i); // Tambah 1 huruf
        i++;
        setTimeout(typeWriter, 100); // Jeda 100ms (0.1 detik) antar huruf
    }
}
// Mulai efek ketik saat halaman selesai dimuat
window.addEventListener('load', typeWriter);

// ==================== CONSOLE MESSAGE ====================
// Ini hanya pesan untuk developer yang membuka "Inspect Element" (Console).
// Bisa dihapus jika tidak perlu.
console.log('%c👋 Halo Developer!', 'color: #3498db; font-size: 20px; font-weight: bold;');
console.log('%cTerima kasih telah mengunjungi website saya!', 'color: #2c3e50; font-size: 14px;');
console.log('%cJika Anda tertarik untuk berkolaborasi, jangan ragu untuk menghubungi saya 😊', 'color: #27ae60; font-size: 12px;');