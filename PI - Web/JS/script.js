
// ANIMAÇÃO DO FUNDO DA VITRINE

// Quando a página carrega, faz a imagem de fundo aparecer suavemente
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.fundo-vitrine');
    const bg = container ? container.querySelector('.bg-vitrine') : null;
    if (!container || !bg) return;

    // Tira a classe pra poder adicionar de novo com efeito
    container.classList.remove('loaded');

    const show = () => container.classList.add('loaded');

    // Se a imagem ja carregou, mostra na hora
    if (bg.complete && bg.naturalWidth > 0) {
        requestAnimationFrame(show);
    } else {
        // Se não carregou ainda, espera carregar
        bg.addEventListener('load', show, { once: true });
        // Plano B: se demorar demais, mostra depois de 1.5s
        setTimeout(show, 1500);
    }
});


// TIRAR ACENTOS

// Transforma "programação" em "programacao" pra facilitar buscas
function removerAcentos(str)
{
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


// MENU DE CATEGORIAS (SIDEBAR)

// Quando clica numa categoria no menu lateral, mostra só ela
function mostrarCategoria(id)
{
    // Esconde todas as categorias
    document.querySelectorAll('.categoria').forEach(cat => {cat.classList.remove('active')});
    // Mostra só a que foi clicada
    document.getElementById(id).classList.add('active');
    
    // Destaca o item clicado no menu lateral
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

// VALIDAÇÃO DO FORMULÁRIO DE LOGIN

// Verifica se email e senha são válidos antes de enviar
document.addEventListener("DOMContentLoaded", function() {

    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const hintEmail = document.getElementById("hint-email");
    const senhaInput = document.getElementById("senha");
    const hintSenha = document.getElementById("hint-senha");

    // Se não tiver formulário na página, nem tenta rodar
    if (!form || !emailInput || !senhaInput) return;

    // Regex pra checar se email tem formato certo (algo@algo.algo)
    const reMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const vMail = (valor) => reMail.test(valor.trim());

    // Senha precisa ter pelo menos 6 caracteres
    const reSenha = /.{6,}/;
    const vSenha = (valor) => reSenha.test(valor);

    // Mostra erro se email for inválido
    function validarEmail() {
        const emailValido = vMail(emailInput.value);
        if (!emailValido) {
            if (hintEmail) {
                hintEmail.textContent = "Digite um e-mail válido (exemplo@dominio.com)";
                hintEmail.style.color = "red";
            }
            emailInput.classList.add("erro");
        } else {
            if (hintEmail) hintEmail.textContent = "";
            emailInput.classList.remove("erro");
        }
        return emailValido;
    }

    // Mostra erro se senha for muito curta
    function validarSenha() {
        const senhaValida = vSenha(senhaInput.value);
        if (!senhaValida) {
            if (hintSenha) {
                hintSenha.textContent = "A senha deve ter pelo menos 6 caracteres.";
                hintSenha.style.color = "red";
            }
            senhaInput.classList.add("erro");
        } else {
            if (hintSenha) hintSenha.textContent = "";
            senhaInput.classList.remove("erro");
        }
        return senhaValida;
    }

    // Valida em tempo real enquanto digita
    emailInput.addEventListener("input", validarEmail);
    senhaInput.addEventListener("input", validarSenha);

    // Bloqueia envio se tiver erro
    form.addEventListener("submit", function(e) {
        const emailEstaOk = validarEmail();
        const senhaEstaOk = validarSenha();

        if (!emailEstaOk || !senhaEstaOk) {
            e.preventDefault();
            console.log("Envio bloqueado: formulário inválido.");
        }
    });
});


// BARRA DE BUSCA NA SIDEBAR

// Permite pesquisar categorias digitando na barra lateral
document.addEventListener('DOMContentLoaded', function() {
    const busca = document.getElementById('busca-categorias');
    const lista = document.getElementById('lista-categorias');
    const sugestoes = document.getElementById('sugestoes-categoria');
    
    // Se não tiver esses elementos, não faz nada
    if (!busca || !lista || !sugestoes) return;
    
    // Pega o nome de todas as categorias da lista
    const categorias = Array.from(lista.children).map(li => li.textContent.trim());

    // Quando digita, filtra e mostra sugestões
    busca.addEventListener('input', function() {
        const termo = removerAcentos(busca.value.trim().toLowerCase());
        sugestoes.innerHTML = '';
        
        // Se não digitou nada, esconde sugestões
        if (termo.length === 0) {
            sugestoes.style.display = 'none';
            return;
        }
        
        // Filtra categorias que batem com o que digitou
        const filtradas = categorias.filter(cat => removerAcentos(cat.toLowerCase()).includes(termo));
        
        // Mostra as sugestões encontradas
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
                // Quando clica na sugestão, abre a categoria
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

    // Se apertar Enter, abre a categoria
    busca.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            abrirCategoria(busca.value.trim());
            sugestoes.innerHTML = '';
            sugestoes.style.display = 'none';
        }
    });

    // Encontra a categoria na lista e clica nela
    function abrirCategoria(nome) {
        const nomeSemAcento = removerAcentos(nome.toLowerCase());
        lista.querySelectorAll('li').forEach(li => {
            if (removerAcentos(li.textContent.trim().toLowerCase()) === nomeSemAcento) {
                li.click();
            }
        });
    }
});


// SISTEMA DE AUTENTICAÇÃO (LOGIN/CADASTRO)


// Cria um token fake pra simular autenticação (não é seguro pra produção!)
function gerarToken(usuario) {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(JSON.stringify({ user: usuario, exp: Date.now() + 60000}));
    const signature = btoa("fake-signature");
    return `${header}.${payload}.${signature}`;
}

// Cadastra um novo usuário no localStorage
function cadastrar() {
    const emailElem = document.getElementById("emailC");
    const usernameElem = document.getElementById("usernameC");
    const senhaElem = document.getElementById("senhaC");

    const email = emailElem ? emailElem.value.trim() : "";
    const username = usernameElem ? usernameElem.value.trim() : "";
    const pass = senhaElem ? senhaElem.value.trim() : "";

    // Verifica se preencheu tudo
    if (!email || !username || !pass) return alert("Preencha todos os campos!");

    // Valida formato do email
    const reMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!reMail.test(email)) return alert("Digite um e-mail válido.");
    
    // Verifica se já existe conta com esse email
    if (localStorage.getItem("account_" + email)) return alert("Já existe uma conta com esse e-mail!");

    // Salva a conta no localStorage
    const account = { username: username, password: pass };
    localStorage.setItem("account_" + email, JSON.stringify(account));

    alert("Usuário cadastrado com sucesso!");
    window.location.href = "PI - Login.html";
}
window.cadastrar = cadastrar;

// Faz login do usuário
function logar() {
    const emailElem = document.getElementById("email");
    const senhaElem = document.getElementById("senha");
    const email = emailElem ? emailElem.value.trim() : "";
    const pass = senhaElem ? senhaElem.value.trim() : "";

    if (!email || !pass) return alert("Preencha e-mail e senha!");

    // Busca a conta no localStorage
    const raw = localStorage.getItem("account_" + email);
    if (!raw) return alert("Usuário não encontrado!");

    let account;
    try {
        account = JSON.parse(raw);
    } catch (e) {
        return alert("Dados de conta inválidos.");
    }

    // Confere se a senha bate
    if (account.password !== pass) return alert("Senha incorreta.");
    
    // Cria token e salva dados do usuário logado
    const token = gerarToken(account.username || email);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", account.username || email);
    localStorage.setItem("email", email);

    // Se veio do checkout, volta pra lá
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');
    
    if (redirect === 'checkout') {
        window.location.href = "../PI - Checkout/PI - Checkout.html";
    } else {
        window.location.href = "PI - Area Logada.html";
    }
}
window.logar = logar;

// Deleta a conta do usuário
function deletarConta() {
    const email = localStorage.getItem('email');
    if (!email) return alert('E-mail não encontrado. Faça login novamente.');

    if (!confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) return;

    // Limpa tudo do localStorage
    localStorage.removeItem('account_' + email);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('email');

    alert('Conta excluída com sucesso.');
    window.location.href = "PI - Login.html";
}
window.deletarConta = deletarConta;

// Mostra o painel do usuário logado (esconde login/cadastro)
function mostrarPainel() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("usuario");

    const cadastroEl = document.getElementById("cadastro");
    const loginEl = document.getElementById("login");
    const painelEl = document.getElementById("painel");
    const usuarioEl = document.getElementById("usuario");
    const tokenElemLocal = document.getElementById("token");

    // Se tem token, usuário tá logado
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

// Faz logout do usuário
function sair() {
    // Limpa dados da sessão
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("email");

    const cadastroEl = document.getElementById("cadastro");
    const loginEl = document.getElementById("login");
    const painelEl = document.getElementById("painel");

    // Mostra os formulários de novo
    if (cadastroEl) cadastroEl.style.display = "block";
    if (loginEl) loginEl.style.display = "block";
    if (painelEl) painelEl.style.display = "none";

    window.location.href = "PI - Login.html";
}
window.sair = sair;

// Chama mostrarPainel quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    mostrarPainel();
});

// Se usuário está logado, redireciona links de login pra área logada
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


// CATÁLOGO DE PRODUTOS/SERVIÇOS

// Aqui ficam todos os serviços que o site oferece
const produtos = {
  "programacao-1": {
    titulo: "Desenvolvimento Web - Básico",
    imagem: "../IMG/programa-1.png",   
    preco: "A partir de R$ 150",
    valor: 150,
    descricao: "Criação de site simples, responsivo, até 5 páginas.",
    categoria: "programacao-categoria"
  },
  "programacao-2": {
    titulo: "Desenvolvimento Web - Avançado",
    imagem: "../IMG/programa-2.jpg",
    preco: "A partir de R$ 450",
    valor: 450,
    descricao: "Aplicações web com backend, integração e deploy.",
    categoria: "programacao-categoria"
  },
 "programacao-3": {
    titulo: "Criação de Banco de Dados",
    imagem: "../IMG/banco de dados 1.jpg",
    preco: "A partir de R$ 550",
    valor: 550,
    descricao: "Criação avançada de banco de dados para sites já em desenvolvimento.",
    categoria: "programacao-categoria"
  },
  "jardinagem-1":{
    titulo: "Jardinagem e paisagismo",
    imagem:"../IMG/jardinagem 1.webp",
    preco:"A partir de R$ 200",
    valor: 200,
    descricao:"Paisagismo profissinal",
    categoria:"Jardinagem-categoria",
  },
"marcenaria-1":{
    titulo: "Ajuste de móveis",
    imagem:"../IMG/marcenaria 1.png",
    preco:"A partir de R$ 200   ",
    valor: 200,
    descricao:"Ajustes, restauração e fabricação de móveis",
    categoria:"Marcenaria-categoria",
  },
  "design-grafico-1": {
    titulo: "Design Gráfico - Criação de logo",
    imagem: "../IMG/Design Grafico 1.jpg",
    preco: "A partir de R$ 120",
    valor: 120,
    descricao: "Criação de logo profissional.",
    categoria: "Design Gráfico-categoria"
  },
  // adicionar mais items...
};


// PÁGINA DE DETALHES DO PRODUTO


// Pega parâmetros da URL (ex: ?id=programacao-1)
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// Carrega os dados do produto na página de detalhes
function carregarProduto() {
  const id = getQueryParam('id');
  const main = document.getElementById('detalhe');
  const titulo = document.getElementById('titulo');
  const imagem = document.getElementById('imagem');
  const preco = document.getElementById('preco');
  const descricao = document.getElementById('descricao');

  // Se não tá na página de detalhes, não faz nada
  if (!main || !titulo) return;

  // Se produto não existe, mostra mensagem de erro
  if (!id || !produtos[id]) {
    titulo.textContent = "Produto não encontrado";
    descricao.textContent = "Verifique se o link está correto.";
    imagem.style.display = 'none';
    preco.textContent = '';
    return;
  }

  // Preenche a página com os dados do produto
  const p = produtos[id];
  titulo.textContent = p.titulo;
  imagem.src = p.imagem;
  imagem.alt = p.titulo;
  preco.textContent = p.preco;
  descricao.textContent = p.descricao;
}

carregarProduto();


// SISTEMA DE AVALIAÇÃO POR ESTRELAS

// Permite o usuário avaliar os serviços com 1 a 5 estrelas
document.addEventListener("DOMContentLoaded", () => {
  const estrelas = document.querySelectorAll(".estrela");
  const resultado = document.getElementById("resultado-avaliacao");
  
  // Se não tiver estrelas na página, não faz nada
  if (estrelas.length === 0 || !resultado) return;
  
  const idProduto = getQueryParam('id');
  const email = localStorage.getItem('email');
  
  // Se já avaliou antes, mostra a nota salva
  if (email && idProduto) {
      const notaSalva = localStorage.getItem(`avaliacao_${email}_${idProduto}`);
      if (notaSalva) {
          const nota = parseInt(notaSalva);
          estrelas.forEach((e, i) => {
              e.classList.toggle("selecionada", i < nota);
          });
          resultado.textContent = `Você avaliou com ${nota} estrela${nota > 1 ? "s" : ""}.`;
      }
  }

  estrelas.forEach((estrela, index) => {
    // Efeito de hover - destaca as estrelas quando passa o mouse
    estrela.addEventListener("mouseover", () => {
      estrelas.forEach((e, i) => {
        e.classList.toggle("hover", i <= index);
      });
    });

    // Remove o efeito quando tira o mouse
    estrela.addEventListener("mouseout", () => {
      estrelas.forEach(e => e.classList.remove("hover"));
    });

    // Quando clica, salva a avaliação
    estrela.addEventListener("click", () => {
      const email = localStorage.getItem('email');
      // Precisa estar logado pra avaliar
      if (!email) {
          alert("Você precisa estar logado para avaliar.");
          window.location.href = "../PI - Login/PI - Login.html";
          return;
      }

      const avaliacao = index + 1;
      resultado.textContent = `Você avaliou com ${avaliacao} estrela${avaliacao > 1 ? "s" : ""}.`;
      
      // Marca as estrelas selecionadas
      estrelas.forEach((e, i) => {
        e.classList.toggle("selecionada", i < avaliacao);
      });
      
      // Salva no localStorage
      if (idProduto) {
          localStorage.setItem(`avaliacao_${email}_${idProduto}`, avaliacao);
      }
    });
  });
});


// SISTEMA DE BUSCA COM POPUP

// Cria um popup de busca quando clica no ícone de lupa
document.addEventListener('DOMContentLoaded', function() {
    var iconesBusca = document.querySelectorAll('img[alt="Procurar"]');
    
    iconesBusca.forEach(function(img) {
        // Acha o container da lupa
        var container = img.closest('span');
        if (!container) return;
        
        container.style.position = 'relative';
        img.style.cursor = 'pointer';
        
        // Cria o popup de busca
        var popup = document.createElement('div');
        popup.className = 'search-popup';
        popup.innerHTML = 
            '<input type="text" placeholder="Buscar serviço...">' +
            '<button>🔍</button>';
        
        container.appendChild(popup);
        
        var input = popup.querySelector('input');
        var btn = popup.querySelector('button');
        
        // Função principal da busca
        function realizarBusca() {
            var termo = input.value.trim();
            
            if (termo !== "") {
                var termoMinusculo = termo.toLowerCase();
                var termoLimpo = removerAcentos(termoMinusculo);

                function irPara(pagina) {
                    window.location.href = pagina;
                }

                // Palavras-chave que redirecionam pra páginas específicas
                
                // Página de Ajuda
                var palavrasAjuda = ['ajuda', 'suporte', 'duvidas', 'faq', 'contato', 'socorro'];
                for (var i = 0; i < palavrasAjuda.length; i++) {
                    if (termoLimpo.includes(palavrasAjuda[i])) {
                        irPara("../PI - Ajuda/PI - Ajuda.html");
                        return;
                    }
                }
                
                // Página Inicial
                var palavrasInicio = ['inicio', 'home', 'comeco', 'inicial', 'principal', 'vitrine', 'voltar'];
                for (var i = 0; i < palavrasInicio.length; i++) {
                    if (termoLimpo.includes(palavrasInicio[i])) {
                        irPara("../PI - Página Inicial/PI - Pagina Inicial.html");
                        return;
                    }
                }
                
                // Página Sobre
                var palavrasSobre = ['sobre', 'quem somos', 'empresa', 'nos', 'historia'];
                for (var i = 0; i < palavrasSobre.length; i++) {
                    if (termoLimpo.includes(palavrasSobre[i])) {
                        irPara("../PI - Sobre/PI - Sobre.html");
                        return;
                    }
                }
                
                // Página de Login
                var palavrasLogin = ['login', 'entrar', 'acessar', 'logar', 'signin'];
                for (var i = 0; i < palavrasLogin.length; i++) {
                    if (termoLimpo.includes(palavrasLogin[i])) {
                        irPara("../PI - Login/PI - Login.html");
                        return;
                    }
                }

                // Página de Cadastro
                var palavrasCadastro = ['cadastro', 'cadastrar', 'criar conta', 'inscrever', 'registro', 'signup'];
                for (var i = 0; i < palavrasCadastro.length; i++) {
                    if (termoLimpo.includes(palavrasCadastro[i])) {
                        irPara("../PI - Login/PI - Cadastro.html");
                        return;
                    }
                }
                
                // Página do Carrinho
                var palavrasCarrinho = ['carrinho', 'cesta', 'compras', 'pedido', 'sacola'];
                for (var i = 0; i < palavrasCarrinho.length; i++) {
                    if (termoLimpo.includes(palavrasCarrinho[i])) {
                        irPara("../PI - Carrinho/PI - Carrinho.html");
                        return;
                    }
                }

                // Página de Serviços (lista geral)
                var palavrasServicos = ['servicos', 'todos', 'lista', 'catalogo', 'produtos'];
                for (var i = 0; i < palavrasServicos.length; i++) {
                    if (termoLimpo === palavrasServicos[i] || termoLimpo === palavrasServicos[i] + 's') {
                        var destino = "../PI - Serviços/PI - Serviços.html";
                        if (window.location.pathname.includes("/PI - Serviços/")) {
                            destino = "PI - Serviços.html";
                        }
                        window.location.href = destino;
                        return;
                    }
                }

                // Se não bateu com nenhuma palavra-chave, busca nos serviços
                var paginaDestino = "../PI - Serviços/PI - Serviços.html";
                var caminhoAtual = window.location.pathname;
                
                // Ajusta o caminho dependendo de onde tá
                if (caminhoAtual.includes("/PI - Serviços/")) {
                    paginaDestino = "PI - Serviços.html";
                } else if (caminhoAtual.includes("/PI - Página Inicial/")) {
                    paginaDestino = "../PI - Serviços/PI - Serviços.html";
                }
                
                // Manda pra página de serviços com o termo de busca
                window.location.href = paginaDestino + "?busca=" + encodeURIComponent(termo);
            }
        }
        
        // Eventos do popup
        popup.addEventListener('click', function(e) {
            e.stopPropagation(); // Não fecha quando clica dentro
        });

        btn.addEventListener('click', realizarBusca);
        
        // Enter também busca
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                realizarBusca();
            }
        });
        
        // Abre/fecha o popup ao clicar na lupa
        var link = img.closest('a');
        var gatilho = link || img;
        
        gatilho.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Fecha outros popups abertos
            document.querySelectorAll('.search-popup.active').forEach(function(p) {
                if (p !== popup) {
                    p.classList.remove('active');
                }
            });
            
            // Toggle do popup atual
            if (popup.classList.contains('active')) {
                popup.classList.remove('active');
            } else {
                popup.classList.add('active');
                setTimeout(function() {
                    input.focus();
                }, 100);
            }
        });
    });
    
    // Fecha popup ao clicar fora dele
    document.addEventListener('click', function() {
        document.querySelectorAll('.search-popup.active').forEach(function(p) {
            p.classList.remove('active');
        });
    });

    // Se tem termo de busca na URL, filtra os serviços
    var params = new URLSearchParams(window.location.search);
    var busca = params.get('busca');
    
    var urlAtual = decodeURIComponent(window.location.href);
    var ehPaginaServicos = urlAtual.includes("PI - Serviços.html") || document.querySelector('.categoria');

    if (busca && ehPaginaServicos) {
        var termo = removerAcentos(busca.toLowerCase());
        
        // Limpa seleção do menu lateral
        var menuLateral = document.querySelectorAll('.menu-lateral li');
        if (menuLateral) {
            menuLateral.forEach(function(li) {
                li.classList.remove('ativo');
            });
        }
        
        // Mostra todas as categorias
        document.querySelectorAll('.categoria').forEach(function(cat) {
            cat.classList.add('active');
        });
        
        var encontrouAlgum = false;
        
        // Filtra os cards que batem com a busca
        document.querySelectorAll('.card').forEach(function(card) {
            var tituloEl = card.querySelector('.card-title');
            if (tituloEl) {
                var titulo = tituloEl.textContent;
                var tituloNorm = removerAcentos(titulo.toLowerCase());
                
                if (tituloNorm.includes(termo)) {
                    card.style.display = 'block';
                    encontrouAlgum = true;
                } else {
                    card.style.display = 'none';
                }
            }
        });
        
        // Esconde categorias que ficaram vazias
        document.querySelectorAll('.categoria').forEach(function(cat) {
            var cardsVisiveis = Array.from(cat.querySelectorAll('.card')).filter(function(c) {
                return c.style.display !== 'none';
            });
            
            if (cardsVisiveis.length === 0) {
                cat.style.display = 'none';
            } else {
                cat.style.display = 'block';
            }
        });
        
        // Atualiza o título da página com o resultado
        var tituloPagina = document.querySelector('.meio-titulo-serviços');
        if (tituloPagina) {
            if (encontrouAlgum) {
                tituloPagina.textContent = 'Resultados para "' + busca + '"';
            } else {
                tituloPagina.textContent = 'Nenhum resultado para "' + busca + '"';
                alert('Nenhum serviço encontrado para "' + busca + '"');
            }
        }
    }
});


// SISTEMA DE CARRINHO DE COMPRAS


// Pega o carrinho do localStorage (cada usuário tem o seu)
function obterCarrinho() {
    try {
        var email = localStorage.getItem('email');
        if (!email) return []; // Se não tá logado, carrinho vazio

        var key = 'carrinho_' + email;
        var dados = localStorage.getItem(key);
        return dados ? JSON.parse(dados) : [];
    } catch (e) {
        return [];
    }
}

// Salva o carrinho no localStorage
function salvarCarrinho(carrinho) {
    var email = localStorage.getItem('email');
    if (!email) return; // Não salva se não tiver logado

    var key = 'carrinho_' + email;
    localStorage.setItem(key, JSON.stringify(carrinho));
}

// Adiciona um serviço no carrinho
function adicionarAoCarrinho() {
    // Primeiro verifica se tá logado
    var email = localStorage.getItem('email');
    if (!email) {
        alert("Você precisa estar logado para adicionar itens ao carrinho.");
        window.location.href = "../PI - Login/PI - Login.html";
        return;
    }

    // Pega o ID do produto da URL
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');
    
    if (!id || !produtos[id]) {
        alert('Produto não encontrado!');
        return;
    }
    
    var produto = produtos[id];
    var carrinho = obterCarrinho();
    
    // Verifica se já tá no carrinho
    var itemExistente = false;
    for(var i=0; i<carrinho.length; i++) {
        if(carrinho[i].id === id) {
            itemExistente = true;
            break;
        }
    }

    if (itemExistente) {
        alert('Este serviço já está no carrinho!');
        return;
    }
    
    // Adiciona o item
    carrinho.push({
        id: id,
        titulo: produto.titulo,
        preco: produto.preco,
        valor: produto.valor,
        imagem: produto.imagem
    });
    
    salvarCarrinho(carrinho);
    alert('✓ Serviço adicionado ao carrinho!');
}

// Remove um item do carrinho
function removerDoCarrinho(id) {
    var carrinho = obterCarrinho();
    var novoCarrinho = [];
    
    // Monta um novo array sem o item removido
    for(var i=0; i<carrinho.length; i++) {
        if(carrinho[i].id !== id) {
            novoCarrinho.push(carrinho[i]);
        }
    }
    
    salvarCarrinho(novoCarrinho);
    carregarCarrinho(); // Atualiza a tela
}

// Mostra os itens do carrinho na página
function carregarCarrinho() {
    var carrinhoVazio = document.getElementById('carrinho-vazio');
    var carrinhoLista = document.getElementById('carrinho-lista');
    var carrinhoResumo = document.getElementById('carrinho-resumo');
    
    // Se não tá na página do carrinho, sai fora
    if (!carrinhoLista) return;
    
    var carrinho = obterCarrinho();
    
    // Se tá vazio, mostra mensagem
    if (carrinho.length === 0) {
        carrinhoVazio.style.display = 'block';
        carrinhoLista.style.display = 'none';
        carrinhoResumo.style.display = 'none';
        return;
    }
    
    // Se tem itens, mostra a lista
    carrinhoVazio.style.display = 'none';
    carrinhoLista.style.display = 'block';
    carrinhoResumo.style.display = 'block';
    
    // Monta o HTML dos itens
    var html = '';
    var total = 0;
    
    for(var i=0; i<carrinho.length; i++) {
        var item = carrinho[i];
        html += 
            '<div class="carrinho-item">' +
                '<img src="' + item.imagem + '" alt="' + item.titulo + '" class="item-imagem">' +
                '<div class="item-info">' +
                    '<h3 class="item-titulo">' + item.titulo + '</h3>' +
                    '<p class="item-preco">' + item.preco + '</p>' +
                '</div>' +
                '<button class="btn-remover" onclick="removerDoCarrinho(\'' + item.id + '\')">Remover</button>' +
            '</div>';
        total += item.valor;
    }
    
    carrinhoLista.innerHTML = html;
    
    // Atualiza os totais
    var totalFormatado = total.toFixed(2).replace('.', ',');
    document.getElementById('subtotal').textContent = 'R$ ' + totalFormatado;
    document.getElementById('total').textContent = 'R$ ' + totalFormatado;
}

// Vai pro checkout
function finalizarCompra() {
    var carrinho = obterCarrinho();
    
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    // Precisa tá logado
    var email = localStorage.getItem('email');
    if (!email) {
        var confirmacao = confirm('Você precisa estar logado para finalizar a compra. Deseja fazer login agora?');
        if (confirmacao) {
            window.location.href = '../PI - Login/PI - Login.html?redirect=checkout';
        }
        return;
    }
    
    window.location.href = '../PI - Checkout/PI - Checkout.html';
}

// Carrega o carrinho quando a página abre
document.addEventListener('DOMContentLoaded', function() {
    carregarCarrinho();
});

// Backup: tenta carregar se a página já tava pronta
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(carregarCarrinho, 100);
}

// Deixa as funções disponíveis globalmente (pro onclick funcionar)
window.adicionarAoCarrinho = adicionarAoCarrinho;
window.removerDoCarrinho = removerDoCarrinho;
window.finalizarCompra = finalizarCompra;
window.carregarCarrinho = carregarCarrinho;


// PÁGINA DE CHECKOUT


document.addEventListener('DOMContentLoaded', function() {
    carregarResumoCheckout();
});

// Mostra o resumo do pedido no checkout
function carregarResumoCheckout() {
    var carrinho = obterCarrinho();
    var listaItens = document.getElementById('lista-itens-resumo');
    
    // Se não tá no checkout, sai fora
    if (!listaItens) return;

    // Se carrinho vazio, volta pro carrinho
    if (carrinho.length === 0) {
        window.location.href = '../PI - Carrinho/PI - Carrinho.html';
        return;
    }

    // Monta a lista de itens
    var html = '';
    var total = 0;

    for(var i=0; i<carrinho.length; i++) {
        var item = carrinho[i];
        html += 
            '<div class="item-resumo">' +
                '<div class="item-resumo-info">' +
                    '<span class="item-resumo-qtd">1x</span>' +
                    '<span class="item-resumo-nome">' + item.titulo + '</span>' +
                '</div>' +
                '<span class="item-resumo-preco">' + item.preco + '</span>' +
            '</div>';
        total += item.valor;
    }

    listaItens.innerHTML = html;
    
    // Atualiza os totais
    var totalFormatado = 'R$ ' + total.toFixed(2).replace('.', ',');
    var subtotalEl = document.getElementById('resumo-subtotal');
    var totalEl = document.getElementById('resumo-total');
    
    if(subtotalEl) subtotalEl.textContent = totalFormatado;
    if(totalEl) totalEl.textContent = totalFormatado;
}

// Seleciona a forma de pagamento
function selecionarPagamento(elemento, metodo) {
    // Tira a seleção do anterior
    document.querySelectorAll('.metodo-opcao').forEach(function(el) {
        el.classList.remove('selected');
    });
    
    // Marca o novo
    elemento.classList.add('selected');
    
    // Se for cartão, mostra o formulário
    var formCartao = document.getElementById('form-cartao');
    if (metodo === 'cartao') {
        formCartao.style.display = 'block';
    } else {
        formCartao.style.display = 'none';
    }
}

// Confirma o pedido e salva em "Meus Pedidos"
function confirmarPedido() {
    var nome = document.getElementById('nome').value;
    var emailInput = document.getElementById('email').value;
    var endereco = document.getElementById('endereco').value;

    // Valida campos obrigatórios
    if (!nome || !emailInput || !endereco) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    var userEmail = localStorage.getItem('email');
    if (!userEmail) {
        alert("Erro: Usuário não identificado.");
        return;
    }

    var carrinho = obterCarrinho();
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    // Pega pedidos antigos (se tiver)
    var pedidosAntigos = JSON.parse(localStorage.getItem("meus_pedidos_contratados")) || [];

    // Transforma itens do carrinho em pedidos
    var novosPedidos = carrinho.map(function(item) {
        return {
            titulo: item.titulo,
            prestador: item.prestador || "ConnectPro Parceiro", 
            valor: "R$ " + item.valor.toFixed(2).replace('.', ','),
            imagem: item.imagem,
            status: "Em Andamento", 
            data: new Date().toLocaleDateString()
        };
    });

    // Junta tudo e salva
    var listaAtualizada = pedidosAntigos.concat(novosPedidos);
    localStorage.setItem("meus_pedidos_contratados", JSON.stringify(listaAtualizada));

    // Limpa o carrinho
    localStorage.removeItem('carrinho_' + userEmail);

    alert('Pedido confirmado com sucesso! Você pode acompanhá-lo em "Meus Pedidos".');
    window.location.href = '../PI - Serviços/PI - Meus Serviços Contratados.html'; 
}

// PÁGINA MEUS SERVIÇOS CONTRATADOS
// Mostra os pedidos que o usuário já fez

document.addEventListener("DOMContentLoaded", function() {
    carregarPedidosNaTela();
});

// Carrega e mostra os pedidos do usuário
function carregarPedidosNaTela() {
    const container = document.getElementById("lista-pedidos");
    
    // Se não tá na página de pedidos, não faz nada
    if (!container) return;

    const pedidos = JSON.parse(localStorage.getItem("meus_pedidos_contratados")) || [];
    
    // Mantém o título se existir
    const tituloRetangulo = container.querySelector('.retangulo');
    container.innerHTML = ""; 
    if(tituloRetangulo) container.appendChild(tituloRetangulo);

    // Se não tem pedidos, mostra mensagem
    if (pedidos.length === 0) {
        container.innerHTML += `
            <div style="text-align: center; padding: 40px; color: #666; background: white; border-radius: 8px; margin-top: 20px;">
                <h3>Você ainda não tem serviços contratados.</h3>
                <br>
                <a href="../PI - Serviços/PI - Serviços.html" style="background: #07484A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Explorar Serviços</a>
            </div>
        `;
        return;
    }

    // Monta os cards de cada pedido
    pedidos.forEach((pedido, index) => {
        // Define cor e ícone do status
        let classeStatus = "status-pendente";
        let iconeStatus = "●";
        
        if(pedido.status === "Em Andamento") { classeStatus = "status-ativo"; iconeStatus = "●"; }
        if(pedido.status === "Concluído") { classeStatus = "status-concluido"; iconeStatus = "✔"; }

        const htmlCard = `
        <div class="pedido-card">
            <img src="${pedido.imagem}" alt="${pedido.titulo}" class="pedido-img">
            
            <div class="pedido-info">
                <h3 class="pedido-titulo">${pedido.titulo}</h3>
                <p class="pedido-detalhe">Prestador: <strong>${pedido.prestador}</strong></p>
                <p class="pedido-detalhe">Valor: ${pedido.valor}</p>
                <p class="pedido-detalhe" style="font-size: 0.8rem; margin-top: 5px; color: #888;">Contratado em: ${pedido.data}</p>
                <span class="status-badge ${classeStatus}">${iconeStatus} ${pedido.status}</span>
            </div>

            <div class="pedido-acoes">
                <button class="btn-acao btn-detalhes" onclick="alert('Abrindo chat com ${pedido.prestador}...')">💬 Chat</button>
                
                ${(pedido.status === 'Pendente' || pedido.status === 'Em Andamento') ? 
                    `<button class="btn-acao btn-cancelar" onclick="cancelarPedido(${index})">Cancelar Serviço</button>` : ''}
                
                ${pedido.status === 'Concluído' ? 
                    `<button class="btn-acao btn-contato" onclick="alert('Redirecionando...')">Contratar Novamente</button>` : ''}
            </div>
        </div>
        `;
        
        container.innerHTML += htmlCard;
    });
}

// Cancela um pedido
function cancelarPedido(index) {
    if(confirm("Tem certeza que deseja cancelar este serviço?")) {
        let pedidos = JSON.parse(localStorage.getItem("meus_pedidos_contratados")) || [];
        pedidos.splice(index, 1); // Remove o pedido da lista
        localStorage.setItem("meus_pedidos_contratados", JSON.stringify(pedidos));
        carregarPedidosNaTela(); // Atualiza a tela
    }
}

// Deixa a função disponível pro onclick
window.cancelarPedido = cancelarPedido;