// Graceful shutdown
const shutdown = () => {
  console.log("Shutting down application...");

  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
