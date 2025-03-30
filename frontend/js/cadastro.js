// implementar botão de ir para login
function ir_tela_login(){
    //captura os dados dos inputs do cadastro
    var nome_usuario = document.getElementById("nome_usuario").value;
    var senha = document.getElementById("senha").value;
    var validar_cadastro_aviso = document.getElementById("validar_campos_cadastro");
    var validar_cadastro_texto = document.getElementById("texto_cadastro");
    
    //validar o acesso a tela de login
    if(nome_usuario == ""){
        validar_cadastro_texto.innerText = "Insira um nome de usuario!";
        validar_cadastro_aviso.style.opacity = 1;
    }
    else{
        if(nome_usuario.length > 15){
            alert("Opa, seu nome de usuário é muito longo!");
        }
        else{
            if(senha == ""){
                validar_cadastro_texto.innerText = "Insira uma senha!";
                validar_cadastro_aviso.style.opacity = 1;
            }
            else{
                if(senha.length > 8){
                    alert("Ops, sua senha deve ter apenas 8 caracteres!");
                }
                else{
                    localStorage.setItem(nome_usuario, senha);
                    console.log(`cadastro: ${nome_usuario} salvo no localStorage`);
                    window.location.href = "../public/login.html";
                }
            }
        }
    }
   /* if(nome_usuario != "" && senha != ""){

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
    } */
}