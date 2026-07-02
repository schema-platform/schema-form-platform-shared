/** 当前是否在任意子应用的登录页（含尾斜杠与 query） */
export function isAuthLoginPath(pathname = window.location.pathname): boolean {
  return /\/login\/?$/.test(pathname)
}
