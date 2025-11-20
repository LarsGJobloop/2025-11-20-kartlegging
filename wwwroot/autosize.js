/**
 * ============
 * = Autosize =
 * ============
 * 
 * Contains logic for allowing the textarea elements
 * to automatically resize depending on how much
 * content it currently includes.
 */

// Textareas are difficult and don't natively
// "grow" as you type in more and more lines of
// content.
// 
// This is "fixes" that issue, such that
// when we now writes into something with the
// "autosize" class. We recalculate the height
// of the element and sets it to the new value.
//
// Don't do this unless you have to, as it's
// better to make use of CSS rules. They
// don't cover everything though. So JS
// becomes our escape hatch.

/**
 * When this function is run. All elements
 * with the "autosize" CSS class while
 * resize automatically based on content inside them.
 * 
 * @example
 * // Nothing is currently resizing
 * applyAutosize()
 * // Now all relevant elements will resize as you type
 * 
 * @example
 * const stopAutosize = applyAutosize()
 * // Elements are resizing
 * stopAutosize()
 * // Elements have stopped resizing
 * 
 * @returns {() => void}
 */
export function applyAutosize() {
  // We might want to clear this for some reason or another
  // this helps us do just that.
  const abortController = new AbortController();

  // Whenever an input event occurs in the document
  document.addEventListener("input", (event) => {
    // Extract the element from the event object
    const element = event.target;
  
    // If it has the "autosize" class
    if (element.classList.contains("autosize"))
    {
      // Take the current scrollHeight, measured in px units
      // and prepend "px" so it becomes a valid CSS style value
      // Eg. 256 + "px" = "256px"
      // Set the element's height to this string
      element.style.height = element.scrollHeight + "px";
    };
  }, abortController.signal)

  // Return a new function that the caller can use
  // to clear the event listner.
  return () => abortController.abort();
}
