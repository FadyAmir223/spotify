export default function SongSkeleton() {
  return (
    <div className='animate-pulse rounded-md bg-[#1E1E1E] p-3'>
      <div className='aspect-square w-full rounded-md bg-neutral-600' />

      <div className='mt-2.5'>
        <div className='mb-1.5 h-3.5 w-4/5 rounded-sm bg-neutral-600' />
        <div className='h-3.5 w-3/5 rounded-sm bg-neutral-600' />
      </div>
    </div>
  )
}
