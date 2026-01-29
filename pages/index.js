import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setMessage('✓ Thanks! Check your email for updates.');
        setEmail('');
      } else {
        setMessage(data.message || 'Something went wrong. Try again.');
      }
    } catch (err) {
      setMessage('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Dupe Snacks — Coming Soon</title>
        <meta name="description" content="Find gluten-free snack alternatives you'll actually crave. Coming soon." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <div className={styles.content}>
          {/* Header */}
          <header className={styles.header}>
            <h1 className={styles.logo}>
              <span className={styles.dupe}>Dupe</span>
              <span className={styles.snacks}>Snacks</span>
            </h1>
            <p className={styles.tagline}>
              Love Cheetos? Can't eat gluten? We found something better.
            </p>
          </header>

          {/* Hero Section */}
          <section className={styles.hero}>
            <div className={styles.heroContent}>
              <h2>Snacks You Actually Miss</h2>
              <p>
                Discover gluten-free alternatives to your favorite snacks. Real products. Real reviews. Real craving satisfaction.
              </p>
              <ul className={styles.features}>
                <li>🍿 Hundreds of GF snack alternatives</li>
                <li>⭐ Real reviews from real people</li>
                <li>🛒 Buy directly on Amazon</li>
                <li>💜 Built for Gen Z celiacs</li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <section className={styles.cta}>
            <h3>Get early access. It's coming soon.</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className={styles.input}
              />
              <button 
                type="submit" 
                disabled={loading}
                className={styles.button}
              >
                {loading ? 'Subscribing...' : 'Notify Me'}
              </button>
            </form>
            {message && (
              <p className={`${styles.message} ${success ? styles.success : styles.error}`}>
                {message}
              </p>
            )}
          </section>

          {/* Footer */}
          <footer className={styles.footer}>
            <p>© 2026 Dupe Snacks. All rights reserved.</p>
            <div className={styles.socials}>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
            </div>
          </footer>
        </div>

        {/* Decorative Elements */}
        <div className={styles.glow1}></div>
        <div className={styles.glow2}></div>
      </main>
    </>
  );
}
