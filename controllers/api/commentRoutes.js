const router = require("express").Router();
const { Comment } = require("../../models");

router.get("/", async(req, res)=>{
    try {
        const postData = await Post.findAll();
        res.status(200).json(postData);
    } catch(err) {
        res.status(500).json(err)
    }
});

router.post("/", async (req, res) => {
    router.post("/", async (req, res)=>{
        try{
            const postData = await Post.create(
                {
                    title: req.body.title,
                    content: req.body.content,
                    starting_date: Date.now(),
                    user_id: req.body.user_id,
                    post_id: req.body.post_id
                });
            res.status(200).json(postData)
        }catch  (err){ res.status(500).json(err)}
    })
});

module.exports = router;