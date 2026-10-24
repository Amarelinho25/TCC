const requicao = await fetch("https://jojos-bizarre-api.netlify.app/api/v1/characters")
const body = await requicao.text()
console.log(body)