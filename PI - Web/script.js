function removerAcentos(str)
{
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function mostrarCategoria(id)
{
    document.querySelectorAll('.categoria').forEach(cat => {cat.classList.remove('active')});
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.menu-lateral li').forEach(li => {
        li.classList.remove('ativo');
        if (
            removerAcentos(li.textContent.trim().toLowerCase()) ===
            removerAcentos(id.trim().toLowerCase())
        ) {
            li.classList.add('ativo');
        }
    })

}
// validação do login
document.addEventListener("DOMContentLoaded", function() {

    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const hintEmail = document.getElementById("hint-email");
    const senhaInput = document.getElementById("senha");
    const hintSenha = document.getElementById("hint-senha");

    const reMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const vMail = (valor) => reMail.test(valor.trim());

    const reSenha = /.{6,}/;
    const vSenha = (valor) => reSenha.test(valor);

    function validarEmail() {
        const emailValido = vMail(emailInput.value);
        if (!emailValido) {
            hintEmail.textContent = "Digite um e-mail válido (exemplo@dominio.com)";
            emailInput.classList.add("erro");
             hintEmail.style.color = "red";
        } else {
            hintEmail.textContent = "";
            emailInput.classList.remove("erro");
        }
        return emailValido;
    }

    function validarSenha() {
        const senhaValida = vSenha(senhaInput.value);
        if (!senhaValida) {
            hintSenha.textContent = "A senha deve ter pelo menos 6 caracteres.";
            senhaInput.classList.add("erro");
            hintSenha.style.color = "red";
        } else {
            hintSenha.textContent = "";
            senhaInput.classList.remove("erro");
        }
        return senhaValida;
    }

    emailInput.addEventListener("input", validarEmail);
    senhaInput.addEventListener("input", validarSenha);

    form.addEventListener("submit", function(e) {
        const emailEstaOk = validarEmail();
        const senhaEstaOk = validarSenha();

        if (!emailEstaOk || !senhaEstaOk) {
            e.preventDefault();
            console.log("Envio bloqueado: formulário inválido.");
        }
    });
});

