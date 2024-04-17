// Gmail-types.d.ts
declare global {
  interface GmailMessage {
    id: string
    threadId: string
    labelIds: string[]
    snippet: string
    payload: GmailPayload
    sizeEstimate: number
    historyId: string
    internalDate: string
  }

  interface GmailPayload {
    partId: string
    mimeType: string
    filename: string
    headers: GmailHeader[]
    body: GmailBody
    parts?: GmailPart[]
  }

  interface GmailHeader {
    name: string
    value: string
  }

  interface GmailBody {
    size: number
    data?: string
  }

  interface GmailPart {
    partId: string
    mimeType: string
    filename: string
    headers: GmailHeader[]
    body: GmailBody
  }
}

// Ensure this file is a module by adding an empty export statement.
export {}
