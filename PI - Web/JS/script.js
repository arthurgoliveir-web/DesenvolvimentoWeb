// Animação de fade-in da imagem de fundo sempre que a página carrega
// Deu muita merda aqui, se tiver algo errado é por causa disso, mas deve ta funcionando agora
//Eu não entendo totalmente esse codigo, eu usei um pouco de ai e outras coisas, mas ta funcionando
//Tem muitas coisas tecnicas e sobre desempenho pra fazer uma animação suave na imagem do fundo
//Mas eu não manjo muito disso ainda, então fiz o que deu pra fazer, se quiser melhorar é melhor fazer do começo
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.fundo-vitrine');
    const bg = container ? container.querySelector('.bg-vitrine') : null;
    if (!container || !bg) return;

    container.classList.remove('loaded');

    const show = () => container.classList.add('loaded');

    if (bg.complete && bg.naturalWidth > 0) {
 
        requestAnimationFrame(show);
    } else {

        bg.addEventListener('load', show, { once: true });

        setTimeout(show, 1500);
    }
});

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

    // Verifica se os elementos existem antes de usar
    if (!form || !emailInput || !senhaInput) return;

    const reMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const vMail = (valor) => reMail.test(valor.trim());

    const reSenha = /.{6,}/;
    const vSenha = (valor) => reSenha.test(valor);

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
    
    // Verifica se os elementos existem antes de usar
    if (!busca || !lista || !sugestoes) return;
    
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

    // Verifica redirecionamento
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');
    
    if (redirect === 'checkout') {
        window.location.href = "../PI - Checkout/PI - Checkout.html";
    } else {
        window.location.href = "PI - Area Logada.html";
    }
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
    localStorage.removeItem("email"); // Remove também o email para limpar o carrinho da sessão

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

  // Se não estiver na página de detalhes, não faz nada
  if (!main || !titulo) return;

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

// Sistema de avaliação por estrelas
document.addEventListener("DOMContentLoaded", () => {
  const estrelas = document.querySelectorAll(".estrela");
  const resultado = document.getElementById("resultado-avaliacao");
  
  // Verifica se os elementos existem
  if (estrelas.length === 0 || !resultado) return;
  
  const idProduto = getQueryParam('id');
  const email = localStorage.getItem('email');
  
  // Carregar avaliação salva
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
    estrela.addEventListener("mouseover", () => {
      estrelas.forEach((e, i) => {
        e.classList.toggle("hover", i <= index);
      });
    });

    estrela.addEventListener("mouseout", () => {
      estrelas.forEach(e => e.classList.remove("hover"));
    });

    estrela.addEventListener("click", () => {
      const email = localStorage.getItem('email');
      if (!email) {
          alert("Você precisa estar logado para avaliar.");
          window.location.href = "../PI - Login/PI - Login.html";
          return;
      }

      const avaliacao = index + 1;
      resultado.textContent = `Você avaliou com ${avaliacao} estrela${avaliacao > 1 ? "s" : ""}.`;
      estrelas.forEach((e, i) => {
        e.classList.toggle("selecionada", i < avaliacao);
      });
      
      // Salvar avaliação
      if (idProduto) {
          localStorage.setItem(`avaliacao_${email}_${idProduto}`, avaliacao);
      }
    });
  });
});

// Sistema de Busca Simples com Popup
document.addEventListener('DOMContentLoaded', function() {
    var iconesBusca = document.querySelectorAll('img[alt="Procurar"]');
    
    iconesBusca.forEach(function(img) {
        // Encontra o container correto (span) para posicionar o popup
        var container = img.closest('span');
        if (!container) return;
        
        container.style.position = 'relative';
        img.style.cursor = 'pointer';
        
        // Cria o elemento do popup
        var popup = document.createElement('div');
        popup.className = 'search-popup';
        popup.innerHTML = 
            '<input type="text" placeholder="Buscar serviço...">' +
            '<button>🔍</button>';
        
        // Adiciona ao container
        container.appendChild(popup);
        
        var input = popup.querySelector('input');
        var btn = popup.querySelector('button');
        
        // Função que faz a busca funcionar
        function realizarBusca() {
            var termo = input.value.trim();
            
            if (termo !== "") {
                var termoMinusculo = termo.toLowerCase();
                var termoLimpo = removerAcentos(termoMinusculo);

                // Função simples para mudar de página
                function irPara(pagina) {
                    window.location.href = pagina;
                }

                // --- Redirecionamentos (Palavras-chave) ---

                // 1. Ajuda e Suporte
                var palavrasAjuda = ['ajuda', 'suporte', 'duvidas', 'faq', 'contato', 'socorro'];
                for (var i = 0; i < palavrasAjuda.length; i++) {
                    if (termoLimpo.includes(palavrasAjuda[i])) {
                        irPara("../PI - Ajuda/PI - Ajuda.html");
                        return;
                    }
                }
                
                // 2. Início e Home
                var palavrasInicio = ['inicio', 'home', 'comeco', 'inicial', 'principal', 'vitrine', 'voltar'];
                for (var i = 0; i < palavrasInicio.length; i++) {
                    if (termoLimpo.includes(palavrasInicio[i])) {
                        irPara("../PI - Página Inicial/PI - Pagina Inicial.html");
                        return;
                    }
                }
                
                // 3. Sobre e Quem Somos
                var palavrasSobre = ['sobre', 'quem somos', 'empresa', 'nos', 'historia'];
                for (var i = 0; i < palavrasSobre.length; i++) {
                    if (termoLimpo.includes(palavrasSobre[i])) {
                        irPara("../PI - Sobre/PI - Sobre.html");
                        return;
                    }
                }
                
                // 4. Login e Cadastro
                var palavrasLogin = ['login', 'entrar', 'acessar', 'logar', 'signin'];
                for (var i = 0; i < palavrasLogin.length; i++) {
                    if (termoLimpo.includes(palavrasLogin[i])) {
                        irPara("../PI - Login/PI - Login.html");
                        return;
                    }
                }

                var palavrasCadastro = ['cadastro', 'cadastrar', 'criar conta', 'inscrever', 'registro', 'signup'];
                for (var i = 0; i < palavrasCadastro.length; i++) {
                    if (termoLimpo.includes(palavrasCadastro[i])) {
                        irPara("../PI - Login/PI - Cadastro.html");
                        return;
                    }
                }
                
                // 5. Carrinho
                var palavrasCarrinho = ['carrinho', 'cesta', 'compras', 'pedido', 'sacola'];
                for (var i = 0; i < palavrasCarrinho.length; i++) {
                    if (termoLimpo.includes(palavrasCarrinho[i])) {
                        irPara("../PI - Carrinho/PI - Carrinho.html");
                        return;
                    }
                }

                // 6. Serviços (Geral)
                var palavrasServicos = ['servicos', 'todos', 'lista', 'catalogo', 'produtos'];
                for (var i = 0; i < palavrasServicos.length; i++) {
                    if (termoLimpo === palavrasServicos[i] || termoLimpo === palavrasServicos[i] + 's') {
                        // Vai para a página de serviços sem filtro
                        var destino = "../PI - Serviços/PI - Serviços.html";
                        if (window.location.pathname.includes("/PI - Serviços/")) {
                            destino = "PI - Serviços.html";
                        }
                        window.location.href = destino;
                        return;
                    }
                }

                // --- Busca Padrão (Filtro) ---
                var paginaDestino = "../PI - Serviços/PI - Serviços.html";
                var caminhoAtual = window.location.pathname;
                
                // Arruma o caminho dependendo de onde a gente está
                if (caminhoAtual.includes("/PI - Serviços/")) {
                    paginaDestino = "PI - Serviços.html";
                } else if (caminhoAtual.includes("/PI - Página Inicial/")) {
                    paginaDestino = "../PI - Serviços/PI - Serviços.html";
                }
                
                // Vai para a página com o termo da busca
                window.location.href = paginaDestino + "?busca=" + encodeURIComponent(termo);
            }
        }
        
        // Eventos do Popup
        popup.addEventListener('click', function(e) {
            e.stopPropagation(); // Não fecha ao clicar dentro
        });

        btn.addEventListener('click', realizarBusca);
        
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                realizarBusca();
            }
        });
        
        // Evento de abrir/fechar ao clicar no ícone
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
            
            // Abre ou fecha o atual
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
    
    // Fecha popup ao clicar fora
    document.addEventListener('click', function() {
        document.querySelectorAll('.search-popup.active').forEach(function(p) {
            p.classList.remove('active');
        });
    });

    // Executar busca se houver parâmetro na URL
    var params = new URLSearchParams(window.location.search);
    var busca = params.get('busca');
    
    // Verifica se estamos na página de serviços
    var urlAtual = decodeURIComponent(window.location.href);
    var ehPaginaServicos = urlAtual.includes("PI - Serviços.html") || document.querySelector('.categoria');

    if (busca && ehPaginaServicos) {
        var termo = removerAcentos(busca.toLowerCase());
        
        // Limpar seleção lateral
        var menuLateral = document.querySelectorAll('.menu-lateral li');
        if (menuLateral) {
            menuLateral.forEach(function(li) {
                li.classList.remove('ativo');
            });
        }
        
        // Mostrar todas as categorias inicialmente
        document.querySelectorAll('.categoria').forEach(function(cat) {
            cat.classList.add('active');
        });
        
        var encontrouAlgum = false;
        
        // Filtrar cards
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
        
        // Esconder categorias vazias
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
        
        // Atualizar título da página
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

// === SISTEMA DE CARRINHO SIMPLIFICADO ===

// Obter carrinho do localStorage (suporta login)
function obterCarrinho() {
    try {
        var email = localStorage.getItem('email');
        if (!email) return []; // Retorna vazio se não estiver logado

        var key = 'carrinho_' + email;
        var dados = localStorage.getItem(key);
        return dados ? JSON.parse(dados) : [];
    } catch (e) {
        return [];
    }
}

// Salvar carrinho no localStorage (suporta login)
function salvarCarrinho(carrinho) {
    var email = localStorage.getItem('email');
    if (!email) return; // Não salva se não estiver logado

    var key = 'carrinho_' + email;
    localStorage.setItem(key, JSON.stringify(carrinho));
}

// Adicionar item ao carrinho
function adicionarAoCarrinho() {
    // Verifica se está logado antes de qualquer coisa
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
    
    // Verifica se já está no carrinho
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
    
    // Adiciona ao carrinho
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

// Remover item do carrinho
function removerDoCarrinho(id) {
    var carrinho = obterCarrinho();
    var novoCarrinho = [];
    for(var i=0; i<carrinho.length; i++) {
        if(carrinho[i].id !== id) {
            novoCarrinho.push(carrinho[i]);
        }
    }
    salvarCarrinho(novoCarrinho);
    carregarCarrinho();
}

// Exibir carrinho na página
function carregarCarrinho() {
    var carrinhoVazio = document.getElementById('carrinho-vazio');
    var carrinhoLista = document.getElementById('carrinho-lista');
    var carrinhoResumo = document.getElementById('carrinho-resumo');
    
    // Se não está na página do carrinho, retorna
    if (!carrinhoLista) return;
    
    var carrinho = obterCarrinho();
    
    // Carrinho vazio
    if (carrinho.length === 0) {
        carrinhoVazio.style.display = 'block';
        carrinhoLista.style.display = 'none';
        carrinhoResumo.style.display = 'none';
        return;
    }
    
    // Carrinho com itens
    carrinhoVazio.style.display = 'none';
    carrinhoLista.style.display = 'block';
    carrinhoResumo.style.display = 'block';
    
    // Gera HTML dos itens para exibir na lista
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
    
    // Atualiza valores
    var totalFormatado = total.toFixed(2).replace('.', ',');
    document.getElementById('subtotal').textContent = 'R$ ' + totalFormatado;
    document.getElementById('total').textContent = 'R$ ' + totalFormatado;
}

// Finalizar compra
function finalizarCompra() {
    var carrinho = obterCarrinho();
    
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    // Verifica se está logado
    var email = localStorage.getItem('email');
    if (!email) {
        var confirmacao = confirm('Você precisa estar logado para finalizar a compra. Deseja fazer login agora?');
        if (confirmacao) {
            window.location.href = '../PI - Login/PI - Login.html?redirect=checkout';
        }
        return;
    }
    
    // Redireciona para a página de checkout
    window.location.href = '../PI - Checkout/PI - Checkout.html';
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    carregarCarrinho();
});

// Também tenta carregar imediatamente para páginas já carregadas
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(carregarCarrinho, 100);
}

// Expor funções globalmente
window.adicionarAoCarrinho = adicionarAoCarrinho;
window.removerDoCarrinho = removerDoCarrinho;
window.finalizarCompra = finalizarCompra;
window.carregarCarrinho = carregarCarrinho;

// === LÓGICA DE CHECKOUT ===

document.addEventListener('DOMContentLoaded', function() {
    carregarResumoCheckout();
});

function carregarResumoCheckout() {
    var carrinho = obterCarrinho();
    var listaItens = document.getElementById('lista-itens-resumo');
    
    if (!listaItens) return;

    if (carrinho.length === 0) {
        window.location.href = '../PI - Carrinho/PI - Carrinho.html';
        return;
    }

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
    
    var totalFormatado = 'R$ ' + total.toFixed(2).replace('.', ',');
    var subtotalEl = document.getElementById('resumo-subtotal');
    var totalEl = document.getElementById('resumo-total');
    
    if(subtotalEl) subtotalEl.textContent = totalFormatado;
    if(totalEl) totalEl.textContent = totalFormatado;
}

function selecionarPagamento(elemento, metodo) {
    // Remove seleção anterior
    document.querySelectorAll('.metodo-opcao').forEach(function(el) {
        el.classList.remove('selected');
    });
    
    // Seleciona novo
    elemento.classList.add('selected');
    
    // Mostra/esconde formulário de cartão
    var formCartao = document.getElementById('form-cartao');
    if (metodo === 'cartao') {
        formCartao.style.display = 'block';
    } else {
        formCartao.style.display = 'none';
    }
}

function confirmarPedido() {
    // Validação básica
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var endereco = document.getElementById('endereco').value;

    if (!nome || !email || !endereco) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    alert('Pedido confirmado com sucesso, ' + nome + '!\nEnviaremos os detalhes para ' + email + '.');
    
    // Limpa o carrinho do usuário e redireciona
    var userEmail = localStorage.getItem('email');
    if (userEmail) {
        localStorage.removeItem('carrinho_' + userEmail);
    } else {
        localStorage.removeItem('carrinho');
    }
    
    window.location.href = '../PI - Página Inicial/PI - Pagina Inicial.html';
}
window.selecionarPagamento = selecionarPagamento;
window.confirmarPedido = confirmarPedido;


