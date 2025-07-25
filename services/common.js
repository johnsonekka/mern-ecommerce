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

  // TODO: this is temporary token for testing without cookie
  // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjkxZjEzNDdiZmJjZDhhMzM2ODgxMyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzExOTk5NzM0fQ.eRuhMDv68f3pV2LtYu5zxMRm96dR8XLiBwvRF3uDo_4"


  return token;

};
