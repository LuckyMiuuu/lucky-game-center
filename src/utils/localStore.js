export function setLocalStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
export function getLocalStore(key) {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : ''
}
export function remLocalStore(key) {
  localStorage.removeItem(key)
}
export function setSessStore(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value))
}
export function getSessStore(key) {
  const value = sessionStorage.getItem(key)
  return value ? JSON.parse(value) : ''
}
export function remSessStore(key) {
  sessionStorage.removeItem(key)
}
