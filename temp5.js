l = console.log
const array1 = [
  { fName: 'wolf', lName: 'bergin' },
  { fName: 'kimbo', lName: 'jojo' },
]

function getPosts() {
    return new Promise((res, rej) => {
  let output = ``
  let array2 = ['apple']
  setTimeout(() => {
    array1.forEach((post) => {
      l('loop')
      array2.push(post.fName)
      output += post.fName + '\n'
    })
      // console.log(output)
  }, 500)
  res(array2)
})
}

const createPosts = (post) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      array1.push(post)
      const error = false
      error && rej('something went wrong')

      res()
    }, 1000)
  })
}








//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
async function init() {
    const proimse1 = Promise.resolve('hello world')
const proimse2 = 10
const proimse3 = new Promise((res, rej) => {
  setTimeout(res, 2000, 'goodbye')
})

    const proimse4 = fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((data) => data[1].name)

    await createPosts({ fName: 'bobo2', lName: 'bobo2' })
    
    const proimse5 = await getPosts()
    l(proimse5)
  Promise.all([proimse1, proimse2, proimse3, proimse4, proimse5]).then(
    (values) => l(values)
  )
}

init()
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
