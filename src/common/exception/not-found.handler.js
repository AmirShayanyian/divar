function NotFoundHandler(app){
    app.use((req,res,next)=>{
        res.status(404).send({
            status:404,type:'Not Found',
            message:`Not found route ${req.url}`
        })
    })
}