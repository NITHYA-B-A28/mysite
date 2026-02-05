export default function decorate(block) {
  block.classList.add('tips-block');

  const items = block.querySelectorAll(':scope > div > div');

  items.forEach((item) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transition =
            'opacity 0.5s ease, transform 0.5s ease';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  items.forEach((item) => observer.observe(item));
}
