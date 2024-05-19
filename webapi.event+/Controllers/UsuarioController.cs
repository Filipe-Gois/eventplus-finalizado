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
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuarioController()
        {
            _usuarioRepository = new UsuarioRepository();
        }

        [HttpPost]
        public IActionResult Post(Usuario usuario, bool isCreateAccountGoogle = false)
        {
            try
            {
                Usuario usuarioAserCadastrado = new();

                usuarioAserCadastrado.Nome = usuario.Nome;
                usuarioAserCadastrado.Email = usuario.Email;

                usuarioAserCadastrado.IdTipoUsuario = usuario.IdTipoUsuario;

                if (!isCreateAccountGoogle)
                {
                    usuarioAserCadastrado.Senha = usuario.Senha;
                }
                else
                {
                    usuarioAserCadastrado.GoogleIdAccount = usuario.GoogleIdAccount;
                }


                _usuarioRepository.Cadastrar(usuario, isCreateAccountGoogle);

                return StatusCode(201, usuario);
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }

        [HttpGet("BuscarPorIdGoogle")]
        public IActionResult Get(string email, string googleIdAccount)
        {
            try
            {
                Usuario usuarioBuscado = _usuarioRepository.BuscarPorEmailEGoogleId(email, googleIdAccount);

                if (usuarioBuscado == null)
                {
                    return StatusCode(404);
                }


                return StatusCode(200, usuarioBuscado);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

    }
}
