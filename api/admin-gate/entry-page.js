import { ADMIN_ACCESS_PATH } from '../../src/lib/adminRoute.js'

export default function handler(_req, res) {
  res.statusCode = 302
  res.setHeader('Location', ADMIN_ACCESS_PATH)
  res.setHeader('Cache-Control', 'no-store')
  res.end()
}
