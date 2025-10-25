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

//Cadastro e Login com token
function gerarToken(usuario) {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(JSON.stringify({ user: usuario, exp: Date.now() + 60000}));
    const signature = btoa("fake-signature");
    return `${header}.${payload}.${signature}`;
}

function cadastrar() {
    const emailElem = document.getElementById("emailC");
    const usernameElem = document.getElementById("usernameC");
    const senhaElem = document.getElementById("senhaC");

    const email = emailElem ? emailElem.value.trim() : "";
    const username = usernameElem ? usernameElem.value.trim() : "";
    const pass = senhaElem ? senhaElem.value.trim() : "";

    if (!email || !username || !pass) return alert("Preencha todos os campos!");

    const reMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!reMail.test(email)) return alert("Digite um e-mail válido.");
    if (localStorage.getItem("account_" + email)) return alert("Já existe uma conta com esse e-mail!");

    const account = { username: username, password: pass };
    localStorage.setItem("account_" + email, JSON.stringify(account));

    alert("Usuário cadastrado com sucesso!");
    window.location.href = "PI - Login.html";
}
window.cadastrar = cadastrar;

function logar() {
    const emailElem = document.getElementById("email");
    const senhaElem = document.getElementById("senha");
    const email = emailElem ? emailElem.value.trim() : "";
    const pass = senhaElem ? senhaElem.value.trim() : "";

    if (!email || !pass) return alert("Preencha e-mail e senha!");

    const raw = localStorage.getItem("account_" + email);
    if (!raw) return alert("Usuário não encontrado!");

    let account;
    try {
        account = JSON.parse(raw);
    } catch (e) {
        return alert("Dados de conta inválidos.");
    }

    if (account.password !== pass) return alert("Senha incorreta.");
    const token = gerarToken(account.username || email);
    localStorage.setItem("token", token);

    localStorage.setItem("usuario", account.username || email);
    localStorage.setItem("email", email);
    window.location.href = "PI - Area Logada.html";
}
window.logar = logar;

function deletarConta() {
    const email = localStorage.getItem('email');
    if (!email) return alert('E-mail não encontrado. Faça login novamente.');

    if (!confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) return;

    localStorage.removeItem('account_' + email);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('email');

    alert('Conta excluída com sucesso.');
    window.location.href = "PI - Login.html";
}
window.deletarConta = deletarConta;

function mostrarPainel() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("usuario");

    const cadastroEl = document.getElementById("cadastro");
    const loginEl = document.getElementById("login");
    const painelEl = document.getElementById("painel");
    const usuarioEl = document.getElementById("usuario");
    const tokenElemLocal = document.getElementById("token");

    if (token && painelEl) {
        if (cadastroEl) cadastroEl.style.display = "none";
        if (loginEl) loginEl.style.display = "none";
        painelEl.style.display = "block";
        if (usuarioEl) usuarioEl.textContent = user || '';
        if (tokenElemLocal) tokenElemLocal.textContent = token;
    } else if (painelEl) {
        painelEl.style.display = "none";
    }
}
window.mostrarPainel = mostrarPainel;

function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    const cadastroEl = document.getElementById("cadastro");
    const loginEl = document.getElementById("login");
    const painelEl = document.getElementById("painel");

    if (cadastroEl) cadastroEl.style.display = "block";
    if (loginEl) loginEl.style.display = "block";
    if (painelEl) painelEl.style.display = "none";

    window.location.href = "PI - Login.html";
}
window.sair = sair;

document.addEventListener('DOMContentLoaded', function() {
    mostrarPainel();
});

document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (!token) return;

    document.querySelectorAll('a').forEach(a => {
        const href = a.getAttribute('href');
        if (!href) return;
        if (href.includes('PI - Login.html')) {
            a.addEventListener('click', function(e) {
                e.preventDefault();
                const newHref = href.replace('PI - Login.html', 'PI - Area Logada.html');
                window.location.href = newHref;
            });
            a.title = 'Ir para Área Logada';
        }
    });
});

// Pagina molde
const produtos = {
  "programacao-1": {
    titulo: "Desenvolvimento Web - Básico",
    imagem: "../IMG/programa-1.png",   
    preco: "A partir de R$ 150",
    descricao: "Criação de site simples, responsivo, até 5 páginas.",
    categoria: "programacao-categoria"
  },
  "programacao-2": {
    titulo: "Desenvolvimento Web - Avançado",
    imagem: "../IMG/programa-2.jpg",
    preco: "A partir de R$ 450",
    descricao: "Aplicações web com backend, integração e deploy.",
    categoria: "programacao-categoria"
  },
 "programacao-3": {
    titulo: "Criação de Banco de Dados",
    imagem: "../IMG/banco de dados 1.jpg",
    preco: "A partir de R$ 550",
    descricao: "Criação avançada de banco de dados para sites já em desenvolvimento.",
    categoria: "programacao-categoria"
  },
  "jardinagem-1":{
    titulo: "Jardinagem e paisagismo",
    imagem:"../IMG/jardinagem 1.webp",
    preco:"Preço a negociar",
    descricao:"Paisagismo profissinal",
    categoria:"Jardinagem-categoria",
  },
"marcenaria-1":{
    titulo: "Ajuste de móveis",
    imagem:"../IMG/marcenaria 1.png",
    preco:"A partir de R$ 200   ",
    descricao:"Ajustes, restauração e fabricação de móveis",
    categoria:"Marcenaria-categoria",
  },
  "design-grafico-1": {
    titulo: "Design Gráfico - Criação de logo",
    imagem: "../IMG/Design Grafico 1.jpg",
    preco: "A partir de R$ 120",
    descricao: "Criação de logo profissional.",
    categoria: "Design Gráfico-categoria"
  },
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

document.addEventListener("DOMContentLoaded", () => {
  const estrelas = document.querySelectorAll(".estrela");
  const resultado = document.getElementById("resultado-avaliacao");
  let avaliacao = 0;

  estrelas.forEach((estrela, index) => {
    estrela.addEventListener("mouseover", () => {
      // pinta as estrelas até a atual
      estrelas.forEach((e, i) => {
        e.classList.toggle("hover", i <= index);
      });
    });

    estrela.addEventListener("mouseout", () => {
      estrelas.forEach(e => e.classList.remove("hover"));
    });

    estrela.addEventListener("click", () => {
      avaliacao = index + 1;
      resultado.textContent = `Você avaliou com ${avaliacao} estrela${avaliacao > 1 ? "s" : ""}.`;
      estrelas.forEach((e, i) => {
        e.classList.toggle("selecionada", i < avaliacao);
      });
    });
  });
});
