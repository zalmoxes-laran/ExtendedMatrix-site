/*
 * Extended Matrix — banner di versione per i manuali su Read the Docs.
 * Uso, nel conf.py di un manuale Sphinx:
 *   html_js_files = ['https://www.extendedmatrix.org/status-banner.js']
 * Legge /status.json e, se la pagina è di una linea diversa dalla
 * raccomandata, mostra in cima una riga che lo dice e porta alla stessa
 * pagina della linea raccomandata. Nessun numero è scritto nei manuali.
 */
(function () {
  var m = /\/en\/v?(\d+\.\d+)\//.exec(location.pathname);
  if (!m) return;
  var here = m[1];
  fetch('https://www.extendedmatrix.org/status.json').then(function (r) { return r.json(); }).then(function (s) {
    if (!s.recommended || s.recommended === here) return;
    var line = (s.lines || []).filter(function (l) { return l.version === here; })[0];
    var state = line ? line.state : 'archived';
    var msg = state === 'dev'
      ? 'You are reading the EM ' + here + ' development docs. The recommended line is ' + s.recommended + '.'
      : 'You are reading the docs of EM ' + here + ' (' + (line ? line.label : 'archived') + '). The recommended line is ' + s.recommended + '.';
    var target = location.href.replace(/\/en\/v?\d+\.\d+\//, '/en/' + (m[0].indexOf('/v') > -1 ? 'v' : '') + s.recommended + '/');
    var bar = document.createElement('div');
    bar.setAttribute('role', 'note');
    bar.style.cssText = 'background:#073763;color:#fcfcfc;font:14px/1.4 Sora,system-ui,sans-serif;padding:10px 16px;text-align:center';
    bar.innerHTML = msg + ' <a style="color:#f1d27c;font-weight:600" href="' + target + '">Open this page in ' + s.recommended + ' →</a>';
    document.body.insertBefore(bar, document.body.firstChild);
  }).catch(function () {});
})();
