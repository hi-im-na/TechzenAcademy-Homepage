// Add this JavaScript code
document.addEventListener("DOMContentLoaded", function () {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
    });

    // Loading animation
    const loading = document.querySelector(".loading");
    window.addEventListener("load", () => {
        loading.style.display = "none";
    });

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.style.padding = "0.5rem 5%";
            navbar.style.background = "rgba(0, 51, 102, 0.98)";
        } else {
            navbar.style.padding = "1rem 5%";
            navbar.style.background = "rgba(0, 51, 102, 0.95)";
        }
    });

    // Section visibility
    const sections = document.querySelectorAll(".section");
    const observerOptions = {
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    sections.forEach((section) => {
        observer.observe(section);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".instructors-track");
    const cards = document.querySelectorAll(".instructor-card");
    const prevBtn = document.querySelector(".slider-prev");
    const nextBtn = document.querySelector(".slider-next");

    if (!track || cards.length === 0 || !prevBtn || !nextBtn) {
        console.error(
            "Required elements are missing. Please check your HTML structure."
        );
        return;
    }

    let currentIndex = 0;
    let cardWidth = getCardWidth();
    let maxIndex = calculateMaxIndex();

    // Calculate card width including margin
    function getCardWidth() {
        const cardMargin =
            parseInt(getComputedStyle(cards[0]).marginRight, 10) || 0;
        return cards[0].offsetWidth + cardMargin;
    }

    // Calculate the maximum index based on current track width
    function calculateMaxIndex() {
        return Math.max(
            0,
            cards.length - Math.floor(track.offsetWidth / cardWidth)
        );
    }

    // Update the slider position and button visibility
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        prevBtn.style.display = currentIndex === 0 ? "none" : "flex";
        nextBtn.style.display = currentIndex === maxIndex ? "none" : "flex";
    }

    // Event listener for previous button
    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    // Event listener for next button
    nextBtn.addEventListener("click", () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });

    // Debounce function for resizing
    function debounce(func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Handle window resize events
    const handleResize = debounce(() => {
        cardWidth = getCardWidth();
        maxIndex = calculateMaxIndex();
        currentIndex = Math.min(currentIndex, maxIndex);
        updateSlider();
    }, 300);

    window.addEventListener("resize", handleResize);

    // Initial update
    updateSlider();
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('actived');
        navLinks.classList.toggle('actived');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('actived');
            navLinks.classList.remove('actived');
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slider-news input[type='radio']");
    const prevButton = document.querySelector(".prev-news");
    const nextButton = document.querySelector(".next-news");

    let currentSlideIndex = Array.from(slides).findIndex((slide) => slide.checked);

    function updateSlideNew(newIndex) {
        slides[currentSlideIndex].checked = false;
        currentSlideIndex = newIndex;
        slides[currentSlideIndex].checked = true;
    }

    prevButton.addEventListener('click', () => {
        const newIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateSlideNew(newIndex);
    });

    nextButton.addEventListener('click', () => {
        const newIndex = (currentSlideIndex + 1) % slides.length;
        updateSlideNew(newIndex);
    });
});

function openZalo() {
    const zaloLink = "https://zalo.me/0935505640";
    window.open(zaloLink, "_blank");
}

$(".bottom-slider .slides").slick({
    fade: true,
    dots: false,
    arrows: true,
    infinite: true,
    loop: true,
    speed: 1000,
    autoplay: true,
    focusOnSelect: true,
    autoplaySpeed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    opacity: 0.5,
});

$(".three-slide-slider .slides").slick({
    dots: true,
    arrows: false,
    infinite: true,
    loop: true,
    speed: 1000,
    autoplay: false,
    focusOnSelect: true,
    autoplaySpeed: 3000,
    centerMode: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
    opacity: 0.5,
});

$(".four-slide-slider .slides").slick({
    fade: false,
    dots: true,
    arrows: false,
    infinite: true,
    loop: true,
    speed: 1000,
    autoplay: true,
    focusOnSelect: true,
    autoplaySpeed: 2000,
    centerMode: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
    opacity: 0.5,
});

$(".about-slider .slides").slick({
    fade: true,
    dots: false,
    arrows: false,
    infinite: true,
    loop: true,
    speed: 1000,
    autoplay: true,
    focusOnSelect: true,
    autoplaySpeed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
});