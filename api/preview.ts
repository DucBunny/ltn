import type { VercelRequest, VercelResponse } from '@vercel/node'

const ownerConfig = {
  default: '',
  d: 'Vũ Ngọc Đức',
  q: 'Lê Thị Quỳnh',
  dq: 'Đức & Quỳnh',
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Lấy cả tham số trên url (:id) và tham số query (?g=token)
  const id = req.query.id as string | undefined
  const g = req.query.g as string | undefined

  const safeId = id || 'default'
  const host = process.env.VITE_HOST || ''
  const imgURL = `${host}preview/${safeId}.png`

  const isValidId = id && id in ownerConfig
  const currentOwner = isValidId
    ? ownerConfig[id as keyof typeof ownerConfig]
    : ownerConfig.default

  let guestName = 'bạn'
  if (g) {
    try {
      // Decode Base64 về chuỗi URL-encoded (Qu%E1%BB%B3nh), sau đó giải mã URI để ra tiếng Việt
      const base64Decoded = Buffer.from(g, 'base64').toString('ascii')
      guestName = decodeURIComponent(base64Decoded)
    } catch (e) {
      console.error('Lỗi giải mã tên khách mời:', e)
    }
  }

  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Thiệp mời tốt nghiệp</title>
        <meta property="og:title" content="Thiệp Mời Tốt Nghiệp - ${currentOwner}" />
        <meta property="og:description" content="Trân trọng kính mời ${guestName} đến dự Lễ Tốt Nghiệp - Trường CNTT&TT" />
        <meta property="og:image" content="${imgURL}" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="${host}${safeId}?g=${g}" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="${imgURL}" />
      </head>
    <body></body>
    </html>
  `)
}
