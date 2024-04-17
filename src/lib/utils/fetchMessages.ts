import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import getHeaders from './getHeaders'
import { useEmailData } from '../hooks/use-email'
import { useEffect } from 'react'

async function fetchMessageIDs(token: string, userId: string) {
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
    const response = await axios.get<GmailMessage[]>(
      `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages/`,
      { headers, params }
    )

    if (response.status === 200 && response.data) {
      const messages: GmailMessage[] = response.data

      return messages.map((message) => message.id)
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

export default fetchMessageIDs
