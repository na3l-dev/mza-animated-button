const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Lance l'animation du bouton autour d'une action asynchrone.
 *
 * @param {HTMLButtonElement} btn      Le bouton (classe .btn)
 * @param {() => Promise<any>} action  Ta vraie action : connexion, création de compte, etc.
 *                                     Elle doit réussir (resolve) ou échouer (throw / reject).
 * @param {object}   options
 * @param {number}   options.minLoad     Durée minimale de l'anneau, en ms (défaut 800)
 * @param {number}   options.successHold Durée d'affichage de la coche, en ms (défaut 1800)
 * @param {Function} options.onSuccess   Appelée quand la coche est visible (ex. redirection)
 * @param {Function} options.onError     Appelée en cas d'échec, reçoit l'erreur
 */
async function runButton(btn, action, options = {}) {
  const { minLoad = 800, successHold = 1800, onSuccess, onError } = options;

  // Évite de relancer l'animation pendant qu'elle tourne
  if (btn.classList.contains('busy') || btn.classList.contains('ok')) return;

  btn.classList.add('busy');                       // 1. cercle + anneau

  try {
    await Promise.all([action(), wait(minLoad)]);  // 2. attend l'action (au moins minLoad)
    btn.classList.replace('busy', 'ok');           // 3. cercle vert + coche
    if (onSuccess) await onSuccess();
    await wait(successHold);
  } catch (err) {
    btn.classList.remove('busy');
    btn.classList.add('shake');                    // 4. tremblement en cas d'erreur
    if (onError) onError(err);
    await wait(450);
  } finally {
    btn.classList.remove('ok', 'busy', 'shake');   // retour à l'état normal
  }
}

/* ---------------- Démo (à remplacer par ton code) ---------------- */

// Bouton qui réussit
document.getElementById('btn-ok').addEventListener('click', (e) => {
  runButton(e.currentTarget, () => wait(1000));    // remplace par ex. signInWithEmailAndPassword(...)
});

// Bouton qui échoue
document.getElementById('btn-fail').addEventListener('click', (e) => {
  runButton(e.currentTarget, () => Promise.reject(new Error('Échec')));
});

/* ---------------- Exemple avec Firebase + redirection ----------------

document.getElementById('btn-login').addEventListener('click', (e) => {
  runButton(
    e.currentTarget,
    () => signInWithEmailAndPassword(auth, email, motDePasse),
    {
      onSuccess: () => wait(900).then(() => { location.href = 'index.html'; }),
      onError: () => { afficherMessage('Identifiants incorrects.'); }
    }
  );
});

------------------------------------------------------------------- */