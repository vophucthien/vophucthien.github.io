
  # Online Movie Review System

  This is a code bundle for Online Movie Review System. The original project is available at https://www.figma.com/design/lChXz9vB5wvxBwWZDxVJGb/Online-Movie-Review-System.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Deployment (GitHub Pages)

This repository now ships with a `Deploy site` workflow (`.github/workflows/deploy.yml`). Pushes to `main` (or a manual workflow dispatch) will:

1. Install dependencies with Node 20.
2. Build the Vite app via `npm run build` (output goes to the `build/` directory).
3. Upload the static bundle and deploy it to GitHub Pages.

To activate it the first time:

1. Go to **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Trigger the workflow (push to `main` or use **Run workflow**).

After the workflow succeeds, the live site serves the compiled bundle instead of the raw Vite source, so the page will render correctly on `https://<username>.github.io`.
  
