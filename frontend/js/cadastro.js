var dados = {
    nome: "", data: "",CPF: "", email: "", telefone:"",
    CEP: "", rua: "", numero: "", cidade: "", estado: "",
    senha: "", acesso: 0, trilha: "", genero: "",
};
function ir_tela_login(){
    //captura os dados dos inputs do cadastro
    var nome = document.getElementById("nome_usuario").value;
    var senha = document.getElementById("senha").value;
    var validar_cadastro_aviso = document.getElementById("validar_campos_cadastro");
    var validar_cadastro_texto = document.getElementById("texto_cadastro");
    
    //validar o acesso a tela de login
    if(nome == ""){
        validar_cadastro_texto.innerText = "Insira um nome de usuario!";
        validar_cadastro_aviso.style.opacity = 1;
    }
    else{
        if(localStorage.getItem(nome) != null){
            alert("Ops, esse nome de usuario já existe!");
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
                    dados.senha = senha;
                    localStorage.setItem(nome, JSON.stringify(dados));
                    window.location.href = "../public/login.html";
                }
            }
        }
    }
}