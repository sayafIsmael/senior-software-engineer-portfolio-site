/**
 * Edit this file to personalize the portfolio.
 * Avatar: public/images/portfolio-avatar.png
 * Videos: paste full YouTube watch/share URLs below.
 */
export const site = {
  name: 'Abu Sayaf',
  role: 'Senior Software Engineer',
  experienceYears: 10,
  avatar: {
    src: '/images/portfolio-avatar.png',
    alt: 'Portrait of Abu Sayaf, Senior Software Engineer',
  },
  headline: 'I design architecture that turns complexity into scalable, secure, reliable products.',
  intro: 'System design, product engineering, cloud delivery, cybersecurity, and AI-assisted execution — with clarity, judgment, and ownership.',
  experienceStatement: 'Designing resilient, efficient, AI-integrated systems built to scale, stay secure, and perform in production.',
  description: 'Abu Sayaf is a senior full-stack software engineer with 10 years of experience in software architecture, distributed systems, security-aware engineering, and production delivery.',
  links: {
    email: '', // e.g. hello@your-domain.com
    github: '', // e.g. https://github.com/your-handle
    linkedin: '', // e.g. https://www.linkedin.com/in/your-handle/
    upwork: 'https://www.upwork.com/freelancers/~016c0b856d16bae9fa', // paste your real Upwork profile URL
    youtube: '', // paste your real YouTube channel URL
    calendly: 'https://calendly.com/sayaf',
    automation: 'https://inbox.bajutech.com/',
    ecommerce: 'https://commerce.bajutech.com/',
  },
  booking: {
    label: 'Book a meeting',
    duration: '30 min',
    blurb: 'Architecture review, discovery call, or collaboration kickoff.',
  },
  upwork: {
    formerlyTopRated: true,
    totalEarned: '$40k+', // supplied by the portfolio owner
  },
  showVideos: false, // Set to true whenever ready to show engineering videos section
  showNotes: false, // Set to true whenever ready to show engineering notes section
  videos: [
    { title: 'System design in practice', subject: 'Architecture · decision-making', url: '' },
    { title: 'Building reliable systems', subject: 'Engineering · operations', url: '' },
    { title: 'AI in real engineering workflows', subject: 'AI · verification · delivery', url: '' },
  ],
} as const;

export type SocialName = keyof typeof site.links;

/** Extract a YouTube video id from common URL formats. */
export function youtubeId(url: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.replace('/', '').trim();
      return id || null;
    }
    if (parsed.hostname.includes('youtube.com')) {
      const v = parsed.searchParams.get('v');
      if (v) return v;
      const parts = parsed.pathname.split('/').filter(Boolean);
      const embedIndex = parts.findIndex((part) => part === 'embed' || part === 'shorts' || part === 'live');
      if (embedIndex >= 0 && parts[embedIndex + 1]) return parts[embedIndex + 1];
    }
  } catch {
    return null;
  }
  return null;
}
