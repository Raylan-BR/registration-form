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