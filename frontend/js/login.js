// Precisamos recuperar do localStorage, os usuarios e senhas
//lista de usuarios para validar o login
let lista_usuarios = [];

//função responsavel por carregar os dados do localStorage
function carregar_lista(lista){
    if(localStorage.length == 0){
        console.log(`Não existe dados no localStorage`);
    }
    else{
        for(let i = 0; i < localStorage.length; i++){
            let nome_usuario = localStorage.key(i);
            let senha = localStorage.getItem(nome_usuario);
        
            lista.push({nome_usuario, senha});
        }
        console.log("Lista carregada!");
    }
}
function pesquisarUsuario(nome, lista){
    let referencia = -1;
    for(let i=0;i<lista.length;i++){
        if(lista[i].nome_usuario == nome){
            referencia = i;
            break;
        }
    }
    return referencia;
}
//chamando a função para carregar lista de usuarios
carregar_lista(lista_usuarios);
/*Aqui é importante saber que será uma das funções mais importantes.
 Ela não só irá levar o usuario para a tela do formulário, mas irá validar as informações de usuario como
 nome de usuario e senha  */
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
        let referencia = pesquisarUsuario(nome_usuario, lista_usuarios);
        if(referencia == -1){
            validar_login_texto.innerText = "Nome não existe!";
            validar_login_aviso.style.opacity = 1;
        }
        else{
            if(senha == ""){
                console.log("campo de senha vazio!");
                //validar input da senha
                validar_login_texto.innerText = "Por favor, insira sua senha";
                validar_login_aviso.style.opacity = 1;
            }
            else{
                let referencia = pesquisarUsuario(nome_usuario, lista_usuarios);
                if(lista_usuarios[referencia].senha != senha){
                    validar_login_texto.innerText = "Senha incorreta!";
                    validar_login_aviso.style.opacity = 1;
                }
                else{
                    console.log("conseguimos encontrar seu nome de usuario!");
                    location.href = "formulario.html";
                }
            }
        }
    }
}