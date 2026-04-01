/**
 * Unsplash image configuration — centralised metadata for all Unsplash imagery.
 * Images are used under the Unsplash License (free for commercial use, attribution appreciated).
 *
 * To swap an image: update the URL and credit fields below.
 * Use ?w= and &q= URL params to request only the resolution/quality needed.
 */

export const UNSPLASH_IMAGES = {
  loginBackground: {
    // Macro honeycomb by Bianca Ackermann
    url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1200&q=75&auto=format&fit=crop',
    // Fallback gradient if image fails to load
    fallback: 'linear-gradient(135deg, #1a1a1a 0%, #121212 100%)',
    credit: {
      photographer: 'Bianca Ackermann',
      profileUrl: 'https://unsplash.com/@biancablah',
      photoId: 'photo-1558642452-9d2a7deb7f62',
    },
  },
};
