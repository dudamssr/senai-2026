const API = 'http://localhost:3000'

const pagina = window.location.pathname

if(pagina.includes('eventos.html') || pagina.endsWith('/')){

  function carregar(){
    fetch(API + '/eventos')
    .then(r => r.json())
    .then(eventos => {
      const lista = document.getElementById('lista')
      if(!lista) return

      lista.innerHTML = ''

      eventos.forEach(e => {
        lista.innerHTML += `
          <div class="card">
            <h3>${e.nome}</h3>
            <p>${e.data}</p>

            <button onclick="ver(${e.id})">Ver</button>
            <button onclick="excluir(${e.id})">Excluir</button>
          </div>
        `
      })
    })
  }

  function ver(id){
    window.location = `detalhes.html?id=${id}`
  }

  function excluir(id){
    fetch(API + '/eventos/' + id, { method: 'DELETE' })
    .then(() => carregar())
  }

  function abrirModal(){
    document.getElementById('modal').style.display = 'flex'
  }

  function fecharModal(){
    document.getElementById('modal').style.display = 'none'
  }

  function salvar(){
    const nome = document.getElementById('nome').value
    const data = document.getElementById('data').value

    fetch(API + '/eventos', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ nome, data })
    })
    .then(() => {
      fecharModal()
      carregar()
    })
  }

  carregar()

  // deixa funções globais (importante pro onclick)
  window.ver = ver
  window.excluir = excluir
  window.abrirModal = abrirModal
  window.fecharModal = fecharModal
  window.salvar = salvar
}

// ================= DETALHES =================
if(pagina.includes('detalhes.html')){

  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')

  function carregarEvento(){
    fetch(API + '/eventos/' + id)
    .then(r => r.json())
    .then(e => {
      document.getElementById('titulo').innerText = e.nome
    })
  }

  function enviarImagem(){
    const file = document.getElementById('arquivo').files[0]

    const formData = new FormData()
    formData.append('imagem', file)

    fetch(API + `/eventos/${id}/imagens`, {
      method: 'POST',
      body: formData
    })
    .then(() => carregarImagens())
  }

  function carregarImagens(){
    fetch(API + `/eventos/${id}/imagens`)
    .then(r => r.json())
    .then(imagens => {
      const galeria = document.getElementById('galeria')

      galeria.innerHTML = ''

      imagens.forEach(img => {
        galeria.innerHTML += `
          <div class="card">
            <img src="${img.url}">
          </div>
        `
      })
    })
  }

  carregarEvento()
  carregarImagens()

  window.enviarImagem = enviarImagem
}