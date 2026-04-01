/**
 * Unsplash image configuration — centralised metadata for all Unsplash imagery.
 * Images are used under the Unsplash License (free for commercial use, attribution appreciated).
 *
 * To swap an image: update the URL and credit fields below.
 * Use ?w= and &q= URL params to request only the resolution/quality needed.
 */

export const UNSPLASH_IMAGES = {
  loginBackground: {
    // Close-up honey bee on flower by Dmitry Grigoriev
    url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1200&q=75&auto=format&fit=crop',
    // Fallback: try alternate bee photo, then gradient
    urls: [
      'https://images.unsplash.com/photo-1568526381923-caf3fd520382?w=1200&q=75&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580748142698-e09206bb4c73?w=1200&q=75&auto=format&fit=crop',
    ],
    fallback: 'linear-gradient(135deg, #1a1a1a 0%, #121212 100%)',
    credit: {
      photographer: 'Dmitry Grigoriev / Annie Spratt',
      profileUrl: 'https://unsplash.com/@grigorievphoto',
      photoIds: ['photo-1568526381923-caf3fd520382', 'photo-1580748142698-e09206bb4c73'],
    },
  },
};
