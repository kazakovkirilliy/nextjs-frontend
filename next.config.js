const {PHASE_DEVELOPMENT_SERVER} = require('next/constants')

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      images: {
        domains: ['images.unsplash.com', 'dummyimage.com', 'res.cloudinary.com', 'api.mapbox.com'],
      },
      env: {
        MAPBOX_USER: 'kazakovkirilliy',
        MAPBOX_STYLE:'cl1ezg2vy003l15qsx7o78fjp',
        CLOUDINARY_CLOUD_NAME:'djwbrzqjm',
        MAPS: 'pk.eyJ1Ijoia2F6YWtvdmtpcmlsbGl5IiwiYSI6ImNsMWV6aXc2YTBueG8zaWxubmwxb3V0N3QifQ.bjZkUjBK0K1qfY-63VpWIg'
      },
    }
  }
  
  return {
    env: {
      MAPBOX_USER: 'kazakovkirilliy',
      MAPBOX_STYLE:'cl1ezg2vy003l15qsx7o78fjp',
      CLOUDINARY_CLOUD_NAME:'djwbrzqjm',
      MAPS: 'pk.eyJ1Ijoia2F6YWtvdmtpcmlsbGl5IiwiYSI6ImNsMWV6aXc2YTBueG8zaWxubmwxb3V0N3QifQ.bjZkUjBK0K1qfY-63VpWIg'
    },
  }
}
