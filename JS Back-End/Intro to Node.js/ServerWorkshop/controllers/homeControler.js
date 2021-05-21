const homePage = `
<html>
<body>
  <div>
    <h1>The Page</h1>
    <p>Welcome to the page!</p>
  </div>
</body>
</html>
`;

module.exports = (req, res) => {
  res.write(homePage)
  res.end()
}
