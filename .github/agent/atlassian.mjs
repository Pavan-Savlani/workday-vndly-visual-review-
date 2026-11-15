#!/usr/bin/env node
// Minimal Jira + Confluence Cloud helper for the visual review agent.
//
//   node atlassian.mjs search "<JQL>"                         -> matching issues (key, type, status, summary, labels, description) as JSON
//   node atlassian.mjs get <KEY>                              -> one issue as JSON
//   node atlassian.mjs create <spec.json>                     -> creates an issue, prints its key
//        spec: { "type": "Bug", "summary": "...", "descriptionFile": "desc.txt",
//                "priority": "High", "labels": ["visual-regression"], "attachments": ["crop.png"] }
//   node atlassian.mjs comment <KEY> <file.txt> [attachment.png ...]
//   node atlassian.mjs attach <KEY> <file> [file ...]
//   node atlassian.mjs page <CONFLUENCE_PAGE_ID>              -> page title + body as plain text
//
// Needs JIRA_BASE_URL (https://<site>.atlassian.net), JIRA_EMAIL, JIRA_API_TOKEN. Optional JIRA_PROJECT (default KAN).
// Descriptions and comments use Jira wiki markup (API v2); embed an attachment with !file.png|thumbnail!.

import { readFileSync } from 'node:fs';
import { basename } from 'node:path';

const { JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN } = process.env;
const PROJECT = process.env.JIRA_PROJECT || 'KAN';
const auth = 'Basic ' + Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');
const [cmd, ...args] = process.argv.slice(2);

async function call(path, init = {}, json = true) {
  const headers = { Authorization: auth, Accept: 'application/json', ...(json ? { 'Content-Type': 'application/json' } : {}), ...init.headers };
  const res = await fetch(`${JIRA_BASE_URL}${path}`, { ...init, headers });
  if (!res.ok) throw new Error(`${init.method || 'GET'} ${path} -> ${res.status}: ${await res.text()}`);
  return res.status === 204 ? null : res.json();
}

async function attach(key, files) {
  for (const f of files) {
    const form = new FormData();
    form.append('file', new Blob([readFileSync(f)]), basename(f));
    await call(`/rest/api/2/issue/${key}/attachments`, { method: 'POST', body: form, headers: { 'X-Atlassian-Token': 'no-check' } }, false);
    console.error(`attached ${basename(f)} to ${key}`);
  }
}

const shape = i => ({
  key: i.key, url: `${JIRA_BASE_URL}/browse/${i.key}`, type: i.fields.issuetype?.name, status: i.fields.status?.name,
  priority: i.fields.priority?.name, labels: i.fields.labels, summary: i.fields.summary, description: i.fields.description,
});

if (cmd === 'search') {
  const r = await call('/rest/api/2/search/jql', { method: 'POST', body: JSON.stringify({ jql: args[0], maxResults: 50, fields: ['summary', 'description', 'status', 'issuetype', 'labels', 'priority'] }) });
  console.log(JSON.stringify(r.issues.map(shape), null, 2));
} else if (cmd === 'get') {
  console.log(JSON.stringify(shape(await call(`/rest/api/2/issue/${args[0]}?fields=summary,description,status,issuetype,labels,priority`)), null, 2));
} else if (cmd === 'create') {
  const spec = JSON.parse(readFileSync(args[0], 'utf8'));
  const fields = {
    project: { key: PROJECT }, issuetype: { name: spec.type || 'Bug' }, summary: spec.summary,
    description: readFileSync(spec.descriptionFile, 'utf8'), labels: spec.labels || [],
  };
  if (spec.priority) fields.priority = { name: spec.priority };
  let issue;
  try { issue = await call('/rest/api/2/issue', { method: 'POST', body: JSON.stringify({ fields }) }); }
  catch (e) { // some project schemes hide priority on create; retry without it
    if (!fields.priority) throw e; delete fields.priority;
    issue = await call('/rest/api/2/issue', { method: 'POST', body: JSON.stringify({ fields }) });
  }
  await attach(issue.key, spec.attachments || []);
  console.log(issue.key);
} else if (cmd === 'comment') {
  const [key, file, ...files] = args;
  await attach(key, files);
  const c = await call(`/rest/api/2/issue/${key}/comment`, { method: 'POST', body: JSON.stringify({ body: readFileSync(file, 'utf8') }) });
  console.log(`comment ${c.id} added to ${key}`);
} else if (cmd === 'attach') {
  await attach(args[0], args.slice(1));
} else if (cmd === 'page') {
  const p = await call(`/wiki/api/v2/pages/${args[0]}?body-format=storage`);
  const text = p.body.storage.value
    .replace(/<\/(p|h\d|li|tr)>/g, '\n').replace(/<(td|th)[^>]*>/g, ' | ').replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  console.log(`# ${p.title}\n\n${text}`);
} else {
  console.error('usage: atlassian.mjs search <JQL> | get <KEY> | create <spec.json> | comment <KEY> <file> [files] | attach <KEY> <files> | page <ID>');
  process.exit(2);
}
