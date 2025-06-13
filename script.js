// Navigation mobile
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Fermer le menu mobile quand on clique sur un lien
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// Navigation active selon la section
window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });

    // Effet navbar au scroll
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // Sélectionner tous les éléments qui devraient avoir une animation
    const animatedElements = document.querySelectorAll( ".fade-in, .slide-in-left, .slide-in-right");

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Appliquer les classes d'animation initiales aux éléments
    const aboutSection = document.querySelector(".about-content");
    if (aboutSection) {
        aboutSection.classList.add("fade-in");
    }
    
    projectCards.forEach((card, index) => {
        card.classList.add("fade-in");
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item, index) => {
        if (index % 2 === 0) {
            item.classList.add("slide-in-left");
        } else {
            item.classList.add("slide-in-right");
        }
        item.style.transitionDelay = `${index * 0.2}s`;
    });

    // Ajouter les classes d'animation aux titres et paragraphes dans les sections
    document.querySelectorAll(".section-header h2, .section-header p, .about-text p, .skill-category, .contact-item, .form-group").forEach(el => {
        if (!el.classList.contains("fade-in") && !el.classList.contains("slide-in-left") && !el.classList.contains("slide-in-right")) {
            el.classList.add("fade-in");
        }
    });



});

// Filtres de projets
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Retirer la classe active de tous les boutons
        filterButtons.forEach(btn => btn.classList.remove("active"));
        // Ajouter la classe active au bouton cliqué
        button.classList.add("active");
        
        const filterValue = button.getAttribute("data-filter");
        
        projectCards.forEach(card => {
            if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                card.classList.remove("hidden");
              
            } else {
                card.classList.add("hidden");
            }
        });
    });
});

// Animations au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            console.log(`Element ${entry.target.id || entry.target.className} is visible`);
        }
    });
}, observerOptions);

// Observer les éléments à animer

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// Formulaire de contact
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = new FormData(contactForm);
        const name = formData.get("name");
        const email = formData.get("email");
        const subject = formData.get("subject");
        const message = formData.get("message");
        
        // Créer le lien mailto
        const mailtoLink = `mailto:boudriguarania@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Ouvrir le client email
        window.location.href = mailtoLink;
        
        // Optionnel: afficher un message de confirmation
        alert("Votre client email va s\"ouvrir avec le message pré-rempli.");
    });
}

// Animation des statistiques au scroll
const statsSection = document.querySelector(".hero-stats");
let statsAnimated = false;

const animateStats = () => {
    if (statsAnimated) return;
    
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue);
        
        if (!isNaN(numericValue)) {
            let currentValue = 0;
            const increment = numericValue / 50;
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    stat.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(currentValue) + (finalValue.includes("+") ? "+" : "") + (finalValue.includes("%") ? "%" : "");
                }
            }, 30);
        }
    });
    
    statsAnimated = true;
};

// Observer pour les statistiques
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Effet parallax léger pour le hero
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Préloader (optionnel)
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// Gestion du redimensionnement de la fenêtre
window.addEventListener("resize", () => {
    // Fermer le menu mobile si la fenêtre est redimensionnée
    if (window.innerWidth > 768) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }
});


