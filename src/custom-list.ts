import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

type QuoteList = {
  number: string;
};

async function GetQuotes(channel: string) {
  const list = async () =>
    await fetch(
      `https://api.khaztaroth.com/listquotes?channel=${channel}`,
    ).then((res) => res.json());
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
    h2{
        text-align: center;
        font-size: 2rem;
        margin-bottom: 2rem;
    }
    section {
      margin: 1rem;
      top: 1rem;
    }
    ul {
      font-size: 1.4rem;
      top: 0;
      left: 0;
      padding: 0;
      margin: 0;
    }
    li {
      list-style-type: none;
      break-inside: avoid-column;
      height: auto;
      width: auto;
      margin: 0.2rem;
      padding: 0.4rem;

      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.75),
        rgba(0, 0, 0, 0)
      );

      border: solid 0.2rem;
      border-top: solid 0px;
      border-bottom: solid 0px;
      border-image: linear-gradient(
          to top,
          rgba(163, 163, 163, 0.8),
          rgba(0, 0, 0, 0)
        )
        1 100%;
      inset: -5px;
    }
    li:hover {
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.75),
        rgba(0, 0, 0, 0.75)
      );
    }
    @media (prefers-color-scheme: light) {
      li {
        border-image: linear-gradient(
            to bottom,
            rgba(200, 200, 200, 2),
            rgba(0, 0, 0, 0)
          )
          1 100%;
        inset: -5px;

        background: linear-gradient(
          to top,
          rgba(200, 200, 200, 0.6),
          rgba(255, 255, 255, 0)
          );
            border-image: linear-gradient(
              to bottom,
              rgba(163, 163, 163, 0.4),
              rgba(0, 0, 0, 0)
            )
            1 100%; inset: -5px;
        );
      }
      li:hover {
        background: linear-gradient(
          to top,
          rgba(200, 200, 200, 0.6),
          rgba(200, 200, 200, 0.6)
        );
      }
    }
    @media (min-width: 0) {
      ul {
        column-count: 1;
      }
      li {
        width: 70%;
      }
    }
    @media (min-width: 420px) {
      ul {
        column-count: 1;
      }
      li {
        width: 98%;
      }
    }
    @media (min-width: 820px) {
      ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 1rem;
        justify-content: space-between;
      }
      li {
        width: 95%;
      }
    }
    @media (min-width: 1200px) {
      ul {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 1rem;
          justify-content: space-between;
      }
      li {
        width: 90%;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "grid-list": GridList;
  }
}
