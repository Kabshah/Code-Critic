const aiServices = require('../services/ai.services')
// for get method use query
module.exports.getResponse = async(req,res) => {
    // const prompt = req.query.prompt;
    const code = req.body.code;
    if(!code){
        return res.status(400).json({error:"Prompt is required"})
    }
    const response = await aiServices(code)
    res.send(response)
}