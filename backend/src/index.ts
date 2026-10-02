import { createApp } from "./app.js";
import { createMemeCatalog } from "./memes/catalog.js";
import { createInMemorySwipeRepository } from "./swipes/repository.js";
import { createSwipeService } from "./swipes/service.js";

const port = Number(process.env.PORT ?? 3000);

const swipeService = createSwipeService(createMemeCatalog(), createInMemorySwipeRepository());

createApp(swipeService).listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
