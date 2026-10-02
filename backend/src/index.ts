import { createApp } from "./app.js";
import { createMemeCatalog } from "./memes/catalog.js";

const port = Number(process.env.PORT ?? 3000);

createApp(createMemeCatalog()).listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
