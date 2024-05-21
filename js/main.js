
class Main extends HTMLElement {
  // The browser calls this method when the element is
  // added to the DOM.
  connectedCallback() {
    // Create a Date object representing the current date.
    const now = new Date();

    // Format the date to a human-friendly string, and set the
    // formatted date as the text content of this element.
    this.shadowRoot.innerHTML = `<strong>DSFGVDFS</strong>`;
  }
}

// Register the CurrentDate component using the tag name <current-date>.
customElements.define("my-main", Main);
