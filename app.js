/* ==========================================================================
   INTERACTIVE LOGIC SYSTEM - ISHA PANDYA PORTFOLIO
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initCustomCursor();
    initMobileMenu();
    initScrollEffects();
    initPortfolio();
    initContactForm();
});

/* ==========================================================================
   1. Theme Switcher (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
    const themeToggle = document.getElementById("themeToggle");
    const htmlElement = document.documentElement;
    const icon = themeToggle.querySelector("i");
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        htmlElement.setAttribute("data-theme", savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // Default to dark theme
        htmlElement.setAttribute("data-theme", "dark");
        updateThemeIcon("dark");
    }
    
    themeToggle.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        // Add smooth transitioning class temporary to body
        document.body.style.transition = "background-color 0.5s ease, color 0.5s ease";
        
        htmlElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (theme === "dark") {
            icon.className = "fa-solid fa-sun";
        } else {
            icon.className = "fa-solid fa-moon";
        }
    }
}

/* ==========================================================================
   2. Custom Interactive Cursor
   ========================================================================== */
function initCustomCursor() {
    const cursor = document.querySelector(".custom-cursor");
    const follower = document.querySelector(".custom-cursor-follower");
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update direct cursor immediately
        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";
    });
    
    // Smooth trailing follower using requestAnimationFrame
    function updateFollower() {
        // Lerp factor
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        
        follower.style.left = followerX + "px";
        follower.style.top = followerY + "px";
        
        requestAnimationFrame(updateFollower);
    }
    updateFollower();
    
    // Add hover state on links/buttons
    const hoverables = document.querySelectorAll("a, button, .portfolio-card, .filter-btn, .form-input");
    hoverables.forEach(el => {
        el.addEventListener("mouseenter", () => {
            document.body.classList.add("cursor-hovering");
        });
        el.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursor-hovering");
        });
    });
}

/* ==========================================================================
   3. Mobile Navigation Menu
   ========================================================================== */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");
    
    mobileMenuBtn.addEventListener("click", () => {
        mobileMenuBtn.classList.toggle("open");
        navMenu.classList.toggle("open");
    });
    
    // Close mobile menu when clicking any nav link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenuBtn.classList.remove("open");
            navMenu.classList.remove("open");
        });
    });
}

/* ==========================================================================
   4. Scroll Effects (Header, Reveal on Scroll, Active Link)
   ========================================================================== */
function initScrollEffects() {
    const header = document.querySelector(".header");
    const backToTop = document.getElementById("backToTop");
    const reveals = document.querySelectorAll(".scroll-reveal");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    
    // Scroll Event listener
    window.addEventListener("scroll", () => {
        const scrollPos = window.scrollY;
        
        // Header blur/sizing on scroll
        if (scrollPos > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
        
        // Back to top button visibility
        if (scrollPos > 600) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
        
        // Active Nav highlight on scroll
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute("id");
            
            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    });
    
    // Back to top action
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
    
    // Intersection Observer for slide up reveals
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target); // only animate once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });
    
    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
}

/* ==========================================================================
   5. Portfolio Gallery Data & Filtering Logic & Modal Carousel
   ========================================================================== */
const projectData = {
    1: {
        title: "Cream & Gold Living Room",
        category: "Living Room",
        description: "A complete open-plan living space designed in warm cream, gold, and natural oak. Twin large-format floral artworks set within classic moulded frames anchor the sofa wall, while a gold orbital chandelier adds drama overhead. Tufted drum ottomans, a curved sectional sofa, and a sleek TV unit with marble and walnut panelling complete the space. A wavy backlit mirror niche creates a striking entrance focal point.",
        images: [
            "assets/projects/project_01_1.jpeg",
            "assets/projects/project_01_2.jpeg",
            "assets/projects/project_01_3.jpeg",
            "assets/projects/project_01_4.jpeg",
            "assets/projects/project_01_5.jpeg"
        ],
        software: "SketchUp, Enscape Rendering",
        type: "Residential Interior"
    },
    2: {
        title: "Entrance Door — Decorative Jali",
        category: "Entrance / Detail",
        description: "A statement main entrance featuring a full-height warm oak fluted wall with a Ganesh shelf above. The door itself showcases an intricate geometric jali (lattice) pattern in dark teak on an oak base — a beautiful blend of traditional craftsmanship and contemporary framing. A white arched shoe-unit completes the entryway.",
        images: ["assets/projects/project_02_1.jpeg"],
        software: "SketchUp, Enscape Rendering",
        type: "Residential Detail"
    },
    4: {
        title: "Beige Bedroom & Herringbone Floor",
        category: "Master Bedroom",
        description: "An earthy, serene bedroom dressed in warm cream tones with a herringbone timber floor. A full-wall display wardrobe features a central open niche with lit shelving. A gold-framed circular mirror, abstract wall art, and a fluted sideboard create a boutique-hotel atmosphere.",
        images: [
            "assets/projects/project_04_3.jpeg",
            "assets/projects/project_04_1.jpeg",
            "assets/projects/project_04_2.jpeg"
        ],
        software: "SketchUp, Enscape Rendering",
        type: "Residential Interior"
    },
    5: {
        title: "Teal Headboard Master Suite",
        category: "Master Bedroom",
        description: "A restful master suite anchored by a teal upholstered headboard set against structured grey panelling. Marble flooring, a full-length mirror and cream oval-handle wardrobe with gold inlay complete the refined palette.",
        images: [
            "assets/projects/project_05_1.jpeg",
            "assets/projects/project_05_2.jpeg"
        ],
        software: "SketchUp, Enscape Rendering",
        type: "Residential Interior"
    },
    6: {
        title: "Teal & Oak Platform Bed",
        category: "Master Bedroom",
        description: "A bold yet grounded bedroom anchored by a deep teal fluted headboard wall and warm oak platform bed frame. Marble side tables, a grey upholstered insert, and linen curtains balance the richness of the dark feature wall.",
        images: ["assets/projects/project_06_1.jpeg"],
        software: "SketchUp, Enscape Rendering",
        type: "Residential Interior"
    },
    7: {
        title: "Walnut Bed & Pendant Lights",
        category: "Master Bedroom",
        description: "A contemporary bedroom defined by a curved walnut headboard panel framed by vertical fluted cladding and looping U-shaped pendant lights. Glass sliding wardrobes with walnut trim and a recessed LED ceiling cove complete this sophisticated space.",
        images: ["assets/projects/project_07_1.jpeg"],
        software: "SketchUp, Enscape Rendering",
        type: "Residential Interior"
    },
    8: {
        title: "Marble Headboard & Walnut Joinery",
        category: "Master Bedroom",
        description: "A luxurious master bedroom anchored by a bookmatched marble headboard panel within fluted wall cladding. Rich walnut joinery on the wardrobe and bed frame contrasts beautifully with crisp white walls and a recessed LED ceiling.",
        images: [
            "assets/projects/project_08_2.jpeg",
            "assets/projects/project_08_3.jpeg",
        ],
        software: "SketchUp, Enscape Rendering",
        type: "Residential Interior"
    },
    9: {
        title: "Blush Pink Bedroom Suite",
        category: "Secondary Bedroom",
        description: "A sophisticated blush-and-cream bedroom suite with a fully consistent colour story. An upholstered headboard wall, circle-handle wardrobe, fluted TV panel, and integrated dressing mirror all speak the same elegant language across the room.",
        images: [
            "assets/projects/project_09_4.jpeg",
            "assets/projects/project_09_5.jpeg",
            "assets/projects/project_09_2.jpeg",
            "assets/projects/project_09_3.jpeg",
        ],
        software: "SketchUp, Enscape Rendering",
        type: "Residential Interior"
    },
    10: {
        title: "Sage Green Bedroom & Arched Desk",
        category: "Bedroom / Study",
        description: "A fresh bedroom defined by sage green and white. The arched fluted headboard, floating side ledges, and pendant light create a striking focal wall, while the opposite side features a cream-and-green wardrobe with butterfly handles and a fully integrated study desk with arch-panel display shelving.",
        images: [
            "assets/projects/project_10_4.jpeg",
            "assets/projects/project_10_1.jpeg",
            "assets/projects/project_10_2.jpeg",
            "assets/projects/project_10_3.jpeg",
            "assets/projects/project_10_5.jpeg"
        ],
        software: "SketchUp, Enscape Rendering",
        type: "Residential Interior"
    },
    11: {
        title: "Blue & White Botanical Mural Suite",
        category: "Master Bedroom",
        description: "A coastal-inspired master bedroom pairing steel-blue accents with a monochrome botanical mural feature wall. The rounded wardrobe with oval blue inserts, blue-framed TV wall, sculptural rounded ceiling with halo lighting, and wall sconce create a complete, immersive environment.",
        images: [
            "assets/projects/project_11_5.jpeg",
            "assets/projects/project_11_2.jpeg",
            "assets/projects/project_11_3.jpeg",
            "assets/projects/project_11_4.jpeg"
        ],
        software: "SketchUp, Enscape Rendering",
        type: "Residential Interior"
    },
    12: {
        title: "Girl's Botanical Arch Bedroom",
        category: "Secondary Bedroom",
        description: "A personality-filled girl's bedroom with a botanical-print arched feature wall in blush and sage, complemented by a round mirror dressing unit and slatted wood partition. Floating shelves and a structured vanity complete the space.",
        images: ["assets/projects/project_12_1.jpeg"],
        software: "SketchUp, Enscape Rendering",
        type: "Residential Interior"
    },
    13: {
        title: "Dusty Rose Platform Bed & Study",
        category: "Kids Bedroom",
        description: "A compact yet complete kids' room in dusty rose and cream: a platform bed with storage drawers, an integrated study desk with mirror unit, and a tall wardrobe with rounded handles. Soft colours keep the room calm and age-appropriate.",
        images: [
            "assets/projects/project_13_1.jpeg",
            "assets/projects/project_13_3.jpeg",
        ],
        software: "SketchUp, Enscape Rendering",
        type: "Residential Interior"
    },
    14: {
        title: "Champagne & Dark Granite Kitchen",
        category: "Kitchen",
        description: "A sleek modular kitchen balancing champagne-finish cabinetry with dark granite countertops and a marble-effect backsplash. Glass-fronted upper units and warm walnut accents add depth, while a wood-batten ceiling with linear LED strips lends dramatic atmosphere.",
        images: [
            "assets/projects/project_14_1.jpeg",
            "assets/projects/project_14_4.jpeg"
        ],
        software: "SketchUp, Enscape Rendering",
        type: "Modular Residential Kitchen"
    },
    15: {
        title: "Mint Green & Charcoal Kitchen",
        category: "Kitchen",
        description: "A vibrant high-gloss mint green kitchen with black-framed glass upper cabinets and charcoal granite worktops. A full-height black refrigerator unit with adjacent pull-out pantry provides smart integrated storage. The grey tile backsplash and marble flooring keep the palette fresh and elegant.",
        images: [
            "assets/projects/project_15_3.jpeg",
            "assets/projects/project_15_1.jpeg",
            "assets/projects/project_15_2.jpeg"
        ],
        software: "SketchUp, Enscape Rendering",
        type: "Modular Residential Kitchen"
    },
    16: {
        title: "Oak & Marble Inlay Storage",
        category: "Storage / Joinery",
        description: "A standout four-door oak storage featuring oval marble-inlay panels paired with a fluted TV feature wall in matching tones. The floating marble media console echoes the wardrobe detailing for a cohesive finish.",
        images: ["assets/projects/project_16_1.jpeg"],
        software: "SketchUp, Enscape Rendering",
        type: "Bespoke Joinery"
    },
    17: {
        title: "Wardrobe Design Styles Showcase",
        category: "Wardrobe / Joinery",
        description: "A showcase of bespoke wardrobe solutions across projects: a sage-green two-tone sliding wardrobe in natural oak frame; a cream wardrobe with gold inlay and oval cut-out handles; and a study wardrobe in cream and oak with floating desk and open shelving.",
        images: [
            "assets/projects/project_17_1.jpeg",
            "assets/projects/project_17_2.jpeg"
        ],
        software: "SketchUp, Enscape Rendering",
        type: "Bespoke Joinery"
    },
    18: {
        title: "Integrated Storage TV Unit",
        category: "Joinery / Storage",
        description: "A floor-to-ceiling cream storage wall with a recessed wood-battened TV niche at its centre — clean, handleless design that maximises storage while keeping the room calm. The warm oak shelf and base strip prevent the scheme from feeling cold.",
        images: ["assets/projects/project_18_1.jpeg", "assets/projects/project_18_2.jpeg"],
        software: "SketchUp, Enscape Rendering",
        type: "Bespoke Joinery"
    },
    19: {
        title: "Dresser Corner & Oval Mirror",
        category: "Bedroom Detail",
        description: "A minimalist dresser corner study: a floating two-drawer vanity unit beside an oval full-length mirror, round upholstered ottoman, and floor-to-ceiling linen curtains with slatted pelmet detailing — elegant in its restraint.",
        images: ["assets/projects/project_19_2.jpeg"],
        software: "SketchUp, Enscape Rendering",
        type: "Residential Detail"
    },
    20: {
        title: "Ceiling Design Variations",
        category: "Ceiling Design",
        description: "A series of ceiling studies demonstrating command of lighting and spatial geometry: a wood-batten kitchen ceiling with warm LED strips; a multi-frame layered tray ceiling; geometric linear bedroom ceilings in grey; and a warm tray ceiling above a modular storage wall — each tailored to enhance the mood of its space.",
        images: [
            "assets/projects/project_06_1.jpeg",
            "assets/projects/project_08_1.jpeg",
            "assets/projects/project_15_4.jpeg",
            "assets/projects/project_19_1.jpeg"
        ],
        software: "SketchUp, Enscape Rendering",
        type: "Ceiling Layouts Detail"
    }
};

function initPortfolio() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".portfolio-card");
    
    // Filtering Logic
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const filterValue = btn.getAttribute("data-filter");
            
            cards.forEach(card => {
                const category = card.getAttribute("data-category");
                
                // Add smooth scaling animation during filtering
                if (filterValue === "all" || category.includes(filterValue)) {
                    card.style.display = "block";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.8)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 400); // match CSS transitions
                }
            });
        });
    });
    
    // Modal Carousel Logic
    const modal = document.getElementById("projectModal");
    const overlay = document.getElementById("modalOverlay");
    const closeBtn = document.getElementById("closeModalBtn");
    
    const carouselTrack = document.getElementById("carouselTrack");
    const dotsContainer = document.getElementById("carouselDots");
    const prevBtn = document.getElementById("carouselPrevBtn");
    const nextBtn = document.getElementById("carouselNextBtn");
    
    const mTag = document.getElementById("modalTag");
    const mTitle = document.getElementById("modalTitle");
    const mDesc = document.getElementById("modalDescription");
    const mMetaVal1 = modal.querySelector(".modal-meta-grid .meta-item:nth-child(1) .meta-val");
    const mMetaVal2 = modal.querySelector(".modal-meta-grid .meta-item:nth-child(2) .meta-val");
    
    let currentSlideIdx = 0;
    let activeImages = [];
    
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const projectId = card.getAttribute("data-project-id");
            const data = projectData[projectId];
            
            if (!data) return;
            
            // Populate Modal Text Content
            mTag.innerText = data.category;
            mTitle.innerText = data.title;
            mDesc.innerText = data.description;
            mMetaVal1.innerText = data.software;
            mMetaVal2.innerText = data.type;
            
            activeImages = data.images;
            currentSlideIdx = 0;
            
            // Render Carousel Images
            carouselTrack.innerHTML = "";
            activeImages.forEach(imgSrc => {
                const slide = document.createElement("div");
                slide.className = "carousel-slide";
                
                const img = document.createElement("img");
                img.src = imgSrc;
                img.alt = data.title;
                
                slide.appendChild(img);
                carouselTrack.appendChild(slide);
            });
            
            // Render Dot Indicators
            dotsContainer.innerHTML = "";
            activeImages.forEach((_, i) => {
                const dot = document.createElement("div");
                dot.className = i === 0 ? "dot active" : "dot";
                dot.addEventListener("click", () => {
                    goToSlide(i);
                });
                dotsContainer.appendChild(dot);
            });
            
            // Hide navigation buttons if there is only 1 image
            if (activeImages.length <= 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
                dotsContainer.style.display = "none";
            } else {
                prevBtn.style.display = "flex";
                nextBtn.style.display = "flex";
                dotsContainer.style.display = "flex";
            }
            
            // Open Modal
            goToSlide(0);
            modal.classList.add("open");
            document.body.style.overflow = "hidden"; // lock page scroll
        });
    });
    
    function goToSlide(index) {
        if (index < 0) index = activeImages.length - 1;
        if (index >= activeImages.length) index = 0;
        
        currentSlideIdx = index;
        carouselTrack.style.transform = `translateX(-${index * 100}%)`;
        
        // Update Dots class
        const dots = dotsContainer.querySelectorAll(".dot");
        dots.forEach((dot, idx) => {
            if (idx === index) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }
    
    // Carousel navigation clicks
    prevBtn.addEventListener("click", () => goToSlide(currentSlideIdx - 1));
    nextBtn.addEventListener("click", () => goToSlide(currentSlideIdx + 1));
    
    // Close Modal action
    function closeModal() {
        modal.classList.remove("open");
        document.body.style.overflow = "auto"; // unlock page scroll
    }
    
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
    
    // Keyboard Shortcuts (Modal & Carousel)
    document.addEventListener("keydown", (e) => {
        if (!modal.classList.contains("open")) return;
        
        if (e.key === "Escape") {
            closeModal();
        } else if (e.key === "ArrowLeft" && activeImages.length > 1) {
            goToSlide(currentSlideIdx - 1);
        } else if (e.key === "ArrowRight" && activeImages.length > 1) {
            goToSlide(currentSlideIdx + 1);
        }
    });
}

/* ==========================================================================
   6. Contact Form Handle & Success overlay
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById("contactForm");
    const overlay = document.getElementById("formSuccessOverlay");
    const closeBtn = document.getElementById("successCloseBtn");
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Dynamic mock loading state
        const submitBtn = form.querySelector(".btn-submit");
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
        
        setTimeout(() => {
            // Show Success Overlay
            overlay.classList.add("show");
            
            // Reset button and form values
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            form.reset();
        }, 1500); // Mock 1.5s sending time
    });
    
    closeBtn.addEventListener("click", () => {
        overlay.classList.remove("show");
    });
}
