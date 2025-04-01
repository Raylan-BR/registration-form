function ir_tela_login(){
    window.location.href = "login.html";
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

/*Nessa função é possivel controlar o fluxo de funcionamento 
dos inputs files atraves do id e do parágrafo para confirmação*/
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
const formulario_inscricao = document.querySelector(".formulario_inscricao");

document.querySelector("#butao_finalizar").addEventListener("click", function(event){
    if(confirmar_termos.checked){
        campoVazio(formulario_inscricao);
    } else{
        console.log("aceite os termos!");
    }
});
function campoVazio(conteudo_pai){
    //percorrer os inputs das informações do participante
    let formulario_participante = conteudo_pai.querySelector(".formulario_participante");
    lista = formulario_participante.querySelectorAll("input");

    for(let i = 0; i < lista.length; i++){
        let input = lista[i];
        if(input.value.trim() == ""){
            input.style.border = "1px solid #E43A12";
            alert(`Insira um(a) ${input.name}`);
            return;
        }
        else{
            input.style.border = "1px solid #D6D3D1";
        }
    }
    console.log("percorreu informações do participante");
    //percorrer os inputs das informações de endereço
    let formulario_endereco = conteudo_pai.querySelector(".formulario_endereco");
    lista = formulario_endereco.querySelectorAll("input");

    for(let i = 0; i < lista.length; i++){
        let input = lista[i];
        if(input.value.trim() == ""){
            input.style.border = "1px solid #E43A12";
            alert(`Insira um(a) ${input.name}`);
            return;
        }
        else{
            input.style.border = "1px solid #D6D3D1";
        }
    }
    console.log("percorreu informações de endereço");
    //percorrer as opções de trilha
    let formulario_trilhas = formulario_inscricao.querySelector(".formulario_trilhas");
    lista = formulario_trilhas.querySelectorAll("input");

    let checado = false;
    for(let i = 0; i < lista.length; i++){
        if(lista[i].checked){
            checado = true;
        }
    }
    if(!checado){
        alert("Selecione uma trilha!");
        return;
    }
    console.log("percorreu opções da trilha");
    alert("Sua inscrição foi feita com sucesso!");
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
});