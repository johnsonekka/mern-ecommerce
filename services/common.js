const passport = require("passport")

exports.isAuth = (req, res, done) => {
  return passport.authenticate('jwt');
}

exports.sanitizeUser = (user)=>{
  return {id: user.id, role:user.role}
}

exports.cookieExtractor = function(req) {
  let token = null;
  if (req && req.cookies) {
      token = req.cookies['jwt'];
  }
  //TODO: this is temporary token for testing without cookie
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmJjMGE0MDAwZTFmMzQwNjM3ZjAwNCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMDk5Nzc3NH0.6lch9gHrJQMx-7bMFiWA0tUIqEqQEw1j45tZl8WKKzc"
  return token;
};
