
export const setRem = (designWidth: number = 780, isMobile: boolean) => {
  const screenWidth = isMobile ? document.documentElement.clientWidth || document.body.clientWidth : designWidth;
  const rem = screenWidth * (10 / designWidth);
  document.documentElement.style.fontSize = `${rem}px`;
};