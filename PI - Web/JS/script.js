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