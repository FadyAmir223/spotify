import Header from '../_components/header'
import SearchForm from '../_components/search-form'

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
