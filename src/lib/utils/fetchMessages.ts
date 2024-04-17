import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import getHeaders from './getHeaders'
interface EmailData {
  company: string
  status: string
}

export async function fetchMessageIDs(token: string, userId: string) {
  const MAX_RESULTS = 400

  const phrases = [
    '"Thank you for applying to"',
    '"Thank you for your interest"',
    '"We have received your application"',
    '"Our recruiting team will contact you"',
    '"progressed to the next stage"',
    '"like to invite you for an interview"',
    '"caught our attention"',
    '"excited to move forward"',
    '"like to invite you to participate"',
    '"have been shortlisted"',
    '"schedule a time for you to meet"',
    '"impressed by your experience"',
    '"decided to move forward with other candidates"',
    '"will not be progressing your application"',
    '"chosen not to proceed with your application"',
    '"your application has not been successful"',
    '"selected a candidate whose qualifications"',
    '"decided not to advance your application"',
    '"decided to proceed with another candidate"',
    '"not be offering you a position"',
    '"concluded to pursue other candidates"',
  ]

  const QUERY_STRING = phrases.join(' OR ')

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
      toast({
        title: 'Something went wrong.',
        description: 'Your request failed. Please try again.',
        variant: 'destructive',
      })
    } else
      toast({
        title: 'Something went wrong.',
        description: `${error}`,
        variant: 'destructive',
      })
  }
}

async function scanEmail(
  token: string,
  userId: string
): Promise<EmailData[] | undefined> {
  const messageIdArray = await fetchMessageIDs(token, userId)

  const headers = getHeaders(token)

  if (Array.isArray(messageIdArray) && messageIdArray.length === 0) {
    toast({
      title: 'Something went wrong.',
      description: 'Your request failed. Please try again.',
      variant: 'destructive',
    })
    return []
  }

  const promises = messageIdArray.map(async (messageId: string) => {
    try {
      const response = await axios.get<GmailMessage>(
        `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages/${messageId}`,
        { headers }
      )
      if (response.status === 200 && response.data) {
        const res = response.data.payload
        const header = res.headers
        const parts = res.parts

        // Extracting necessary information
        const extracted_payload = {
          to: header.find((h) => h.name === 'To')?.value ?? '',
          from: header.find((h) => h.name === 'From')?.value ?? '',
          subject: header.find((h) => h.name === 'Subject')?.value ?? '',
          content: parts?.[0]?.body?.data ?? '',
        }

        const json_payload = JSON.stringify(extracted_payload)
        const url = 'http://localhost:5000/process-email'

        const postResponse = await axios.post(url, json_payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (postResponse.status === 204) {
          return undefined
        }
        return postResponse.data
      }
    } catch (error) {
      console.error('Error processing message:', error)
      return undefined
    }
  })

  try {
    // Await all promises and filter out any undefined results
    const results = await Promise.all(promises)
    return results.filter((result): result is EmailData => result !== undefined)
  } catch (error) {
    toast({
      title: 'Network error',
      description: 'There was a problem fetching your emails.',
      variant: 'destructive',
    })
    console.error('Error:', error)
    return undefined
  }
}

export default scanEmail
