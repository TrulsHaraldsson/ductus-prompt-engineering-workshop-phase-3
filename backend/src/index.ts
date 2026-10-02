import { createApp } from "./app.js";
import { createMemeCatalog } from "./memes/catalog.js";
import { createInMemorySwipeRepository } from "./swipes/repository.js";
import { createSwipeService } from "./swipes/service.js";

const port = Number(process.env.PORT ?? 3000);

const swipeService = createSwipeService(createMemeCatalog(), createInMemorySwipeRepository());

// Set STATIC_DIR to the built frontend (frontend/dist) to serve it from this process, as the container does.
const staticDir = process.env.STATIC_DIR;

createApp(swipeService, { staticDir }).listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
