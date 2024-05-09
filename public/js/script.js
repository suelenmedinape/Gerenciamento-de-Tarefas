var btnAddTask = document.querySelector('#btn-add-task');
var imgTask = document.querySelector('img#img-add-task');
var result = document.querySelector('div#resultado');
var radioSelect = []; // Adicione esta linha para declarar a variável radioSelect

document.addEventListener('DOMContentLoaded', function() {
    carregarTarefas();
});

/* ESSA FUNÇÃO ESTÁ CRIANDO O FORMULÁRIO DINAMICAMENTE */
function form() {
    // Criar elementos 
    var task = document.createElement('input');

    var des = document.getElementById('h2-add-task');
    des.style.display = 'none';

    task.setAttribute('type', 'text');
    task.setAttribute('id', 'inputAdd');
    
    var btn_add = document.createElement('input');
    btn_add.setAttribute('type', 'button');
    btn_add.setAttribute('value', 'Adicionar');
    btn_add.setAttribute('id', 'btn_add');

    //Label
    var taskLabel = document.createElement('label');
    taskLabel.textContent = 'Descrição';

    var checkCor1Label = document.createElement('label');
    checkCor1Label.textContent = 'Cor';

    // Adicionar elementos ao formulário
    var parent = document.getElementById('formulario');
    parent.appendChild(taskLabel);
    parent.appendChild(task);
    parent.appendChild(checkCor1Label);

    //Criando os 7 radioButton para as cores
    // Array de cores
    var cores = ['#daf5fa', '#d1fecb', '#f6d0f6', '#dcd0f3', '#fcfccb', '#fbd4b4', '#f2f5f7'];

    for (var i = 0; i < 7; i++) {
        var radio = document.createElement('input');
        radio.setAttribute('type', 'radio');
        radio.setAttribute('name', 'grupo1');
        radio.setAttribute('id', 'opcao' + (i + 1));
        radio.classList.add('square-radio');
        radio.style.backgroundColor = cores[i];

        var parent = document.getElementById('formulario');
        parent.appendChild(radio);

        // Adiciona cada botão de rádio ao array radioSelect
        radioSelect.push(radio);
    }
    
    parent.appendChild(btn_add);

    // Esconder o botão de adicionar tarefa
    btnAddTask.style.display = 'none';
    imgTask.style.display = 'none';

    // Vincula as etiquetas (labels) aos elementos de entrada correspondentes
    taskLabel.setAttribute('for', task.id);
    checkCor1Label.setAttribute('for', radio.id);

    var adicionarTask = document.querySelector('input#btn_add');
    adicionarTask.addEventListener('click', adicionarTarefa);
}

/* CRIA O CARD DA TAREFA CRIADA PELO USUARIO */
function criarElementosHTML(textoTarefa, corSelecionada, concluida) {
    // Criar elementos HTML
    var todoList = document.getElementById('todo-tasks');

    var novoItem = document.createElement('li');

    novoItem.classList.add('card');

    var caixa = document.createElement('div');
    caixa.classList.add('card2');

    // Aplicar a cor selecionada ao card
    novoItem.style.backgroundColor = corSelecionada;
    
    var caixaDivCheck = document.createElement('div');
    caixaDivCheck.classList.add('custom-checkbox');

    var inputBox = document.createElement('label');
    inputBox.setAttribute('id', 'meuCheckboxLbl');
    inputBox.setAttribute('for', 'meuCheckBox');
    inputBox.style.backgroundImage = "url('public/assets/unchecked.png')";
     //novoItem.appendChild(inputBox);

    // Cria checkbox para a tarefa
    var checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.id = 'check';
    checkboxInput.classList.add('checkBox');
    checkboxInput.checked = concluida

    // Cria label para o estado da tarefa
    var labelEstado = document.createElement('label');
    labelEstado.setAttribute('for', 'check');
    labelEstado.id = 'lblEstados';
    labelEstado.classList.add('lblEstado');
    labelEstado.textContent = 'Não Concluído';

    var descricaoTarefa = document.createElement('p');
    descricaoTarefa.textContent = textoTarefa;
    descricaoTarefa.classList.add('descricao-tarefa');

    var btnArquivar = document.createElement('button');
    btnArquivar.id = 'btnArquivar';

    var img = document.createElement('img');
    img.setAttribute('id', 'imagem');
    img.id = 'img_arq'
    img.classList.add('img_arquivar');
    img.style.display = 'none'; // Inicialmente, a imagem deve estar oculta

    // Adicionamos o evento de clique na imagem
    img.addEventListener('click', function() {
        // Redireciona o usuário para a página index.html
        window.location.href = 'index.html';
    });

    // Adicionar elementos ao DOM
    inputBox.appendChild(checkboxInput);
    caixaDivCheck.appendChild(inputBox);
    caixa.appendChild(caixaDivCheck);
    caixa.appendChild(labelEstado);
    novoItem.appendChild(caixa);
    novoItem.appendChild(btnArquivar);
    btnArquivar.appendChild(img);
    novoItem.appendChild(descricaoTarefa);
    

    todoList.appendChild(novoItem);
    //Imagem
    img.setAttribute('src', 'public/assets/archive-icon.png');

    //Cor selecionada
    novoItem.classList.add(getCorSelecionada(corSelecionada));

    // Adicionar evento de mudança ao checkbox
    checkboxInput.addEventListener('change', function() {
        if (checkboxInput.checked) {
            labelEstado.innerText = 'Concluído';
            caixa.classList.remove('nao-concluida');
            caixa.classList.add('concluida');           
            descricaoTarefa.style.textDecoration = 'line-through';
            img.style.display = 'block';
            caixa.classList.remove('nao-concluida');
            caixa.classList.add('concluida');
            inputBox.style.backgroundImage = "url('public/assets/checked.png')";
            atualizarTarefaLocalStorege(textoTarefa, corSelecionada, true);
        } else {           
            labelEstado.innerText = 'Não Concluído';           
            descricaoTarefa.style.textDecoration = 'none';
            img.style.display = 'none';
            caixa.classList.remove('concluida');
            caixa.classList.add('nao-concluida');
            inputBox.style.backgroundImage = "url('public/assets/unchecked.png')";
            atualizarTarefaLocalStorege(textoTarefa, corSelecionada, false);
        }
    });

    btnArquivar.addEventListener('click', function() {
        // Remover a tarefa da lista de tarefas atual
        novoItem.remove();
    
        // Atualizar o armazenamento local com as listas de tarefas atualizadas
        enviarTarefa(textoTarefa, corSelecionada,labelEstado);
    
        // Redirecionar o usuário para a página de tarefas arquivadas
        window.location.href = 'index.html';
    });
    
}

function getCorSelecionada(corSelecionada) {
    var classes = ['card-blue', 'card-green', 'card-rosa', 'card-roxo', 'card-amarelo', 'card-laranja', 'card-branco'];
    return classes[corSelecionada];
}

function inputReset(input) {
    input.value = ''
}

function radioFalse() {
    radioSelect.forEach(function(radioButton) {
        radioButton.checked = false; // Define a propriedade checked como false para deselecionar o botão de rádio
    });
}

function getTasks(){
    return document.getElementById('todo-tasks');  
}

function itemExiste(list, text){

    let listItens = list.querySelectorAll('li');

    console.log('List:', list);

    console.log('List Itens:', listItens);

    let arrayResult = Array.from(listItens).some((item) => {

        let descricao = item.querySelector('.descricao-tarefa');
        return descricao && descricao.textContent.trim() === text;
    });
    return arrayResult;
}

function carregarTarefas() {
    var todoList = document.getElementById('todo-tasks');
    todoList.innerHTML = ''; // Limpar a lista antes de carregar as tarefas

    var tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefas.forEach(function(tarefa) {
        criarElementosHTML(tarefa.texto, tarefa.corSelecionada, tarefa.concluida);

        // Recuperar o item de lista da tarefa adicionada
        var items = todoList.getElementsByTagName('li');
        var lastItem = items[items.length - 1]; // Último item adicionado à lista

        // Encontrar o checkbox e a descrição dentro do item de lista
        var checkboxInput = lastItem.querySelector('.checkBox');
        var descricaoTarefa = lastItem.querySelector('p');
        var btnArquivar = lastItem.querySelector('#img_arq');
        var lblEstado = lastItem.querySelector('#lblEstados');
        var caixa = lastItem.querySelector('div');
        var inputBox = lastItem.querySelector('#meuCheckboxLbl');

        // Atualizar o estilo do texto com base no estado de conclusão da tarefa
        if (tarefa.concluida) {
            lblEstado.textContent = 'Concluído';
            lblEstado.style.textDecoration = 'none';
            btnArquivar.style.display = 'block';
            checkboxInput.checked = true;
            descricaoTarefa.style.textDecoration = 'line-through';
            caixa.classList.remove('nao-concluida');
            caixa.classList.add('concluida');
            inputBox.style.backgroundImage = "url('public/assets/checked.png')";
        } else {
            lblEstado.textContent = 'Não Concluído';
            btnArquivar.style.display = 'none';
            lblEstado.style.textDecoration = 'none';
            checkboxInput.checked = false;
            descricaoTarefa.style.textDecoration = 'none';
            caixa.classList.remove('concluida');
            caixa.classList.add('nao-concluida');
            inputBox.style.backgroundImage = "url('public/assets/unchecked.png')";
        }
    });
}

function atualizarTarefaLocalStorege(textoTarefa, corSelecionada, concluida) {
    // Recuperar as tarefas existentes do localStorage
    var tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    // Encontrar a tarefa correspondente no array de tarefas
    var tarefaIndex = tarefas.findIndex(function(tarefa) {
        return tarefa.texto === textoTarefa && tarefa.corSelecionada === corSelecionada;
    });

    // Atualizar o estado da tarefa (concluída ou não)
    if (tarefaIndex !== -1) {
        tarefas[tarefaIndex].concluida = concluida;

        // Salvar as tarefas atualizadas no armazenamento local
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        console.log("Tarefa atualizada no armazenamento local:", tarefas[tarefaIndex]);
    } else {
        console.log("Tarefa não encontrada no armazenamento local");
    }
}


function enviarTarefa(textoTarefa, corSelecionada, concluida) {
    // Recuperar as tarefas existentes do localStorage
    var tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    var tarefasArquivadas = JSON.parse(localStorage.getItem('tarefasArquivadas')) || [];

    // Remover a tarefa da lista de tarefas atual
    tarefas = tarefas.filter(function(tarefa) {
        return tarefa.texto !== textoTarefa;
    });

    if (concluida) {
        // Adicionar a tarefa à lista de tarefas arquivadas com o estado de conclusão marcado como verdadeiro
        tarefasArquivadas.push({
            texto: textoTarefa,
            corSelecionada: corSelecionada,
            concluida: true
        });
    } else {
        // Adicionar a tarefa à lista de tarefas com o estado de conclusão marcado como falso
        tarefas.push({
            texto: textoTarefa,
            corSelecionada: corSelecionada,
            concluida: false
        });
    }

    console.log("Tarefas atualizadas:", tarefas); // Adicionando um log para verificar as tarefas atualizadas
    console.log("Tarefas arquivadas atualizadas:", tarefasArquivadas); // Adicionando um log para verificar as tarefas arquivadas atualizadas

    // Salvar as listas atualizadas de tarefas no armazenamento local
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    localStorage.setItem('tarefasArquivadas', JSON.stringify(tarefasArquivadas));
}


function criarTarefaArquivada(textoTarefa, corSelecionada) {
    // Array de cores
    var cores = ['#daf5fa', '#d1fecb', '#f6d0f6', '#dcd0f3', '#fcfccb', '#fbd4b4', '#f2f5f7'];

    // Criar elementos HTML para a tarefa arquivada
    var tarefaArquivada = document.createElement('div');
    tarefaArquivada.classList.add('card-arquivada');
    tarefaArquivada.style.backgroundColor = cores[corSelecionada]; // Aplicar cor selecionada

    var textoTarefaArquivada = document.createElement('div');
    textoTarefaArquivada.textContent = textoTarefa;

    // Adicionar elementos ao DOM na página de tarefas arquivadas
    var parent = document.getElementById('tarefas-arquivadas');
    tarefaArquivada.appendChild(textoTarefaArquivada);
    parent.appendChild(tarefaArquivada);
}

function adicionarTarefa() {

    var inputTask = document.querySelector('input#inputAdd');

    var text = inputTask.value.trim();

    let toTasks = getTasks();

    if (text === '') {
        alert('Forneça uma descrição');
        return;
    }else if(itemExiste(toTasks,text)){
        alert('Esta tarefa ja existe');
        return;
    }else{
        var corSelecionada = -1;

        for (let i = 0; i < radioSelect.length; i++) {
            if (radioSelect[i].checked) {
                corSelecionada = i;
                break;
        }
    }

        if (corSelecionada === -1) {
            alert('Selecione uma cor');
            return;
        }
    }

    // Criar elementos HTML para exibir a nova tarefa na página principal
    criarElementosHTML(text, corSelecionada, false); // Passar false para indicar que a tarefa não está concluída

    // Salvar a tarefa no localStorage
    var tarefa = {
        texto: text,
        corSelecionada: corSelecionada,
        concluida: false // As tarefas adicionadas inicialmente não estão concluídas
    };

    // Recuperar as tarefas existentes do localStorage
    var tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    // Adicionar a nova tarefa à lista de tarefas
    tarefas.push(tarefa);

    // Salvar a lista atualizada de tarefas de volta no localStorage
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    // Limpar o campo de entrada após adicionar a tarefa
    inputTask.value = '';
    radioFalse()
}

btnAddTask.addEventListener('click', form);