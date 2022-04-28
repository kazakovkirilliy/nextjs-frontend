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
        MAPS: 'pk.eyJ1Ijoia2F6YWtvdmtpcmlsbGl5IiwiYSI6ImNsMWV6aXc2YTBueG8zaWxubmwxb3V0N3QifQ.bjZkUjBK0K1qfY-63VpWIg',
        BACKEND_URL_HTTP:'http://localhost:4000/graphql',
        BACKEND_URL_WS:'ws://localhost:4000/graphql',
      },
    }
  }
  
  return {
    images: {
      domains: ['res.cloudinary.com', 'api.mapbox.com'],
    },
    env: {
      MAPBOX_USER: 'kazakovkirilliy',
      MAPBOX_STYLE:'cl1ezg2vy003l15qsx7o78fjp',
      CLOUDINARY_CLOUD_NAME:'djwbrzqjm',
      MAPS: 'pk.eyJ1Ijoia2F6YWtvdmtpcmlsbGl5IiwiYSI6ImNsMWV6aXc2YTBueG8zaWxubmwxb3V0N3QifQ.bjZkUjBK0K1qfY-63VpWIg',
      BACKEND_URL_HTTP:'https://potkame.herokuapp.com/graphql',
      BACKEND_URL_WS:'wss://potkame.herokuapp.com/graphql',
    },
  }
}
