import { defineConfig } from "vitepress"
import type { ShikiTransformer } from "shiki"

import { readingTimeTag } from "@binarynoir/vitepress-reading-time-tag";

const psLangs = new Set(["powershell", "pwsh", "ps1"]);

const psColors: Record<string, [string, string]> = {
  "ps-command": ["#4078f2", "#61afef"],
  "ps-param": ["#e45649", "#e06c75"],
  "ps-string": ["#50a14f", "#98c379"],
  "ps-variable": ["#986801", "#d19a66"],
  "ps-comment": ["#a0a1a7", "#7f848e"],
};

function textOf(node: any): string {
  if (node.type === "text") return node.value;
  return (node.children ?? []).map(textOf).join("");
}

const powershellHighlight: ShikiTransformer = {
  name: "powershell-highlight",
  line(node) {
    if (!psLangs.has(this.options.lang as string)) return;

    const text = textOf(node);
    if (!text) return;

    const regex =
      /(#.*$)|("[^"]*"|'[^']*')|(\$[\w:]+)|((?<=\s)-{1,2}[\w-]+)|(^\s*[\w.-]+)/g;

    const children: any[] = [];
    let last = 0;
    let m: RegExpExecArray | null;

    const push = (value: string, cls?: string) => {
      if (!value) return;
      if (!cls) {
        children.push({ type: "text", value });
        return;
      }
      const [light, dark] = psColors[cls];
      children.push({
        type: "element",
        tagName: "span",
        properties: {
          class: cls,
          style: `--shiki-light:${light};--shiki-dark:${dark}`,
        },
        children: [{ type: "text", value }],
      });
    };

    while ((m = regex.exec(text)) !== null) {
      push(text.slice(last, m.index));
      const cls = m[1]
        ? "ps-comment"
        : m[2]
          ? "ps-string"
          : m[3]
            ? "ps-variable"
            : m[4]
              ? "ps-param"
              : "ps-command";
      push(m[0], cls);
      last = regex.lastIndex;
    }
    push(text.slice(last));

    node.children = children;
  },
};

function articleTags(md: any) {
  md.core.ruler.after("inline", "article_tags", (state: any) => {
    for (const token of state.tokens) {
      if (token.type !== "inline" || !token.children) continue;

      const newChildren: any[] = [];

      for (const child of token.children) {
        if (child.type !== "text" || !child.content.includes("[[tag:")) {
          newChildren.push(child);
          continue;
        }

        const regex = /\[\[tag:\s*(.*?)\s*\]\]/g;
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(child.content)) !== null) {
          if (match.index > lastIndex) {
            const textToken = new state.Token("text", "", 0);
            textToken.content = child.content.slice(lastIndex, match.index);
            newChildren.push(textToken);
          }

          const tagToken = new state.Token("html_inline", "", 0);
          tagToken.content = `<span class="article-tag">${md.utils.escapeHtml(match[1])}</span>`;
          newChildren.push(tagToken);

          lastIndex = regex.lastIndex;
        }

        if (lastIndex < child.content.length) {
          const textToken = new state.Token("text", "", 0);
          textToken.content = child.content.slice(lastIndex);
          newChildren.push(textToken);
        }
      }

      token.children = newChildren;
    }
  });
}

export default defineConfig({
  title: "Tech Notes",
  description: "Uma base de conhecimento técnico com artigos e configurações documentadas para consulta.",
  base: "/tech-notes/",

  cleanUrls: true,

  lastUpdated: true,

  head: [
    [
      "link",
      {
        rel: "shortcut icon",
        type: "image/x-icon",
        href: "/tech-notes/favicon.ico",
      },
    ],
    ["style", {}, `
      :root {
        --vp-home-hero-name-color: transparent;
        --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
      }
    `]
  ],

  themeConfig: {
    logo: "/logo.svg",
    lastUpdatedText: "Última atualização em",

    docFooter: {
      prev: false,
      next: false,
    },

    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "Pesquisar",
            buttonAriaLabel: "Pesquisar documentos"
          },
          modal: {
            noResultsText: "Nenhum resultado encontrado para",
            resetButtonTitle: "Limpar pesquisa",
            footer: {
              selectText: "para selecionar",
              navigateText: "para navegar",
              closeText: "para fechar"
            }
          }
        }
      }
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/wagchi22/tech-notes",
      },
    ],

    outline: {
      label: "Nesta página"
    },

    nav: [
      {
        text: "Início",
        link: "/inicio"
      },
    ],

    sidebar: [
      {
        text: "Artigos",
        items: [
          { text: "⚙️ Ajustes de dispositivos", link: "/artigos/ajustes-de-dispositivos" },
          { text: "🍿 Como configurar um Servarr", link: "/artigos/como-configurar-um-servarr" },
          { text: "🖥️ Como instalar e usar o Docker", link: "/artigos/como-instalar-e-usar-o-docker" },
          { text: "📈 Como instalar e usar o WinMTR", link: "/artigos/como-instalar-e-usar-o-winmtr" },
          { text: "📦 Como usar o Winget", link: "/artigos/como-usar-o-winget" }
        ]
      },
    ],

    returnToTopLabel: "Voltar ao topo",
    sidebarMenuLabel: "Menu"
  },

  markdown: {
    attrs: {
      disable: true,
    },
    lineNumbers: false,

    codeTransformers: [powershellHighlight],

    config(md) {
      md.use((md) => {
        readingTimeTag(
          md as unknown as Parameters<typeof readingTimeTag>[0],
          {
            render: ({ minutes }) =>
              `<span class="reading-time">${minutes} min</span>`,
          }
        );

        articleTags(md);
      });
    },
  },
})