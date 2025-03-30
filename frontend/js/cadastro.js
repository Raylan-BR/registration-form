// implementar botão de ir para login
function ir_tela_login(){
    //captura os dados dos inputs do cadastro
    var nome_usuario = document.getElementById("nome_usuario").value;
    var senha = document.getElementById("senha").value;
    
    //validar o acesso a tela de login
    if(nome_usuario != "" && senha != ""){

        if(senha.length > 8){
            alert("Ops, sua senha deve ter apenas 8 caracteres!");
        }
        else if(nome_usuario.length > 15){
            alert("Opa, seu nome de usuário é muito longo!");
        }
        else{
            localStorage.setItem(nome_usuario, senha);
            console.log(`cadastro: ${nome_usuario} salvo no localStorage`);

            window.location.href = "../public/login.html";
        }
    }
    else {
        console.log("cadastro concluído!");
        validar_cadastro_aviso = document.getElementById("validar_campos_cadastro");
        validar_cadastro_aviso.style.opacity = 1;
    }
}