import { createFileRoute } from '@tanstack/react-router'

import GraduationPage from '@/pages/GraduationPage'

export const Route = createFileRoute('/$ownerId')({ component: GraduationPage })
