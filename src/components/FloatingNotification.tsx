import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface FloatingNotificationProps {
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    duration?: number;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    onClose?: () => void;
    isVisible: boolean;
}

const FloatingNotification: React.FC<FloatingNotificationProps> = ({
    message,
    type = 'info',
    duration = 5000,
    position = 'top-right',
    onClose,
    isVisible
}) => {
    const [isShown, setIsShown] = useState(isVisible);

    useEffect(() => {
        setIsShown(isVisible);

        if (isVisible && duration > 0) {
            const timer = setTimeout(() => {
                setIsShown(false);
                if (onClose) onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    const handleClose = () => {
        setIsShown(false);
        if (onClose) onClose();
    };

    const getPositionStyles = () => {
        switch (position) {
            case 'top-right':
                return 'top-4 right-4';
            case 'top-left':
                return 'top-4 left-4';
            case 'bottom-right':
                return 'bottom-4 right-4';
            case 'bottom-left':
                return 'bottom-4 left-4';
            default:
                return 'top-4 right-4';
        }
    };

    const getTypeStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-success-500/10 border-success-500 text-success-400';
            case 'warning':
                return 'bg-warning-500/10 border-warning-500 text-warning-400';
            case 'error':
                return 'bg-error-500/10 border-error-500 text-error-400';
            case 'info':
            default:
                return 'bg-primary-500/10 border-primary-500 text-primary-400';
        }
    };

    return (
        <AnimatePresence>
            {isShown && (
                <motion.div
                    className={`fixed ${getPositionStyles()} max-w-sm w-full z-50 pointer-events-auto`}
                    initial={{ opacity: 0, y: position.includes('top') ? -20 : 20, x: 0 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, x: position.includes('right') ? 100 : -100 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className={`rounded-lg shadow-lg border px-4 py-3 backdrop-blur-sm ${getTypeStyles()}`}>
                        <div className="flex items-start">
                            <div className="flex-1 mr-3">
                                <p className="text-sm font-medium">{message}</p>
                            </div>
                            <button
                                onClick={handleClose}
                                className="text-slate-400 hover:text-white transition-colors"
                                aria-label="Close notification"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FloatingNotification;