import { useState } from 'react'

export default function GenerateLinkTool() {
  const [name, setName] = useState('')
  const [generatedLink, setGeneratedLink] = useState('')

  const generateLink = (guestName: string) => {
    if (!guestName.trim()) return ''
    const encoded = btoa(encodeURIComponent(guestName))

    return `${import.meta.env.VITE_HOST}?g=${encoded}`
  }

  const handleGenerate = () => {
    const link = generateLink(name)
    setGeneratedLink(link)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink)
    alert('Đã copy link!')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Tool Tạo Link Mời
        </h1>

        <label className="mb-2 block text-sm font-medium text-gray-700">
          Tên người được mời (Có dấu bình thường)
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="VD: Gia đình chị Lan"
          className="mb-4 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          onClick={handleGenerate}
          className="mb-6 w-full rounded-lg bg-[#C62534] py-2 font-bold text-white transition hover:bg-red-800">
          Tạo Link
        </button>

        {generatedLink && (
          <div className="rounded-lg bg-gray-100 p-4 break-all">
            <p className="mb-2 text-sm text-gray-600">Link của bạn:</p>
            <a
              href={generatedLink}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline">
              {generatedLink}
            </a>
            <button
              onClick={copyToClipboard}
              className="mt-4 w-full rounded bg-gray-800 px-4 py-1 text-sm text-white">
              Copy Link
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
