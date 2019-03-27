using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApp.Models;

namespace WebApp.Controllers {
    [EnableCors("*","*","*")]
    public class AlunoController : ApiController {
        // GET: api/Aluno
        public IEnumerable<Aluno> Get() {//Retornar uma lista de alunos.
            Aluno aluno = new Aluno();
            return aluno.ListarAluno();
                 
        }

        // GET: api/Aluno/5
        public Aluno Get(int id) { //Retorna um aluno de acordo com o parametro que passarmos.
            Aluno aluno = new Aluno();

            return aluno.ListarAluno().Where(x => x.id == id).FirstOrDefault();

        }

        // POST: api/Aluno
        public List<Aluno> Post(Aluno aluno_p) {
            Aluno aluno = new Aluno();

            aluno.Inserir(aluno_p);

            return aluno.ListarAluno();
        }

        // PUT: api/Aluno/5
        public Aluno Put(int id, [FromBody]Aluno aluno_p) { //Esse from body é para lembrar que eu vou sempre passar via body
            Aluno aluno = new Aluno();

            return aluno.Atualizar(id, aluno_p);
        }

        // DELETE: api/Aluno/5
        public void Delete(int id) {
            Aluno aluno = new Aluno();

            aluno.Deletar(id);
            
        }
    }
}
