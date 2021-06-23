function ControleBiblioteca() {
	let visaoMenu = new MenuTexto(this);
	let visaoFormulario = new FormularioGrafico(this);
	let visaoListar = new ListaGrafica(this);
	let biblioteca = new BibliotecaPromessa();
	this.menu = function () {
		visaoMenu.menu();
	}
	this.formularioCadastro = function () {
		visaoFormulario.cadastrar();
	}
	this.formularioEdicao = function (id) {
		let artigo = biblioteca.buscarPorId(id);
		console.log('editando ' + id, artigo);
		visaoFormulario.editar(artigo, id);
	}
	this.editar = function (artigo, id) {
		biblioteca.editar(artigo, id);
		this.listar();
	}
	this.cadastrar = function (artigo) {
		biblioteca.cadastrar(artigo);
		this.listar();
	}
	this.listar = function () {
		//Com Promessa Resumida
		let promessa = biblioteca.listar();
		promessa.then((artigos) => {
			visaoListar.listar(artigos);
		});
	}
	this.apagar = function (id) {
		biblioteca.apagar(id);
		this.listar();
	}
}

function Biblioteca() {
	let artigos = [];
	this.listar = function () {
		function pausecomp(millis) {
			var date = new Date();
			var curDate = null;
			do { curDate = new Date(); }
			while(curDate-date < millis);
		}
		pausecomp(2000);
		return artigos;
	}
	this.cadastrar = function (artigo) {
		artigos.push(artigo);
	}
	this.apagar = function (id) {
		artigos.splice(id, 1);
	}
	this.buscarPorId = function (id) {
		return artigos[id];
	}
	this.editar = function (artigo, id) {
        artigos[id] = artigo
	}

}

function BibliotecaCallBack() {
	let artigos = [];
	this.listar = function (callback) {
		setTimeout(() => {  callback(artigos); }, 2000);
	}
	this.cadastrar = function (artigo) {
		artigos.push(artigo);
	}
	this.apagar = function (id) {
		artigos.splice(id, 1);
	}
	this.buscarPorId = function (id) {
		return artigos[id];
	}
	this.editar = function (artigo, id) {
        artigos[id] = artigo
	}

}

function BibliotecaPromessa() {
	let artigos = [];
	this.listar = function () {
		let promessa = new Promise(function (resolve, reject) {
			setTimeout(() => {  resolve(artigos); }, 2000);
		});
		return promessa;
	}
	this.cadastrar = function (artigo) {
		artigos.push(artigo);
	}
	this.apagar = function (id) {
		artigos.splice(id, 1);
	}
	this.buscarPorId = function (id) {
		return artigos[id];
	}
	this.editar = function (artigo, id) {
        artigos[id] = artigo
	}

}

function BibliotecaFetch() {
	let url = '/biblioteca/listar';
	this.listar = function () {
		fetch(url);
	}
	this.cadastrar = function (artigo) {
		artigos.push(artigo);
	}
	this.apagar = function (id) {
		artigos.splice(id, 1);
	}
	this.buscarPorId = function (id) {
		return artigos[id];
	}
	this.editar = function (artigo, id) {
        artigos[id] = artigo
	}

}

function ListaTexto() {
	this.listar = function (artigos) {
		alert('Listar');
		let saida = '';
		for (let artigo of artigos) {
			saida += artigo.titulo + ',' + artigo.ano + ',' + tempo(artigo) + '\n';
		}
		alert(saida);
	}
}
function FormularioTexto(controle) {
	this.cadastrar = function () {
		alert('Cadastrar Tecnologia');
		let titulo = prompt('Digite o titulo: ');
		let descricao = prompt('Digite a descrição: ');
		let texto = prompt('Digite o texto: ');
		let imagem = prompt('Nome da sua imagem: ');
		let ano = parseInt(prompt('Ano da noticia: '));
		let artigo = {
			titulo: titulo,
			descricao: descricao,
			texto: texto,
			imagem: imagem,
			ano: ano
		};
		controle.cadastrar(artigo);
	}
	this.editar = function(artigo, id) {
		let titulo = prompt('Digite o titulo [' + artigo.titulo + ']: ');
		let descricao = prompt('Digite a descrição [' + artigo.descricao + ']: ');
		let texto = prompt('Digite o texto [' + artigo.texto + ']: ');
		let imagem = prompt('Nome da sua imagem [' + artigo.imagem + ']: ');
		let ano = parseInt(prompt('Ano da noticia [' + artigo.ano + ']: '));
		if (titulo) {
			artigo.titulo = titulo;
		}
		if (descricao) {
			artigo.descricao = descricao;
		}
		if (texto) {
			artigo.texto = texto;
		}
		if (imagem) {
			artigo.imagem = imagem;
		}
		if (ano) {
			artigo.ano = ano;
		}
		controle.editar(artigo, id);
	}
}

function MenuTexto(controle) {
	this.menu = function () {
		externo: while (true) {
			let resposta = parseInt(prompt('1 - Cadastrar Tecnologia\n2 - Listar Tecnologia\n3 - Sair\nDigite a opção desejada: '));
			switch (resposta) {
				case 1:
					controle.formularioCadastro();
					break;
				case 2:
					controle.listar();
					break;
				case 3:
					alert('Sair');
					break externo;
				default:
					alert('Opção Inválida');
			}
		}	
	}
}

window.controle = new ControleBiblioteca();

//Modelo 
function tempo(artigo) {
	let ano_atual = 2021;
	let tempo = ano_atual - artigo.ano;
	return tempo;
}

function ListaGrafica(controle) {
	this.listar = function (artigos) {
		let tabela = document.querySelector('table');
		let body = tabela.tBodies[0];
		body.innerText = '';
		for (let id in artigos) {
			let artigo = artigos[id];
			let linha = document.createElement('tr');
			let coluna_titulo = document.createElement('td');
			let coluna_ano = document.createElement('td');
			let coluna_tempo = document.createElement('td');
			let coluna_acoes = document.createElement('td');
			let botao_editar = document.createElement('button');
			let botao_apagar = document.createElement('button');
			coluna_titulo.innerText = artigo.titulo;
			coluna_ano.innerText = artigo.ano;
			coluna_tempo.innerText = tempo(artigo);
			botao_editar.innerText = 'Editar';
			botao_apagar.innerText = 'Apagar';
			botao_apagar.onclick = function () {
				controle.apagar(id);
			};
			botao_editar.onclick = function () {
				controle.formularioEdicao(id);
			};
			linha.append(coluna_titulo);
			linha.append(coluna_ano);
			linha.append(coluna_tempo);
			linha.append(coluna_acoes);
			coluna_acoes.append(botao_editar);
			coluna_acoes.append(botao_apagar);
			body.append(linha);
		}
		
	}
}

function FormularioGrafico(controle) {
	this.cadastrar = function () {
	    document.getElementById('titulo').focus();
	}
	this.editar = function(artigo, id) {
		document.getElementById('id').value = id;
		let txTitulo = document.getElementById('titulo');
		let txDescricao = document.getElementById('descricao');
		let txTexto = document.getElementById('descricao');
		let txImagem = document.getElementById('imagem');
		let txAno = document.getElementById('ano');

		txTitulo.value = artigo.titulo;
		txDescricao.value = artigo.descricao;
		txTexto.value = artigo.texto;
		txImagem.value = artigo.imagem;
		txAno.value = artigo.ano;
	}
}

function aoSubmeter() {
	let id = document.getElementById('id').value;
	let txTitulo = document.getElementById('titulo');
	let txDescricao = document.getElementById('descricao');
	let txTexto = document.getElementById('texto');
	let txImagem = document.getElementById('imagem');
	let txAno = document.getElementById('ano');
	let artigo = {
		titulo: txTitulo.value,
		descricao: txDescricao.value,
		texto: txTexto.value,
		imagem: txImagem.value,
		ano: txAno.value
	};
	if (id == '') {
		controle.cadastrar(artigo);
	}
	else {
		controle.editar(artigo, id);
	}
}