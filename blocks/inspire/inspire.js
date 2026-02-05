export default function decorate(block) {
  const cards = block.querySelectorAll(':scope > div');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  cards.forEach(card => observer.observe(card));
}
