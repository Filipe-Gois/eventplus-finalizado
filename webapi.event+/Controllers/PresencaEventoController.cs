using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapi.event_.Domains;
using webapi.event_.Interfaces;
using webapi.event_.Repositories;

namespace webapi.event_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class PresencaEventoController : ControllerBase
    {
        private IPresencasEventoRepository _presencasEventoRepository;

        public PresencaEventoController()
        {
            _presencasEventoRepository = new PresencaRepository();
        }


        /// <summary>
        /// Método para listar todas as presenças de todos os eventos
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return StatusCode(200, _presencasEventoRepository.Listar());
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Busca uma presença pelo id da presença
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("BuscarPorId{id}")]
        public IActionResult BuscarPorId(Guid id)
        {
            try
            {
                return StatusCode(200, _presencasEventoRepository.BuscarPorId(id));
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Método para excluir uma presença através do id da presença
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        public IActionResult Deletar(Guid id)
        {
            try
            {
                _presencasEventoRepository.Deletar(id);

                return NoContent();

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Método para confirmar a presença em um evento
        /// </summary>
        /// <param name="presencasEvento"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Post(PresencasEvento presencasEvento)
        {
            try
            {
                _presencasEventoRepository.Inscrever(presencasEvento);
                return StatusCode(201);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Método para listar todos os eventos em que UM usuário está inscrito através do id usuario
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public IActionResult GetMyList(Guid id)
        {
            try
            {
                return StatusCode(200, _presencasEventoRepository.ListarMinhas(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
