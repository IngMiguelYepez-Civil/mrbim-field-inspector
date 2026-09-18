import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MrBIM Field Inspector',
    short_name: 'MrBIM Inspector',
    description: 'Inspección BIM móvil, revisión de modelos y registro de incidencias en obra.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#111827',
    orientation: 'any',
    lang: 'es',
    categories: ['business', 'productivity', 'utilities'],
    icons: [
      {
        src: '/icons/mrbim-icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icons/mrbim-maskable.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  }
}
