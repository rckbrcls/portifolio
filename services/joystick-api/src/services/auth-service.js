"use strict";
const jwt = require("jsonwebtoken");
// Centralized secret selection with warning when not set in environment
const DEFAULT_INSECURE_SECRET = "dev-secret-change-me";
let SECRET = global.SALT_KEY || process.env.SALT_KEY;
if (!SECRET) {
  console.warn(
    "auth-service: WARNING: global.SALT_KEY and process.env.SALT_KEY are not set. Using insecure fallback secret. Set env var SALT_KEY for production."
  );
  SECRET = DEFAULT_INSECURE_SECRET;
  // keep global for existing code that might rely on it
  global.SALT_KEY = SECRET;
}

exports.generateToken = async (data) => {
  console.log("auth-service.generateToken - start", { userId: data && data.id, email: data && data.email });
  try {
    const token = jwt.sign(data, SECRET, { expiresIn: "1d" });
    console.log("auth-service.generateToken - token generated (truncated)", token ? `${String(token).slice(0, 10)}...` : null);
    return token;
  } catch (err) {
    console.error("auth-service.generateToken - error:", err && err.message ? err.message : err);
    throw err;
  }
};

exports.decodeToken = async (token) => {
  console.log("auth-service.decodeToken - start", { token: token ? `${String(token).slice(0, 10)}...` : null });
  try {
    const data = await new Promise((resolve, reject) => {
      jwt.verify(token, SECRET, function (error, decoded) {
        if (error) return reject(error);
        resolve(decoded);
      });
    });
    console.log("auth-service.decodeToken - success", { id: data && data.id, email: data && data.email });
    return data;
  } catch (err) {
    console.error("auth-service.decodeToken - error:", err && err.message ? err.message : err);
    throw err;
  }
};

exports.authorize = function (req, res, next) {
  console.log("auth-service.authorize - start", { path: req.path, method: req.method });
  var token = req.body.token || req.query.token || req.headers["x-access-token"];
  console.log("auth-service.authorize - token present:", !!token);

  if (!token) {
    console.warn("auth-service.authorize - missing token");
    res.status(401).json({
      message: "Acesso Restrito",
    });
  } else {
    jwt.verify(token, SECRET, function (error, decoded) {
      if (error) {
        console.warn("auth-service.authorize - token invalid:", error && error.message);
        res.status(401).json({
          message: "Token Inválido",
        });
      } else {
        console.log("auth-service.authorize - token valid for userId:", decoded && decoded.id);
        // attach decoded to request for downstream handlers
        req.user = decoded;
        next();
      }
    });
  }
};

exports.isAdmin = function (req, res, next) {
  console.log("auth-service.isAdmin - start", { path: req.path, method: req.method });
  var token = req.body.token || req.query.token || req.headers["x-access-token"];
  console.log("auth-service.isAdmin - token present:", !!token);

  if (!token) {
    console.warn("auth-service.isAdmin - missing token");
    res.status(401).json({
      message: "Token Inválido",
    });
  } else {
    jwt.verify(token, SECRET, function (error, decoded) {
      if (error) {
        console.warn("auth-service.isAdmin - token invalid:", error && error.message);
        res.status(401).json({
          message: "Token Inválido",
        });
      } else {
        console.log("auth-service.isAdmin - token decoded:", { id: decoded && decoded.id, isAdmin: decoded && decoded.isAdmin });
        if (decoded.isAdmin) {
          req.user = decoded;
          next();
        } else {
          console.warn("auth-service.isAdmin - user is not admin", { id: decoded && decoded.id });
          res.status(403).json({
            message: "Esta funcionalidade é restrita para administradores",
          });
        }
      }
    });
  }
};
