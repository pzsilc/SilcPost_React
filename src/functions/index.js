import { NotificationManager } from 'react-notifications';
import FormData from 'form-data'

const createNotification = (type, text) => {
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

const toFormData = data => {
    let formData = new FormData();
    for(const [key, value] of Object.entries(data)){
        formData.append(key, value);
    }
    return formData;
}

export {
    createNotification,
    toFormData
}
