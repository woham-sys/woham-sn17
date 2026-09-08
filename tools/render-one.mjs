/**
 * Offline CLI around the subnet's OWN render-service code.
 * Usage: node render-one.mjs <submission.js> <out.png> [mode] [lighting]
 *   mode: grid (default) | views
 */
import fs from 'node:fs';
import path from 'node:path';
import { startStaticServer } from './src/static-server.js';
import { renderGrid, renderViews } from './src/renderer.js';
import { closeBrowser } from './src/browser.js';

const [srcPath, outPath, mode = 'grid', lighting = 'studio'] = process.argv.slice(2);
if (!srcPath || !outPath) { console.error('usage: node render-one.mjs <in.js> <out.png> [grid|views] [studio|follow|neutral]'); process.exit(2); }

const source = fs.readFileSync(srcPath, 'utf8');
const server = await startStaticServer();
const t0 = Date.now();
try {
  if (mode === 'grid') {
    const buf = await renderGrid(source, { lighting });
    fs.writeFileSync(outPath, buf);
    console.log(JSON.stringify({ ok: true, mode, lighting, out: outPath, bytes: buf.length, ms: Date.now() - t0 }));
  } else {
    const bufs = await renderViews(source, { lighting });
    const base = outPath.replace(/\.png$/, '');
    const files = bufs.map((b, i) => { const f = `${base}_${i}.png`; fs.writeFileSync(f, b); return { f, bytes: b.length }; });
    console.log(JSON.stringify({ ok: true, mode, lighting, files, ms: Date.now() - t0 }));
  }
} catch (e) {
  console.log(JSON.stringify({ ok: false, error: e.message, ms: Date.now() - t0 }));
  process.exitCode = 1;
} finally {
  await closeBrowser();
  server.close();
}
