const confetti = (): void => {
  const colors = ['#3b82f6', '#ef4444', '#ffffff', '#10b981', '#f59e0b'];
  
  const createConfetti = () => {
    const confetti = document.createElement('div');
    const size = Math.random() * 10 + 5;
    
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.position = 'fixed';
    confetti.style.top = '-10px';
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.borderRadius = `${Math.random() > 0.5 ? '50%' : '0'}`;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    
    document.body.appendChild(confetti);
    
    const animation = confetti.animate(
      [
        { transform: `translate(-50%, 0) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${Math.random() * 400 - 200}px, ${window.innerHeight}px) rotate(${Math.random() * 1000}deg)`, opacity: 0 }
      ],
      {
        duration: Math.random() * 3000 + 2000,
        easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
      }
    );
    
    animation.onfinish = () => {
      confetti.remove();
    };
  };
  
  for (let i = 0; i < 200; i++) {
    setTimeout(createConfetti, Math.random() * 2000);
  }
};

export default confetti;