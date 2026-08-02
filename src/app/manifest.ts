import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mohd Aasim - Portfolio & Services',
    short_name: 'Mohd Aasim',
    description: 'Video Editor, Motion Designer & Graphic Designer — portfolio and services.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/md-red-logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
