const Authentication = require('./controllers/auth');
const passportConfig = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
    app.get('/', requireAuth, function(requ, res){
        res.send({ hi:'there'});
    })

    app.post('/signin', requireSignin, Authentication.signin)
    app.post('/signup', Authentication.signup)
}