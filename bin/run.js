#!/usr/bin/env node

// require("fs").existsSync(`${__dirname}/../src`);

(async () => {
  (await import("dotenv")).config();
  const oclif = await import("@oclif/core");
  await oclif.execute({
    type: "cjs",
    development: (await import("fs")).existsSync(`${__dirname}/../src`),
    dir: __dirname,
  });
})();
