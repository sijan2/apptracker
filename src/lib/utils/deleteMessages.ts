import axios from "axios";
import getHeaders from "./getHeaders";

export default async function deleteMessages(
  messageIdArray: string[],
  token: string,
  userId: string
) {
  const headers = getHeaders(token);

  if (messageIdArray.length === 0) {
    console.log("error", "No messages to delete");
    return;
  }

  try {
    const response = await axios.post(
      `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages/batchDelete`,
      { ids: messageIdArray },
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    console.log("error", `Error deleting messages: ${error}`);
  }
}
