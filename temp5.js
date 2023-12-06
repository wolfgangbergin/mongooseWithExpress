const { get } = require('mongoose')

l = console.log
const array1 = [
  { fName: 'wolf', lName: 'bergin' },
  { fName: 'kimbo', lName: 'jojo' },
]

function getPosts() {
  return new Promise((res) => {
    let output = ``
    let array2 = ['apple']
    setTimeout(() => {
      array1.forEach((post) => {
        l('loop')
        array2.push(post.fName)
        output += post.fName + '\n'
        res(array2)
      })
      // console.log(output)
    }, 500)
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
    setTimeout(res, 20, 'goodbye')
  })

  const temp1 = await fetch(
    'https://jsonplaceholder.typicode.com/users'
  )
  const temp2 = await temp1.json()
  const proimse4 = temp2[2].name

  await createPosts({ fName: 'bobo2', lName: 'bobo2' })

  const proimse5 = await getPosts()

  l(proimse5)

  const Result = await Promise.all([
    proimse1,
    proimse2,
    proimse3,
    proimse4,
    proimse5,
  ])
  l(Result)
}

init()
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
