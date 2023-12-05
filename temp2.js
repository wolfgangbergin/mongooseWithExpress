
const arr = [1,2,3,4,5,6,7,8,9,0]


const wolfPromis = (param)=>{
  return new Promise((res)=>{
    setTimeout(() => {
       console.log(param)
       res() 
    }, Math.random() * 1000);
  })
}


const main = async()=>{

    await Promise.all(
        arr.map(async(data)=>{
            await  wolfPromis(data)
        })
    )

    console.log('done')

}


main()