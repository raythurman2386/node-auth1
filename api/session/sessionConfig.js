const sessionConfig = {
  name: 'something catchy',
  secret: 'do not set here',
  cookie: {
    maxAge: 1000 * 300,
    secure: false, // Needs to be true in production!!!!!!
    httpOnly: true // Should always be set to true
  },
  resave: false,
  saveUninitialized: false, // GOVT Regulation states this needs to be false, client must agree for GDDR Compliance
}

export default sessionConfig;