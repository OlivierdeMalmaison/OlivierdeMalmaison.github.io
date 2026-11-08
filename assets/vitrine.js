// « Ils l'ont lu » : avis cochés « Accueil » dans le tableau des commentaires
(function () {
  var API = 'https://script.google.com/macros/s/AKfycby0C9YDnMwpPRrF6ON3T4O6YyY393LErl48LOSDhUt9lZJDcf_TdO3rFu9CzZTQzPUi/exec';
  var TITRES = {
    'le-son-du-rappel.html': 'Le Son du rappel',
    'l-horloger-du-lauragais.html': "L'Horloger du Lauragais",
    'la-native.html': 'La Native',
    'livres.html': 'Nainen'
  };
  var section = document.getElementById('avis');
  var liste = document.getElementById('avis-liste');
  if (!section || !liste) return;

  fetch(API + '?action=vitrine')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var avis = (data && data.avis) || [];
      if (!avis.length) return;
      for (var i = avis.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var x = avis[i]; avis[i] = avis[j]; avis[j] = x;
      }
      avis.forEach(function (a) {
        var fig = document.createElement('figure');
        fig.className = 'review';
        var q = document.createElement('blockquote');
        q.textContent = '« ' + a.texte + ' »';
        var cap = document.createElement('figcaption');
        cap.appendChild(document.createTextNode(a.nom));
        if (a.source) {
          cap.appendChild(document.createTextNode(', sur '));
          if (/^https?:\/\//.test(a.lien)) {
            var l = document.createElement('a');
            l.href = a.lien; l.target = '_blank'; l.rel = 'noopener';
            l.textContent = a.source;
            cap.appendChild(l);
          } else {
            cap.appendChild(document.createTextNode(a.source));
          }
        }
        var titre = TITRES[a.page];
        if (titre) {
          cap.appendChild(document.createTextNode(' · à propos de '));
          var t = document.createElement('a');
          t.href = a.page; t.textContent = titre;
          cap.appendChild(t);
        }
        fig.appendChild(q);
        fig.appendChild(cap);
        liste.appendChild(fig);
      });
      section.hidden = false;
    })
    .catch(function () {});
})();
