/*
  Interactive "wash the solar panel" engine for the hero section.
  Ported from Wipe_And_Wash_hero_section_update.html into a React-friendly module.
  Hero.jsx calls initPanelWasher(rootElement) inside useEffect and runs the returned cleanup on unmount.
  It looks up its elements with data-hw="..." attributes, so the markup lives in Hero.jsx.
*/
export function initPanelWasher(root) {
  if (!root) return () => {};
  const q = (name) => root.querySelector(`[data-hw="${name}"]`);
  // Panel height is PH; the canvas is PH + 80 tall (40px margin above and below). Make PH smaller for shorter panels.
  const PH = 380, W = 1100, H = PH + 80, r = (n) => Math.random() * n;
  const hint = q("hint");

  if (!window.Path2D || !document.createElement("canvas").getContext) {
    hint.textContent = "Please open this page in Chrome or Safari to try the cleaning animation";
    return () => {};
  }

  // ---- lifecycle helpers (React StrictMode mounts twice in dev, so everything is cleaned up) ----
  const ac = new AbortController();
  const on = (el, type, fn) => el.addEventListener(type, fn, { signal: ac.signal });
  let alive = true, raf = 0, visible = true, run = 0;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
  io.observe(q("stage"));

  // ---- canvases ----
  const cv = {}, ctx = {};
  ["base", "dust", "grime", "foam", "fx"].forEach((n) => {
    const c = (cv[n] = q(n));
    c.width = W; c.height = H;
    ctx[n] = c.getContext("2d", { willReadFrequently: n === "foam" });
  });

  const PW = 325, GAP = 22, MX = 22, MY = 40;
  const panels = [0, 1, 2].map((i) => ({ x: MX + i * (PW + GAP), y: MY }));
  const glass = new Path2D();
  panels.forEach((p) => glass.rect(p.x + 9, p.y + 9, PW - 18, PH - 18));

  // ---- the three clean panels on a dusty roof ----
  function drawBase() {
    const c = ctx.base;
    let g = c.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#bdb7aa"); g.addColorStop(1, "#8f8a80");
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    for (let i = 0; i < 500; i++) {
      c.fillStyle = `rgba(${Math.random() < 0.5 ? "255,255,255" : "60,50,40"},${0.03 + r(0.05)})`;
      c.fillRect(r(W), r(H), 1 + r(3), 1 + r(3));
    }
    c.strokeStyle = "rgba(60,50,40,.16)"; c.lineWidth = 2;
    for (let x = 0; x < W; x += 220) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }
    const pg = c.createLinearGradient(0, 0, 0, H);
    pg.addColorStop(0, "rgba(0,0,0,.4)"); pg.addColorStop(0.07, "rgba(0,0,0,0)");
    pg.addColorStop(0.93, "rgba(0,0,0,0)"); pg.addColorStop(1, "rgba(0,0,0,.35)");
    c.fillStyle = pg; c.fillRect(0, 0, W, H);
    c.fillStyle = "#9aa2ae";
    [Math.round(PH * 0.2), PH - Math.round(PH * 0.22)].forEach((o) => c.fillRect(MX - 12, MY + o, W - 2 * MX + 24, 16));
    panels.forEach((p) => {
      c.fillStyle = "rgba(0,0,0,.25)"; c.fillRect(p.x + 6, p.y + 8, PW, PH);
      g = c.createLinearGradient(p.x, 0, p.x + PW, 0);
      g.addColorStop(0, "#e3e7ec"); g.addColorStop(0.5, "#b9c0ca"); g.addColorStop(1, "#d5dae1");
      c.fillStyle = g; c.fillRect(p.x, p.y, PW, PH);
      const gx = p.x + 9, gy = p.y + 9, gw = PW - 18, gh = PH - 18, cw = gw / 6, rowsN = Math.max(6, Math.round(gh / cw)), ch = gh / rowsN;
      g = c.createLinearGradient(gx, gy, gx + gw, gy + gh);
      g.addColorStop(0, "#1b4f8f"); g.addColorStop(1, "#0b2a57");
      c.fillStyle = g; c.fillRect(gx, gy, gw, gh);
      c.strokeStyle = "rgba(255,255,255,.75)"; c.lineWidth = 2; c.strokeRect(p.x + 1, p.y + 1, PW - 2, PH - 2);
      c.strokeStyle = "rgba(0,0,0,.4)"; c.strokeRect(gx - 0.5, gy - 0.5, gw + 1, gh + 1);
      c.strokeStyle = "rgba(9,24,48,.9)"; c.lineWidth = 2;
      for (let i = 0; i <= 6; i++) { c.beginPath(); c.moveTo(gx + i * cw, gy); c.lineTo(gx + i * cw, gy + gh); c.stroke(); }
      for (let j = 0; j <= rowsN; j++) { c.beginPath(); c.moveTo(gx, gy + j * ch); c.lineTo(gx + gw, gy + j * ch); c.stroke(); }
      c.strokeStyle = "rgba(190,215,250,.16)"; c.lineWidth = 1;
      for (let i = 0; i < 6; i++) for (let k = 1; k < 4; k++) {
        const x = gx + i * cw + (k * cw) / 4; c.beginPath(); c.moveTo(x, gy); c.lineTo(x, gy + gh); c.stroke();
      }
    });
  }

  // ---- bird dropping ----
  function splat(g, x, y, s) {
    g.fillStyle = "rgba(90,70,45,.35)"; g.beginPath(); g.ellipse(x + 3, y + 4, s * 1.3, s, 0, 0, 7); g.fill();
    g.fillStyle = "#ece7d8";
    for (let i = 0; i < 9; i++) { const a = r(6.3), d = r(s * 0.9); g.beginPath(); g.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, s * (0.35 + r(0.4)), 0, 7); g.fill(); }
    for (let i = 0; i < 6; i++) { g.beginPath(); g.arc(x + r(s * 5) - s * 2.5, y + r(s * 5) - s * 2.5, 1 + r(3), 0, 7); g.fill(); }
    g.fillStyle = "#6a6a44"; g.beginPath(); g.arc(x + r(4) - 2, y + r(4) - 2, s * 0.3, 0, 7); g.fill();
    g.fillStyle = "#e5e0d0"; g.fillRect(x - s * 0.12, y, s * 0.28, s * (1.5 + r(2.5)));
  }

  let base0 = { d: 1, g: 1, f: 1 }, dirty = false, fr = 0, seqProg = 0, finishing = 0, isDone = false;
  let note = "", cur = -1;
  const sp = [], dr = [], P = [];

  // ---- dust, mud streaks and droppings ----
  function dirt() {
    const d = ctx.dust, g = ctx.grime;
    [d, g, ctx.foam].forEach((c) => c.clearRect(0, 0, W, H));
    d.save(); d.clip(glass); d.fillStyle = "rgba(196,168,120,.34)"; d.fillRect(0, 0, W, H);
    panels.forEach((p) => {
      const gr = d.createLinearGradient(0, p.y, 0, p.y + PH);
      gr.addColorStop(0, "rgba(190,160,110,0)"); gr.addColorStop(1, "rgba(170,140,95,.32)");
      d.fillStyle = gr; d.fillRect(p.x, p.y, PW, PH);
    });
    for (let i = 0; i < 2200; i++) {
      d.fillStyle = `rgba(${(150 + r(60)) | 0},${(125 + r(50)) | 0},${(85 + r(40)) | 0},${0.05 + r(0.12)})`;
      d.beginPath(); d.arc(r(W), r(H), 1 + r(5), 0, 7); d.fill();
    }
    d.restore();
    g.save(); g.clip(glass); g.lineCap = "round";
    for (let i = 0; i < 46; i++) {
      const p = panels[i % 3], x = p.x + 14 + r(PW - 28), y = p.y + 10 + r(PH - 120), l = 40 + r(170);
      g.strokeStyle = `rgba(92,68,44,${0.3 + r(0.3)})`; g.lineWidth = 2 + r(6);
      g.beginPath(); g.moveTo(x, y);
      g.bezierCurveTo(x + r(10) - 5, y + l / 3, x + r(14) - 7, (2 * l) / 3 + y, x + r(10) - 5, y + l);
      g.stroke();
    }
    for (let i = 0; i < 18; i++) {
      const x = r(W), y = r(H), s = 12 + r(26), gr = g.createRadialGradient(x, y, 0, x, y, s);
      gr.addColorStop(0, "rgba(100,74,48,.5)"); gr.addColorStop(1, "rgba(100,74,48,0)");
      g.fillStyle = gr; g.beginPath(); g.arc(x, y, s, 0, 7); g.fill();
    }
    for (let i = 0; i < 11; i++) { const p = panels[i % 3]; splat(g, p.x + 40 + r(PW - 80), p.y + 40 + r(PH - 160), 9 + r(10)); }
    g.restore();
    seqProg = 0; finishing = 0; base0 = measure();
  }

  // ---- measuring how clean the panels are (tiny offscreen copy keeps this cheap) ----
  const sc = document.createElement("canvas"); sc.width = 110; sc.height = 62;
  const sx = sc.getContext("2d", { willReadFrequently: true });
  function sum(src) {
    sx.clearRect(0, 0, 110, 62); sx.drawImage(src, 0, 0, 110, 62);
    const d = sx.getImageData(0, 0, 110, 62).data; let s = 0;
    for (let i = 3; i < d.length; i += 4) s += d[i];
    return s;
  }
  const measure = () => ({ d: sum(cv.dust), g: sum(cv.grime), f: sum(cv.foam) });

  const hud = q("hud"), meter = q("meter"), pct = q("pct"), msg = q("msg"), stage = q("stage"), cta = q("cta");
  function update() {
    const m = measure(), dc = 1 - m.d / base0.d, gc = 1 - m.g / base0.g, fo = m.f / (110 * 62 * 255);
    const clean = Math.max(0, Math.min(1, 0.35 * dc + 0.65 * gc)), done = clean > 0.92 && fo < 0.02;
    meter.style.setProperty("--p", clean * 100 + "%");
    const HL = done ? ["Spotless", "#3ddc84"] : clean < 0.08 ? ["Very dirty", "#b5651d"] : clean < 0.4 ? ["Dirty", "#c98a1b"]
      : clean < 0.8 ? ["Getting there", "#f2c300"] : ["Almost clean", "#a6e22e"];
    hud.lastChild.textContent = HL[0]; hud.style.setProperty("--c", HL[1]);
    pct.textContent = Math.round(clean * 100) + "%";
    let t = "Drag across the panel to start washing.";
    if (done) t = "Spotless and sparkling. Book a visit and we’ll do this on your roof.";
    else if (fo > 0.06 && gc < 0.9) t = "Shampoo is on. Scrub with the brush, then rinse with water.";
    else if (fo > 0.02 && gc >= 0.9) t = "Almost there. Rinse the suds off with the pressure washer.";
    else if (dc > 0.85 && gc < 0.6) t = "Dust is gone. Droppings and mud need shampoo and a brush.";
    else if (clean > 0.02) t = "Keep going. Water takes the dust; shampoo and a brush take the stubborn spots.";
    msg.textContent = note && !done ? note : t;
    stage.classList.toggle("hw-done", done); isDone = done; cta.hidden = !done;
  }

  // ---- tools ----
  function er(c, x, y, rad, a) {
    c.save(); c.clip(glass); c.globalCompositeOperation = "destination-out";
    const g = c.createRadialGradient(x, y, 0, x, y, rad);
    g.addColorStop(0, `rgba(0,0,0,${a})`); g.addColorStop(0.65, `rgba(0,0,0,${a * 0.7})`); g.addColorStop(1, "rgba(0,0,0,0)");
    c.fillStyle = g; c.fillRect(x - rad, y - rad, rad * 2, rad * 2); c.restore();
  }
  function foam(x, y) {
    const c = ctx.foam; c.save(); c.clip(glass);
    const g = c.createRadialGradient(x, y, 0, x, y, 44);
    g.addColorStop(0, "rgba(255,255,255,.3)"); g.addColorStop(1, "rgba(255,255,255,0)");
    c.fillStyle = g; c.fillRect(x - 44, y - 44, 88, 88);
    c.strokeStyle = "rgba(170,205,245,.7)"; c.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      const a = r(6.3), d = r(36); c.fillStyle = "rgba(255,255,255,.6)";
      c.beginPath(); c.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, 4 + r(11), 0, 7); c.fill(); c.stroke();
    }
    c.restore();
  }
  function stamp(x, y, t) {
    if (t === "water") {
      er(ctx.dust, x, y, 48, 0.6); er(ctx.foam, x, y, 48, 0.4); er(ctx.grime, x, y, 40, 0.0025);
      if (Math.random() < 0.45 && ctx.fx.isPointInPath(glass, x, y)) dr.push({ x: x + r(80) - 40, y: y + r(80) - 40, s: 2 + r(4), l: 1 });
      for (let i = 0; i < 3; i++) P.push({ x, y, vx: r(8) - 4, vy: -r(5) - 1, l: 1, k: 0 });
    } else if (t === "shampoo") {
      foam(x, y);
      if (Math.random() < 0.5) P.push({ x: x + r(50) - 25, y: y + r(50) - 25, vx: r(1) - 0.5, vy: -0.4 - r(0.6), l: 1, k: 1, s: 3 + r(7) });
    } else {
      const fa = ctx.foam.getImageData(Math.max(0, Math.min(W - 1, x | 0)), Math.max(0, Math.min(H - 1, y | 0)), 1, 1).data[3] / 255;
      er(ctx.grime, x, y, 34, 0.01 + 0.38 * fa); er(ctx.dust, x, y, 34, 0.35); er(ctx.foam, x, y, 34, 0.05);
    }
    if (P.length > 300) P.splice(0, 60);
    dirty = true;
  }

  // ---- pointer input ----
  const fx = cv.fx, f = ctx.fx, R = { water: 48, shampoo: 40, brush: 34 };
  const RM = matchMedia("(prefers-reduced-motion:reduce)").matches;
  let pos = null, last = null, drawing = false, tool = "water", demo = false;
  const pt = (e) => { const b = fx.getBoundingClientRect(); return { x: ((e.clientX - b.left) * W) / b.width, y: ((e.clientY - b.top) * H) / b.height }; };
  function line(a, b, t) {
    const d = Math.hypot(b.x - a.x, b.y - a.y), n = Math.ceil(d / Math.max(6, R[t] * 0.35));
    for (let i = 1; i <= n; i++) stamp(a.x + ((b.x - a.x) * i) / n, a.y + ((b.y - a.y) * i) / n, t);
  }
  on(fx, "pointerdown", (e) => { if (demo) return; fx.setPointerCapture(e.pointerId); drawing = true; note = ""; pos = last = pt(e); stamp(pos.x, pos.y, tool); hint.hidden = true; });
  on(fx, "pointermove", (e) => { if (demo) return; pos = pt(e); if (drawing) { line(last, pos, tool); last = pos; } });
  ["pointerup", "pointercancel"].forEach((n) => on(fx, n, () => { if (!demo) drawing = false; }));
  on(fx, "pointerleave", () => { if (!drawing) pos = null; });

  // ---- the four steps ----
  const STEPS = [
    ["water", "Pressure wash", "Step 1: the pressure washer gun blasts off loose dust and dirt first.", 3200, 9],
    ["shampoo", "Solar shampoo", "Step 2: our non-acidic, ammonia-free solar shampoo goes on to loosen droppings and film.", 3400, 9],
    ["brush", "Gentle brush scrubbing", "Step 3: a soft brush works the foam into the stubborn spots.", 4600, 14],
    ["water", "Final pressure wash", "Step 4: a last pressure wash clears the suds and leaves clear glass.", 3400, 9],
  ];
  const btns = [...root.querySelectorAll("[data-hw-step]")];
  btns.forEach((b) => { b.onclick = () => runStep(+b.dataset.hwStep); });
  function pick(t, i) { tool = t; if (i !== undefined) cur = i; btns.forEach((b, j) => b.setAttribute("aria-pressed", j === cur)); }

  function drawTool() {
    const ox = W + 40, oy = H + 70, L = Math.hypot(pos.x - ox, pos.y - oy), ux = (pos.x - ox) / L, uy = (pos.y - oy) / L;
    const b = tool === "brush", back = b ? 0 : 140, nx = pos.x - ux * back, ny = pos.y - uy * back, a = Math.atan2(uy, ux);
    f.save(); f.lineCap = "round";
    if (!drawing) { f.setLineDash([6, 7]); f.strokeStyle = "rgba(255,255,255,.6)"; f.lineWidth = 2; f.beginPath(); f.arc(pos.x, pos.y, R[tool] * 0.85, 0, 7); f.stroke(); f.setLineDash([]); }
    f.strokeStyle = "rgba(0,0,0,.28)"; f.lineWidth = 11; f.beginPath(); f.moveTo(ox + 9, oy + 13); f.lineTo(nx + 9, ny + 13); f.stroke();
    f.strokeStyle = b ? "#aeb6c2" : "#2b3440"; f.lineWidth = 9; f.beginPath(); f.moveTo(ox, oy); f.lineTo(nx, ny); f.stroke();
    f.strokeStyle = b ? "#e6e9ee" : "#566476"; f.lineWidth = 2.5; f.stroke();
    f.strokeStyle = "#f2c300"; f.lineWidth = 13; f.beginPath(); f.moveTo(ox + ux * 80, oy + uy * 80); f.lineTo(ox + ux * 200, oy + uy * 200); f.stroke();
    if (b) {
      f.save(); f.translate(pos.x, pos.y); f.rotate(a + 1.5708 + (drawing ? Math.sin(fr * 0.5) * 0.1 : 0));
      f.fillStyle = "#f2c300"; f.fillRect(-40, -12, 80, 24); f.fillStyle = "#fff6c8";
      for (let i = -37; i < 38; i += 5) f.fillRect(i, -22, 2.5, 12);
      f.fillStyle = "rgba(0,0,0,.25)"; f.fillRect(-40, 8, 80, 4); f.restore();
    } else {
      f.save(); f.translate(nx, ny); f.rotate(a); f.fillStyle = "#f2c300"; f.fillRect(-4, -9, 20, 18); f.fillStyle = "#8a97a8"; f.fillRect(16, -5, 16, 10); f.restore();
      if (drawing) {
        const nx0 = nx + ux * 32, ny0 = ny + uy * 32;
        const Q = (t, s) => [nx0 + (pos.x - nx0) * t - uy * s * t, ny0 + (pos.y - ny0) * t + ux * s * t];
        const hw = tool === "water" ? R.water * 0.6 : R.shampoo * 0.75;
        if (tool === "water") {
          f.fillStyle = "rgba(205,236,255,.2)"; f.beginPath(); f.moveTo(nx0, ny0); f.lineTo(...Q(1, hw)); f.lineTo(...Q(1, -hw)); f.closePath(); f.fill();
          f.strokeStyle = "rgba(240,250,255,.75)"; f.lineWidth = 1.4;
          for (let i = 0; i < 18; i++) { const s = (r(2) - 1) * hw, t0 = 0.05 + r(0.6), t1 = Math.min(1, t0 + 0.25 + r(0.3)); f.beginPath(); f.moveTo(...Q(t0, s)); f.lineTo(...Q(t1, s)); f.stroke(); }
        } else {
          f.strokeStyle = "rgba(170,205,245,.8)"; f.lineWidth = 1;
          for (let i = 0; i < 16; i++) { const t = 0.15 + r(0.85), s = (r(2) - 1) * hw * t; f.fillStyle = "rgba(255,255,255,.88)"; f.beginPath(); f.arc(...Q(t, s), 2 + r(6), 0, 7); f.fill(); f.stroke(); }
        }
      }
    }
    f.restore();
  }

  // ---- animation loop (pauses while the hero is off-screen) ----
  function loop() {
    if (!alive) return;
    if (!visible || document.hidden) { raf = requestAnimationFrame(loop); return; }
    fr++;
    if (drawing && !demo && tool !== "brush" && pos && fr % 3 === 0) stamp(pos.x, pos.y, tool);
    if (finishing > 0) {
      finishing--;
      ["dust", "grime", "foam"].forEach((n) => { const c = ctx[n]; c.save(); c.globalCompositeOperation = "destination-out"; c.fillStyle = "rgba(0,0,0,.16)"; c.fillRect(0, 0, W, H); c.restore(); });
      dirty = true;
      if (!finishing) { ["dust", "grime", "foam"].forEach((n) => ctx[n].clearRect(0, 0, W, H)); update(); }
    }
    f.clearRect(0, 0, W, H);
    if (isDone && fr % (RM ? 40 : 7) === 0 && sp.length < 24) { const p = panels[r(3) | 0]; sp.push({ x: p.x + 20 + r(PW - 40), y: p.y + 20 + r(PH - 40), l: 0, s: 10 + r(16) }); }
    for (let i = sp.length - 1; i >= 0; i--) {
      const s = sp[i]; s.l += 0.03; if (s.l >= 1) { sp.splice(i, 1); continue; }
      const a = Math.sin(s.l * Math.PI), z = s.s * a, k = z * 0.14;
      f.save(); f.globalCompositeOperation = "lighter"; f.fillStyle = `rgba(255,255,255,${a})`; f.beginPath();
      f.moveTo(s.x, s.y - z); f.lineTo(s.x + k, s.y - k); f.lineTo(s.x + z, s.y); f.lineTo(s.x + k, s.y + k);
      f.lineTo(s.x, s.y + z); f.lineTo(s.x - k, s.y + k); f.lineTo(s.x - z, s.y); f.lineTo(s.x - k, s.y - k);
      f.closePath(); f.fill(); f.restore();
    }
    for (let i = P.length - 1; i >= 0; i--) {
      const p = P[i]; p.x += p.vx; p.y += p.vy;
      if (p.k === 0) { p.vy += 0.35; p.l -= 0.04; f.fillStyle = `rgba(205,235,255,${p.l * 0.85})`; f.beginPath(); f.arc(p.x, p.y, 2.2, 0, 7); f.fill(); }
      else { p.l -= 0.015; f.strokeStyle = `rgba(255,255,255,${p.l * 0.8})`; f.lineWidth = 1.5; f.beginPath(); f.arc(p.x, p.y, p.s, 0, 7); f.stroke(); }
      if (p.l <= 0) P.splice(i, 1);
    }
    for (let i = dr.length - 1; i >= 0; i--) {
      const d = dr[i]; d.l -= 0.004; if (d.l < 0.55) d.y += (0.55 - d.l) * 0.6;
      if (d.l <= 0) { dr.splice(i, 1); continue; }
      f.globalAlpha = Math.min(1, d.l * 2); f.fillStyle = "rgba(215,238,255,.2)"; f.strokeStyle = "rgba(255,255,255,.6)"; f.lineWidth = 1;
      f.beginPath(); f.arc(d.x, d.y, d.s, 0, 7); f.fill(); f.stroke();
      f.fillStyle = "#fff"; f.beginPath(); f.arc(d.x - d.s * 0.3, d.y - d.s * 0.3, d.s * 0.28, 0, 7); f.fill(); f.globalAlpha = 1;
    }
    if (dr.length > 240) dr.splice(0, 40);
    if (pos) drawTool();
    if (dirty && fr % 10 === 0) { update(); dirty = false; }
    raf = requestAnimationFrame(loop);
  }

  // ---- demo / reset buttons ----
  const demoBtn = q("demo");
  function stopDemo() { run++; demo = false; drawing = false; pos = null; demoBtn.textContent = "Play all 4 steps"; dirty = true; }
  function runSteps(list, fresh) {
    if (demo) stopDemo();
    const id = ++run;
    if (fresh) { dirt(); note = ""; }
    hint.hidden = true; demo = true; drawing = true; demoBtn.textContent = "Stop";
    let k = 0, t0 = performance.now(), lp = null;
    const go = (now) => {
      if (!alive || id !== run) return;
      const i = list[k], [n, , txt, dur, rows] = STEPS[i];
      pick(n, i); note = txt;
      const p = Math.min(1, (now - t0) / dur), qv = p * rows, u = qv % 2;
      const c = { x: 60 + (u < 1 ? u : 2 - u) * 980, y: 60 + p * (H - 140) };
      pos = c; if (lp) line(lp, c, n); lp = c; dirty = true;
      if (p >= 1) {
        if (i === seqProg) seqProg++; else if (i === 0) seqProg = 1;
        if (seqProg >= 4 && finishing <= 0 && !isDone) finishing = 40;
        k++; t0 = now; lp = null;
        if (k >= list.length) { demo = false; drawing = false; pos = null; demoBtn.textContent = "Play all 4 steps"; return; }
      }
      requestAnimationFrame(go);
    };
    requestAnimationFrame(go);
  }
  function runStep(i) { runSteps([i], false); }
  demoBtn.onclick = () => { if (demo) stopDemo(); else runSteps([0, 1, 2, 3], true); };
  q("reset").onclick = () => { if (demo) stopDemo(); dirt(); update(); hint.hidden = false; note = ""; pick("water", -1); };

  // Lets other sections (e.g. the Process cards) start a step: window.dispatchEvent(new CustomEvent("ww-run-step", { detail: 0 }))
  on(window, "ww-run-step", (e) => {
    const i = Math.max(0, Math.min(3, +e.detail || 0));
    runSteps([i], isDone); // if the panels are already clean, make them dirty first so the step has something to clean
  });

  drawBase(); dirt(); update();
  raf = requestAnimationFrame(loop);

  return () => { alive = false; run++; cancelAnimationFrame(raf); ac.abort(); io.disconnect(); };
}