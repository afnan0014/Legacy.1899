//============================
// animate-headings.js
//============================
document.addEventListener("DOMContentLoaded", function () {
  const headings = document.querySelectorAll(".H2-heading");

  const revealHeading = () => {
    headings.forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        heading.classList.add("animate-in");
      }
    });
  };

  window.addEventListener("scroll", revealHeading);
  revealHeading(); // Trigger on load
});

// ==============================
// ✅ Animate Newspaper (on view)
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const newspaper = document.querySelector(".news-frame");

  if (newspaper) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          newspaper.classList.add("animate-in");
        }
      });
    }, { threshold: 0.6 });

    observer.observe(newspaper);
  }

  // Initialize mobile legacy slider (after DOM is ready)
  initMobileLegacySlider();
});
// ==============================
// ✅ Animate crest (on view)
// ==============================
// crestAnimation.js

document.addEventListener("DOMContentLoaded", function () {
  const crestSection = document.querySelector("#crest"); // replace with actual class or id
  const crestImages = document.querySelectorAll(".slider-item");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          crestImages.forEach((img) => {
            img.classList.add("animate-in");
          });

          observer.unobserve(entry.target); // Trigger once
        }
      });
    },
    {
      root: null,
      threshold: 0.3,
    }
  );

  if (crestSection) {
    observer.observe(crestSection);
  }
});


// ==============================
// ✅ Crest Slider Navigation
// ==============================
let currentCrestSlide = 0;

function moveSlide(direction) {
  const track = document.getElementById('sliderTrack');
  const slides = track.querySelectorAll('.slider-item');
  const totalSlides = slides.length;

  currentCrestSlide += direction;
  if (currentCrestSlide < 0) currentCrestSlide = totalSlides - 1;
  if (currentCrestSlide >= totalSlides) currentCrestSlide = 0;

  const slideWidth = slides[0].clientWidth;
  track.style.transform = `translateX(-${currentCrestSlide * slideWidth}px)`;
}

// ==============================
// ✅ Mobile Legacy Wall Slider
// ==============================
function initMobileLegacySlider() {
  const track = document.getElementById("mobileSlideContainer");
  const slides = document.querySelectorAll(".mobile-slide");
  const leftBtn = document.getElementById("mobile-slide-left");
  const rightBtn = document.getElementById("mobile-slide-right");
  const dotNav = document.getElementById("dotNav");

  let currentSlide = 0;

  // Create dots
  slides.forEach((_, idx) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (idx === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(idx));
    dotNav.appendChild(dot);
  });

  const dots = dotNav.querySelectorAll(".dot");

  function updateDots(index) {
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  }

  function goToSlide(index) {
    currentSlide = index;
    const offset = track.clientWidth * index;
    track.style.transform = `translateX(-${offset}px)`;
    updateDots(currentSlide);
  }

  leftBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
  });

  rightBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  });

  window.addEventListener("resize", () => {
    goToSlide(currentSlide); // Re-align after resize
  });

  // 🟦 Add swipe gesture support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
  });

  function handleSwipeGesture() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left
      currentSlide = (currentSlide + 1) % slides.length;
      goToSlide(currentSlide);
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      goToSlide(currentSlide);
    }
  }
}




document.addEventListener("DOMContentLoaded", function () {
  // your swipe/slider logic here
  const slides = [
    {
      img: 'assets/images/pngs/pep.png',
      heading: 'Sextuple Glory - 2009',
      description: `In 2009, under Pep Guardiola, FC Barcelona made history by winning all
        six major trophies in a single year — La Liga, Copa del Rey, UEFA Champions League,
        Spanish Super Cup, UEFA Super Cup, and FIFA Club World Cup.
        <br><br>This Sextuple remains one of the most dominant campaigns in football history.`,
      tvImage: 'assets/images/sextuple.jpg',
      tvVideo: null
    },
    {
      img: 'assets/images/pngs/pique.png',
      heading: '5-0 El Clásico - 2010',
      description: `One of the most dominant El Clásico victories in history came in 2010
      when Barça crushed Real Madrid 5-0. Xavi, Iniesta, and Messi orchestrated a football masterclass, leaving the world stunned.
      Under Pep Guardiola’s visionary tactics, Barcelona showcased their iconic tiki-taka style, completely overwhelming José Mourinho’s
      Madrid.<br><br>
      The match at Camp Nou became a symbol of Barça’s golden era and remains etched in football history as a display of pure brilliance.`,
      tvImage: null,
      tvVideo: 'assets/videos/messiwalk.mp4'
    },
    {
      img: 'assets/images/pngs/lapulga.png',
      heading: 'Wembley Wizardry - 2011',
      description: `FC Barcelona put on a footballing masterclass in the 2011 UEFA Champions League Final at Wembley,
      defeating Manchester United 3-1. Messi, Xavi, and Iniesta orchestrated the midfield with elegance, leaving fans 
      and pundits in awe. Messi’s goal from outside the box became iconic — a symbol of Barça's peak dominance under 
      Pep Guardiola.<br><br>
      It wasn’t just a victory; it was a statement of footballing perfection that many regard as the greatest team performance in a final.`,
      tvImage: null,
      tvVideo: 'assets/videos/wembly.mp4'
    }
  ];

  let currentSlide = 0;

  const characterImg = document.getElementById('characterImage');
  const heading = document.getElementById('momentHeading');
  const description = document.getElementById('momentDescription');
  const tvImage = document.getElementById('tvContentImage');
  const tvVideo = document.getElementById('tvContentVideo');
  const glitch = document.getElementById('tvGlitch');
  const dotsContainer = document.getElementById('momentDots');

  // 🔁 Dynamically create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function updateDots(index) {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function goToSlide(index) {
    if (index === currentSlide) return;

    // Start transitions
    description.classList.add('fade-out');
    heading.classList.add('fade-out');
    characterImg.classList.add('slide-out-left');

    glitch.classList.remove('hidden');
    glitch.currentTime = 0;
    glitch.play();

    tvImage.classList.add('hidden');
    tvVideo.classList.add('hidden');
    tvVideo.pause();

    setTimeout(() => {
      const slide = slides[index];

      characterImg.src = slide.img;
      heading.innerHTML = slide.heading;
      description.innerHTML = slide.description;

      if (slide.tvImage) {
        tvImage.src = slide.tvImage;
        tvImage.classList.remove('hidden');
      }

      if (slide.tvVideo) {
        tvVideo.querySelector('source').src = slide.tvVideo;
        tvVideo.load();
        tvVideo.classList.remove('hidden');
        tvVideo.loop = true;
        tvVideo.play();
      }

      glitch.pause();
      glitch.classList.add('hidden');

      characterImg.classList.remove('slide-out-left');
      characterImg.classList.add('slide-in-left');
      heading.classList.remove('fade-out');
      heading.classList.add('fade-in');
      description.classList.remove('fade-out');
      description.classList.add('fade-in');

      setTimeout(() => {
        characterImg.classList.remove('slide-in-left');
        heading.classList.remove('fade-in');
        description.classList.remove('fade-in');
      }, 800);

      currentSlide = index;
      updateDots(currentSlide);
    }, 2000);
  }

  // ▶ Navigation
  document.getElementById('nextSlide').addEventListener('click', () => {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  });

  document.getElementById('prevSlide').addEventListener('click', () => {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prev);
  });

  // 👇 On-view autoplay glitch once
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        glitch.classList.remove('hidden');
        glitch.play();
        setTimeout(() => {
          glitch.pause();
          glitch.classList.add('hidden');
        }, 2000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.querySelector('.iconic-moments'));

  // 📱 Swipe support (mobile touch)
  let touchStartX = 0;
  let touchEndX = 0;

  const slider = document.querySelector('.moment-slider');

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  }, false);

  function handleGesture() {
    if (touchEndX < touchStartX - 50) {
      document.getElementById('nextSlide').click();
    }
    if (touchEndX > touchStartX + 50) {
      document.getElementById('prevSlide').click();
    }
  }

  // ▶ Initialize
  updateDots(currentSlide);
});

// ==============================
// ✅ Hamburger Menu Toggle
// ==============================
function toggleMenu() {
  const nav = document.getElementById('navbarNav');
  nav.classList.toggle('show');
}

document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 0;
  const sliderTrack = document.getElementById('sliderTrack');
  const slides = document.querySelectorAll('.slider-item');
  const totalSlides = slides.length;

  // Move slide function
  function moveSlide(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateSliderPosition();
  }

  // Update slider transform
  function updateSliderPosition() {
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  // Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  sliderTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  sliderTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
  });

  function handleSwipeGesture() {
    const swipeThreshold = 50; // px
    if (touchEndX < touchStartX - swipeThreshold) {
      moveSlide(1); // swipe left
    } else if (touchEndX > touchStartX + swipeThreshold) {
      moveSlide(-1); // swipe right
    }
  }

  // your swipe/slider logic here
});

document.addEventListener("DOMContentLoaded", function () {
  const sliderTrack = document.getElementById('sliderTrack');
  const slides = document.querySelectorAll('.slider-item');
  const totalSlides = slides.length;
  const dotsContainer = document.getElementById('sliderDots');

  let currentSlide = 0;

  // 👉 Create dots dynamically
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
    dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    currentSlide = index;
    updateSliderPosition();
  }

  function updateSliderPosition() {
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  // 👉 Public slide control for arrows
  function moveSlide(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateSliderPosition();
  }

  // 👉 Expose moveSlide to global (for inline onclick)
  window.moveSlide = moveSlide;

  // 👉 Swipe Support (Mobile)
  let touchStartX = 0;
  let touchEndX = 0;

  sliderTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  sliderTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
  });

  function handleSwipeGesture() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      moveSlide(1);
    } else if (touchEndX > touchStartX + swipeThreshold) {
      moveSlide(-1);
    }
  }

  // 🟢 Init once
  updateSliderPosition();
});


//=================================
// Frame cards on-view animation
//=================================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.3
});

document.querySelectorAll('.frame-card').forEach(card => {
  observer.observe(card);
});


document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("mobileSlideContainer");
  if (!track) return;

  let currentSlide = 0;
  const slides = track.querySelectorAll(".mobile-slide");
  const totalSlides = slides.length;

  let startX = 0;
  let isDragging = false;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (diff > 50) {
      // Swipe Right
      currentSlide = Math.max(0, currentSlide - 1);
    } else if (diff < -50) {
      // Swipe Left
      currentSlide = Math.min(totalSlides - 1, currentSlide + 1);
    }

    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    isDragging = false;
  });
});


//updated
