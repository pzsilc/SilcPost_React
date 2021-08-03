import { NotificationManager } from 'react-notifications';

class Notifications{
    static create = (type, text) => {
        switch (type) {
            case 'info':
              NotificationManager.info(text);
            break;
            case 'success':
              NotificationManager.success(text);
            break;
            case 'warning':
              NotificationManager.warning(text);
            break;
            case 'error':
              NotificationManager.error(text);
            break;
          }
    }
}

export {
    Notifications
}