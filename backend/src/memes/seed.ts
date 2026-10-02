export interface SeedMeme {
  id: string;
  /** Caption shown on the card and used as accessible text. */
  caption: string;
  /** File name in backend/assets/memes. */
  file: string;
}

export const seedMemes: SeedMeme[] = [
  { id: "works-on-my-machine", caption: "It works on my machine", file: "works-on-my-machine.svg" },
  { id: "friday-deploy", caption: "Deploying on a Friday afternoon. What could go wrong?", file: "friday-deploy.svg" },
  { id: "off-by-one", caption: "There are two hard problems: naming things, cache invalidation and off-by-one errors", file: "off-by-one.svg" },
  { id: "console-log", caption: "Debugging with console.log: a time-honoured tradition", file: "console-log.svg" },
  { id: "no-tests", caption: "No tests, no bugs", file: "no-tests.svg" },
  { id: "temporary-fix", caption: "Nothing is as permanent as a temporary fix", file: "temporary-fix.svg" },
  { id: "merge-conflict", caption: "Merge conflict in a 4000 line file", file: "merge-conflict.svg" },
  { id: "semicolon", caption: "Three hours of debugging. One missing semicolon.", file: "semicolon.svg" },
  { id: "readme", caption: "I will document it later", file: "readme.svg" },
  { id: "rm-rf", caption: "rm -rf node_modules: the universal fix", file: "rm-rf.svg" },
];
