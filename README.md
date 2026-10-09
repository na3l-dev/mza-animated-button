# mza-animated-button

Bouton animé avec une animation de validation ou d'erreur (chargement, succès, erreur) en HTML, CSS et JS pur, créé pour **MZA WORK**.

Au clic, le bouton se resserre en un cercle avec un anneau de chargement. Si l'action réussit, il passe au vert et une coche se dessine. Si elle échoue, il tremble légèrement avant de revenir à son état normal.

## Les trois états

| État | Ce qui se passe |
|------|-----------------|
| Chargement | Le bouton devient un cercle avec un anneau qui tourne |
| Succès | Le cercle passe au vert et une coche se dessine |
| Erreur | Le bouton tremble puis revient à sa forme normale |

## Contenu

```
mza-animated-button/
├── index.html   # Structure du bouton et page de démo
├── style.css    # Design et animations
└── script.js    # Fonction runButton() et démo
```

Aucune dépendance, aucun outil de build : ouvre `index.html` dans un navigateur pour voir la démo.

## Utilisation

**1. Ajoute le bouton dans ta page**

```html
<link rel="stylesheet" href="style.css">

<div class="btnwrap">
  <button class="btn" id="mon-bouton" type="button">
    <span class="lbl">Se connecter</span>
    <svg class="ring" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,.3)" stroke-width="2.5"/>
      <path d="M12 3a9 9 0 0 1 9 9" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
    <svg class="chk" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <path d="M6 13.5l5 5 9.5-10.5" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</div>

<script src="script.js"></script>
```

**2. Lance l'animation autour de ton action**

```js
document.getElementById('mon-bouton').addEventListener('click', (e) => {
  runButton(e.currentTarget, () => maFonctionAsynchrone());
});
```

`maFonctionAsynchrone` doit renvoyer une Promise : elle réussit (succès) ou lève une erreur (échec).

## Options

```js
runButton(bouton, action, {
  minLoad: 800,       // durée minimale de l'anneau, en ms
  successHold: 1800,  // durée d'affichage de la coche, en ms
  onSuccess: () => {},  // appelée quand la coche apparaît (ex. redirection)
  onError: (err) => {}  // appelée en cas d'échec
});
```

## Exemple avec Firebase et redirection

```js
document.getElementById('btn-login').addEventListener('click', (e) => {
  runButton(
    e.currentTarget,
    () => signInWithEmailAndPassword(auth, email, motDePasse),
    {
      onSuccess: () => new Promise((r) => setTimeout(r, 900)).then(() => {
        location.href = 'index.html';
      }),
      onError: () => afficherMessage('Identifiants incorrects.')
    }
  );
});
```

## Personnalisation

Les couleurs se modifient en haut de `style.css` :

```css
:root {
  --accent-1: #4a8dff;  /* bleu, haut du dégradé */
  --accent-2: #2f6fe0;  /* bleu, bas du dégradé */
  --ok-1: #3fdca9;      /* vert succès, haut */
  --ok-2: #10b981;      /* vert succès, bas */
}
```

La taille du cercle correspond à la hauteur du bouton (`48px`) : si tu changes `height`, modifie aussi la largeur et le `border-radius` des états `.busy` et `.ok`.

## Accessibilité

- Les animations sont désactivées pour les personnes qui ont demandé moins de mouvement dans leur système (`prefers-reduced-motion`).
- Le bouton ne peut pas être relancé pendant l'animation.

## Licence

À compléter selon ton choix (par exemple MIT).
