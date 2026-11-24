import { defineConfig } from "vitepress"
import type { ShikiTransformer } from "shiki"

import { readingTimeTag } from "@binarynoir/vitepress-reading-time-tag";

const shellLangs = new Set(["powershell", "pwsh", "ps1"]);

const shellColors: Record<string, { light: string; dark: string }> = {
  command:  { light: "#4078f2", dark: "#61afef" },
  param:    { light: "#e45649", dark: "#e06c75" },
  string:   { light: "#50a14f", dark: "#98c379" },
  variable: { light: "#986801", dark: "#d19a66" },
  comment:  { light: "#1b5e20", dark: "#4e9a5b" },
};

const shellTokens = [
  { type: "comment",  pattern: "#.*$" },
  { type: "string",   pattern: `"[^"]*"|'[^']*'` },
  { type: "variable", pattern: "\\$(?:\\{[^}]+\\}|[\\w:]+)" },
  { type: "param",    pattern: "(?<=\\s)-{1,2}[\\w-]+" },
  { type: "command",  pattern: "(?<=^\\s*|[|;]\\s*|&&\\s*)[\\w.-]+" },
];

const shellRegex = new RegExp(
  shellTokens.map((t) => `(${t.pattern})`).join("|"),
  "g"
);

function textOf(node: any): string {
  if (node.type === "text") return node.value;
  return (node.children ?? []).map(textOf).join("");
}

const shellHighlight: ShikiTransformer = {
  name: "shell-highlight",
  line(node) {
    if (!shellLangs.has(String(this.options.lang).toLowerCase())) return;

    const text = textOf(node);
    if (!text) return;

    const children: any[] = [];
    let last = 0;

    const pushText = (value: string) => {
      if (value) children.push({ type: "text", value });
    };

    const pushToken = (value: string, type: string) => {
      const { light, dark } = shellColors[type];
      children.push({
        type: "element",
        tagName: "span",
        properties: {
          class: `shell-${type}`,
          style: `--shiki-light:${light};--shiki-dark:${dark}`,
        },
        children: [{ type: "text", value }],
      });
    };

    for (const m of text.matchAll(shellRegex)) {
      const index = m.index ?? 0;
      pushText(text.slice(last, index));
      const type = shellTokens[m.slice(1).findIndex(Boolean)].type;
      pushToken(m[0], type);
      last = index + m[0].length;
    }
    pushText(text.slice(last));

    node.children = children;
  },
};

const terminalLangs = new Set([
  "powershell", "pwsh", "ps1",
  "bash", "sh", "shell", "zsh", "console",
]);

const themeCommentColors = {
  light: /--shiki-light:#a0a1a7/i,
  dark: /--shiki-dark:#7f848e/i,
};

const terminalComments: ShikiTransformer = {
  name: "terminal-comments",
  span(node) {
    if (!terminalLangs.has(String(this.options.lang).toLowerCase())) return;

    const style = String(node.properties?.style ?? "");
    if (!themeCommentColors.light.test(style) && !themeCommentColors.dark.test(style)) return;

    node.properties.style = style
      .replace(themeCommentColors.light, `--shiki-light:${shellColors.comment.light}`)
      .replace(themeCommentColors.dark, `--shiki-dark:${shellColors.comment.dark}`);
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

    theme: {
      light: "one-light",
      dark: "one-dark-pro",
    },

    codeTransformers: [shellHighlight, terminalComments],

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