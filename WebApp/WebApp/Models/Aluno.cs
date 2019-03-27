using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Hosting;

namespace WebApp.Models
{
    public class Aluno
    {
        public int id { get; set; }
        public string nome { get; set; }
        public string sobrenome { get; set; }
        public string telefone { get; set; }
        public int ra { get; set; }

        public List<Aluno> ListarAluno()
        {
            var caminhoArquivo = HostingEnvironment.MapPath(@"~/App_Data/Base.json");
            var json = File.ReadAllText(caminhoArquivo);
            var listaAluno = JsonConvert.DeserializeObject<List<Aluno>>(json);

            return listaAluno;
        }

        public bool RescreverArquivo (List<Aluno> listaAluno)
        {
            var caminhoArquivo = HostingEnvironment.MapPath(@"~/App_Data/Base.json");

            var json = JsonConvert.SerializeObject(listaAluno, Formatting.Indented);
            File.WriteAllText(caminhoArquivo, json);

            return true;
        }

        public Aluno Inserir (Aluno aluno_p)
        {
            var listaAluno = this.ListarAluno();

            var maxId = listaAluno.Max(p => p.id);
            aluno_p.id = maxId + 1;
            listaAluno.Add(aluno_p);

            RescreverArquivo(listaAluno);

            return aluno_p;
        }

        public Aluno Atualizar (int id, Aluno aluno_p)
        {
            var listaAlunos = this.ListarAluno();
            //Entender essa condição????
            var itemIndex = listaAlunos.FindIndex(p => p.id == id);
            if (itemIndex >= 0)
            {
                aluno_p.id = id;
                listaAlunos[itemIndex] = aluno_p;
            }
            else
            {
                return null;
            }

            RescreverArquivo(listaAlunos);
            return aluno_p;
        }

        public bool Deletar (int id)
        {
            var listaAlunos = this.ListarAluno();

            var itemIndex = listaAlunos.FindIndex(p => p.id == id);
            if (itemIndex >= 0)
            {
                listaAlunos.RemoveAt(itemIndex);
            }
            else
            {
                return false;
            }

            RescreverArquivo(listaAlunos);
            return true;
        }
    }
}