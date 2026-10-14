import { defineConfig } from "vite";
import fs from "node:fs/promises";
import path from "node:path";
export default defineConfig({
  base: "./",
  build: { target: "es2022", chunkSizeWarningLimit: 900 },
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    watch: { ignored: ["**/.codex-work/**"] },
  },
  plugins: [
    {
      name: "local-render-evidence",
      configureServer(server) {
        server.middlewares.use("/__qa/capture", async (req, res, next) => {
          if (req.method !== "POST") return next();
          try {
            const chunks: Buffer[] = [];
            let size = 0;
            for await (const c of req) {
              size += c.length;
              if (size > 12 * 1024 * 1024) throw Error("Capture too large");
              chunks.push(c);
            }
            const data = Buffer.concat(chunks);
            if (data.subarray(1, 4).toString() !== "PNG")
              throw Error("PNG required");
            const name = (
              new URL(req.url || "/", "http://localhost").searchParams.get(
                "name",
              ) || "render"
            )
              .replace(/[^a-z0-9_-]/gi, "")
              .slice(0, 100);
            const dir = path.resolve(".codex-work/qa");
            await fs.mkdir(dir, { recursive: true });
            await fs.writeFile(path.join(dir, name + ".png"), data);
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ saved: name + ".png" }));
          } catch (e) {
            res.statusCode = 400;
            res.end(String(e));
          }
        });
      },
    },
  ],
});
