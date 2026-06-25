const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// ─── Proxy: Discord Webhook ──────────────────────────────────────────────────
app.post("/api/discord", async (req, res) => {
  const { webhookUrl, threadId, payload } = req.body;
  if (!webhookUrl || !payload) {
    return res.status(400).json({ error: "Brak webhookUrl lub payload" });
  }
  try {
    const url = webhookUrl + (threadId ? `?thread_id=${threadId}` : "");
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    res.json({ ok: resp.ok, status: resp.status });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── Proxy: Kleinanzeigen scrape ────────────────────────────────────────────
app.get("/api/scrape", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Brak url" });
  try {
    const resp = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept-Language": "de-DE,de;q=0.9",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    const html = await resp.text();
    res.send(html);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ DirtDealFinder działa na porcie ${PORT}`));
