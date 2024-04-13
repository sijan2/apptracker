import axios from 'axios'

import getHeaders from './getHeaders'
import getEmail from './getEmail'
import formatLink from './formatLink'

type MessageObject = {
  id: string
  name?: string
  webUrl?: string
  email?: string
}

async function fetchMessageIDs(token: string, userId: string) {
  const MAX_RESULTS = 400
  const QUERY_STRING = 'Unsubscribe'

  const headers = getHeaders(token)

  const params = {
    maxResults: MAX_RESULTS,
    q: QUERY_STRING,
    includeSpamTrash: false,
  }

  try {
    const response = await axios.get(
      `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages/`,
      { headers, params }
    )

    if (response.status === 200 && response.data.messages) {
      const { messages } = response.data
      return messages.map((message: { id: string }) => message.id)
    }
  } catch (error: any) {
    if (error.code === 'ERR_BAD_REQUEST') {
      console.log('error', 'Invalid token: Please log in again.')
    } else
      console.log('error', `There was an error fetching message ids: ${error}`)
  }
}

async function fetchMessages(token: string, userId: string) {
  const messageIdArray = await fetchMessageIDs(token, userId)

  const headers = getHeaders(token)

  if (Array.isArray(messageIdArray) && messageIdArray.length === 0) {
    console.log('error', 'No messages found')
    return []
  }

  const messagePromises = messageIdArray.map(async (messageId: string) => {
    try {
      const response = await axios.get(
        `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages/` +
          messageId,
        {
          headers,
        }
      )

      if (response.status === 200 && response.data) {
        const { payload, id } = response.data
        const { headers } = payload

        const tempObject: MessageObject = { id }

        headers.find((item: { name: string; value: string }) => {
          if (item.name === 'From') {
            tempObject.name = item.value
            tempObject.email = getEmail(item.value) as string
          } else if (item.name === 'List-Unsubscribe') {
            const cleanLink = formatLink(item.value)

            tempObject.webUrl = cleanLink?.https[0]
          }
        })

        return tempObject
      }
    } catch (error) {
      console.log('error', `There was an error fetching messages: ${error}`)
    }
  })

  const exists: Set<string> = new Set()

  const [messageArray] = await Promise.all([
    Promise.all(messagePromises).then((items) =>
      items.filter((item) => {
        const email = item?.email

        if (email !== undefined && !exists.has(email) && item.webUrl) {
          exists.add(email)
          return item
        }
      })
    ),
  ])

  return messageArray
}

export default fetchMessages