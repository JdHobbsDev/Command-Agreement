import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
    className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
    children,
    content,
    position = 'top',
    delay = 300,
    className = '',
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, delay);
        setHoverTimeout(timeout);
    };

    const handleMouseLeave = () => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            setHoverTimeout(null);
        }
        setIsVisible(false);
    };

    const getPositionStyles = () => {
        switch (position) {
            case 'top':
                return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
            case 'bottom':
                return 'top-full left-1/2 -translate-x-1/2 mt-2';
            case 'left':
                return 'right-full top-1/2 -translate-y-1/2 mr-2';
            case 'right':
                return 'left-full top-1/2 -translate-y-1/2 ml-2';
            default:
                return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
        }
    };

    return (
        <div
            className={`relative inline-block ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
        >
            {children}

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        className={`absolute z-50 ${getPositionStyles()}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                    >
                        <div className="bg-slate-800 text-slate-100 px-3 py-2 rounded-md shadow-lg text-sm max-w-xs backdrop-blur-sm border border-slate-700">
                            {content}
                        </div>
                        <div
                            className={`absolute w-2 h-2 bg-slate-800 transform rotate-45 border-slate-700 ${position === 'top' ? 'top-full -translate-y-1/2 left-1/2 -translate-x-1/2 border-r border-b' :
                                position === 'bottom' ? 'bottom-full translate-y-1/2 left-1/2 -translate-x-1/2 border-l border-t' :
                                    position === 'left' ? 'left-full -translate-x-1/2 top-1/2 -translate-y-1/2 border-t border-r' :
                                        'right-full translate-x-1/2 top-1/2 -translate-y-1/2 border-b border-l'}`}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tooltip;