const html = `
<html>
<body>
  <div>
    <h1>About Page</h1>
    <p>about page</p>
  </div>
</body>
</html>
`;

module.exports = (req, res) => {
  res.write(html)
  res.end()
}

