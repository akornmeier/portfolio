export default defineAppConfig({
  global: {
    picture1: {
      dark: '/assets/img/tk-001.jpg',
      light: '/assets/img/tk-001.jpg',
      alt: 'Tony Kornmeier',
    },
    picture2: {
      dark: '/assets/img/tk-002.jpg',
      light: '/assets/img/tk-002.jpg',
      alt: 'Tony Kornmeier',
    },
    picture3: {
      dark: '/assets/img/tk-002.jpg',
      light: '/assets/img/tk-002.jpg',
      alt: 'Tony Kornmeier',
    },
    meetingLink: 'https://cal.com/',
    email: 'tony@kornmeier.me',
    github: 'https://github.com/akornmeier',
    available: true,
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral',
    },
    pageHero: {
      slots: {
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted',
      },
    },
  },
  footer: {
    credits: `Built with ❤️ in Ohio • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/akornmeier',
        target: '_blank',
        'aria-label': 'Tony Kornmeier on GitHub',
      },
      {
        icon: 'i-simple-icons-linkedin',
        to: 'https://www.linkedin.com/in/tonykornmeier/',
        target: '_blank',
        'aria-label': 'Tony Kornmeier on LinkedIn',
      },
    ],
  },
})
