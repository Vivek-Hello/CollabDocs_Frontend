import React, { useEffect } from 'react'
import { useDocsStore } from '@/store/docsStore'
import { UserStore } from '@/store/userStore'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const DocsList = () => {
  const { documents, getAllDocs, leaveCollaborators, deleteDoc } = useDocsStore()
  const { user } = UserStore()
  const router = useRouter()
  const id: string | undefined = user?._id ? user._id.toString() : undefined

  useEffect(() => {
    if (id) {
      getAllDocs(id)
    }
  }, [id])

  const handleDelete = (docsId: string) => {
    if (!id) return
    deleteDoc(docsId, id)
  }

  const handleLeave = (docsId: string) => {
    if (!id) return
    leaveCollaborators(id, docsId)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className='w-full px-4 sm:px-6 lg:px-8'>
      {/* Header for mobile */}
      <div className='lg:hidden mb-4'>
        <h2 className='text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
          My Documents
        </h2>
        <p className='text-gray-400 text-sm'>{documents?.length || 0} document(s)</p>
      </div>

      {/* Desktop Table View */}
      <div className='hidden lg:block'>
        <div className='bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-700/50 shadow-2xl overflow-hidden'>
          {/* Table Header */}
          <div className='grid grid-cols-12 gap-4 p-4 border-b border-zinc-700/50 text-gray-400 text-sm font-medium'>
            <div className='col-span-5'>Document Title</div>
            <div className='col-span-3'>Created</div>
            <div className='col-span-3'>Last Updated</div>
            <div className='col-span-1'>Action</div>
          </div>
          {/* Table Body */}
          {documents?.map((docs) => (
            <div
              onClick={() => {
                router.push(`/docs/${docs._id}`)
              }}
              key={docs._id}
              className='grid grid-cols-12 gap-4 p-4 border-b border-zinc-700/50 last:border-b-0 hover:bg-zinc-800/50 transition-colors duration-200 cursor-pointer'
            >
              <div className='col-span-5 text-white font-medium truncate'>
                {docs.title}
              </div>
              <div className='col-span-3 text-gray-300 text-sm'>
                {formatDate(docs.createdAt)}
              </div>
              <div className='col-span-3 text-gray-300 text-sm'>
                {formatDate(docs.updatedAt)}
              </div>
              <div className='col-span-1'>
                {docs.owner._id === user?._id ? (
                  <Button
                    variant={'destructive'}
                    onClick={e => {
                      e.stopPropagation(); // <-- Prevent parent click for navigation
                      handleDelete(docs._id)
                    }}
                    className='w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600'
                    size='sm'
                  >
                    Delete
                  </Button>
                ) : (
                  <Button
                    variant={'destructive'}
                    onClick={e => {
                      e.stopPropagation(); // <-- Prevent parent click for navigation
                      handleLeave(docs._id)
                    }}
                    className='w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
                    size='sm'
                  >
                    Leave
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className='lg:hidden space-y-4'>
        {documents?.map((docs) => (
          <div
            onClick={() => {
              router.push(`/docs/${docs._id}`)
            }}
            key={docs._id}
            className='bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-700/50 shadow-2xl p-4 space-y-3 cursor-pointer'
          >
            {/* Document Title */}
            <div className='flex justify-between items-start'>
              <h3 className='text-white font-medium text-lg truncate flex-1 mr-2'>{docs.title}</h3>
              {docs.owner._id === user?._id ? (
                <Button
                  variant={'destructive'}
                  onClick={e => {
                    e.stopPropagation(); // <-- Prevent parent click for navigation
                    handleDelete(docs._id)
                  }}
                  className='bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 flex-shrink-0'
                  size='sm'
                >
                  Delete
                </Button>
              ) : (
                <Button
                  variant={'destructive'}
                  onClick={e => {
                    e.stopPropagation(); // <-- Prevent parent click for navigation
                    handleLeave(docs._id)
                  }}
                  className='bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 flex-shrink-0'
                  size='sm'
                >
                  Leave
                </Button>
              )}
            </div>
            {/* Dates */}
            <div className='grid grid-cols-2 gap-4 text-sm'>
              <div>
                <p className='text-gray-400 text-xs'>Created</p>
                <p className='text-gray-300'>{formatDate(docs.createdAt)}</p>
              </div>
              <div>
                <p className='text-gray-400 text-xs'>Updated</p>
                <p className='text-gray-300'>{formatDate(docs.updatedAt)}</p>
              </div>
            </div>
            {/* Owner Badge */}
            <div className='flex justify-between items-center pt-2 border-t border-zinc-700/50'>
              <span className='text-xs text-gray-400'>
                {docs.owner._id === user?._id ? 'You are the owner' : 'Collaborator'}
              </span>
              <span className='text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full'>
                {docs.owner._id === user?._id ? 'Owner' : 'Member'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {(!documents || documents.length === 0) && (
        <div className='text-center py-12'>
          <div className='w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4'>
            <span className='text-4xl'>📄</span>
          </div>
          <h3 className='text-xl font-semibold text-gray-300 mb-2'>No documents yet</h3>
          <p className='text-gray-400'>Create your first document to get started</p>
        </div>
      )}
    </div>
  )
}

export default DocsList
