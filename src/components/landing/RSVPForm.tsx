import React, { useState } from 'react'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

interface RSVPProps {
  guestName: string
  ownerName: string
}

export default function RSVPForm({ guestName, ownerName }: RSVPProps) {
  const [formData, setFormData] = useState({
    willAttend: 'Có, chắc chắn!',
    joinLunch: 'Có',
    note: '',
  })
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      await fetch(import.meta.env.VITE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          //   'Content-Type': 'application/json',
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          ...formData,
          guestName,
          ownerName,
        }),
      })

      setStatus('success')
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section className="mx-auto max-w-2xl px-4 py-16 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-8">
              <h3 className="mb-2 text-2xl font-bold text-green-700">
                Cảm ơn {guestName}!
              </h3>
              <p className="text-green-600">
                Xác nhận của bạn đã được gửi thành công.{' '}
                {formData.willAttend === 'Có, chắc chắn!' ? (
                  <span>Hẹn gặp bạn tại lễ tốt nghiệp nhé!</span>
                ) : (
                  <span>Cảm ơn bạn đã xác nhận!</span>
                )}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="mx-auto max-w-2xl px-4 py-16">
      <Card className="border-0 border-t-4 border-[#C62534] bg-white shadow-xl">
        <CardContent className="p-6 md:p-8">
          <h3 className="mb-6 text-center font-serif text-3xl font-bold tracking-wider text-[#C62534] uppercase">
            Xác Nhận Tham Dự
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Khách mời
              </label>
              <Input
                type="text"
                disabled
                value={guestName}
                className="bg-gray-100 text-gray-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sẽ đến dự lễ chứ?</label>
              <Select
                value={formData.willAttend}
                onValueChange={(val) =>
                  setFormData({ ...formData, willAttend: val })
                }>
                <SelectTrigger className="w-full focus:border-[#C62534] focus:ring-1 focus:ring-[#C62534]">
                  <SelectValue placeholder="Chọn xác nhận..." />
                </SelectTrigger>
                <SelectContent position="popper" align="center">
                  <SelectItem value="Có, chắc chắn!">Có, chắc chắn!</SelectItem>
                  <SelectItem value="Chưa chắc chắn lắm">
                    Chưa chắc chắn lắm
                  </SelectItem>
                  <SelectItem value="Tiếc quá, mình bận mất rồi">
                    Tiếc quá, mình bận mất rồi
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* {formData.willAttend !== 'Tiếc quá, mình bận mất rồi' && (
              <div>
                <label className="text-sm font-medium">
                  Tham gia bữa cơm thân mật (Trưa)?
                </label>
                <Select
                  value={formData.joinLunch}
                  onValueChange={(val) =>
                    setFormData({ ...formData, joinLunch: val })
                  }>
                  <SelectTrigger className="w-full focus:ring-2 focus:ring-[#C62534]">
                    <SelectValue placeholder="Chọn xác nhận..." />
                  </SelectTrigger>
                  <SelectContent position="popper" align="center">
                    <SelectItem value="Có">Có</SelectItem>
                    <SelectItem value="Không">Không</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )} */}

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Lời chúc / Ghi chú
              </label>
              <Textarea
                rows={3}
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
                placeholder="Bạn có muốn nhắn gửi gì thêm không?"
                className="resize-none focus:border-[#C62534]! focus:ring-1 focus:ring-[#C62534]!"
              />
            </div>

            <Button
              type="submit"
              disabled={status === 'loading'}
              className="flex h-auto w-full justify-center rounded-xl bg-[#C62534] py-3 text-base font-bold text-white shadow-md transition hover:bg-red-800">
              {status === 'loading' ? 'Đang gửi...' : 'Gửi Xác Nhận'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}
