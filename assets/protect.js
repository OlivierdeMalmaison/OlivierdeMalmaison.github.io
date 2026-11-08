// Protection simple des textes : bloque copie, clic droit, glisser et impression.
// Elle décourage la copie ; elle ne peut pas empêcher une capture d'écran.
(function () {
  var zone = document.querySelector('.protected');
  if (!zone) return;
  ['copy', 'cut', 'contextmenu', 'dragstart', 'selectstart'].forEach(function (evt) {
    zone.addEventListener(evt, function (e) { e.preventDefault(); });
  });
  document.addEventListener('keydown', function (e) {
    var tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    var k = (e.key || '').toLowerCase();
    if ((e.ctrlKey || e.metaKey) && (k === 'c' || k === 'p' || k === 's' || k === 'a')) {
      e.preventDefault();
    }
  });
})();
