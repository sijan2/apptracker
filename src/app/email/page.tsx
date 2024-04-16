'use client'

import deleteMessages from '@/lib/utils/deleteMessages'
import fetchMessages from '@/lib/utils/fetchMessages'
import {
  addSubscriptions,
  getSubscriptions,
  handleLogout,
} from '@/supabase/supabase'
import { useEffect, useState } from 'react'

interface HomeProps {
  user: any
}

type MessageObject = {
  id: string
  name?: string
  webUrl?: string
  email?: string
}

function Home() {
  const [messages, setMessages] = useState<MessageObject[]>()
  const [checkedIds, setCheckedIds] = useState<string[]>([])
  const [dbEmails, setDbEmails] = useState<string[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const { token } = sessionStorage
  const user = JSON.parse(sessionStorage.getItem('user') as string)

  useEffect(() => {
    async function storeDbEmails() {
      const emails = await getSubscriptions()

      if (!emails) return

      setDbEmails(emails)
    }

    storeDbEmails()
  }, [])
  ;(() => {
    if (dbEmails && !sessionStorage.statsHasRun) {
      sessionStorage.setItem('statsHasRun', JSON.stringify(true))
    }
  })()

  async function handleFetchMessages() {
    setLoading(true)

    if (messages) {
      setMessages([])
    }

    try {
      const fetchedMessages = await fetchMessages(
        token,
        user.user_metadata.provider_id
      )

      if (fetchedMessages) {
        const filteredEmails = dbEmails
          ? fetchedMessages.filter(
              (message) => !dbEmails.includes(message.email)
            )
          : []

        filteredEmails.length > 0
          ? setMessages(filteredEmails)
          : setMessages(fetchedMessages)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  function handleCheckedIds(id: any) {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((existingIds) => existingIds !== id))
    } else {
      setCheckedIds([...checkedIds, id])
    }
  }

  function handleCheckAllIds() {
    const checkAll = document.getElementById('checkAll') as HTMLInputElement
    const tempArray: Array<string> = []

    if (checkAll.checked) {
      setCheckedIds([])

      messages?.forEach((message) => {
        if (message?.id) {
          tempArray.push(message.id)
        }
      })

      setCheckedIds(tempArray)
    } else {
      setCheckedIds([])
    }
  }

  async function handleDelete() {
    setLoading(true)
    try {
      const response = await deleteMessages(
        checkedIds,
        token,
        user.user_metadata.provider_id
      )

      if (response === '') {
        setMessages(
          messages?.filter((message) => !checkedIds.includes(message.id ?? ''))
        )
        setCheckedIds([])
        console.log('success', 'Successfully removed emails!')
      }
    } catch (error) {
      console.log(
        'error',
        `There was an error deleting your messages: ${error}`
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      id='home'
      className='relative min-h-screen py-10 px-5 w-full flex flex-col gap-5 items-center justify-center'
    >
      <div className='flex items-center gap-5'>
        <img
          src={user.user_metadata.avatar_url}
          alt='user'
          className='rounded-full w-20 shadow-lg'
        />
      </div>

      <p className='text-lg'>
        Welcome{' '}
        <span className='font-bold'>
          {user?.user_metadata.full_name.split(' ')[0]}
        </span>
      </p>

      {messages && messages.length > 0 && (
        <p className='font-bold p-2 rounded-md'>
          <span className='text-lg text-red-500'>{messages.length}</span>{' '}
          subscriptions were found.
        </p>
      )}

      {checkedIds.length > 0 ? (
        <button onClick={handleDelete} className='size-4 bg-black text-white'>
          Delete selected: {checkedIds.length}
        </button>
      ) : (
        <button onClick={handleFetchMessages}>Get Subscriptions</button>
      )}

      <div className='absolute top-5 right-5 flex items-center gap-4'>
        <button className='size-4 bg-black text-white' onClick={handleLogout}>
          {' '}
          logout
        </button>
      </div>

      {messages && messages.length > 0 && (
        <table className='w-full transition-all lg:w-2/3 lg:max-w-[1000px] min-h-screen overflow-auto'>
          <thead className='bg-slate-800'>
            <tr>
              <th className='text-lg px-5 py-3 text-left'>
                <input
                  id='checkAll'
                  onChange={handleCheckAllIds}
                  type='checkbox'
                  className='w-5 h-5 mx-1'
                />
              </th>
              <th className='text-lg px-5 py-3 text-left'>Name</th>
              <th className='text-lg px-5 py-3 text-center'>Link</th>
            </tr>
          </thead>

          <tbody>
            {messages?.map((message, index) => {
              const name = message.name?.split('<')[0].replace(/"/g, '')
              const email = message.email
              const webUrl = message?.webUrl

              return (
                <tr
                  key={index}
                  className='text-left border border-gray-700 transition-all hover:bg-slate-800'
                >
                  <th className='p-3'>
                    <input
                      type='checkbox'
                      className='mx-3 w-5 h-5'
                      checked={checkedIds.includes(message.id ?? '')}
                      onChange={() => handleCheckedIds(message.id)}
                    />
                  </th>

                  <th className='p-3'>
                    <div>
                      <p className='text-sm md:text-base'>{name}</p>
                      <p className='hidden md:block text-xs opacity-90'>
                        {email}
                      </p>
                    </div>
                  </th>

                  <td className='p-3 text-center'>
                    {webUrl ? (
                      <a
                        href={webUrl}
                        target='_blank'
                        onClick={() => checkedIds.push(message.id)}
                      >
                        <button className='font-bold gradient-text'>
                          Unsubscribe
                        </button>
                      </a>
                    ) : null}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Home
