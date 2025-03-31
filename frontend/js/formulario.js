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
document.querySelector("#anexar_identidade").addEventListener("change", function(event){
    let identidade = event.target.files[0];
    let confirmar_anexo_texto = document.querySelector("#confirmar_anexo_texto");
    
    if(identidade){
        confirmar_anexo_texto.style.width = "300px";
        confirmar_anexo_texto.innerHTML = identidade.name;
    }
});

