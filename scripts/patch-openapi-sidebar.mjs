#!/usr/bin/env node
/**
 * Restructures the auto-generated api/v4/sidebar.ts into:
 *   - Introduction  (the info page)
 *   - Routes        (all tag categories)
 *
 * Run automatically as part of gen-api-v4 in package.json.
 * Safe to run multiple times (idempotent).
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const sidebarPath = join(__dir, '../api/v4/sidebar.ts');

let src = readFileSync(sidebarPath, 'utf8');

if (src.includes('label: "Routes"')) {
  console.log('api/v4/sidebar.ts already patched, skipping.');
  process.exit(0);
}

// 1. Add label: "Introduction" to the info doc item
src = src.replace(
  /(\s+type: "doc",\n\s+id: "simple-jwt-login",)(\n\s+\})/,
  '$1\n      label: "Introduction",$2'
);

// 2. Wrap all tag categories after Introduction under a single "Routes" category
src = src.replace(
  /("Introduction",\n\s+\},\n)([\s\S]+?)(\n  \],\n\};)/,
  (_, head, body, tail) =>
    `${head}    {\n      type: "category",\n      label: "Routes",\n      collapsed: false,\n      items: [\n${body}\n      ],\n    },${tail}`
);

writeFileSync(sidebarPath, src, 'utf8');
console.log('api/v4/sidebar.ts patched: Introduction + Routes structure applied.');
