const formulario_inscricao = document.querySelector(".formulario_inscricao");

var dados;
var nome_usuario;

function carregar_usuario_logado(){
    for(var i = 0; i < localStorage.length; i++){
        let nome = localStorage.key(i);
        let acesso_permitido = JSON.parse(localStorage.getItem(nome)).acesso;

        if(acesso_permitido == 1){
            nome_usuario = nome;
            dados = JSON.parse(localStorage.getItem(nome));
        }
    }
    console.log(`login: ${nome_usuario} // `, dados);
}
carregar_usuario_logado();

//Essa função faz o logout
function ir_tela_login(){
    dados.acesso = 0;
    localStorage.setItem(nome_usuario, JSON.stringify(dados));
    window.location.href = "index.html";
}
//validação do nome
//auto formatação do nome completo
document.querySelector("#entrada_nome").addEventListener('input', function(event){
    let nome = event.target.value;
    nome = nome
        .replace(/\d/g,"") //tirando qualquer numero
        .toUpperCase() // deixando tudo maiusculo
    event.target.value = nome;
});
//validação da data de nascimento
//auto formatação de 00/00/0000
document.querySelector("#entrada_data").addEventListener("input", function(event){
    let data = event.target.value;
    data = data.replace(/\D/g,"");
    data = data.replace(/(\d{2})(\d{2})(\d{4})/,"$1/$2/$3");

    event.target.value = data;

    if(data.length != 10){
        document.querySelector("#validar_data").style.opacity = 1;
    }     else{
        document.querySelector("#validar_data").style.opacity = 0;
    }
});
//validação do cpf
//auto formatação de 000.000.000-00
document.querySelector("#entrada_cpf").addEventListener('input', function(event){
    let cpf = event.target.value;
    //tirando qualquer caracter que não é numero
    cpf = cpf.replace(/\D/g, "");
    //formatando no padrão 000.000.000-00
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,"$1.$2.$3-$4");
    //colocando o formato dentro do input
    event.target.value = cpf;

    if(cpf.length != 14){
        document.querySelector("#validar_cpf").style.opacity = 1;
    }     else{
        document.querySelector("#validar_cpf").style.opacity = 0;
    }
});
//validação do email
document.querySelector("#entrada_email").addEventListener("input", function(event){
    let email = event.target.value;

    if(email.includes("@gmail.com") || email.includes("@email.com")){
        document.querySelector("#validar_email").style.opacity = 0;
    }
    else{
        document.querySelector("#validar_email").style.opacity = 1;
    }
});
//validar o telefone
document.querySelector("#entrada_telefone").addEventListener("input",function(event){
    let telefone = event.target.value;

    telefone = telefone.replace(/\D/g,"");
    telefone = telefone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/,"($1) $2 $3-$4");

    event.target.value = telefone;

    if(telefone.length != 16){
        document.querySelector("#validar_telefone").style.opacity = 1;
    }     else{
        document.querySelector("#validar_telefone").style.opacity = 0;
    }
});
//validação ao anexar a identidade

//fizemos essa função, pois usaremos ela novamente para o anexo do comprovante de residencia
function validar_anexo(identificador, texto_visual){
    document.querySelector(`#${identificador}`).addEventListener("change", function(event){
        let identidade = event.target.files[0];
        let confirmar_anexo_texto = document.querySelector(`#${texto_visual}`);
        
        if(identidade){
            confirmar_anexo_texto.style.width = "300px";
            confirmar_anexo_texto.innerHTML = identidade.name;
        }
    });
}
validar_anexo("anexar_identidade", "confirmar_anexo_texto_identidade");

//validar CEP e preencher automaticamente
/*aqui podemos usar uma api simples que vai 
fornecer os dados de endereço a partir do cep*/

document.querySelector("#entrada_cep").addEventListener("input", buscarEndereco);

function buscarEndereco(event){
    let cep = event.target.value;
    //restringe letras no input
    cep = cep.replace(/\D/g,"");

    if(cep.length < 8){
        document.querySelector("#validar_endereco").style.opacity = 1;
        //os inputs abaixo devem ficar vazios;
        document.querySelector("#entrada_rua").value = "";
        document.querySelector("#entrada_cidade").value = "";
        document.querySelector("#entrada_estado").value = "";
        return;
    }
    event.target.value = cep.replace(/(\d{5})(\d{3})/,"$1-$2");
    //caso o CEP esteja certo, o aviso deve ficar invisível
    document.querySelector("#validar_endereco").style.opacity =  0;

    let url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.erro){
                alert("CEP não encontrado!");
            }
            else{
                document.querySelector("#entrada_rua").value = data.logradouro;
                document.querySelector("#entrada_cidade").value = data.localidade;
                document.querySelector("#entrada_estado").value = data.uf;
            }
        })
        .catch(error => console.error("Erro na requisição:", error));

}
//validação ao anexar o comprovante de residencia
validar_anexo("anexar_comprovante", "confirmar_anexo_texto_endereco");

//colocando o icone não-permitido no cursor 
let confirmar_termos = document.querySelector("#confirmar_termos");
document.querySelector("#butao_finalizar").addEventListener("mouseenter",function(event){
   
    if(!confirmar_termos.checked){
        event.target.style.cursor = "not-allowed";
    }
    else {
        event.target.style.cursor = "pointer";
    }
});

//validando todos os inputs antes de finalizar o formulário
document.querySelector("#butao_finalizar").addEventListener("click", function(event){
    if(confirmar_termos.checked){
        verificar_inputs();
    } else{
        console.log("aceite os termos!");
    }
});
function verificar_inputs(){
    //verificando todos os campos de texto
    var input_text = formulario_inscricao.querySelectorAll('input[type="text"]');
    for(let i = 0; i < input_text.length; i++){
        let input = input_text[i];
        if(input.value == ""){
            input.style.border = "1px solid #E43A12";
            alert(`Insira um(a) ${input.name}`);
            return;
        }
        else if(input.maxLength != -1 && input.value.length != input.maxLength){
            input.style.border = "1px solid #E43A12";
            alert(`Insira um(a) ${input.name}`);
            return
        }
        else{
            input.style.border = "1px solid #D6D3D1";
        }
    }
    //verificando os campos de arquivo
    var input_file = formulario_inscricao.querySelectorAll('input[type="file"]');
    for(let i = 0; i < input_file.length; i++){
        if(input_file[i].files.length == 0){
            alert(`Insira um(a) ${input_file[i].name}`);
            return;
        }
    }
    //verificar a opção de trilha selecionada
    let checado = false;
    var opcao_trilha = formulario_inscricao.querySelectorAll('input[type="radio"]');
    for(let i = 0; i < opcao_trilha.length; i++){
        if(opcao_trilha[i].checked){
            dados.trilha = opcao_trilha[i].value;
            checado = true;
            break;
        }
    }
    if(!checado){
        alert("Selecione uma trilha!");
        return;
    }
    //verificar seleção do gênero
    let genero = formulario_inscricao.querySelector("#sexo").value;
    if(genero == "Selecionar"){
        alert("Insira um(a) gênero!");
        return;
    }
    else{
        dados.genero = genero;
    }
    //caso os inputs estejam preenchidos o algoritmo irá salvar os dados
    salvar_dados();
    alert("Inscrição feita com sucesso! (os dados podem ser alterados)");
}
//resetando todos os inputs
document.querySelector("#butao_cancelar").addEventListener("click", function(event){
    let lista_inputs = formulario_inscricao.querySelectorAll("input");

    lista_inputs.forEach(function(input){
        input.value = "";
        if(input.type == "radio" || input.type == "checkbox"){
            input.checked = false;
        }
    });
    formulario_inscricao.querySelector("#sexo").value = "Selecionar";
});

function salvar_dados(){
    var input_text = formulario_inscricao.querySelectorAll('input[type="text"]');
    let i = 0;
    for(let chave in dados){
        if(chave == "senha") break;
        console.log(`${dados[chave]} recebe ${input_text[i].value}`);
        dados[chave] = input_text[i].value;
        i++;
    }
    localStorage.setItem(nome_usuario, JSON.stringify(dados));
    console.log("dados salvos no localStorage!");
}
function carregar_dados(){
    //carregar as informações dos inputs de texto
    var input_text = formulario_inscricao.querySelectorAll('input[type="text"]');
    let i = 0;
    if(dados.nome != ""){
        for(let chave in dados){
            if(chave == "senha") break;
            input_text[i].value = dados[chave];
            i++;
        }
    }
    else{
        alert("Notamos que você não tem dados salvos!");
    }
    //carregar a seleção de gênero do usuario
    formulario_inscricao.querySelector("#sexo").value = dados.genero;

    //carregar a opção de trilha do usuario
    var opcao_trilha = formulario_inscricao.querySelectorAll('input[type="radio"]');
    for(let i = 0; i < opcao_trilha.length; i++){
        if(opcao_trilha[i].value == dados.trilha){
            opcao_trilha[i].checked = true;
            break;
        }
    }
}
carregar_dados();