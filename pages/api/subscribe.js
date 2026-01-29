import axios from 'axios';

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const MAILCHIMP_SERVER = process.env.MAILCHIMP_SERVER || 'us18';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  // Validate email
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Please provide a valid email.' });
  }

  // Validate env vars
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID) {
    console.error('Missing Mailchimp credentials');
    return res.status(500).json({ message: 'Server configuration error.' });
  }

  try {
    const url = `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;

    // Hash email for Mailchimp
    const crypto = require('crypto');
    const emailHash = crypto
      .createHash('md5')
      .update(email.toLowerCase())
      .digest('hex');

    // Check if member already exists
    try {
      const existing = await axios.get(`${url}/${emailHash}`, {
        auth: {
          username: 'anystring',
          password: MAILCHIMP_API_KEY,
        },
      });

      if (existing.data.status === 'subscribed') {
        return res.status(200).json({ 
          message: '✓ You\'re already on the list!' 
        });
      }
    } catch (err) {
      // Member doesn't exist, continue
    }

    // Subscribe user
    const response = await axios.post(url, {
      email_address: email,
      status: 'pending',
      tags: ['landing-page'],
    }, {
      auth: {
        username: 'anystring',
        password: MAILCHIMP_API_KEY,
      },
    });

    return res.status(200).json({
      message: 'Success',
      email: response.data.email_address,
    });
  } catch (error) {
    console.error('Mailchimp error:', error.response?.data || error.message);

    // User already subscribed
    if (error.response?.status === 400 && error.response?.data?.title === 'Member Exists') {
      return res.status(200).json({ 
        message: '✓ You\'re already on the list!' 
      });
    }

    return res.status(500).json({
      message: 'Failed to subscribe. Please try again.',
    });
  }
}
