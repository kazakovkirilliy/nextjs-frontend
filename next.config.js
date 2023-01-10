const {PHASE_DEVELOPMENT_SERVER} = require('next/constants')

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      images: {
        domains: ['images.unsplash.com', 'dummyimage.com', 'res.cloudinary.com', 'api.mapbox.com'],
      },
      env: {
        MAPBOX_USER: '',
        MAPBOX_STYLE:'',
        CLOUDINARY_CLOUD_NAME:'',
        MAPS: '',
        BACKEND_URL_HTTP:'',
        BACKEND_URL_WS:'',
      },
    }
  }
  
  return {
    images: {
      domains: ['res.cloudinary.com', 'api.mapbox.com'],
    },
    env: {
      MAPBOX_USER: '',
      MAPBOX_STYLE:'',
      CLOUDINARY_CLOUD_NAME:'',
      MAPS: '',
      BACKEND_URL_HTTP:'',
      BACKEND_URL_WS:'',
    },
  }
}
