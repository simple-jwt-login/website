#!/usr/bin/env node
/**
 * Restructures the auto-generated api/v4/sidebar.ts into:
 *   - Introduction  (the info page)
 *   - Routes        (all WordPress route operations, flat)
 *   - OAuth         (token-exchange operations)
 *   - API Keys      (API key management operations)
 *
 * The generated sidebar groups operations by tag (one nested category per
 * tag). This script ignores that nesting: it extracts every operation
 * ("doc" item) from the generated file and redistributes them into the
 * groups below, by operation id. Any operation whose id is not listed is
 * appended to "Routes" so new endpoints are never silently dropped.
 *
 * Run automatically as part of gen-api-v4 in package.json.
 * Safe to run multiple times (idempotent - it rebuilds from extracted items).
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const sidebarPath = join(__dir, '../api/v4/sidebar.ts');

const INFO_ID = 'simple-jwt-login';

// Ordered id -> group mapping. Order within each array is the sidebar order.
const GROUPS = [
  {
    label: 'Routes',
    collapsed: false,
    ids: [
      'autologin',
      'register-a-new-word-press-user',
      'delete-user',
      'send-reset-password-code',
      'change-user-password',
      'get-jwt',
      'refresh-jwt',
      'validate-jwt',
      'validate-jwt-post',
      'revoke-jwt',
      'verify-two-factor',
    ],
  },
  {
    label: 'OAuth',
    collapsed: true,
    ids: ['oauth-token-get', 'oauth-token-post'],
  },
  {
    label: 'API Keys',
    collapsed: true,
    ids: [
      'list-api-keys',
      'create-api-key',
      'update-api-key',
      'delete-api-key',
      'revoke-api-key',
    ],
  },
];

const src = readFileSync(sidebarPath, 'utf8');

// Extract every "doc" item from the generated sidebar, keyed by id.
const docRe =
  /\{\s*type:\s*"doc",\s*id:\s*"([^"]+)",(?:\s*label:\s*"([^"]*)",)?(?:\s*className:\s*"([^"]+)",)?\s*\}/g;

const items = new Map();
let m;
while ((m = docRe.exec(src)) !== null) {
  const [, id, label, className] = m;
  items.set(id, { id, label: label ?? '', className });
}

if (!items.has(INFO_ID)) {
  console.error(
    `patch-openapi-sidebar: could not find info page "${INFO_ID}" in ${sidebarPath}. Aborting without changes.`
  );
  process.exit(1);
}

const indent = (n) => ' '.repeat(n);

const renderDoc = (item, pad) => {
  const lines = [
    `${indent(pad)}{`,
    `${indent(pad + 2)}type: "doc",`,
    `${indent(pad + 2)}id: "${item.id}",`,
    `${indent(pad + 2)}label: "${item.label}",`,
  ];
  if (item.className) {
    lines.push(`${indent(pad + 2)}className: "${item.className}",`);
  }
  lines.push(`${indent(pad)}},`);
  return lines.join('\n');
};

// Place every non-info operation, tracking which were assigned.
const assigned = new Set([INFO_ID]);
const groupBlocks = GROUPS.map((group) => {
  const docs = group.ids
    .filter((id) => items.has(id))
    .map((id) => {
      assigned.add(id);
      return renderDoc(items.get(id), 8);
    });
  return { group, docs };
});

// Append any unmapped operations to the first group (Routes) so nothing is lost.
const leftovers = [...items.values()].filter((it) => !assigned.has(it.id));
if (leftovers.length) {
  console.warn(
    `patch-openapi-sidebar: ${leftovers.length} unmapped operation(s) appended to "${groupBlocks[0].group.label}": ${leftovers
      .map((it) => it.id)
      .join(', ')}`
  );
  for (const it of leftovers) {
    groupBlocks[0].docs.push(renderDoc(it, 8));
  }
}

const renderGroup = ({ group, docs }) =>
  [
    `${indent(4)}{`,
    `${indent(6)}type: "category",`,
    `${indent(6)}label: "${group.label}",`,
    `${indent(6)}collapsed: ${group.collapsed},`,
    `${indent(6)}items: [`,
    docs.join('\n'),
    `${indent(6)}],`,
    `${indent(4)}},`,
  ].join('\n');

const info = items.get(INFO_ID);
const out = `import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "${info.id}",
      label: "Introduction",
    },
${groupBlocks.map(renderGroup).join('\n')}
  ],
};

export default sidebar;
`;

writeFileSync(sidebarPath, out, 'utf8');
console.log(
  'api/v4/sidebar.ts patched: Introduction + Routes + OAuth + API Keys structure applied.'
);
