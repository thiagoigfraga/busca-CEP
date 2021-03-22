const campo = document.querySelector('#app input')
const btn = document.querySelector('#app button')
const main = document.querySelector('#app main');

function createLine(text) {
  var line = document.createElement('p');
  var text = document.createTextNode(text)
  line.appendChild(text);
  main.appendChild(line);
}



function getCEP(event) {
  event.preventDefault();
  let cep = campo.value;
  cep = cep.replace(' ', '').replace(".", '').replace('-', '').trim();
  
  axios.get(`https://viacep.com.br/ws/${cep}/json/`)

    .then(function (response) {
      if (response.data.hasOwnProperty('erro')) {
        main.innerHTML = '';
        createLine('Não existe')
      } else {

        main.innerHTML = '';
        createLine(`${response.data.localidade}/${response.data.uf}`);
        createLine(response.data.logradouro);
        createLine(response.data.bairro);

      }
    })
    .catch(function () {
      main.innerHTML = '';
      campo.value = 'Erro!';
    })

}

btn.addEventListener('click', getCEP);
