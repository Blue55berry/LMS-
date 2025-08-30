 // Carousel animation
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const dots = Array.from(document.querySelectorAll('.dot'));
    let current = 0;
    function showSlide(idx) {
        track.style.transform = `translateX(-${idx * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }
    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
    }
    let interval = setInterval(nextSlide, 3500);
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            current = i;
            showSlide(current);
            clearInterval(interval);
            interval = setInterval(nextSlide, 3500);
        });
    });
    showSlide(current);