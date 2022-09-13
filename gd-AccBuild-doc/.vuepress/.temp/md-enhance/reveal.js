import { reveal, revealMarkdown, revealHighlight, revealMath, revealSearch, revealNotes, revealZoom } from "F:/MyWorkSpace_program/lowcode-nocode/文档/gd-AccBuild-doc/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.97/node_modules/vuepress-plugin-md-enhance/lib/client/reveal";

export const useReveal = () => [reveal(), revealMarkdown(), revealHighlight(), revealMath(), revealSearch(), revealNotes(), revealZoom()
];