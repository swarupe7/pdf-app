const exp=require('express')
const path=require('path')
const app=exp();
const multer=require('multer')
const upload=multer({dest:'uploads/'})
const {mergePDF}=require('./merge');
app.use('/static',exp.static('public'))



const port=3303;
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"templates/index.html"))
})

app.post('/merge',upload.array('pdfs',2),async(req,res,next)=>{
    console.log(req.files)
    let d =await mergePDF(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
    res.redirect(`http://localhost:3303/static/${d}.pdf`);
})
app.listen(port,()=>{
    console.log(`this is running on ${port}`);
});