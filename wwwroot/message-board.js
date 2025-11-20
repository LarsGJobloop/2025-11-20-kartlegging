/**
 * =================
 * = Message Board =
 * =================
 * 
 * This file contains the logic for communicating
 * with the ASP .NET API
 */


// This is a bit extra that we can do to help ourselves.
// It's not required, but aids JS with extra
// information that allows our IDE (JS LSP really)
// to inform us of what the various shapes of
// the objects are.

/**
 * The shape of the JSON object we need to send to the server.
 * @typedef {Object} MessageCreateInfo
 * @property {string} alias - Alias to post the message under.
 * @property {string} content - Message content to post.
 */

/**
 * A complete message returned from the server.
 * @typedef {Object} Message
 * @property {string} id - Unique identifier for this message.
 * @property {string} alias - The alias that this message was posted by.
 * @property {string} content - Message that was posted.
 */

/**
 * NOTE!
 * Since both the server and the JS comes from the exact
 * same domain (localhost:<some-port>), we can skip the
 * domain name when sending messages. They will default
 * to using the same domain as the HTML document is from.
 * 
 * This means we do need to include the domain when
 * getting data from other services.
 * 
 * Eg. Normally we would write:
 * @example
 * const result = await fetch("https://my-domain.com/messages")
 * 
 * But if both HTML and API is under the same domain we can write:
 * @example
 * const result = await fetch("/messages")
 */

/**
 * Takes the MessageCreateInfo and
 * sends (POST) it to our backend server
 * @param {MessageCreateInfo} messageCreateInfo
 */
export async function postMessage(messageCreateInfo) {
  // To talk to other things outside our application
  // we need to translate it into a shared language (JSON)
  const serialized = JSON.stringify(messageCreateInfo);

  // Great! Let's ensure we send
  // - To the correct URL
  // - With the correct method
  // - And include the content
  const result = await fetch("/message", {
    method: "POST",
    body: serialized,
    // Servers are strict and want to be informed
    // of what type of message we are sending
    headers: {
      // Let's inform it's of type JSON
      "Content-Type": "application/json",
    },
  });

  // Not all responses are happy responses
  if (!result.ok) {
    if (result.status < 500) {
      console.error("The server blamed us for doing something wrong!");
      console.error("We should inform the user, perhaps they can fix it?");
      console.error(result.statusText);
    } else if (result.status >= 500) {
      console.error("Seems the backend folks messed up hard! I'll grab a coffe");
      console.error("We should inform the user that they need to come back some other time.")
    }

    return // Early return
  }
  
  console.info("Everything went fine!")
  console.info("Perhaps it would be an idea to congratulate the user?")
}

/**
 * Retrievs all the messages from the backend API
 * @returns {Promise<Message[] | null>}
 */
export async function getMessages() {
  const result = await fetch("/message")

  // 
  if (!result.ok) {
    console.error("Whoopsie! Something went wrong!")
    console.error(result.statusText);
    return null // 
  }

  // Great, we got a response!
  // But the response is in one of the common language and not JS.
  // And the full message have not yet arrived.
  const messages = await result.json();

  return messages;
}
