
/*
*   Randomly generate a number between n1 and n2
*/
export function randomNumberBetween(n1: number, n2: number) {
  if (n1 > n2) {
    [n1, n2] = [n2, n1]; // 确保n1小于n2
  }
  const min = Math.ceil(n1);
  const max = Math.floor(n2);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
*   base64 encode
*/
export function base64EncryptString(str: string) {
  return btoa(str);
}
/*
*   base64 decode
*/
export function base64DecryptString(str: string) {
  return atob(str);
}

export function joinOfficialChannel() {
    const channelUrl = import.meta.env.VITE_JOIN_CHANNEL_LINK
    const telegramWebApp = (window as any).Telegram?.WebApp
    if (telegramWebApp) {
        telegramWebApp.openTelegramLink(channelUrl)
    } else {
        window.open(channelUrl, '_blank');
    }
}