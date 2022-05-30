const router = require('express').Router();
const {User} = require('../../models');

//create new user
router.post('/', async (req, res)=>{
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        req.session.save(()=>{
            req.session.loggedIn = true;
            res.status(200).json({
                user: dbUserData,
                message: "you are now logged in"
            });
        });
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});

//log in
router.post('/login', async (req,res)=>{
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if(!dbUserData){
        res.status(400).json({message: 'Please enter an email'});
        return
        }
        const validPassword = await dbUserData.checkPassword(req.body.password);

        if(!validPassword){
            res.status(400).json({message: 'incorrect password'})
            return
        }
        let requestUser = dbUserData.dataValues.username

        req.session.save(()=>{
            req.session.loggedIn = true;
            req.session.username = requestUser;

            res.status(200).json(dbUserData)
        })
    } catch(err){
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res)=>{
    if(req.session.loggedIn){
        req.session.destroy(()=>{
            res.status(200).end();
        });
    } else {
        res.status(404).end()
    }
});

module.exports = router;