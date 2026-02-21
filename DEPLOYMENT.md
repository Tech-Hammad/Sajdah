# GitHub Pages Deployment Guide

This guide will help you deploy the Sajdah Islamic App to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Git installed on your machine
3. Node.js and npm installed

## Step 1: Update Repository Name

Before deploying, make sure your GitHub repository is named exactly **"Sajdah"** (case-sensitive). If it's different, either:
- Rename your repository to "Sajdah", OR
- Update the `base` field in `vite.config.js` and `basename` in `src/App.jsx` to match your repository name

## Step 2: Update Homepage in package.json

1. Open `package.json`
2. Replace `YOUR_USERNAME` in the homepage field with your actual GitHub username:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/Sajdah"
   ```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Build the Project

```bash
npm run build
```

This will create a `dist` folder with the production-ready files.

## Step 5: Deploy to GitHub Pages

### Option A: Using npm script (Recommended)

```bash
npm run deploy
```

This will:
1. Build the project (`predeploy` script)
2. Deploy to the `gh-pages` branch using `gh-pages` package

### Option B: Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Install gh-pages globally (if not already installed):
   ```bash
   npm install -g gh-pages
   ```

3. Deploy:
   ```bash
   gh-pages -d dist
   ```

## Step 6: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Select **gh-pages** branch
6. Select **/ (root)** folder
7. Click **Save**

## Step 7: Access Your Site

After a few minutes, your site will be available at:
```
https://YOUR_USERNAME.github.io/Sajdah
```

## Troubleshooting

### Routes not working (404 errors)

- Make sure `404.html` is in the root of your repository
- Ensure `.nojekyll` file exists in the root
- Verify that `basename="/Sajdah"` in `src/App.jsx` matches your repository name

### Assets not loading

- Check that `base: "/Sajdah/"` in `vite.config.js` matches your repository name
- Ensure all asset paths are relative or use the base path

### Build errors

- Run `npm run lint` to check for linting errors
- Make sure all dependencies are installed: `npm install`
- Check Node.js version compatibility

### Deployment errors

- Ensure you have write access to the repository
- Check that `gh-pages` package is installed: `npm list gh-pages`
- Try deleting the `gh-pages` branch and redeploying

## Updating Your Site

To update your deployed site:

1. Make your changes
2. Commit and push to your main branch
3. Run `npm run deploy` again

The changes will be reflected on GitHub Pages within a few minutes.

## Important Notes

- The repository name **must** match the base path in `vite.config.js` and `basename` in `App.jsx`
- Always test locally with `npm run preview` before deploying
- The `404.html` file is crucial for React Router to work correctly on GitHub Pages
- The `.nojekyll` file prevents GitHub from processing the site with Jekyll

## File Structure for Deployment

```
Sajdah/
├── .nojekyll          # Prevents Jekyll processing
├── 404.html           # SPA routing fallback
├── dist/              # Build output (generated)
├── index.html         # Main HTML file
├── package.json       # Contains homepage and deploy scripts
├── vite.config.js     # Contains base path configuration
└── src/
    └── App.jsx        # Contains basename configuration
```

## Support

If you encounter any issues, check:
1. GitHub Pages documentation: https://docs.github.com/en/pages
2. React Router documentation: https://reactrouter.com/
3. Vite documentation: https://vitejs.dev/
