async function start() {
  const app = express();

  await databaseConfig(app);
  expressConfig(app);

  app.get("/", (req, res) => res.send("It Works!"));

  app.listen(PORT, () =>
    console.log(`Apllication started at http://localhost:${PORT}`)
  );
}
