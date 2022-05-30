const router = require("express").Router();
const { Post,  User, Comment} = require("../../models")

router.get("/", async(req, res)=>{
    try {
        const postData = await Post.findAll({
            include:[{
                model: User, attributes:['username']
            }, {model: Comment}]
        });
        res.status(200).json(postData);
    } catch(err) {
        res.status(500).json(err)
    }
});

router.post("/", async (req, res)=>{
    try{
        const postData = await Post.create(
            {
                title: req.body.title,
                content: req.body.content,
                post_date: Date.now(),
                user_id: req.body.user_id
            });
        res.status(200).json(postData)
    }catch  (err){ res.status(500).json(err)}
})

router.put(":id", async (req, res)=>{
    try{
        const  postData = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
                user_id: req.body.user_id
            },
            {
            where:{
                id: req.params.id
            }
        }
        );
        if(!postData){
            res.status(404).json({message: "no post found"})
            return
        }
        res.status(200).json(postData)
    }catch (err){ res.status(500).json(err)}
});

router.delete("/id", async(req, res)=>{
    try{
        const postData = await Post.destroy({
            where:{
                id: req.params.id
            },
        })
        if (!postData){
            res.status(404).json({ message: "no post found"})
            return;
        }
        res.status(200).json(postData)
    } catch (err){res.status(500).json(err)}
})

module.exports = router;