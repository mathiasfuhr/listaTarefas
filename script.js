let contador = 0;
let input = document.getElementById("inputTarefa");
let btnAdd = document.getElementById("btn-add");
let main = document.getElementById("areaLista");

// Carregar itens salvos no armazenamento local ao carregar a página
window.onload = function () {
  loadSavedItems();
};

function addTarefa() {
  //PEGAR VALOR DIGITADO NO INPUT
  let valorInput = input.value;

  //SE NÃO FOR VAZIO, NEM NULO, NEM INDEFINIDO
  if (valorInput !== "" && valorInput !== null && valorInput !== undefined) {
    ++contador;

    let novoItem = `<div id="${contador}" class="item">
    <div class="item-icone" onclick = "marcarTarefa(${contador})">
        <i id="icone_${contador}" class="bi bi-circle"></i>
    </div>
    <div class="item-nome" onclick = "marcarTarefa(${contador})">
        ${valorInput}
    </div>
    <div class="item-botao">
        <button class="delete" onclick="deletar(${contador})"><i class="bi bi-trash"></i> Deletar</button>
    </div>
  </div>`;

    //adicionar novo item no main
    main.innerHTML += novoItem;

    // Salvar o HTML do main no armazenamento local
    saveItemsToLocalstorage();

    //zera os campos
    input.value = "";
    input.focus();
  }
}

function deletar(id) {
  let tarefa = document.getElementById(id);
  tarefa.remove();

  // Salvar o HTML do main no armazenamento local após a remoção
  saveItemsToLocalstorage();
}

function marcarTarefa(id) {
  let item = document.getElementById(id);
  let classe = item.getAttribute("class");

  if (classe == "item") {
    item.classList.add("clicado");
    let icone = document.getElementById("icone_" + id);
    icone.classList.remove("bi-circle");
    icone.classList.add("bi-circle-fill");

    item.parentNode.appendChild(item);
  } else {
    item.classList.remove("clicado");
    let icone = document.getElementById("icone_" + id);
    icone.classList.add("bi-circle");
    icone.classList.remove("bi-circle-fill");
  }

  // Salvar o HTML do main no armazenamento local após a marcação
  saveItemsToLocalstorage();
}

function saveItemsToLocalstorage() {
  // Salvar o HTML atual do main no armazenamento local
  localStorage.setItem("mainContent", main.innerHTML);
}

function loadSavedItems() {
  // Carregar o HTML salvo no armazenamento local e definir no main
  main.innerHTML = localStorage.getItem("mainContent") || "";
}

input.addEventListener("keyup", (event) => {
  // Se a tecla pressionada for ENTER (código 'Enter' é 'Enter')
  if (event.key === "Enter") {
    event.preventDefault();
    btnAdd.click();
  }
});
