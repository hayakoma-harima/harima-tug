// ============================================================
//  共通設定 — 管理台帳API（GAS）のURL
//  GASをデプロイしたら、下の '' の中にURLを貼る（ここ1か所だけ）
// ============================================================
var API_URL = 'https://script.google.com/macros/s/AKfycbx6wYWsrD-mamrWS-UzVwwzGmtvKbHj0YIBON_S_X64X_5D3c98PsFocRfPXyz1qCJK/exec';

// ---- 以下は触らなくてOK ----
function apiGet(params) {
  var q = Object.keys(params).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
  }).join('&');
  return fetch(API_URL + '?' + q, { credentials: 'omit' })
    .then(function (r) { return r.json(); })
    .then(function (res) { if (!res.ok) throw new Error(res.error || 'エラー'); return res; });
}

function apiPost(body) {
  return fetch(API_URL, {
    method: 'POST',
    credentials: 'omit',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(body)
  })
    .then(function (r) { return r.json(); })
    .then(function (res) { if (!res.ok) throw new Error(res.error || 'エラー'); return res; });
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function slashDate(ymd) {
  if (!ymd) return '';
  var p = ymd.split('-');
  return Number(p[0]) + '/' + Number(p[1]) + '/' + Number(p[2]);
}

function daysLeft(ymd) {
  var p = ymd.split('-').map(Number);
  var now = new Date();
  var t = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((Date.UTC(p[0], p[1] - 1, p[2]) - t) / 86400000);
}
