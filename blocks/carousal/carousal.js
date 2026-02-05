import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  let carousalIndex = 0;
  
  const carousalSlider = document.createElement('div');
  carousalSlider.className = 'carousal-slider';
  carousalSlider.id = 'carousalSlider';

  /* Extract images from block and convert to optimized pictures */
  const images = [...block.querySelectorAll('img')];
  
  images.forEach((img) => {
    const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
    carousalSlider.append(picture);
  });

  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousal-btn left';
  prevBtn.textContent = '❮';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousal-btn right';
  nextBtn.textContent = '❯';

  block.replaceChildren(carousalSlider, prevBtn, nextBtn);

  const totalSlides = carousalSlider.children.length;

  if (totalSlides === 0) {
    console.warn('No carousel slides found');
    return;
  }

  function showCarousal() {
    carousalSlider.style.transform = `translateX(-${carousalIndex * 100}vw)`;
  }

  function nextCarousal() {
    carousalIndex = (carousalIndex + 1) % totalSlides;
    showCarousal();
  }

  function prevCarousal() {
    carousalIndex = (carousalIndex + totalSlides - 1) % totalSlides;
    showCarousal();
  }

  prevBtn.addEventListener('click', prevCarousal);
  nextBtn.addEventListener('click', nextCarousal);

  showCarousal();
  setInterval(nextCarousal, 4000);
}
