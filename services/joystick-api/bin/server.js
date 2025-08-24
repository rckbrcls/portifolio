const app = require("../src/app");
const debug = require("debug");
const http = require("http");

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
console.log("API rodando na porta " + port);
// Log whether SALT_KEY is configured (do not print the secret itself).
const saltKeyPresent = !!(global && global.SALT_KEY) || !!process.env.SALT_KEY;
console.log("SALT_KEY configured:", saltKeyPresent);
// Print a short fingerprint of the secret so we can detect mismatched secrets between runs
try {
  const crypto = require("crypto");
  const secret = global.SALT_KEY || process.env.SALT_KEY || "";
  if (secret) {
    const fp = crypto.createHash("sha256").update(String(secret)).digest("hex").slice(0, 8);
    console.log("SALT_KEY fingerprint:", fp);
  } else {
    console.log("SALT_KEY fingerprint: (no secret)");
  }
} catch (err) {
  // non-fatal - fingerprint is only for debug
  console.warn("Could not compute SALT_KEY fingerprint:", err && err.message);
}

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
