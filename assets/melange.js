// Ordre aléatoire des éléments d'une liste, différent à chaque visite
(function () {
  document.querySelectorAll('[data-melange]').forEach(function (liste) {
    var items = Array.prototype.slice.call(liste.children);
    for (var i = items.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = items[i]; items[i] = items[j]; items[j] = t;
    }
    items.forEach(function (el) { liste.appendChild(el); });
  });
})();
