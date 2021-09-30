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

const getNow = () => new Date().toJSON().slice(0, 19).replace('T', ' ');

const download = (base64, type = 'pdf') => {
  if(base64){
      const linkSource = `data:application/${type};base64,${base64}`;
      const downloadLink = document.createElement("a");
      const fileName = "file." + type;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
  }
}

export {
    createNotification,
    toFormData,
    getNow,
    download
}
