import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

type QuoteList = {
  number: string;
};

async function GetQuotes(channel: string) {
  const list = async () =>
    await fetch(`http://127.0.0.1:8787/listquotes?channel=${channel}`).then(
      (res) => res.json(),
    );
  const quotes: QuoteList = await list();
  return quotes;
}

@customElement("grid-list")
export class GridList extends LitElement {
  @property() list = {};
  @property() quotes = [];
  @property() channel = "";
  @property() filter: string | null = "";

  connectedCallback(): void {
    super.connectedCallback();
    console.log("URL:", location.pathname.split("/", 2)[1]);
    const getQuotes = async () => {
      this.channel = location.pathname.split("/", 2)[1] || "";
      this.list = await GetQuotes(this.channel);
      this.quotes = Object.values(this.list);
    };
    getQuotes();
  }

  render() {
    return html`
      <h2>${this.channel.toLocaleUpperCase()}'s quotes</h2>
      <section>
        <ul>
          ${this.quotes.map(
            (quote, index) => html`
              <li class="${index}" key="${index + 1}">
                #${index + 1}: ${quote}
              </li>
            `,
          )}
        </ul>
      </section>
    `;
  }

  static styles = css`
    section {
      margin: 10px;
      top: 10px
    }
    @media (max-width: 480px) {
      ul {
        column-count: 1;
      }
    }
    @media (min-width: 790px) {
      ul {
        column-count: 2;
      }
    }
    @media (min-width: 1200px) {
      ul {
        column-count: 3;
      }
    }
    ul {
      font-size: 1em;
      top: 0;
      left: 0;
      padding: 0;
      margin: 0;
    }
    li {
      list-style-type: none;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.75),
        rgba(0, 0, 0, 0.0)
      );
      margin-top: 0px;
      margin-bottom: 10px;
      margin-left: 0px;
      margin-right: auto;
      padding: 15px;

      border: solid 2px;
      border-top: solid 0px;
      border-bottom: solid 0px;
      border-image: linear-gradient(to bottom, rgba(163, 163, 163, 0.8), rgba(0, 0, 0, 0)) 1 100%;
      inset: -5px;*/
    }
    li {
      break-inside: avoid-column;
    }
    li:hover {
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.75),
          rgba(0, 0, 0, 0.75)
        );
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "grid-list": GridList;
  }
}
