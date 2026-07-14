# Ibrahim Nouradine — Site vitrine

Site vitrine institutionnel d'Ibrahim Nouradine — Directeur du développement commercial,
formateur et consultant (cabinet **WIN Solutions**). Le site sert de vitrine d'expertise et
de canal d'acquisition de prospects (conseil, formation, conférences).

Site 100% statique — HTML / CSS / JS, aucune dépendance de build, aucun framework.

## Structure

```
├── index.html              # page d'accueil (one-pager)
├── interventions.html      # portfolio conférences & formations
├── css/
│   └── style.css           # design system, animations, responsive
├── js/
│   └── main.js             # menu mobile, compteurs animés, reveal au scroll, spotlight
└── assets/
    ├── img/
    │   ├── ibrahim-photo.jpg
    │   ├── pattern.svg     # motif géométrique de la charte
    │   └── logos/          # logos "Ils m'ont fait confiance"
```

## Aperçu en local

Ouvrir simplement `index.html` dans un navigateur, ou lancer un petit serveur local :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## À faire avant mise en production

- [ ] Remplacer les logos-témoins dans `assets/img/logos/` par les vrais logos clients
      (mêmes noms de fichiers → aucune modification de code nécessaire)
- [ ] Remplacer le lien Calendly placeholder (`https://calendly.com/VOTRE-LIEN-ICI/decouverte`)
      dans `index.html` et `interventions.html`
- [ ] Remplacer les témoignages placeholder (section Témoignages, `index.html`)
- [ ] Vérifier le numéro WhatsApp / téléphone affiché

## Déploiement

Le site étant 100% statique, il peut être hébergé gratuitement sur **GitHub Pages**,
Netlify ou Vercel — sans étape de build.
