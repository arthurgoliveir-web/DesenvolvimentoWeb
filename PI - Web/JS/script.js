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

// Barra de procura na sidebar
document.addEventListener('DOMContentLoaded', function() {
    const busca = document.getElementById('busca-categorias');
    const lista = document.getElementById('lista-categorias');
    const sugestoes = document.getElementById('sugestoes-categoria');
    const categorias = Array.from(lista.children).map(li => li.textContent.trim());

    busca.addEventListener('input', function() {
        const termo = removerAcentos(busca.value.trim().toLowerCase());
        sugestoes.innerHTML = '';
        if (termo.length === 0) {
            sugestoes.style.display = 'none';
            return;
        }
        const filtradas = categorias.filter(cat => removerAcentos(cat.toLowerCase()).includes(termo));
        if (filtradas.length > 0) {
            sugestoes.style.display = 'block';
            filtradas.forEach(cat => {
                const div = document.createElement('div');
                div.textContent = cat;
                div.style.cursor = 'pointer';
                div.style.background = '#fff';
                div.style.border = '1px solid #c4c4c4';
                div.style.padding = '6px 10px';
                div.style.marginBottom = '2px';
                div.onclick = function() {
                    busca.value = cat;
                    sugestoes.innerHTML = '';
                    sugestoes.style.display = 'none';
                    abrirCategoria(cat);
                };
                sugestoes.appendChild(div);
            });
        } else {
            sugestoes.style.display = 'none';
        }
    });

    busca.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            abrirCategoria(busca.value.trim());
            sugestoes.innerHTML = '';
            sugestoes.style.display = 'none';
        }
    });

    function abrirCategoria(nome) {
        const nomeSemAcento = removerAcentos(nome.toLowerCase());
        lista.querySelectorAll('li').forEach(li => {
            if (removerAcentos(li.textContent.trim().toLowerCase()) === nomeSemAcento) {
                li.click();
            }
        });
    }
});
// Pagina molde
    const produtos = {
      "programacao-1": {
        titulo: "Desenvolvimento Web - Básico",
        imagem: "https://picsum.photos/seed/programacao-1/800/500",
        preco: "A partir de R$ 150",
        descricao: "Criação de site simples, responsivo, até 5 páginas.",
        categoria: "programacao-categoria"
      },
      "programacao-2": {
        titulo: "Desenvolvimento Web - Avançado",
        imagem: "https://picsum.photos/seed/programacao-2/800/500",
        preco: "A partir de R$ 450",
        descricao: "Aplicações web com backend, integração e deploy.",
        categoria: "programacao-categoria"
      },
      "design-grafico-1": {
        titulo: "Design Gráfico - Logo",
        imagem: "https://picsum.photos/seed/design-1/800/500",
        preco: "A partir de R$ 80",
        descricao: "Criação de identidade visual e logo profissional."
      }
      // adicionar mais items...
    };

    function getQueryParam(name) {
      const params = new URLSearchParams(window.location.search);
      return params.get(name);
    }

    function carregarProduto() {
      const id = getQueryParam('id');
      const main = document.getElementById('detalhe');
      const titulo = document.getElementById('titulo');
      const imagem = document.getElementById('imagem');
      const preco = document.getElementById('preco');
      const descricao = document.getElementById('descricao');

      if (!id || !produtos[id]) {
        titulo.textContent = "Produto não encontrado";
        descricao.textContent = "Verifique se o link está correto.";
        imagem.style.display = 'none';
        preco.textContent = '';
        return;
      }

      const p = produtos[id];
      titulo.textContent = p.titulo;
      imagem.src = p.imagem;
      imagem.alt = p.titulo;
      preco.textContent = p.preco;
      descricao.textContent = p.descricao;
    }

    carregarProduto();
