export const ADMIN_ENTRY_PATH = '/ops/onchainkorea-admin'
export const ADMIN_ACCESS_PATH = `${ADMIN_ENTRY_PATH}/access`
export const ADMIN_CONSOLE_PATH = `${ADMIN_ENTRY_PATH}/console`

export function isAdminConsolePath(pathname = '') {
  return pathname === ADMIN_CONSOLE_PATH || pathname.startsWith(`${ADMIN_CONSOLE_PATH}/`)
}
