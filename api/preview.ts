const ownerConfig = {
  default: '',
  d: 'Vũ Ngọc Đức',
  q: 'Lê Thị Quỳnh',
  dq: 'Đức & Quỳnh',
}

export default async function handler(req: any, res: any) {
  // Lấy cả tham số trên url (:id) và tham số query (?g=token)
  const { id, g } = req.query
  const host = process.env.VITE_HOST || 'http://localhost:3000/'
  const imgURL = `${host}images/${id}.png`

  const isValidId = id && id in ownerConfig
  const currentOwner = isValidId
    ? ownerConfig[id as keyof typeof ownerConfig]
    : ownerConfig.default

  let guestName = 'Bạn'
  if (g) {
    try {
      // Decode Base64 về chuỗi URL-encoded (Qu%E1%BB%B3nh), sau đó giải mã URI để ra tiếng Việt
      const base64Decoded = Buffer.from(g as string, 'base64').toString('ascii')
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
        <meta property="og:url" content="${host}${id}?g=${g}" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="${imgURL}" />
      </head>
    <body></body>
    </html>
  `)
}
