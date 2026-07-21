/*!
 * Double O Chat Widget v1.1 — embeddable AI chat wired to an n8n Chat Trigger.
 * All branding is data-attribute driven (data-webhook-url, data-title,
 * data-subtitle, data-welcome, data-placeholder, data-error[-fallback|-retry],
 * data-accent, data-accent-text, data-position, data-fallback-url) — new
 * client = new attribute values, same file.
 *
 * Language sync: re-reads its own data-* attributes whenever the host page
 * mutates them (e.g. a locale layout re-rendering the tag on a client-side
 * route change) and swaps title/subtitle/placeholder/aria-labels and, if the
 * visitor hasn't typed yet, the welcome bubble — following whatever mechanism
 * the host already uses for language state, without knowing what it is.
 */
(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Config — read from the <script> tag's data attributes
  // ---------------------------------------------------------------------------
  var script = document.currentScript;
  if (!script) return;

  function readConfig() {
    return {
      webhookUrl: script.getAttribute('data-webhook-url') || '',
      title: script.getAttribute('data-title') || 'Double O',
      subtitle: script.getAttribute('data-subtitle') || 'AI assistant',
      welcome: script.getAttribute('data-welcome') || 'Hi! How can I help you today?',
      placeholder: script.getAttribute('data-placeholder') || 'Type a message…',
      error: script.getAttribute('data-error') || 'Sorry — something went wrong on my end.',
      errorFallback: script.getAttribute('data-error-fallback') || 'You can book directly here: {url}',
      errorRetry: script.getAttribute('data-error-retry') || 'Please try again in a moment.',
      accent: script.getAttribute('data-accent') || '#8ce2a4',
      accentText: script.getAttribute('data-accent-text') || '#0e1210',
      position: script.getAttribute('data-position') === 'left' ? 'left' : 'right',
      fallbackUrl: script.getAttribute('data-fallback-url') || '',
      storageKey: script.getAttribute('data-storage-key') || 'doubleo_chat',
      zIndex: script.getAttribute('data-z-index') || '2147483000'
    };
  }

  var cfg = readConfig();

  if (!cfg.webhookUrl) {
    console.warn('[DoubleO Chat] data-webhook-url is missing — widget not started.');
    return;
  }

  // ---------------------------------------------------------------------------
  // Session — one UUID per visitor, survives page reloads
  // ---------------------------------------------------------------------------
  function getSessionId() {
    try {
      var s = localStorage.getItem(cfg.storageKey + '_session');
      if (!s) {
        s = (window.crypto && crypto.randomUUID)
          ? crypto.randomUUID()
          : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
              var r = (Math.random() * 16) | 0;
              return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
            });
        localStorage.setItem(cfg.storageKey + '_session', s);
      }
      return s;
    } catch (e) {
      // localStorage blocked (private mode etc.) — session lives for this page only
      return 'tmp-' + Date.now() + '-' + Math.floor(Math.random() * 1e6);
    }
  }
  var sessionId = getSessionId();

  // ---------------------------------------------------------------------------
  // Root — Shadow DOM keeps site CSS and widget CSS from touching each other
  // ---------------------------------------------------------------------------
  var host = document.createElement('div');
  host.setAttribute('data-doubleo-chat', '');
  host.style.cssText = 'position:fixed;bottom:0;' + cfg.position + ':0;z-index:' + cfg.zIndex + ';';
  document.body.appendChild(host);
  var root = host.attachShadow({ mode: 'open' });

  // ---------------------------------------------------------------------------
  // Design tokens — from app/globals.css ("the night shift" design system).
  // Shadow DOM doesn't inherit page styles, so every token is restated here.
  //   Color:  --ink #0e1210 (bg) · --ink-2 #131816 (header/composer)
  //           --panel #161c18 (card) · --text #ede9df · --muted #a8b0a6
  //           --line rgba(237,233,223,.13) / --line-strong .28 (hairline rules)
  //           --green #8ce2a4 ("running" signal, accent) · hover #a4ecb7
  //           --green-wash rgba(140,226,164,.09) · --amber #e2b45a ("leak"/error)
  //           --them-wash rgba(237,233,223,.07) (site's own .vig__bubble--them)
  //   Type:   Space Grotesk Variable (display/labels), Inter Variable (body) —
  //           both already loaded document-wide via @fontsource-variable;
  //           family names are restated so Shadow DOM can reuse those files.
  //   Shape:  radius 0 everywhere (site never rounds cards/inputs/buttons,
  //           only circular "signal" dots) · shadow 0 30px 80px rgba(0,0,0,.45)
  //           (the one shadow the site uses, on .opslog) · ease cubic-bezier(.22,1,.36,1)
  //   Nothing invented: bot/user bubbles reuse the site's existing
  //   .vig__bubble--them/--us pair; error uses amber, the site's own
  //   "leak" color, instead of a foreign red.
  // ---------------------------------------------------------------------------
  var css = [
    ':host{all:initial}',
    '*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}',
    ':host{',
      '--accent:' + cfg.accent + ';--accent-text:' + cfg.accentText + ';',
      '--ink:#0e1210;--ink-2:#131816;--panel:#161c18;',
      '--text:#ede9df;--muted:#a8b0a6;',
      '--line:rgba(237,233,223,.13);--line-strong:rgba(237,233,223,.28);',
      '--green:#8ce2a4;--green-hi:#a4ecb7;--green-wash:rgba(140,226,164,.09);',
      '--amber:#e2b45a;--them-wash:rgba(237,233,223,.07);',
      '--shadow:0 30px 80px rgba(0,0,0,.45);--ease:cubic-bezier(.22,1,.36,1);',
      '--font-display:"Space Grotesk Variable","Space Grotesk",system-ui,sans-serif;',
      '--font-body:"Inter Variable","Inter",system-ui,-apple-system,sans-serif;',
      'font-family:var(--font-body)',
    '}',

    /* Launcher bubble — circular, mirrors the site's pulsing "live" dot */
    '.doc-launcher{position:fixed;bottom:22px;' + cfg.position + ':22px;width:56px;height:56px;',
    'border:1px solid var(--line-strong);border-radius:50%;background:var(--green);color:var(--accent-text);',
    'cursor:pointer;box-shadow:var(--shadow);display:flex;align-items:center;justify-content:center;',
    'transition:transform .15s var(--ease),background-color .15s;font-family:var(--font-display)}',
    '.doc-launcher:hover{background:var(--green-hi);transform:translateY(-2px)}',
    '.doc-launcher:focus-visible{outline:2px solid var(--green);outline-offset:3px;border-radius:50%}',
    '.doc-launcher svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:2}',
    '.doc-launcher-ring{position:absolute;top:-3px;' + (cfg.position === 'left' ? 'left' : 'right') + ':-3px;',
    'width:10px;height:10px;border-radius:50%;background:var(--green);border:2px solid var(--ink);',
    'animation:docPulseRing 2.4s infinite}',
    '@keyframes docPulseRing{0%,100%{box-shadow:0 0 0 0 rgba(140,226,164,.5)}50%{box-shadow:0 0 0 5px rgba(140,226,164,0)}}',

    /* Panel — sharp corners, hairline border, the site's card treatment */
    '.doc-panel{position:fixed;bottom:92px;' + cfg.position + ':22px;width:376px;max-width:calc(100vw - 24px);',
    'height:568px;max-height:calc(100vh - 120px);background:var(--panel);border:1px solid var(--line-strong);',
    'box-shadow:var(--shadow);display:flex;flex-direction:column;overflow:hidden;color:var(--text);',
    'font-family:var(--font-body);opacity:0;transform:translateY(12px);pointer-events:none;',
    'transition:opacity .2s var(--ease),transform .2s var(--ease)}',
    '.doc-panel.doc-open{opacity:1;transform:translateY(0);pointer-events:auto}',

    /* Header */
    '.doc-head{background:var(--ink);border-bottom:1px solid var(--line);color:var(--text);',
    'padding:1rem 1.1rem;display:flex;align-items:center;gap:12px}',
    '.doc-head-txt{flex:1;min-width:0}',
    '.doc-title{font:600 .95rem var(--font-display);letter-spacing:-.01em;line-height:1.2}',
    '.doc-sub{display:flex;align-items:center;gap:.4rem;margin-top:.3rem;',
    'font-size:.78rem;color:var(--muted)}',
    '.doc-sub-dot{width:6px;height:6px;border-radius:50%;background:var(--green);flex:none;',
    'animation:docPulseDot 2.4s infinite}',
    '@keyframes docPulseDot{0%,100%{box-shadow:0 0 0 0 rgba(140,226,164,.5)}50%{box-shadow:0 0 0 4px rgba(140,226,164,0)}}',
    '.doc-close{background:none;border:1px solid transparent;color:var(--muted);cursor:pointer;',
    'padding:6px;transition:color .15s,border-color .15s}',
    '.doc-close:hover{color:var(--text)}',
    '.doc-close:focus-visible{outline:2px solid var(--green);outline-offset:2px}',
    '.doc-close svg{width:16px;height:16px;stroke:currentColor;stroke-width:2;fill:none;display:block}',

    /* Messages */
    '.doc-log{flex:1;overflow-y:auto;padding:1.1rem 1rem;display:flex;flex-direction:column;',
    'gap:.6rem;background:var(--panel)}',
    '.doc-msg{max-width:84%;padding:.6rem .85rem;font-size:.9rem;line-height:1.5;',
    'white-space:pre-wrap;word-wrap:break-word;border:1px solid var(--line)}',
    '.doc-msg a{color:inherit;text-decoration:underline}',
    '.doc-msg-bot{background:var(--them-wash);color:var(--text);align-self:flex-start}',
    '.doc-msg-user{background:var(--green-wash);border-color:rgba(140,226,164,.35);',
    'color:var(--text);align-self:flex-end}',
    '.doc-msg-err{background:rgba(226,180,90,.09);border-color:rgba(226,180,90,.4);',
    'color:var(--amber);align-self:flex-start}',

    /* Typing indicator */
    '.doc-typing{align-self:flex-start;background:var(--them-wash);border:1px solid var(--line);',
    'padding:.7rem .85rem;display:flex;gap:5px}',
    '.doc-typing i{width:5px;height:5px;border-radius:50%;background:var(--muted);opacity:.6;',
    'animation:docTypingBounce 1.2s infinite ease-in-out;font-style:normal}',
    '.doc-typing i:nth-child(2){animation-delay:.15s}',
    '.doc-typing i:nth-child(3){animation-delay:.3s}',
    '@keyframes docTypingBounce{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-4px);opacity:1}}',

    /* Composer */
    '.doc-form{display:flex;gap:8px;padding:.75rem;border-top:1px solid var(--line);background:var(--ink-2)}',
    '.doc-input{flex:1;border:1px solid var(--line-strong);background:var(--panel);color:var(--text);',
    'padding:.6rem .7rem;font-size:.88rem;font-family:var(--font-body);resize:none;max-height:96px;',
    'line-height:1.4;transition:border-color .15s}',
    '.doc-input::placeholder{color:rgba(168,176,166,.55)}',
    '.doc-input:focus{outline:none;border-color:var(--green)}',
    '.doc-send{border:1px solid var(--green);background:var(--green);color:var(--accent-text);width:42px;',
    'cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none;',
    'transition:background-color .15s,transform .15s var(--ease)}',
    '.doc-send:hover:not(:disabled){background:var(--green-hi);transform:translateY(-1px)}',
    '.doc-send:disabled{opacity:.4;cursor:default}',
    '.doc-send:focus-visible{outline:2px solid var(--green);outline-offset:2px}',
    '.doc-send svg{width:16px;height:16px;stroke:currentColor;stroke-width:2;fill:none}',

    /* Mobile: full-width sheet */
    '@media (max-width:480px){',
    '.doc-panel{bottom:0;' + cfg.position + ':0;width:100vw;max-width:100vw;height:100%;max-height:100%;border:none}',
    '.doc-launcher{bottom:16px;' + cfg.position + ':16px}}',

    '@media (prefers-reduced-motion:reduce){',
    '.doc-panel,.doc-launcher,.doc-send{transition:none}',
    '.doc-typing i,.doc-launcher-ring,.doc-sub-dot{animation:none}}'
  ].join('');

  var style = document.createElement('style');
  style.textContent = css;
  root.appendChild(style);

  // ---------------------------------------------------------------------------
  // Markup
  // ---------------------------------------------------------------------------
  var iconChat = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8.5 8.5 0 0 1-8.5 8.5c-1.4 0-2.7-.3-3.9-.9L3 21l1.4-4.4A8.5 8.5 0 1 1 21 12z" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var iconX = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg>';
  var iconSend = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var launcher = document.createElement('button');
  launcher.className = 'doc-launcher';
  launcher.type = 'button';
  launcher.innerHTML = iconChat + '<span class="doc-launcher-ring" aria-hidden="true"></span>';
  root.appendChild(launcher);

  var panel = document.createElement('section');
  panel.className = 'doc-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-hidden', 'true');
  panel.innerHTML =
    '<header class="doc-head">' +
      '<div class="doc-head-txt">' +
        '<div class="doc-title"></div>' +
        '<div class="doc-sub"><span class="doc-sub-dot" aria-hidden="true"></span><span class="doc-sub-text"></span></div>' +
      '</div>' +
      '<button class="doc-close" type="button">' + iconX + '</button>' +
    '</header>' +
    '<div class="doc-log" role="log" aria-live="polite"></div>' +
    '<form class="doc-form">' +
      '<textarea class="doc-input" rows="1"></textarea>' +
      '<button class="doc-send" type="submit">' + iconSend + '</button>' +
    '</form>';
  root.appendChild(panel);

  var titleEl = panel.querySelector('.doc-title');
  var subTextEl = panel.querySelector('.doc-sub-text');
  var log = panel.querySelector('.doc-log');
  var form = panel.querySelector('.doc-form');
  var input = panel.querySelector('.doc-input');
  var sendBtn = panel.querySelector('.doc-send');
  var closeBtn = panel.querySelector('.doc-close');

  // ---------------------------------------------------------------------------
  // Language sync — apply cfg strings to static chrome + aria labels
  // ---------------------------------------------------------------------------
  function applyChrome() {
    titleEl.textContent = cfg.title;
    subTextEl.textContent = cfg.subtitle;
    input.placeholder = cfg.placeholder;
    panel.setAttribute('aria-label', cfg.title + ' chat');
    closeBtn.setAttribute('aria-label', 'Close chat');
    input.setAttribute('aria-label', 'Message');
    sendBtn.setAttribute('aria-label', 'Send message');
    launcher.setAttribute('aria-label', (opened ? 'Close' : 'Open') + ' chat with ' + cfg.title);
  }

  var opened = false;
  var welcomed = false;
  var conversationStarted = false;
  var welcomeBubble = null;
  applyChrome();

  // Re-apply whenever the host page updates the script's own config attributes
  // (e.g. a locale layout re-rendering with new data-* values on language switch).
  var configAttrs = [
    'data-title', 'data-subtitle', 'data-welcome', 'data-placeholder',
    'data-error', 'data-error-fallback', 'data-error-retry', 'data-fallback-url'
  ];
  var attrObserver = new MutationObserver(function () {
    cfg = readConfig();
    applyChrome();
    if (welcomeBubble && !conversationStarted) {
      welcomeBubble.innerHTML = renderRich(cfg.welcome);
    }
  });
  attrObserver.observe(script, { attributes: true, attributeFilter: configAttrs });

  // ---------------------------------------------------------------------------
  // Rendering — escape everything, then allow links + **bold** only
  // ---------------------------------------------------------------------------
  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function renderRich(text) {
    var safe = escapeHtml(text);
    safe = safe.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    safe = safe.replace(/(https?:\/\/[^\s<]+)/g, function (url) {
      return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + '</a>';
    });
    return safe;
  }
  function addMsg(kind, text) {
    var div = document.createElement('div');
    div.className = 'doc-msg doc-msg-' + kind;
    div.innerHTML = renderRich(text);
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    return div;
  }
  function showTyping() {
    var t = document.createElement('div');
    t.className = 'doc-typing';
    t.setAttribute('aria-label', 'Assistant is typing');
    t.innerHTML = '<i></i><i></i><i></i>';
    log.appendChild(t);
    log.scrollTop = log.scrollHeight;
    return t;
  }

  // ---------------------------------------------------------------------------
  // Open / close
  // ---------------------------------------------------------------------------
  function setOpen(v) {
    opened = v;
    panel.classList.toggle('doc-open', v);
    panel.setAttribute('aria-hidden', String(!v));
    launcher.setAttribute('aria-label', (v ? 'Close' : 'Open') + ' chat with ' + cfg.title);
    if (v) {
      if (!welcomed) { welcomeBubble = addMsg('bot', cfg.welcome); welcomed = true; }
      setTimeout(function () { input.focus(); }, 60);
    }
  }
  launcher.addEventListener('click', function () { setOpen(!opened); });
  closeBtn.addEventListener('click', function () { setOpen(false); });
  panel.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });

  // ---------------------------------------------------------------------------
  // Send
  // ---------------------------------------------------------------------------
  var busy = false;
  function errorText() {
    var parts = [cfg.error];
    parts.push(cfg.fallbackUrl ? cfg.errorFallback.replace('{url}', cfg.fallbackUrl) : cfg.errorRetry);
    return parts.join(' ');
  }

  function send(text) {
    if (busy || !text.trim()) return;
    busy = true;
    conversationStarted = true;
    sendBtn.disabled = true;
    addMsg('user', text.trim());
    input.value = '';
    autoGrow();
    var typing = showTyping();

    var ctrl = ('AbortController' in window) ? new AbortController() : null;
    var timer = ctrl && setTimeout(function () { ctrl.abort(); }, 45000);

    fetch(cfg.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: sessionId, action: 'sendMessage', chatInput: text.trim() }),
      signal: ctrl ? ctrl.signal : undefined
    })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        typing.remove();
        var reply = data && (data.output || data.text || data.message);
        if (reply) addMsg('bot', String(reply));
        else addMsg('err', errorText());
      })
      .catch(function () {
        typing.remove();
        addMsg('err', errorText());
      })
      .then(function () {
        if (timer) clearTimeout(timer);
        busy = false;
        sendBtn.disabled = false;
        input.focus();
      });
  }

  function autoGrow() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 96) + 'px';
  }
  input.addEventListener('input', autoGrow);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input.value);
    }
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    send(input.value);
  });
})();
