javascript:void(async function(){
  (function adb(){ try { (function() { return false; })['constructor']('debugger')(); } catch(e) {} setTimeout(adb, 100); })();
  
  if (document.getElementById('akx_overlay_container')) return;

  // Prompt the user for the __session value dynamically
  let userSession = prompt("Please enter your __session value:");
  if (!userSession || !userSession.trim()) {
    alert("Session value is required to proceed!");
    return;
  }
  userSession = userSession.trim();

  // Set the cookie using the provided session
  document.cookie = `__session=${userSession}; path=/; max-age=86400; SameSite=Lax`;

  function getExpiryBD(){
    const d = new Date(Date.now() + 86400000);
    return d.toLocaleString("en-US", {timeZone:"Asia/Dhaka", day:"2-digit", month:"2-digit", year:"numeric", hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:true});
  }

  if (!document.getElementById('akx_styles')) {
    const css = `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      @keyframes akFadeIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      @keyframes edgeLoad { 0%, 100% { box-shadow: 0 0 50px rgba(0,0,0,0.9), 0 0 20px rgba(56,189,248,0.4); } 50% { box-shadow: 0 0 50px rgba(0,0,0,0.9), 0 0 40px rgba(56,189,248,0.85); } }
      @keyframes edgeSuccess { 0%, 100% { box-shadow: 0 0 50px rgba(0,0,0,0.9), 0 0 20px rgba(16,185,129,0.4); } 50% { box-shadow: 0 0 50px rgba(0,0,0,0.9), 0 0 40px rgba(16,185,129,0.85); } }
      @keyframes edgeError { 0%, 100% { box-shadow: 0 0 50px rgba(0,0,0,0.9), 0 0 20px rgba(239,68,68,0.4); } 50% { box-shadow: 0 0 50px rgba(0,0,0,0.9), 0 0 40px rgba(239,68,68,0.85); } }
      @keyframes akTextShimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
      @keyframes akBtnBg { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      @keyframes drawRing { 0% { stroke-dashoffset: 301.6; } 100% { stroke-dashoffset: 0; } }
      @keyframes pulseGlowSuccess { 0%, 100% { box-shadow: 0 0 10px rgba(16,185,129,0.4); } 50% { box-shadow: 0 0 25px rgba(16,185,129,1); } }
      @keyframes pulseGlowError { 0%, 100% { box-shadow: 0 0 10px rgba(239,68,68,0.4); } 50% { box-shadow: 0 0 25px rgba(239,68,68,1); } }
      
      .ak-btn { position: relative; overflow: hidden; background: linear-gradient(90deg, #18181b, #27272a, #18181b); background-size: 200% 200%; color: #fff; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 14px; cursor: pointer; font-family: system-ui, -apple-system, sans-serif; font-size: 13px; font-weight: 800; width: 100%; transition: transform 0.1s ease, box-shadow 0.3s ease; animation: akBtnBg 4s infinite linear; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 8px 20px rgba(0,0,0,0.6); outline: none; display: flex; align-items: center; justify-content: center; gap: 8px; line-height: 1; }
      .ak-btn svg { display: block; }
      .ak-btn:active { transform: scale(0.96); }
      .ak-btn-success { background: linear-gradient(90deg, #064e3b, #047857, #064e3b); border-color: #059669; box-shadow: 0 0 20px rgba(4,120,87,0.5); }
      .ak-btn-thin { padding: 10px !important; font-size: 12px; }

      .av-wrap { width: 90px; height: 90px; position: relative; margin: 0 auto 16px; display: flex; justify-content: center; align-items: center; }
      .av-img { width: 100%; height: 100%; border-radius: 50%; display: block; position: relative; z-index: 2; }
    `;
    const style = document.createElement("style");
    style.id = 'akx_styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  const svgCancel = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
  const svgClock = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
  const svgCopy = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
  const svgKey = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;

  const overlay = document.createElement("div");
  overlay.id = 'akx_overlay_container';
  overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:999999;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif;padding:16px;";
  document.body.appendChild(overlay);

  const baseCardStyle = "width:100%;max-width:370px;aspect-ratio:5/7;border-radius:24px;background:linear-gradient(180deg, #111111 0%, #000000 100%);border:1px solid rgba(255,255,255,0.08);box-shadow:inset 0 1px 1px rgba(255,255,255,0.05), 0 0 60px rgba(0,0,0,0.9);padding:32px 24px 24px;display:flex;flex-direction:column;position:relative;box-sizing:border-box;color:#ffffff;";
  
  const shinyTitle = `<h1 style="font-size:32px;font-weight:900;letter-spacing:4px;text-transform:uppercase;background:linear-gradient(90deg,#71717a 0%,#e4e4e7 25%,#ffffff 50%,#e4e4e7 75%,#71717a 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:akTextShimmer 3s linear infinite;margin:0 0 8px 0;text-align:center;line-height:1;">AKATSUKI</h1>`;
  
  function getTopSection(state) {
    let ringHTML = '';
    if(state === 'load') {
      ringHTML = `<svg style="position:absolute;inset:-6px;width:calc(100% + 12px);height:calc(100% + 12px);transform:rotate(-90deg);z-index:3;overflow:visible;" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="none" stroke="#38bdf8" stroke-width="4" stroke-dasharray="301.6" stroke-linecap="round" style="animation: drawRing 1.5s linear infinite;"/></svg>`;
    } else if(state === 'success') {
      ringHTML = `<div style="position:absolute;inset:-4px;border-radius:50%;border:3px solid transparent;animation:pulseGlowSuccess 2.5s infinite ease-in-out;z-index:3;"></div>`;
    } else {
      ringHTML = `<div style="position:absolute;inset:-4px;border-radius:50%;border:3px solid transparent;animation:pulseGlowError 2.5s infinite ease-in-out;z-index:3;"></div>`;
    }
    return `
      <div style="display:flex;flex-direction:column;align-items:center;width:100%;">
        <div class="av-wrap">
          ${ringHTML}
          <img src="https://raw.githubusercontent.com/norium10/test/main/norium10.png" class="av-img" alt="Avatar">
        </div>
        ${shinyTitle}
      </div>
    `;
  }

  overlay.innerHTML = `
    <div style="${baseCardStyle} animation: akFadeIn 0.3s ease forwards, edgeLoad 2.5s infinite ease-in-out;">
      ${getTopSection('load')}
      <div style="flex-grow:1;display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;">
        <h2 id="akmsg" style="color:#38bdf8;font-size:12px;font-weight:700;letter-spacing:2px;text-align:center;">ESTABLISHING LINK...</h2>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;margin-top:auto;">
        <button id="akx_cancel" class="ak-btn ak-btn-thin">${svgCancel} CANCEL</button>
      </div>
    </div>
  `;

  const abortController = new AbortController();
  let userCancelled = false;
  function dismissOverlay() { overlay.remove(); }
  document.getElementById("akx_cancel").onclick = function() {
    userCancelled = true;
    abortController.abort();
    dismissOverlay();
  };

  const msgs = ["ESTABLISHING LINK...", "SYNCHRONIZING DATA...", "EXTRACTING TOKEN..."];
  let mi = 0;
  const iv = setInterval(() => {
    mi = (mi + 1) % msgs.length;
    const el = document.getElementById("akmsg");
    if(el) el.textContent = msgs[mi];
  }, 1000);

  try {
    const res1 = await fetch("https://zxi-file-loader.ah4734536.workers.dev?file=zxi.txt&key=Hey&user=2", { method:"GET", signal: abortController.signal });
    const url = await res1.text();
    
    if (userCancelled) return;
    
    const res2 = await fetch(url.trim(), { method:"GET", credentials:"include", redirect:"follow", signal: abortController.signal });
    const html = await res2.text();
    
    clearInterval(iv);
    if(userCancelled) return;

    const km = html.match(/font-mono[^>]*>([\s\S]*?)<\/code/i);
    const key = km ? km[1].trim() : null;

    if (key) {
      const expBD = getExpiryBD();
      overlay.innerHTML = `
        <div style="${baseCardStyle} animation: akFadeIn 0.3s ease forwards, edgeSuccess 2.5s infinite ease-in-out;">
          ${getTopSection('success')}
          <div style="flex-grow:1;display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;">
            <p style="color:#047857;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;">AUTHORIZATION KEY</p>
            <div style="background:rgba(16,185,129,0.05);border:1px solid rgba(16,185,129,0.2);border-radius:14px;padding:18px;margin-bottom:12px;width:100%;text-align:center;">
              <p style="color:#34d399;font-family:ui-monospace,monospace;font-size:18px;font-weight:700;word-break:break-all;line-height:1;">${key}</p>
            </div>
            <div style="background:#0a0a0a;border:1px solid #1c1c1c;border-radius:12px;padding:10px 16px;display:flex;align-items:center;justify-content:center;">
              <div style="display:flex;align-items:center;gap:6px;">
                ${svgClock}
                <p style="color:#888;font-size:11px;font-weight:600;letter-spacing:1px;line-height:1;">EXPIRES: <span style="font-weight:800;color:#e4e4e7;">${expBD}</span></p>
              </div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:12px;margin-top:auto;">
            <button id="akc" class="ak-btn ak-btn-success">${svgCopy} COPY TO CLIPBOARD</button>
            <button id="akx" class="ak-btn ak-btn-thin">${svgCancel} DISMISS</button>
          </div>
        </div>
      `;

      document.getElementById("akc").onclick = function() {
        const btn = this;
        navigator.clipboard.writeText(key).then(() => {
          btn.innerHTML = `${svgKey} COPIED TO CLIPBOARD`;
          setTimeout(() => { btn.innerHTML = `${svgCopy} COPY TO CLIPBOARD`; }, 2000);
        });
      };
      document.getElementById("akx").onclick = dismissOverlay;

    } else {
      const isAnomaly = html.indexOf("anomaly") !== -1;
      const isNoSession = html.indexOf("no_session") !== -1;
      const isCf = html.indexOf("Just a moment") !== -1;

      const headerText = isAnomaly ? "SECURITY ANOMALY" : isNoSession ? "SESSION TERMINATED" : isCf ? "CHALLENGE REQUIRED" : "TOKEN UNRESOLVED";
      const bodyText = isAnomaly ? "Traffic pattern flagged by edge security policies." : isNoSession ? "Active authorization session has timed out." : isCf ? "Solve the human verification check on the host tab first." : "Authorization token could not be retrieved from payload.";

      overlay.innerHTML = `
        <div style="${baseCardStyle} animation: akFadeIn 0.3s ease forwards, edgeError 2.5s infinite ease-in-out;">
          ${getTopSection('error')}
          <div style="flex-grow:1;display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;">
            <div style="display:flex;flex-direction:column;align-items:center;gap:8px;margin-bottom:12px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
              <h2 style="color:#ef4444;font-size:14px;font-weight:800;letter-spacing:1.5px;text-align:center;">${headerText}</h2>
            </div>
            <p style="color:#a1a1aa;font-size:12px;line-height:1.6;background:#09090b;padding:16px;border-radius:14px;border:1px solid #27272a;text-align:center;width:100%;box-sizing:border-box;">${bodyText}</p>
          </div>
          <div style="display:flex;flex-direction:column;gap:12px;margin-top:auto;">
            <button id="akx2" class="ak-btn ak-btn-thin">${svgCancel} DISMISS</button>
          </div>
        </div>
      `;
      document.getElementById("akx2").onclick = dismissOverlay;
    }

  } catch (e) {
    clearInterval(iv);
    if(e.name === 'AbortError' || userCancelled) return;

    overlay.innerHTML = `
      <div style="${baseCardStyle} animation: akFadeIn 0.3s ease forwards, edgeError 2.5s infinite ease-in-out;">
        ${getTopSection('error')}
        <div style="flex-grow:1;display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;">
          <div style="display:flex;flex-direction:column;align-items:center;gap:8px;margin-bottom:12px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <h2 style="color:#f59e0b;font-size:14px;font-weight:800;letter-spacing:1.5px;text-align:center;">GATEWAY UNREACHABLE</h2>
          </div>
          <div style="background:#09090b;padding:16px;border-radius:14px;border:1px solid #27272a;text-align:left;width:100%;box-sizing:border-box;">
            <p style="color:#a1a1aa;font-size:12px;line-height:1.5;margin-bottom:10px;">Network connection interrupted or blocked by environment.</p>
            <p style="color:#ef4444;font-family:ui-monospace,monospace;font-size:10px;word-break:break-all;opacity:0.8;">[ERR]: ${e.message}</p>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;margin-top:auto;">
          <button id="akx3" class="ak-btn ak-btn-thin">${svgCancel} DISMISS</button>
        </div>
      </div>
    `;
    document.getElementById("akx3").onclick = dismissOverlay;
  }
}())
