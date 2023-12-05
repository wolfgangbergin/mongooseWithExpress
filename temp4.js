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





// createPosts({ fName: 'bobo', lName: 'bobo' }).then((data) => getPosts(data))
// .catch((err) => l(err))
