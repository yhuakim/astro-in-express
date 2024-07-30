import express from "express";
import * as components from './dist/server/all.mjs';
import { renderers } from './dist/server/renderers.mjs';
import { manifest } from './dist/server/entry.mjs';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';

const container = await AstroContainer.create({
  manifest,
  renderers,
  resolve(s) {
    const found = manifest.entryModules[s];
    if(found) {
      return `/dist/client/${found}`;
    }
    return found;
  }
});

const app = express();
const port = 5000;

app.get("/astro-component", async (req, res) => {
  const html = await container.renderToString(components.Index);
  console.log(html);
  res.send(html);
  // console.log('output', html)
  // res.send(html.body);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
