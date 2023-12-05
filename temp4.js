l = console.log
const array1 = [
  { fName: 'wolf', lName: 'bergin' },
  { fName: 'kimbo', lName: 'jojo' },
]

function getPosts() {
  let output = ``
  let array2 = []
  setTimeout(() => {
   
    array1.forEach((post, index) => {
      array2.push(post.fName)
      output += post.fName + '\n'
    })
    console.log(output)
   
  }, 500)
  return array2
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

const proimse1 = Promise.resolve('hello world')
const proimse2 = 10
const proimse3 = new Promise((res, rej) => {
  setTimeout(res, 2000, 'goodbye')
})

const proimse4 = fetch('https://jsonplaceholder.typicode.com/users')
  .then((res) => res.json())
  .then((data) => data[1].name)





const proimse5 = createPosts({ fName: 'bobo', lName: 'bobo' }).then(() => getPosts())
.catch((err) => l(err))

Promise.all([proimse1, proimse2, proimse3, proimse4, proimse5]).then((values) =>
  l(values)
)