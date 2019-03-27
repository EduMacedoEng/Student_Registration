		var tbody = document.querySelector('table tbody');
		var aluno = {}; 
		carregarEstudantes();

		function Cadastrar(){
			aluno.nome = document.querySelector('#nome').value;
			aluno.sobrenome = document.querySelector('#sobrenome').value;
			aluno.telefone = document.querySelector('#telefone').value;
			aluno.ra = document.querySelector('#ra').value;
			
			console.log(aluno);

			if (aluno.id === undefined || aluno.id === 0){
				salvarEstudantes('POST', 0, aluno);
				aluno = {};
			}
			else
			{
				salvarEstudantes('PUT', aluno.id, aluno);
			}


			carregarEstudantes();

			$(`#myModal`).modal('hide');

		}

		function Cancelar(){
			var btnSalvar = document.querySelector('#btnSalvar');
			var tituloModal = document.querySelector('#tituloModal');

			document.querySelector('#nome').value = '';
			document.querySelector('#sobrenome').value = '';
			document.querySelector('#telefone').value = '';
			document.querySelector('#ra').value = '';

			aluno = {};

			btnSalvar.textContent = 'Cadastrar';

			tituloModal.textContent = 'Cadastrar Aluno';

			$(`#myModal`).modal('hide');
		}

		function Editar(estudante){
			var btnSalvar = document.querySelector('#btnSalvar');
			var tituloModal = document.querySelector('#tituloModal');

			document.querySelector('#nome').value = estudante.nome;
			document.querySelector('#sobrenome').value = estudante.sobrenome;
			document.querySelector('#telefone').value = estudante.telefone;
			document.querySelector('#ra').value = estudante.ra;

			btnSalvar.textContent = 'Salvar';

			tituloModal.textContent = `Editar Aluno(a) ${estudante.nome}`;

			aluno = estudante;

			console.log(aluno);

		}

		function Excluir (id) {
			var xhr = new XMLHttpRequest();

			xhr.open(`DELETE`,`http://localhost:60081/api/Aluno/${id}`, false); 
			
			xhr.send();
		}

		function excluirEstudantes (estudante){
			
			bootbox.confirm({
				message: `Você tem certeza que deseja excluir o(a) ${estudante.nome} ?`,
				buttons: {
					cancel: {
						label: '<i class="fa fa-times"></i> Não',
						className: 'btn-danger'
					},
					confirm: {
						label: '<i class="fa fa-check"></i> Sim',
						className: 'btn-success'
					}
				},
				callback: function (result) {
					if(result){
						Excluir(estudante.id);
						carregarEstudantes();	
					}
				}
			});
			
			
		}

		function novoAluno() {
			var btnSalvar = document.querySelector('#btnSalvar');
			var tituloModal = document.querySelector('#tituloModal');

			document.querySelector('#nome').value = '';
			document.querySelector('#sobrenome').value = '';
			document.querySelector('#telefone').value = '';
			document.querySelector('#ra').value = '';

			aluno = {};

			btnSalvar.textContent = 'Cadastrar';

			tituloModal.textContent = 'Cadastrar Aluno';

			$(`#myModal`).modal('show');
		}
		
		function carregarEstudantes () {
			tbody.innerHTML = '';

			var xhr = new XMLHttpRequest();

			xhr.open(`GET`,`http://localhost:60081/api/Aluno`, true); 
			
			xhr.onload = function () { 
				var estudantes = JSON.parse(this.responseText); 
				for(var indice in estudantes){
					adicionaLinha(estudantes[indice]);
				}
			}

			xhr.send();
		}

		function salvarEstudantes (metodo, id, corpo) {
			var xhr = new XMLHttpRequest();

			if (id === undefined || id === 0)
				id = '';

			xhr.open(metodo,`http://localhost:60081/api/Aluno/${id}`, false); 
			
			xhr.setRequestHeader('content-type', 'application/json');
			xhr.send(JSON.stringify(corpo));
		}

		function adicionaLinha(estudante){
			var trow = ` <tr>
			<td>${estudante.nome}</td>
			<td>${estudante.sobrenome}</td>
			<td>${estudante.telefone}</td>
			<td>${estudante.ra}</td>
			<td>
			<button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick = 'Editar(${JSON.stringify(estudante)})'>Editar</button>
			<button class="btn btn-danger" onclick = 'excluirEstudantes(${JSON.stringify(estudante)})'>Excluir</button>
			</td>
			</tr>
			`;

			tbody.innerHTML += trow;
		}