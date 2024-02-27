import fs from "fs";
import path from "path";
const __dirname = path.resolve();

export const loadRoutes = async (app) => {
  const modulePath = path.join(__dirname, "routes");
  const moduleData = fs.readdirSync(modulePath);
  const routerFile = await Promise.all(moduleData.map(file => {
    const moduleUrl = new URL(`file:///${path.join(modulePath, file)}`);
    return import(moduleUrl)
  }));
  routerFile.forEach(router => app.use('/api/v1', router.default));
  app.use("*", (req, res, next) => {
    res.status(422).send("Invalid request");
  });
};
