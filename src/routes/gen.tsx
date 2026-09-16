import { createFileRoute } from '@tanstack/react-router'
import GenerateLinkTool from '@/pages/GenerateLinkPage'

export const Route = createFileRoute('/gen')({
  component: GenerateLinkTool,
})
