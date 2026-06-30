# Deployment Guide - Battleship Game

## Quick Deployment with GitHub Pages

Since npm/Vercel/Netlify CLIs are not available, GitHub Pages is the easiest and free option for deployment.

### Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Repository name: `battleship-game`
3. Description: `A modern Battleship game with AI opponent`
4. Make it **Public** (required for GitHub Pages)
5. Click "Create repository"

### Step 2: Push Your Code to GitHub

Run these commands in your terminal from the battleship-game directory:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/battleship-game.git

# Rename branch to main (GitHub's default)
git branch -M main

# Push your code
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Click on **Pages** in the left sidebar
4. Under "Build and deployment":
   - Source: select "Deploy from a branch"
   - Branch: select `main` and folder `/ (root)`
5. Click **Save**

### Step 4: Access Your Game

After 1-2 minutes, your game will be available at:
```
https://YOUR_USERNAME.github.io/battleship-game
```

You'll see the deployment status in the Pages settings.

## Alternative: Netlify Drop (No CLI Required)

If you prefer Netlify:

1. Go to https://app.netlify.com/drop
2. Drag and drop the entire `battleship-game` folder onto the page
3. Wait for deployment (usually takes 30 seconds)
4. Netlify will provide you with a public URL

## Alternative: Surge.sh (Requires npm)

If you can install npm later:
```bash
npm install -g surge
cd /Users/harrisonkahn/CascadeProjects/battleship-game
surge
```

## Verification

After deployment, verify:
- [ ] Game loads in browser
- [ ] Ship placement works
- [ ] AI attacks function correctly
- [ ] Responsive design works on mobile
- [ ] Game can be restarted

## Troubleshooting

### GitHub Pages not updating
- Check the Actions tab for deployment errors
- Ensure your repository is public
- Wait 2-3 minutes for deployment to complete

### Netlify Drop issues
- Ensure you're dragging the folder containing index.html
- Check browser console for errors
- Try refreshing the deployment page

### Game not loading
- Check browser console for JavaScript errors
- Ensure all files (index.html, styles.css, game.js) are uploaded
- Verify file paths in HTML are correct

## Post-Deployment

Once deployed, you can:
1. Share the URL with friends
2. Add a "Deployed" badge to your README
3. Update the deployment URL in documentation
