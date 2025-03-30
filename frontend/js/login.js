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
//função responsável por mostrar no console a lista de usuarios
function ver_lista(lista){
    if(lista.length > 0){
        for(let i=0; i < lista.length; i++){
            console.log(lista[i].nome_usuario);
        }
    }
    else{
        console.log("Nenhum usuário foi carregado!");
    }
}
function pesquisarUsuario(nome, senha, lista){
    let verificador = 0;
    for(let i=0;i<lista.length;i++){
        if(lista[i].nome_usuario == nome){
            if(lista[i].senha == senha){
                verificador = 1;
                console.log("usuario existe!");
                break;
            }
            else{
                console.log("senha incorreta!");
            }
        }
    }
    if(verificador == 0){
        console.log("usuario não existe!");
    }
    return verificador;
}
//chamando a função para carregar lista de usuarios
carregar_lista(lista_usuarios);
ver_lista(lista_usuarios);
/*Aqui é importante saber que será uma das funções mais importantes.
 Ela não só irá levar o usuario para a tela do formulário, mas irá validar as informações de usuario como
 nome de usuario e senha  */
function ir_tela_formulario(){
    var nome_usuario = document.getElementById("nome_usuario").value;
    var senha = document.getElementById("senha").value;
    var validar_login_aviso = document.getElementById("validar_login");

    //validar os campos
    if(nome_usuario ==""){
        console.log("campo de nome vazio!");
        //validar input do nome de usuario
        document.getElementById("texto_login").innerText = "Por favor, insira seu nome!";
        validar_login_aviso.style.opacity = 1;
    }
    else if(senha == ""){
        console.log("campo de senha vazio!");
        //validar input da senha
        document.getElementById("texto_login").innerText = "Por favor, insira sua senha";
        validar_login_aviso.style.opacity = 1;
    }
    else{
        if(pesquisarUsuario(nome_usuario, senha, lista_usuarios)){
            console.log("conseguimos encontrar seu nome de usuario!");
            window.location.href = "formulario.html";
        }
        else{
            document.getElementById("texto_login").innerText = "Nenhum usuário encontrado!";
            validar_login_aviso.style.opacity = 1;
            console.log("não conseguimos encontrar seu nome de usuario!");
        }
    }
}