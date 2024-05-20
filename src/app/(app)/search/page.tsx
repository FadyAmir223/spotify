import type { Metadata } from 'next'

import Header from '../_components/header'
import SearchForm from '../_components/search-form'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Find your song through millions of songs',
}

export default function Search() {
  return (
    <main>
      <Header />

      <div className='p-4'>
        <h1 className='mb-5 text-2xl font-bold'>Search</h1>
        <SearchForm />
      </div>
    </main>
  )
}
