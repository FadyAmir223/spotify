'use client'

import { useLayoutEffect } from 'react'

type TitleUpdaterProps = {
  title: string
}

// generateMetadata is blocking with susepnse so a workaround until fixed
export default function TitleUpdater({ title }: TitleUpdaterProps) {
  useLayoutEffect(() => {
    if (title) document.title = title
  }, [title])

  return null
}
