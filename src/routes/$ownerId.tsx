import GraduationPage from '@/pages/GraduationPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$ownerId')({ component: GraduationPage })
