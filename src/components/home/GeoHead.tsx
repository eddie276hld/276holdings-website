"use client";
import { JSON_LD_ORG, JSON_LD_PRODUCTS, JSON_LD_FAQ, PAGE_META } from "@/data/seo";

function GeoHead({ page }) {
  useEffect(() => {
    const meta = PAGE_META[page] || PAGE_META.home;
    document.title = meta.title;
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) { descTag = document.createElement('meta'); descTag.name = 'description'; document.head.appendChild(descTag); }
    descTag.content = meta.desc;
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) { ogTitle = document.createElement('meta'); ogTitle.setAttribute('property','og:title'); document.head.appendChild(ogTitle); }
    ogTitle.content = meta.title;
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) { ogDesc = document.createElement('meta'); ogDesc.setAttribute('property','og:description'); document.head.appendChild(ogDesc); }
    ogDesc.content = meta.desc;
    // JSON-LD
    document.querySelectorAll('script[data-geo-ld]').forEach(s => s.remove());
    const schemas = [JSON_LD_ORG, ...JSON_LD_PRODUCTS];
    if (page === 'home' || page === 'faq') schemas.push(JSON_LD_FAQ);
    schemas.forEach(schema => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-geo-ld', 'true');
      s.textContent = JSON.stringify(schema);
      document.head.appendChild(s);
    });
  }, [page]);
  return null;
}

// === STYLES ===
const css = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
:root{--ny:#0f1929;--nd:#080e1a;--nl:#1a2844;--br:#a89586;--bl:#c4b0a0;--bw:#c8a882;--bg:#b89e8a;--gn:#10b981;--gl:#34d399;--w:#fff;--alt:#f8fafc;--td:#1e293b;--tm:#64748b;--tl:#94a3b8;--bd:#e2e8f0;--blt:#f1f5f9;--fd:'Pretendard',sans-serif;--fb:'Pretendard',sans-serif;--fm:'JetBrains Mono',monospace}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{font-family:var(--fb);color:var(--td);background:var(--w);-webkit-font-smoothing:antialiased}
@keyframes gshift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes gridP{0%,100%{opacity:.03}50%{opacity:.06}}
@keyframes orb{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(30px,-20px) scale(1.1)}50%{transform:translate(-20px,20px) scale(.95)}75%{transform:translate(15px,10px) scale(1.05)}}
.spin{animation:spin 1s linear infinite}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.hero-bg{background:linear-gradient(135deg,var(--nd) 0%,var(--ny) 40%,#132240 70%,var(--nd) 100%);background-size:400% 400%;animation:gshift 12s ease infinite;position:relative;overflow:hidden}
.hero-bg::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 600px 400px at 70% 30%,rgba(168,149,134,.07) 0%,transparent 70%),radial-gradient(ellipse 500px 350px at 20% 70%,rgba(200,168,130,.05) 0%,transparent 70%);pointer-events:none}
.hero-orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none}
.hero-visual-wrap{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:hidden}
.hero-canvas{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:max(2088px,110vw);height:auto;aspect-ratio:2088/1462;max-width:none}
@media(min-width:1264px){.hero-canvas{width:max(2088px,110vw)}}
@media(max-width:1263px) and (min-width:1024px){.hero-canvas{width:1800px;height:1260px}}
@media(max-width:1023px) and (min-width:768px){.hero-canvas{width:1400px;height:980px}}
@media(max-width:767px) and (min-width:640px){.hero-canvas{width:1100px;height:770px}}
@media(max-width:639px){.hero-canvas{width:900px;height:630px}}
.nav-s{backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);background:rgba(255,255,255,.92);border-bottom:1px solid var(--bd);transition:all .3s ease}
.nav-t{background:transparent;border-bottom:1px solid rgba(255,255,255,.06)}
.bp{background:var(--br);color:#fff;border:none;padding:12px 28px;border-radius:8px;font-family:var(--fd);font-weight:600;font-size:15px;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:8px}
.bp:hover{background:var(--bg);transform:translateY(-1px);box-shadow:0 8px 24px rgba(168,149,134,.3)}
.bs{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.2);padding:12px 28px;border-radius:8px;font-family:var(--fd);font-weight:500;font-size:15px;cursor:pointer;transition:all .2s}
.bs:hover{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.35)}
.bn{background:var(--br);color:#fff;border:none;padding:8px 20px;border-radius:6px;font-family:var(--fd);font-weight:600;font-size:14px;cursor:pointer;transition:all .2s}
.bn:hover{background:var(--bg)}
.card{background:#fff;border:1px solid var(--bd);border-radius:12px;padding:32px;transition:all .3s}
.card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,.08);border-color:var(--br)}
.bcard{background:var(--alt);border:1px solid var(--blt);border-radius:12px;padding:36px;transition:all .3s;position:relative;overflow:hidden}
.bcard::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--bw),var(--br));opacity:0;transition:opacity .3s}
.bcard:hover::before{opacity:1}.bcard:hover{border-color:rgba(168,149,134,.25);box-shadow:0 12px 40px rgba(0,0,0,.06)}
.stat-num{font-family:var(--fd);font-weight:800;font-size:48px;background:linear-gradient(135deg,var(--bw),var(--br));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1.1}
.ltrack{display:flex;animation:marquee 30s linear infinite;gap:48px;align-items:center}
.litem{flex-shrink:0;font-family:var(--fd);font-weight:600;font-size:16px;color:var(--tl);white-space:nowrap;padding:12px 24px;border:1px solid var(--bd);border-radius:8px;background:#fff}
.slbl{font-family:'Pretendard',sans-serif;font-size:12px;font-weight:300;text-transform:uppercase;letter-spacing:.1em;color:var(--br);margin-bottom:12px}
.stitle{font-family:var(--fd);font-weight:700;font-size:clamp(28px,4vw,42px);color:var(--td);line-height:1.15;letter-spacing:-.02em;margin-bottom:16px}
.fstep{display:flex;align-items:center;gap:16px;padding:20px 24px;background:#fff;border:1px solid var(--bd);border-radius:12px;transition:all .3s}
.fstep:hover{border-color:var(--br);transform:translateX(4px)}
.fnum{width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--bw),var(--br));color:#fff;border-radius:10px;font-family:var(--fd);font-weight:700;font-size:16px;flex-shrink:0}
.ctbl{width:100%;border-collapse:separate;border-spacing:0}
.ctbl th{padding:14px 20px;text-align:left;font-family:var(--fd);font-weight:600;font-size:14px;background:var(--alt);border-bottom:2px solid var(--bd)}
.ctbl th:last-child{background:rgba(168,149,134,.06);color:var(--br)}
.ctbl td{padding:14px 20px;font-size:14px;border-bottom:1px solid var(--blt);vertical-align:top}
.ctbl td:last-child{font-weight:500;color:var(--ny)}.ctbl tr:hover td{background:var(--alt)}
.cform input,.cform select,.cform textarea{width:100%;padding:12px 16px;border:1px solid var(--bd);border-radius:8px;font-family:var(--fb);font-size:15px;transition:border-color .2s;outline:none;background:#fff}
.cform input:focus,.cform select:focus,.cform textarea:focus{border-color:var(--br);box-shadow:0 0 0 3px rgba(168,149,134,.12)}
.mmenu{position:fixed;inset:0;background:#fff;z-index:100;padding:80px 24px 24px;display:flex;flex-direction:column;gap:4px;animation:fadeUp .3s ease}
.mmenu a{padding:16px;font-family:var(--fd);font-size:18px;font-weight:600;color:var(--td);text-decoration:none;border-radius:12px;transition:background .2s}
.mmenu a:hover{background:var(--alt)}
@media(max-width:768px){.stat-num{font-size:36px}.bcard,.card{padding:24px}.dnav{display:none!important}.mbtn{display:block!important}}
`;

// === NAVIGATION ===

export default GeoHead;
