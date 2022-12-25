import { Router } from "express";
import ScoreCard from "../models/ScoreCard";
const router = Router();
console.log(":::::")
// let record=[];
// router.delete("/cards", ...);
// router.post("/card", ...);
// router.get("/cards", …);
router.post('/card', (req, res) => {
    console.log(req.body.name);
    console.log(req.body.subject);
    console.log(req.body.score);
    saveUser(req.body.name, req.body.subject,req.body.score,req,res);
})
router.delete('/cards', (req, res) => {
    deleteDB();
		res.json({message:"Database cleared"})
})
router.get("/cards", (req, res) => {
    console.log(req.query.type)
    console.log(req.query.queryString)
    FindQuery(req.query.type,req.query.queryString,req,res)
});
const FindQuery = async (QueryType, QueryString,req,res) => {
    //console.log("QueryType=",QueryType)
    if(QueryType == 'subject'){
        try {
				let aa = []
        const result = await ScoreCard.find({ subject : QueryString });
				if (result.length>0){ //有找到
					for (var i=0; i<result.length; i++) {
						aa.push(`Found card with subject (${result[i]['name']},${result[i]['subject']},${result[i]['score']})`);
					}
					res.json({messages: aa ,message:"addddd"})
				}else{//沒找到
					let my_messeage = `subject(${QueryString}) not Found`;
					res.json({messages: false ,message:my_messeage})
					console.log(my_messeage)
				}
        }catch (e) { 
					throw new Error("subject" + QueryString +  "not found "); 
			}         
    }else{
			try {
				let aa = []
        const result = await ScoreCard.find({ name : QueryString });
				if (result.length>0){ //有找到
					for (var i=0; i<result.length; i++) {
						aa.push(`Found card with name (${result[i]['name']},${result[i]['subject']},${result[i]['score']})`);
					}
					res.json({messages: aa ,message:"addddd"})
				}else{//沒找到
					let my_messeage = `name(${QueryString}) not Found`;
					res.json({messages: false ,message:my_messeage})
					console.log(my_messeage)
				}
        }catch (e) { 
					throw new Error("Name" + QueryString +  "not found "); 
			}         
    }
}
const saveUser = async (name, subject,score,req,res) => {
    const existing = await ScoreCard.findOne({ name, subject });
    if (existing){
        // throw new Error(`data ${name} exists!!`);
        let aa = 'Update' + `(${req.body.name},${req.body.subject},${req.body.score})`
        res.json({message:aa,card:"addddd"})
        await ScoreCard.findOneAndUpdate({ name, subject },{ score:score });
    }else{
        try {
        const newUser = new ScoreCard({ name, subject,score });
        console.log("Created user", newUser);
        let aa = 'Adding' + `(${req.body.name},${req.body.subject},${req.body.score})`
        res.json({message:aa,card:"addddd"})
        return newUser.save();
        } catch (e) { throw new Error("User creation error: " + e); }        
    }

};
const deleteDB = async () => {
    try {
    await ScoreCard.deleteMany({});
    console.log("Database deleted");
    } catch (e) { throw new Error("Database deletion failed"); }
};
export default router;