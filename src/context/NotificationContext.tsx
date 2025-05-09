import React, { createContext, useContext, useState, ReactNode } from 'react';
import FloatingNotification from '../components/FloatingNotification';

type NotificationType = 'info' | 'success' | 'warning' | 'error';
type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

interface Notification {
    id: string;
    message: string;
    type: NotificationType;
    duration: number;
    position: NotificationPosition;
}

interface NotificationContextType {
    notifications: Notification[];
    showNotification: (message: string, type?: NotificationType, duration?: number, position?: NotificationPosition) => void;
    dismissNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const showNotification = (
        message: string,
        type: NotificationType = 'info',
        duration: number = 5000,
        position: NotificationPosition = 'top-right'
    ) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newNotification = { id, message, type, duration, position };

        setNotifications((prev) => [...prev, newNotification]);

       
        if (duration > 0) {
            setTimeout(() => {
                dismissNotification(id);
            }, duration);
        }

        return id;
    };

    const dismissNotification = (id: string) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ notifications, showNotification, dismissNotification }}>
            {children}

    
            {notifications.map((notification) => (
                <FloatingNotification
                    key={notification.id}
                    message={notification.message}
                    type={notification.type}
                    duration={notification.duration}
                    position={notification.position}
                    isVisible={true}
                    onClose={() => dismissNotification(notification.id)}
                />
            ))}
        </NotificationContext.Provider>
    );
};

export default NotificationProvider;