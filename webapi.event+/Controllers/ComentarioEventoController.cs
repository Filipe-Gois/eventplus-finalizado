using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.CognitiveServices.ContentModerator;
using System.Text;
using webapi.event_.Contexts;
using webapi.event_.Domains;
using webapi.event_.Interfaces;
using webapi.event_.Repositories;

namespace webapi.event_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ComentarioEventoController : ControllerBase
    {
        //acesso aos metodos do repositorio
        ComentariosEventoRepository _comentariosEventoRepository = new ComentariosEventoRepository();

        //armazena os dados da API externa (AI)
        private readonly ContentModeratorClient _contentModeratorClient;


        /// <summary>
        /// Construtor que recebe os dados necessarios para o acesso ao serviço externo
        /// </summary>
        /// <param name="contentModeratorClient">objeto do tipo contentModerator</param>
        public ComentarioEventoController(ContentModeratorClient contentModeratorClient)
        {
            _contentModeratorClient = contentModeratorClient;
        }

        /// <summary>
        /// Cadastro de comentario gerenciado pela IA (ela analise se a descrição possui um termo ofensivo ou não)
        /// </summary>
        /// <param name="comentarioEvento"></param>
        /// <returns></returns>
        [HttpPost("CadastroIa")]
        public async Task<IActionResult> PostIa(ComentariosEvento comentarioEvento)
        {
            try
            {
                if (string.IsNullOrEmpty(comentarioEvento.Descricao))
                {
                    return BadRequest("O texto não pode ser vazio!");
                }

                //converte a string (descricao do comentario) em um MemoryStream
                using var stream = new MemoryStream(Encoding.UTF8.GetBytes(comentarioEvento.Descricao));

                //realiza a moderação do conteudo (descrição do comentario)
                var moderationResult = await _contentModeratorClient.TextModeration
                    .ScreenTextAsync("text/plain", stream, "por", false, false, null, true);


                //Evento eventoBuscado = _context.Evento.FirstOrDefault(e => e.IdEvento == comentarioEvento.IdEvento)!;

                //se existir termos ofensivos
                if (moderationResult.Terms != null /*&& eventoBuscado.DataEvento < DateTime.Now*/)
                {
                    //atribuir false para exibe
                    comentarioEvento.Exibe = false;

                    //cadastra o comentario
                    _comentariosEventoRepository.Cadastrar(comentarioEvento);
                }
                else
                {
                    comentarioEvento.Exibe = true;

                    //cadastra o comentario
                    _comentariosEventoRepository.Cadastrar(comentarioEvento);
                }

                return StatusCode(201);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Lista somente os comentários com "TRUE"
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("ListarSomenteExibe")]
        public IActionResult GetIa(Guid id)
        {
            try
            {
                return StatusCode(200, _comentariosEventoRepository.ListarSomenteExibe(id));
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }




        /// <summary>
        /// Lista todos os comentários de um evento
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get(Guid id)
        {
            try
            {
                return StatusCode(200, _comentariosEventoRepository.Listar(id));
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }


        /// <summary>
        /// Lista um comentário pelo id do usuario e o id do evento
        /// </summary>
        /// <param name="idUsuario"></param>
        /// <param name="idEvento"></param>
        /// <returns></returns>
        [HttpGet("BuscarPorIdUsuario/{id}")]
        public IActionResult GetByIdUser(Guid idUsuario, Guid idEvento)
        {
            try
            {
                return StatusCode(200, _comentariosEventoRepository.BuscarPorIdUsuario(idUsuario, idEvento));
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public IActionResult Post(ComentariosEvento novoComentario)
        {
            try
            {
                _comentariosEventoRepository.Cadastrar(novoComentario);

                return StatusCode(201, novoComentario);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Exclui um comentario atraves do id do comentario
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        public IActionResult DeleteByIdComentary(Guid id)
        {
            try
            {
                _comentariosEventoRepository.Deletar(id);
                return StatusCode(204);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
    }
}
