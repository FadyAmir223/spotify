'use client'

import TriangleButton from './triangle-button'

export default function PlayFavoritesButton() {
  return (
    <TriangleButton
      className='ml-auto mr-4 size-10 opacity-0 group-hover:opacity-100'
      onClick={(e) => {
        e.preventDefault()
        // TODO: set favorites
      }}
    />
  )
}
