import { successNotification } from '@utils/notifications-operations';

const successfulCopy = (text: string) => {
  successNotification('Успешно скопировано', text);
};

function copyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = String(text);

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    successfulCopy(text);
  } catch (err) {
    navigator.clipboard.writeText(String(text)).then(() => {
      successfulCopy(text);
    });
    document.body.removeChild(textArea);
  }

  document.body.removeChild(textArea);
}

export default copyTextToClipboard;
