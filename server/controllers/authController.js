// ---- SET COOKIE 
// use res.cookie
// middleware to invoke upon successful posts
// - set the key to pass with a value of the password sent in the body of the post request to /new

module.exports = (req, res, next) => {
  const { password } = req.body;  
  res.coookie('passwordCheck', {pass: } )
}
