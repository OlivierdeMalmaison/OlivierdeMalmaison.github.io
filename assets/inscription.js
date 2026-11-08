// « Prévenez-moi » : inscription par e-mail, enregistrée dans le tableau (onglet Abonnés)
(function () {
  var API = 'https://script.google.com/macros/s/AKfycby0C9YDnMwpPRrF6ON3T4O6YyY393LErl48LOSDhUt9lZJDcf_TdO3rFu9CzZTQzPUi/exec';
  var form = document.getElementById('prevenez-moi');
  if (!form) return;
  var msg = form.querySelector('.p-msg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button');
    btn.disabled = true;
    msg.textContent = 'Envoi…';
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        type: 'inscription',
        email: form.email.value,
        page: location.pathname.split('/').pop(),
        site: form.site.value
      })
    })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res.ok) { msg.textContent = 'Merci, vous serez prévenu.'; form.reset(); }
        else { msg.textContent = 'Cette adresse ne semble pas valide.'; }
      })
      .catch(function () { msg.textContent = 'Envoi impossible, réessayez plus tard.'; })
      .then(function () { btn.disabled = false; });
  });
})();
