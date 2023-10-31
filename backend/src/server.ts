import express from "express";
import cors from "cors";
import { sample_foods, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken";


const app = express();
app.use(express.json());

//أعطينا الفرونت الصلاحية
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}))


app.get("/api/foods/getAllfoods",(req,res)=>{
    res.send(sample_foods);
})


app.get("/api/foods/search/:searchTerm",(req,res)=>{
    const searchTerm = req.params.searchTerm;
    const foods = sample_foods.filter(food=> food.name.toLocaleLowerCase().
    includes(searchTerm.toLocaleLowerCase()));
    res.send(foods);
})


app.get("/api/foods/getAllTags", (req,res)=>{
    res.send(sample_tags);
})

app.get("/api/foods/getAllFoodsByTag/:tagTerm",(req,res)=>{
    const tagTerm = req.params.tagTerm;
    const foodsTag = sample_foods.filter(food=> food.tags.includes(tagTerm));
    res.send(foodsTag)
    
})

app.get("/api/foods/getFoodById/:foodId",(req,res)=>{
    const foodId = req.params.foodId;
    const food = sample_foods.find(food=> food.id == foodId);
    res.send(food);
})

app.post("/api/users/login",(req,res)=>{

    //هذي الطريقة الأولى 
    // const body = req.body;
    // const user = sample_users.find(user=> user.email == body.email && user.password=== body.password)

    // The seconed way which called Destructruing Assignment
    const {email,password} = req.body;
    const user = sample_users.find(user=> user.email === email && user.password=== password)

    if(user){
        res.send(generateTokenResponse(user))
    }
    else{
        res.status(400).send("User name or passwored is not valid!")
    }
})


const generateTokenResponse = (user:any)=>{
    const token = jwt.sign({
        email: user.email, isAdmin:user.isAdmin
    }, "SomeRandomText",{
        expiresIn:"30d"
    })

    user.token = token;
    return user

}
 

const port = 5000;
//will call when the listing is fisish
app.listen(port, ()=>{
    console.log("Hello from the other side");
    console.log("yaaaai!!! backend is working now");
})
