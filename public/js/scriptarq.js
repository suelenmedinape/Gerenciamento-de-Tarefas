// Pega a tarefa no Local Storage
var tarefaArquivada = localStorage.getItem('tarefa');
var corSelecionada = localStorage.getItem('corSelecionada');

console.log('a cor é',tarefaArquivada);

document.addEventListener('DOMContentLoaded', function() {
    carregarTarefasArquivadas();
});

var classes = ['card-blue', 'card-green', 'card-rosa', 'card-roxo', 'card-amarelo', 'card-laranja', 'card-branco'];

if (tarefaArquivada && corSelecionada !== null) {
    // Exibir a tarefa na tela de arquivadas
    criarTarefaArquivada(tarefaArquivada, corSelecionada);
}

function carregarTarefasArquivadas() {
    var tarefasArquivadas = JSON.parse(localStorage.getItem('tarefasArquivadas')) || [];
    console.log("Tarefas carregadas:", tarefasArquivadas);
    tarefasArquivadas.forEach(function(tarefaArquivada) {
        criarTarefaArquivada(tarefaArquivada.texto, tarefaArquivada.corSelecionada);

    });
}

function removerTarefaArquivada(textoTarefa) {
    var tarefasArquivadas = JSON.parse(localStorage.getItem('tarefasArquivadas')) || [];

    // Filtrar a tarefa que deve ser removida
    tarefasArquivadas = tarefasArquivadas.filter(function(tarefa) {
        return tarefa.texto !== textoTarefa;
    });

    // Salvar a lista atualizada de tarefas arquivadas de volta no localStorage
    localStorage.setItem('tarefasArquivadas', JSON.stringify(tarefasArquivadas));
}

function criarTarefaArquivada(textoTarefa, corSelecionada) {
    // Criar elementos HTML para a tarefa arquivada
    var resultadoDiv = document.getElementById('tarefas-arquivadas');

    var cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    var card2Div = document.createElement('div');
    card2Div.classList.add('card2');

    var inputBox = document.createElement('label')
    inputBox.setAttribute('id', 'checkboxlbl')
    inputBox.setAttribute('for', 'meucheckbox')

    // Adicionar a imagem do checkbox
    var imgCheckbox = document.createElement('img');
    imgCheckbox.src = "public/assets/checked.png";
    imgCheckbox.classList.add('checkmark-img'); // Se precisar estilizar a imagem

    // Adicionar a imagem como filho do inputBox (label)
    inputBox.appendChild(imgCheckbox);

    var checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.id = 'check';
    checkboxInput.classList.add('checkBox');
    checkboxInput.checked = true;
    checkboxInput.disabled = true;
    // Checkbox sempre marcado para tarefas arquivadas

    var labelEstado = document.createElement('label');
    labelEstado.setAttribute('for', 'check')
    labelEstado.id = 'lblEstado'
    labelEstado.classList.add('lblEstado');
    labelEstado.textContent = 'Concluído'; // As tarefas arquivadas sempre estarão concluídas

    var btnExcluir = document.createElement('button');
    btnExcluir.id = 'btnExcluir';

    var img = document.createElement('img');
    img.setAttribute('id', 'imagem');
    img.id = 'img_excluir';
    img.classList.add('img_excluir');
    img.style.display = 'block'; // Inicialmente, a imagem deve estar visível

    // Adicionamos o evento de exclusão na imagem
    img.addEventListener('click', function() {
        // Remover o elemento HTML correspondente da tela
        cardDiv.remove();
        removerTarefaArquivada(textoTarefa);
        // Remover a tarefa do armazenamento local
    });

    // Texto digitado pelo usuário
    var inputText = document.createElement('div');
    inputText.textContent = textoTarefa;
    inputText.style.textDecoration = 'line-through';
    inputText.classList.add('descricao-tarefa');
    // Adicionando o texto da tarefa ao campo de texto

    // Adicionar elementos ao DOM
    card2Div.appendChild(inputBox); // Adicionar o inputBox com a imagem do checkbox
    card2Div.appendChild(labelEstado);
    cardDiv.appendChild(card2Div);
    btnExcluir.appendChild(img);
    cardDiv.appendChild(btnExcluir);
    cardDiv.appendChild(inputText); // Adiciona o texto digitado pelo usuário dentro do card,
    btnExcluir.appendChild(img);
    resultadoDiv.appendChild(cardDiv);

    img.setAttribute('src', 'public/assets/trash-icon.png')

    // Aplicar classe correspondente à cor selecionada
    if (corSelecionada >= 0 && corSelecionada < classes.length) {
        cardDiv.classList.add(classes[corSelecionada]);
    } else {
        console.error('Índice de cor selecionada inválido:', corSelecionada);
    }

    // Adicionar classe para indicar que a tarefa está arquivada
    card2Div.classList.add('concluida');
}

