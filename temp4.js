const array = [
    { fName: 'wolf', lName: 'bergin' },
    { fName: 'kimbo', lName: 'jojo' },
  ]
  
  function getPosts() {
    setTimeout(() => {
      let output = ``
      array.forEach((post, index) => {
        output += post.fName + '\n'
      })
      console.log(output)
    }, 1000)
  }
  
  
  const createPosts = async (post, cB) =>{
    const wolf = await  function(){
      return new Promise(res=>{
          setTimeout(()=>{
          array.push(post)
          res()
      }, 6000)
          
         
      })}().then(()=>cB())
  
    
  
      
      
  }
  
  
  
  
  
  
  createPosts({fName: 'bobo', lName: 'bobo'}, getPosts)
  
  