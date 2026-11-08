// Commentaires : un bloc <div id="commentaires" data-page="..."></div> par page
(function () {
  var API = 'https://script.google.com/macros/s/AKfycby0C9YDnMwpPRrF6ON3T4O6YyY393LErl48LOSDhUt9lZJDcf_TdO3rFu9CzZTQzPUi/exec';
  var box = document.getElementById('commentaires');
  if (!box) return;
  var page = box.getAttribute('data-page');

  box.innerHTML =
    '<div class="stack" style="gap:16px">' +
      '<div class="c-list stack" style="gap:16px"><p class="note" style="margin:0">Chargement des commentaires…</p></div>' +
      '<form class="c-form" style="background:var(--paper);padding:24px">' +
        '<label>Votre prénom<input type="text" name="nom" maxlength="60" required autocomplete="given-name"></label>' +
        '<label>Votre commentaire<textarea name="texte" rows="4" maxlength="2000" required></textarea></label>' +
        '<input type="text" name="site" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">' +
        '<div class="actions"><button class="btn btn-ink" type="submit">Publier</button>' +
        '<span class="c-msg note" role="status"></span></div>' +
        '<p class="note" style="margin:0">Pas de compte nécessaire. Votre prénom et votre commentaire seront visibles de tous. ' +
        '<a href="confidentialite.html">Confidentialité</a></p>' +
      '</form>' +
    '</div>';

  var list = box.querySelector('.c-list');
  var form = box.querySelector('.c-form');
  var msg = box.querySelector('.c-msg');

  function carte(c) {
    var d = new Date(c.date);
    var el = document.createElement('div');
    el.style.cssText = 'background:var(--paper);padding:20px 24px;display:flex;flex-direction:column;gap:8px';
    var t = document.createElement('span');
    t.style.cssText = 'font-size:14px;font-weight:600';
    t.textContent = c.nom;
    var dt = document.createElement('span');
    dt.style.cssText = 'font-weight:400;color:var(--ink-3)';
    dt.textContent = ' · ' + d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    t.appendChild(dt);
    var p = document.createElement('p');
    p.style.cssText = 'margin:0;font-size:15px;line-height:1.6;color:var(--ink-2);white-space:pre-line';
    p.textContent = c.texte;
    el.appendChild(t);
    el.appendChild(p);
    return el;
  }

  function charger() {
    fetch(API + '?page=' + encodeURIComponent(page))
      .then(function (r) { return r.json(); })
      .then(function (data) {
        list.innerHTML = '';
        var cs = (data && data.commentaires) || [];
        if (!cs.length) {
          list.innerHTML = '<p class="note" style="margin:0">Aucun commentaire pour l\'instant. Soyez le premier !</p>';
          return;
        }
        cs.forEach(function (c) { list.appendChild(carte(c)); });
      })
      .catch(function () {
        list.innerHTML = '<p class="note" style="margin:0">Les commentaires sont momentanément indisponibles.</p>';
      });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button');
    btn.disabled = true;
    msg.textContent = 'Envoi…';
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        page: page,
        nom: form.nom.value,
        texte: form.texte.value,
        site: form.site.value
      })
    })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res.ok) {
          msg.textContent = 'Merci, votre commentaire est publié.';
          form.reset();
          charger();
        } else if (res.erreur === 'trop-rapide') {
          msg.textContent = 'Un instant, puis réessayez.';
        } else {
          msg.textContent = 'Merci de remplir les deux champs.';
        }
      })
      .catch(function () { msg.textContent = 'Envoi impossible, réessayez plus tard.'; })
      .then(function () { btn.disabled = false; });
  });

  charger();
})();
