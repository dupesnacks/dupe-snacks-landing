# Dupe Snacks Landing Page

A modern, dark-themed landing page for Dupe Snacks—find gluten-free snack alternatives you'll actually crave.

## Features

- 🎨 Dark theme with teal & purple accents matching the app brand
- 📧 Email signup integration with Mailchimp
- 📱 Fully responsive design
- ⚡ Built with Next.js and deployed on Vercel
- 🎯 Optimized for conversion

## Setup

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment variables:**
   Copy `.env.example` to `.env.local` and fill in your Mailchimp credentials:
   ```bash
   MAILCHIMP_API_KEY=your-api-key
   MAILCHIMP_AUDIENCE_ID=your-audience-id
   MAILCHIMP_SERVER=us18
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   Navigate to `http://localhost:3000`

### Deployment

The app is automatically deployed to Vercel on every push to main.

**To set up environment variables in Vercel:**
1. Go to your Vercel project settings
2. Add the following environment variables:
   - `MAILCHIMP_API_KEY`
   - `MAILCHIMP_AUDIENCE_ID`
   - `MAILCHIMP_SERVER`

## File Structure

```
dupe-snacks-landing/
├── pages/
│   ├── _app.js              # Next.js app wrapper
│   ├── index.js             # Landing page
│   └── api/
│       └── subscribe.js     # Mailchimp subscription API
├── styles/
│   ├── globals.css          # Global styles
│   └── Home.module.css      # Home page styles
├── public/                  # Static assets
├── .env.example             # Environment variable template
├── .env.local               # Local environment (git ignored)
├── package.json
└── next.config.js
```

## Configuration

### Mailchimp Setup

1. Get your API key: `mailchimp.com/account/api`
2. Get your audience ID: 
   - Go to your audience
   - Settings → Audience name and defaults
   - Look for "Audience ID"
3. Extract server code from API key (e.g., `us18` from `key-us18`)

## Styling

Colors used throughout:
- **Primary Background:** `#0f0f1e` to `#1a1a2e`
- **Teal Accent:** `#00b4a6` (buttons, highlights)
- **Purple Accent:** `#6b4ce6` (CTAs, borders)
- **Text:** `#e0e0e0` (main), `#aaa` (secondary)

## API Endpoints

### POST /api/subscribe

Subscribe user to Mailchimp list.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Success",
  "email": "user@example.com"
}
```

## Troubleshooting

**"Mailchimp error: 400 Member Exists"**
- The email is already subscribed. This is handled gracefully in the API.

**Form not submitting**
- Check that environment variables are set correctly in Vercel
- Verify Mailchimp API key and audience ID are correct
- Check browser console for error messages

## License

Proprietary. All rights reserved © 2026 Dupe Snacks.
