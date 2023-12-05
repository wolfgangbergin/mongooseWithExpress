const array = [
  { fName: 'wolf', lName: 'bergin' },
  { fName: 'kimbo', lName: 'jojo' },
]

function getPosts() {
  setTimeout(() => {
    let output = ``
    array.forEach((post, index) => {
      output += post.fName + ' '
    })
    console.log(output)
  }, 1000)
}

getPosts()