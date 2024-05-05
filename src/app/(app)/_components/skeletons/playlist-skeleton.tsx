export default function PlaylistSkeleton() {
  return (
    <div className='flex animate-pulse items-center gap-x-3 rounded-sm p-1.5'>
      <div className='size-10 rounded-sm bg-neutral-600' />
      <div className='grow'>
        <div className='mb-2.5 h-2.5 w-28 rounded-sm bg-neutral-600' />
        <div className='h-2.5 w-20 rounded-sm bg-neutral-600' />
      </div>
    </div>
  )
}
