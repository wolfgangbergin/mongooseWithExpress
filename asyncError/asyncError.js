module.exports = (fn)=>{
    return async (req, res, next) => {
        try{
          await  fn(req, res, true)
        }catch(err){
            return next(err)
        }
}}
