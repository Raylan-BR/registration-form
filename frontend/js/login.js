var dados;

function ir_tela_formulario(){
    var nome_usuario = document.getElementById("nome_usuario").value;
    var senha = document.getElementById("senha").value;
    var validar_login_aviso = document.getElementById("validar_login");
    var validar_login_texto = document.getElementById("texto_login");

    //validar o usuario
    if(nome_usuario ==""){
        console.log("campo de nome vazio!");
        //validar input do nome de usuario
        validar_login_texto.innerText = "Por favor, insira seu nome!";
        validar_login_aviso.style.opacity = 1;
    }
    else{
        if(localStorage.getItem(nome_usuario) == null){
            validar_login_texto.innerText = "Nome não existe!";
            validar_login_aviso.style.opacity = 1;
        }
        else{
            dados =  JSON.parse(localStorage.getItem(nome_usuario));
            if(senha == ""){
                console.log("campo de senha vazio!");
                //validar input da senha
                validar_login_texto.innerText = "Por favor, insira sua senha";
                validar_login_aviso.style.opacity = 1;
            }
            else{
                if(dados.senha != senha){
                    validar_login_texto.innerText = "Senha incorreta!";
                    validar_login_aviso.style.opacity = 1;
                }
                else{
                    dados.acesso = 1;
                    localStorage.setItem(nome_usuario, JSON.stringify(dados));
                    console.log("conseguimos encontrar seu nome de usuario!");
                    location.href = "formulario.html";
                }
            }
        }
    }
}