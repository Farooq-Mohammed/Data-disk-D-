const track = document.querySelector(".carousel__track");
const slides = [...track.children];

const prevBtn = document.querySelector(".carousel__btn--left");
const nextBtn = document.querySelector(".carousel__btn--right");

const dotNavs = document.querySelector(".carousel__nav");
const dots = [...dotNavs.children];

const setSlidePosition = (slide, idx) => {
  slide.style.width = "100%";
  const slideWidth = slides[idx].getBoundingClientRect().width;
  slide.style.left = slideWidth * idx + "px";
};

const moveSlideTo = (track, currentSlide, targetSlide) => {
  if (!targetSlide) return;
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, targetDot) => {
  if (!targetDot) return;
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

const hideShowArrows = (targetIndex, prevBtn, nextBtn, slides) => {
  if (targetIndex === 0) {
    prevBtn.classList.add("is-hidden");
    nextBtn.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    nextBtn.classList.add("is-hidden");
    prevBtn.classList.remove("is-hidden");
  } else {
    prevBtn.classList.remove("is-hidden");
    nextBtn.classList.remove("is-hidden");
  }
};

// arrange slides next to eachother
slides.forEach(setSlidePosition);

// move slide to left
prevBtn.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  let prevSlide = currentSlide.previousElementSibling;

  const currentDot = dotNavs.querySelector(".current-slide");
  let prevDot = currentDot.previousElementSibling;

  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  if (!prevSlide) prevSlide = slides[slides.length - 1];
  if (!prevDot) prevDot = dots[dots.length - 1];

  moveSlideTo(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(prevIndex, prevBtn, nextBtn, slides);
});

// move slide to right
nextBtn.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  let nextSlide = currentSlide.nextElementSibling;

  const currentDot = dotNavs.querySelector(".current-slide");
  let nextDot = currentDot.nextElementSibling;

  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  if (!nextSlide) nextSlide = slides[0];
  if (!nextDot) nextDot = dots[0];

  moveSlideTo(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(nextIndex, prevBtn, nextBtn, slides);
});

// move to partiular slide using dotNavs
dotNavs.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");
  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotNavs.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveSlideTo(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(targetIndex, prevBtn, nextBtn, slides);
});

window.addEventListener("resize", () => {
  slides.forEach(setSlidePosition);
  const currentSlide = track.querySelector(".current-slide");
  moveSlideTo(track, currentSlide, currentSlide);
});
