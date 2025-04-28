
import buildApp from "./app";

const start = async () => {
  const app = buildApp();

  try {
    await app.listen({ port: 3000 });
    app.log.info(`Server is running at http://localhost:3000`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();