l = console.log
const array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

const wolfPromis = (param) => {
  return new Promise((res) => {
    let array2 = ['apple']
    setTimeout(() => {
      array1.forEach((post) => {
        array2.push(post)

        res(array2)
      })
    }, Math.random() * 1000)
  })
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//


const main = async () => {

  const proimse5 = await wolfPromis()

  l(proimse5)
}

main()
