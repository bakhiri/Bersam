# Site BERSAM

Site statique déployé sur Cloudflare Pages/Workers.

## Déploiement

### Prérequis

- Node.js installé (pour utiliser Wrangler)
- Compte Cloudflare configuré

### Instructions de déploiement

1. Installer Wrangler (si ce n'est pas déjà fait) :
   ```bash
   npm install -g wrangler
   ```
   
   Ou utiliser npx (recommandé) :
   ```bash
   npx wrangler deploy
   ```

2. Se connecter à Cloudflare (première fois uniquement) :
   ```bash
   npx wrangler login
   ```

3. Déployer le site :
   ```bash
   npx wrangler deploy
   ```

Le site sera déployé et vous obtiendrez une URL Cloudflare.

## Structure du projet

- `index.html` : Fichier principal du site
- `photos/` : Dossier contenant les images et logos
- `wrangler.json` : Configuration Cloudflare Workers/Pages

## Notes

- Le site est un site statique (HTML/CSS/JS)
- Aucune dépendance npm n'est nécessaire pour le fonctionnement du site
- Tailwind CSS est chargé via CDN
- React est chargé via CDN

