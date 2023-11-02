import { LitElement, html, css } from 'lit';

export class PolarisChip extends LitElement {

  // Difining component properties

  static get properties() {
    return {
      chipLabel: { type: String },
      backgroundColorType: { type: String },
      backgroundImageUrl: { type: String },
      externalLink: { type: String },
      isClickable: { type: Boolean },
      hasMultipleLines: { type: Boolean },
      secondaryText: { type: String },
      showExternalLinkIcon: { type: Boolean },
    };
  }

  // Defining component styles
  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      :host([showExternalLinkIcon]) .chip > .externalLinkIcon > svg {
        width: 24px;
        height: 24px;
        fill: #CCE9FF;
        position: absolute;
        bottom: 15px;
        right: 15px;
        transition: transform 0.2s;
      }

      .chip--backgroundImage:hover > .externalLinkIcon > svg{
        transform: scale(1.3);
      }

      .externalLinkIcon {
        width: 24px;
        height: 24px;
      }

      .chip.isClickable:hover {
        cursor: pointer;
      }

      .chip {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 281px;
        width: 336px;
        font-family: Roboto, 'Franklin Gothic Medium', Tahoma, sans-serif;
        font-size: 32px;
        color: white;
        box-shadow: rgba(0, 3, 33, 0.1) 0px 8px 16px 0px;
        position: relative;
      }

      .divider {
        width: 242px;
        margin: auto;
      }

      .divider__line {
        margin: 0 0 16px 0;
        height: 3px;
        background-color: rgb(0, 30, 68);
      }

      .secondaryText {
        font-family: Tahoma;
        display: block;
        color: rgb(0, 30, 68);
        font-size: 18px;
        font-weight: normal;
        margin: 0 0 20px 0;
      }

      .chipLabel {
        margin: 0 0 16px 0;
        padding: 0 47px;
        margin-bottom: 18px;
      }

      .chip--darkNavy {
        background-color: rgb(0, 30, 68);
      }

      .chip--blue {
        background-color: rgb(30, 64, 124);
      }

      .chip--gradientBlue {
        background-color: rgba(0, 0, 0, 0);
        background-image: linear-gradient(rgb(30, 64, 124) 0%, rgb(0, 30, 68) 65%, rgb(0, 30, 68) 100%);
      }

      .chip--backgroundImage {
        background-blend-mode: multiply;
        background-color: rgba(0, 3, 33, 0.5);
        background-position: 50% 50%;
        background-size: cover;
      }

      .chip--light {
        background-color: #fff;
        position: relative;
        color: #001e44;
        box-shadow: 0 8px 16px 0 rgba(0,3,33,.1);
        width: 336px;
        height: 280.8px;
      }

      .chip--multiline .chip__content {
        flex-direction: column;
      }
    `;
  }

  // Default values for the component properties
  constructor() {
    super();
    this.chipLabel = "";
    this.backgroundImageUrl = "";
    this.externalLink = "";
    this.isClickable = false;
    this.secondaryText = "";
    this.hasMultipleLines = false;
    this.showExternalLinkIcon = false;
    this.backgroundColorType = "";  
  }

  // Invoked when the component is appended to the document.
  connectedCallback() {
    super.connectedCallback();
    if (this.isClickable) {
      this.addEventListener('click', this._handleClick);
    }
  }

  // Invoked when the component is removed from the document.
  disconnectedCallback() {
    if (this.isClickable) {
      this.removeEventListener('click', this._handleClick);
    }
    super.disconnectedCallback();
  }

  // Handles the click event when the chip is clicked.
  _handleClick() {
    if (this.externalLink) {
      window.open(this.externalLink, '_blank');
    }
  }

  //Defines the HTML structure of the component.
  
  render() {
    return html`
      <div class="chip ${this.backgroundColorType} ${this.hasMultipleLines ? 'chip--multiline' : ''} ${this.isClickable ? 'isClickable' : ''}">
        ${this.hasMultipleLines
          ? html`
            <div class="chip__content">
              <div class="chipLabel">
                ${this.chipLabel}
              </div>
              <div class="divider">
                <hr class="divider__line" />
              </div>
              <div class="secondaryText">
                ${this.secondaryText}
              </div>
            </div>`
          : html`
            <div class="chipLabel">
              ${this.chipLabel}
            </div>
            ${this.isClickable && this.showExternalLinkIcon ? html`
            <div class="externalLinkIcon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.22222 22C3.61111 22 3.08796 21.7824 2.65278 21.3472C2.21759 20.912 2 20.3889 2 19.7778V4.22222C2 3.61111 2.21759 3.08796 2.65278 2.65278C3.08796 2.21759 3.61111 2 4.22222 2H10.8889C11.2037 2 11.4676 2.10648 11.6806 2.31944C11.8935 2.53241 12 2.7963 12 3.11111C12 3.42593 11.8935 3.68981 11.6806 3.90278C11.4676 4.11574 11.2037 4.22222 10.8889 4.22222H4.22222V19.7778H19.7778V13.1111C19.7778 12.7963 19.8843 12.5324 20.0972 12.3194C20.3102 12.1065 20.5741 12 20.8889 12C21.2037 12 21.4676 12.1065 21.6806 12.3194C21.8935 12.5324 22 12.7963 22 13.1111V19.7778C22 20.3889 21.7824 20.912 21.3472 21.3472C20.912 21.7824 20.3889 22 19.7778 22H4.22222ZM8.66667 15.3333C8.46296 15.1296 8.36111 14.8704 8.36111 14.5556C8.36111 14.2407 8.46296 13.9815 8.66667 13.7778L18.2222 4.22222H15.3333C15.0185 4.22222 14.7546 4.11574 14.5417 3.90278C14.3287 3.68981 14.2222 3.42593 14.2222 3.11111C14.2222 2.7963 14.3287 2.53241 14.5417 2.31944C14.7546 2.10648 15.0185 2 15.3333 2H20.8889C21.2037 2 21.4676 2.10648 21.6806 2.31944C21.8935 2.53241 22 2.7963 22 3.11111V8.66667C22 8.98148 21.8935 9.24537 21.6806 9.45833C21.4676 9.6713 21.2037 9.77778 20.8889 9.77778C20.5741 9.77778 20.3102 9.6713 20.0972 9.45833C19.8843 9.24537 19.7778 8.98148 19.7778 8.66667V5.77778L10.1944 15.3611C9.99074 15.5648 9.74074 15.6667 9.44445 15.6667C9.14815 15.6667 8.88889 15.5556 8.66667 15.3333Z" fill="#CCE9FF">
                </path>
              </svg>
            </div>
            ` : ''}
          `}
          ${this.backgroundColorType === 'chip--backgroundImage' ? html`
            <style>
              .chip--backgroundImage {
                background-image: url(${this.backgroundImageUrl});
              }
            </style>
          ` : ''}
        </div>
    `;
  }
}

customElements.define('polaris-chip', PolarisChip);
