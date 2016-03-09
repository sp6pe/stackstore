var authenticator = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
           return next();
        } else {
           return res.send(401);
        }
    },

    ensureAdmin: function(req, res, next) {
    // ensure authenticated user exists with admin role, 
    // otherwise send 401 response status
        if (req.user && req.user.isAdmin == true) {
            return next();
        } else {
            return res.send(401);
        }
    }
  
}

module.exports = authenticator;