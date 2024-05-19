using Microsoft.EntityFrameworkCore;
using webapi.event_.Contexts;
using webapi.event_.Domains;
using webapi.event_.Interfaces;
using webapi.event_.Utils;

namespace webapi.event_.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly Event_Context _context;

        public UsuarioRepository()
        {
            _context = new Event_Context();
        }

        public Usuario BuscarPorId(Guid id)
        {
            try
            {
                Usuario usuarioBuscado = _context.Usuario
                    .Select(u => new Usuario
                    {
                        IdUsuario = u.IdUsuario,
                        Nome = u.Nome,
                        Email = u.Email,
                        Senha = u.Senha,

                        TipoUsuario = new TiposUsuario
                        {
                            Titulo = u.TipoUsuario!.Titulo
                        }

                    }).FirstOrDefault(u => u.IdUsuario == id)!;

                if (usuarioBuscado != null)
                {
                    return usuarioBuscado;

                }
                return null!;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(Usuario usuario, bool isCreateAccountGoogle = false)
        {
            try
            {
                if (!isCreateAccountGoogle && usuario.Senha != null)
                {
                    usuario.Senha = Criptografia.GerarHash(usuario.Senha!);

                }

                if (usuario.Senha != null && usuario.GoogleIdAccount != null)
                {
                    throw new Exception("Não é possível cadastrar uma conta google com senha!");
                }

                if (usuario.Senha == null && usuario.GoogleIdAccount == null)
                {
                    throw new Exception("Informe uma senha ou um Google id!");
                }

                if (usuario.Senha == null && !isCreateAccountGoogle)
                {
                    throw new Exception("Cadastre uma senha!");
                }

                if (usuario.GoogleIdAccount == null || usuario.GoogleIdAccount == "" && isCreateAccountGoogle)
                {
                    throw new Exception("Cadastre um id google!");
                }

                _context.Usuario.Add(usuario);


                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }


        public Usuario BuscarPorEmailESenha(string email, string senha)
        {
            try
            {
                Usuario usuarioBuscado = _context.Usuario
                    .Select(u => new Usuario
                    {
                        IdUsuario = u.IdUsuario,
                        Nome = u.Nome,
                        Email = u.Email,
                        Senha = u.Senha,

                        TipoUsuario = new TiposUsuario
                        {
                            IdTipoUsuario = u.IdTipoUsuario,
                            Titulo = u.TipoUsuario!.Titulo
                        }
                    }).FirstOrDefault(u => u.Email == email)!;

                if (usuarioBuscado != null)
                {
                    bool confere = Criptografia.CompararHash(senha, usuarioBuscado.Senha!);

                    if (confere)
                    {
                        return usuarioBuscado;
                    }
                }
                return null!;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Usuario BuscarPorEmailEGoogleId(string email, string googleIdAccount)
        {

            return _context.Usuario.Select(u => new Usuario
            {
                IdUsuario = u.IdUsuario,
                Nome = u.Nome,
                Email = u.Email,
                Senha = u.Senha,
                GoogleIdAccount = u.GoogleIdAccount,

                TipoUsuario = new TiposUsuario
                {
                    IdTipoUsuario = u.IdTipoUsuario,
                    Titulo = u.TipoUsuario!.Titulo
                }
            }).FirstOrDefault(x => x.Email == email && x.GoogleIdAccount == googleIdAccount)!;
        }

    }
}
