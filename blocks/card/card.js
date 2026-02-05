export default function decorate(block) {
  const cards = block.querySelectorAll(':scope > div > div');

  cards.forEach((card) => {
    card.setAttribute('tabindex', '0');

    card.addEventListener('click', () => {
      const title = card.querySelector('h3')?.textContent?.trim();
      console.log('Card clicked:', title);
    });

    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        card.click();
      }
    });
  });
}