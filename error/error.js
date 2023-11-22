module.exports = (fn)=>{
    return async (req, res, next) => {
        try{
            fn(req, res)
        }catch(err){
            return next(err)
        }
}