/**
 * ========
 * = Main =
 * ========
 * 
 * This is where our program "come together".
 * If you think of the other files as tools,
 * then this here becomes the instruction
 * for how those tools should be applied.
 * - In what sequence
 * - How many times
 * - Under what conditions
 * - etc
 * 
 * You can think of this as the orchestrator
 */

// Gather all the tools we need
import { applyAutosize } from "./autosize.js"
import { getMessages, postMessage } from "./message-board.js"

// Apply the autosize at once
applyAutosize();

// Gather the elements we need from the document
/**@type {HTMLUListElement} */
const messageHistory = document.querySelector("#comment-history");
/**@type {HTMLTemplateElement} */
const messageTemplate = document.querySelector("#message-template");
/**@type {HTMLFormElement} */
const messageForm = document.querySelector("#message-form");

// Let's wire up our form so that it sends messages to the API
messageForm.addEventListener("submit", async (event) => {
  // Forms defaults to a hard refresh of the page, let's not do that
  event.preventDefault();

  // Okay, let's check the fields and read their values
  const alias = messageForm.querySelector("#alias").value;
  const content = messageForm.querySelector("#content").value;

  // Let's just check if there's actually something in them
  if (alias.length === 0 || content.length === 0) {
    // If no content let's not send it to the server
    // and just return early
    return;
  };

  // Great content is present, let's use our function
  // for sending it off. But let's package it into
  // the agreed upon form first
  const messageCreateInfo = {
    alias,
    content,
  };

  await postMessage(messageCreateInfo);
  // Let's also reset the inputs now
  messageForm.reset();
  // And rerender the history as there's been an update
  await render();
})

// We need to rerender the messages multiple times at different
// place in our code. Once at setup, and then after each messgae we post
// Let's wrap the logic in a function and call that where we need to.

// Now this is an async function, which means you start it and then
// it will be running somewhere in the background while our
// program continues executing other code.
// We can setup a simple guard so that multiple renders
// don't happen simultanuesly and tramples over each other

let isRendering = false;

// Let's populate the messages from the server once the document is loaded
render()

// Then do it at an interval incase someone else posts a message (not that this is accessible outside our local device)
setInterval(render, 10 * 1000); // 10 seconds. Time is in milliseconds, verify what things are measured in

/**
 * The sequence of steps for refreshing the comments
 */
async function render() {
  // Don't start a new render while we currently are in the middle of one
  if (isRendering) return
  isRendering = true;

  const messages = await getMessages();

  if (messages !== null) {
    // For each message create a new message element
    const newElements = messages.map(message => {
        // Make a clone of the template
        const newMessageElement = messageTemplate.content.cloneNode(true)

        // Set content based on our message
        newMessageElement.querySelector("li").id = message.id;
        newMessageElement.querySelector("span[rel=author]").textContent = message.alias;
        newMessageElement.querySelector("section > p").textContent = message.content;
  
        // Add it to our new list
        return newMessageElement;
    })
  
    // Now let's add them to the document
    // There are more optimized way to update content, but those are non-trivial
    // KISS => Keep It Stupid Simple / Keep It Simple, Stupid (depending on your mood)
    // So let's not do that (do try if you can find a way though)

    // We actually have two paths here,
    // Which requires slightly different handling
    if (messageHistory.children.length === 0) {
      // 1. There are no message
      messageHistory.append(...newElements);
    } else {
      // 2. We have messages and need to replace them
      messageHistory.replaceChildren(...newElements);
    }

    // We are finished, reset the guard
    isRendering = false;
  }
}
