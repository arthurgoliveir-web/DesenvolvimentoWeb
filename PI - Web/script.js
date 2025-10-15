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
// validação de email e constant 
const emailInput = document.getElementById("email");
const hintEmail = document.getElementById("hint-email");

const reMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;// validar e-mail e dominio
const vMail = v => reMail.test(v.trim());

function validarEmail() {
    const valor = emailInput.value;
    if (!vMail(valor)) {
        hintEmail.textContent = "Digite um e-mail válido (exemplo@dominio.com)";
        hintEmail.style.color = "red";
        return false;
    } else {
        hintEmail.textContent = "";
        return true;
    }
}
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function(e) {
            if (!validarEmail()) {
                e.preventDefault();
                emailInput.focus();
            }
        });
        emailInput.addEventListener("input", validarEmail);
    }
});
