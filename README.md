# Afterhours Gaming Club

Afterhours Gaming Club is a responsive gaming parlor website where visitors can explore gaming zones, get game-night suggestions based on their available time, and create an account that remembers their favourite game.

## Features

- Explore the **PC Arena**, **Console Lounge**, and **Arcade Corner**.
- Get session suggestions for 30 minutes, 1 hour, or 2 hours of play.
- Register and log in with email and password using Supabase Auth.
- Choose a favourite game during registration and see it below the header after login.
- Log out through **My account**.

## Run locally in VS Code

1. Clone or download this repository.
2. Open the folder containing `index.html` in VS Code.
3. Install the **Live Server** extension by Ritwick Dey.
4. Right-click `index.html` and select **Open with Live Server**.

The site uses HTML, CSS, and vanilla JavaScript. The Supabase JavaScript client is bundled with the project, so you can run it without installing npm packages.

## Configure Supabase

To connect your own Supabase project:

1. Enable the **Email** provider and allow new sign-ups in Supabase Authentication.
2. Copy your **Project URL** and **publishable key** from the project’s **Connect** dialog into `config.js`.

   ```javascript
   window.afterhoursConfig = {
     projectUrl: 'https://YOUR_PROJECT_REF.supabase.co',
     publishableKey: 'sb_publishable_YOUR_KEY'
   };
   ```

   This file is visible to browsers. Keep secret and `service_role` keys private.

3. Open **Authentication → URL Configuration**. Set **Site URL** to your deployed website address.
4. Under **Redirect URLs**, add the exact page addresses where you run the app. For local testing, copy the URL from your browser after starting Live Server, including the port and `/index.html` if present.

## Test registration and login

1. Choose **Register / Login → Create an account**.
2. Enter your email address, password, and favourite game.
3. If email confirmation is enabled, open the confirmation link in your inbox.
4. Log in and check that your favourite game appears below the header.
5. Select **My account → Log out** to end the session on this device.

The app stores the favourite game in Supabase Auth user metadata, so this feature works without a separate database table.

## Troubleshooting email confirmation

If a confirmation link opens `localhost` and the browser shows **Connection refused**, try logging in on the deployed website. Your email may already be confirmed. Check that **Site URL** points to the deployed site and that **Redirect URLs** includes the page where you registered. For a local return address, keep Live Server running while opening the email. [Supabase redirect URL guide](https://supabase.com/docs/guides/auth/redirect-urls)

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Page layout, styles, gaming zones, and session suggestions |
| `auth.js` | Registration, login, logout, and favourite-game display |
| `config.js` | Supabase project URL and browser publishable key |
| `supabase.js` | Bundled Supabase JavaScript client |
| `arena.jpg` | Homepage background image |
