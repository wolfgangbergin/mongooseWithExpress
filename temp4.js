l = console.log
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
   
  }, 500)
  return 'wolfman'
}

const createPosts = (post) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      array.push(post)
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


// Promise.all([proimse1, proimse2, proimse3, proimse4]).then((values) =>
//   l(values)
// )


createPosts({ fName: 'bobo', lName: 'bobo' }).then(() => l(getPosts()))
.catch((err) => l(err))
