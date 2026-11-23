/* Tells Bing (and the other IndexNow engines: Yandex, Seznam, Naver) that the pages changed, so they crawl them soon.
   Bing's index also feeds ChatGPT search, Copilot and DuckDuckGo. Google does not use IndexNow: for Google, use Search Console.
   Run it after a deploy: npm run indexnow (or npm run indexnow -- https://www.thebeavers.company for another host). */
const KEY = '70690d174fe3e031ba61adb5e3ab69bf';
const site = (process.argv[2] || process.env.PUBLIC_SITE_URL || 'https://www.thebeavers.company').replace(/\/$/, '');
const host = new URL(site).host;

const sitemap = await fetch(`${site}/sitemap.xml`).then((r) => {
  if (!r.ok) throw new Error(`sitemap.xml: HTTP ${r.status}`);
  return r.text();
});
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => new URL(u).host === host);
if (!urls.length) throw new Error(`no URLs for ${host} in the sitemap: is PUBLIC_SITE_URL the same host?`);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${site}/${KEY}.txt`, urlList: urls })
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} pages on ${host}`);
if (res.status >= 400) {
  console.log(await res.text());
  process.exit(1);
}
