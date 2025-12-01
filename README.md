# Month-2-project

Simple front-end To-Do app with a login flow backed by an API.

**Project Summary**

- This is a small web app consisting of a login page and a to-do page. The front-end uses plain HTML, CSS and JavaScript. The app authenticates users via a remote API(xano) and stores an auth token and user id in `localStorage` so the user can access `toDo.html` after login.

**Files**

- `index.html` — (placeholder / entry) HTML file
- `index.css` — project styles
- `index.js` — global scripts (if used)
- `login.html` — login page markup
- `login.js` — login page logic (sends credentials to API, stores token)
- `toDo.html` — to-do list page markup
- `toDo.js` — to-do page logic

**Tools & Technologies Used**

- HTML, CSS, JavaScript (vanilla)
- Fetch API for network requests
- `localStorage` for storing `token` and `userid`
- Remote backend API (Xano) — endpoint used in `login.js`

**How it works (brief)**

- The login form sends a POST request to an authentication endpoint (see `login.js`).
- On successful login the response provides an auth token and user id which are stored in `localStorage` under the keys `token` and `userid`.
- After storing those values the code redirects the user to `toDo.html`.

**How to run locally**

Option A — Open in browser (quick):
- Double-click `login.html` (or open it in your browser) and use the UI.

Option B — Simple local server (recommended to avoid CORS/files issues):
- From the project root open a terminal (bash) and run:

```bash
python -m http.server 8000
```

- Then open `http://localhost:8000/login.html` in your browser.

**Usage**

- Open `login.html` and enter your email and password.
- On success the app will store `token` and `userid` in `localStorage` and redirect to `toDo.html`.
- Inspect `localStorage` (browser devtools → Application) to view saved keys.

**Important notes & troubleshooting**

- API endpoint: `login.js` currently uses `https://x8ki-letl-twmt.n7.xano.io/api:r-Xv20fU/auth/login`. If you have a different backend or API key, update the `apiUrl` variable in `login.js`.
- Console logs: `login.js` logs email and password values and prints API responses; check the browser console for errors.
- If the page doesn't redirect after login, open devtools → Network and Console to inspect the API response.
- If you run into CORS or file-serving problems, use the local server option above.

**Where the auth is stored**

- `localStorage.setItem('token', results.authToken)`
- `localStorage.setItem('userid', results.user_id)`

**Next suggestions (optional)**

- Add input validation and password masking feedback.
- Securely handle tokens (consider short-lived tokens, refresh tokens, or server-side sessions).
- Add UI for logout that clears `localStorage` keys.

**License**

- No license specified. Feel free to add one if needed.
