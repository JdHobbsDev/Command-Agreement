import confetti from 'canvas-confetti';

type ConfettiOptions = {
    particleCount?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: { x: number; y: number };
    colors?: string[];
    shapes?: ('square' | 'circle')[];
    scalar?: number;
    zIndex?: number;
};


export const fireConfetti = (options: ConfettiOptions = {}) => {
    const defaults: ConfettiOptions = {
        particleCount: 100,
        spread: 70,
        startVelocity: 30,
        decay: 0.9,
        gravity: 1,
        ticks: 200,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#3b82f6', '#ef4444', '#ffffff', '#10b981', '#f59e0b', '#8b5cf6'],
        zIndex: 9999,
    };

    const mergedOptions = { ...defaults, ...options };
    confetti(mergedOptions);
};


export const fireConfettiExplosion = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#3b82f6', '#ef4444', '#ffffff'],
        });
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#10b981', '#f59e0b', '#8b5cf6'],
        });
    }, 250);
};


export const fireConfettiCannon = () => {
    const end = Date.now() + 2000;


    const interval = setInterval(() => {
        if (Date.now() > end) {
            return clearInterval(interval);
        }

        confetti({
            particleCount: 100,
            startVelocity: 30,
            spread: 70,
            origin: { x: randomInRange(0.1, 0.9), y: 0.9 },
            colors: ['#3b82f6', '#ef4444', '#ffffff', '#10b981', '#f59e0b', '#8b5cf6'],
            zIndex: 9999,
        });
    }, 250);
};


export const fireConfettiShower = () => {
    const end = Date.now() + 3000;

    const interval = setInterval(() => {
        if (Date.now() > end) {
            return clearInterval(interval);
        }

        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#3b82f6', '#ef4444', '#ffffff'],
        });

        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#10b981', '#f59e0b', '#8b5cf6'],
        });
    }, 40);
};


function randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}


export const fireAllConfetti = () => {
 
    fireConfettiExplosion();

    setTimeout(() => {
        fireConfettiCannon();
    }, 1000);


    setTimeout(() => {
        fireConfettiShower();
    }, 2000);
};

export default fireAllConfetti;