let http = require("http");
let fs = require("fs");
let pageVisited = 0;

let server = http.createServer((req, res) => {
  if (req.url !== "/favicon.ico") setPage(res, req.url);
});

server.listen(4000, "localhost", () => {
  console.log("server is listening to 4000");
});
function setPage(res, page) {
  let validPages = {
    "/contact": "contact",
    "/": "home",
    "/product": "product",
  };
  let goTo = "error";
  if (page in validPages) {
    goTo = validPages[page];
  }
  res.setHeader("Content-type", "text/html");
  res.statusCode = 201;
  fs.readFile(`./views/${goTo}.html`, "utf8", (err, data) => {
    if (err) {
      console.log("error: ", err);
      res.write("Server Error");
      res.end();
    }
    data = data.replace("%Counter%", pageVisited);
    pageVisited++;
    res.write(data);
    res.end();
  });
}
