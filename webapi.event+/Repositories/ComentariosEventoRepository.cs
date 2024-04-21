using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using webapi.event_.Contexts;
using webapi.event_.Domains;
using webapi.event_.Interfaces;

namespace webapi.event_.Repositories
{
    public class ComentariosEventoRepository : IComentariosEventoRepository
    {
        private readonly Event_Context _context;

        public ComentariosEventoRepository()
        {
            _context = new Event_Context();
        }

        //public ComentariosEvento BuscarPorId(Guid id)
        //{
        //    try
        //    {
        //        return _context.ComentariosEvento
        //            .Select(c => new ComentariosEvento
        //            {
        //                Descricao = c.Descricao,
        //                Exibe = c.Exibe,
        //                IdUsuario = c.IdUsuario,
        //                IdComentarioEvento = c.IdComentarioEvento,
        //                IdEvento = c.IdEvento,

        //                Usuario = new Usuario
        //                {
        //                    IdUsuario = c.IdUsuario,
        //                    Nome = c.Usuario!.Nome
        //                },

        //                Evento = new Evento
        //                {
        //                    IdEvento = c.IdEvento,
        //                    NomeEvento = c.Evento!.NomeEvento,
        //                    DataEvento = c.Evento.DataEvento,
        //                    IdTipoEvento = c.Evento.IdTipoEvento,

        //                }

        //            }).FirstOrDefault(c => c.IdComentarioEvento == id)!;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}


        public ComentariosEvento BuscarPorId(Guid id)
        {
            try
            {
                return _context.ComentariosEvento
                    .Include(c => c.Usuario)
                    .Include(c => c.Evento)
                    .Where(c => c.IdComentarioEvento == id)
                    .FirstOrDefault()!;
            }
            catch (Exception)
            {
                throw;
            }
        }








        public ComentariosEvento BuscarPorIdUsuario(Guid idUsuario, Guid idEvento)
        {
            try
            {
                return _context.ComentariosEvento
                    .Select(c => new ComentariosEvento
                    {
                        Descricao = c.Descricao,
                        Exibe = c.Exibe,
                        IdUsuario = c.IdUsuario,
                        IdComentarioEvento = c.IdComentarioEvento,
                        IdEvento = c.IdEvento,

                        Usuario = new Usuario
                        {
                            IdUsuario = c.IdUsuario,
                            Nome = c.Usuario!.Nome
                        },

                        Evento = new Evento
                        {
                            IdEvento = c.IdEvento,
                            NomeEvento = c.Evento!.NomeEvento,
                            DataEvento = c.Evento.DataEvento,
                            IdTipoEvento = c.Evento.IdTipoEvento,

                        }

                    }).FirstOrDefault(c => c.IdUsuario == idUsuario && c.IdEvento == idEvento)!;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(ComentariosEvento comentarioEvento)
        {
            try
            {
                List<ComentariosEvento> listaDeComentariosDoUsuario = _context.ComentariosEvento.Where(c => c.IdUsuario == comentarioEvento.IdUsuario && c.IdEvento == comentarioEvento.IdEvento).ToList();

                if (listaDeComentariosDoUsuario.Count != 0)
                {
                    throw new Exception("Só é permitido um comentário por pessoa!");
                }



                Evento eventoBuscado = _context.Evento.SingleOrDefault(e => e.IdEvento == comentarioEvento.IdEvento)!;

                if (eventoBuscado == null)
                {
                    throw new Exception("O evento não existe!");
                }

                PresencasEvento presencaBuscada = _context.PresencasEvento.SingleOrDefault(e => e.IdUsuario == comentarioEvento.IdUsuario && e.IdEvento == comentarioEvento.IdEvento)!;

                if (presencaBuscada == null)
                {
                    throw new Exception("Você não se inscreveu para este evento!");
                }

                if (eventoBuscado.DataEvento < DateTime.UtcNow)
                {
                    _context.ComentariosEvento.Add(comentarioEvento);
                    _context.SaveChanges();
                }
                else
                {
                    throw new Exception("Impossível comentar em um evento que ainda não aconteceu.");
                }
            }
            catch (Exception)
            {

                throw;
            }
        }


        public void Deletar(Guid id)
        {
            try
            {
                ComentariosEvento comentarioEventoBuscado = _context.ComentariosEvento.Find(id)!;

                if (comentarioEventoBuscado != null)
                {
                    _context.ComentariosEvento.Remove(comentarioEventoBuscado);
                }

                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<ComentariosEvento> ListarSomenteExibe(Guid id)
        {

            try
            {
                return _context.ComentariosEvento
                    .Select(c => new ComentariosEvento
                    {
                        Descricao = c.Descricao,
                        Exibe = c.Exibe,
                        IdUsuario = c.IdUsuario,
                        IdComentarioEvento = c.IdComentarioEvento,
                        IdEvento = c.IdEvento,

                        Usuario = new Usuario
                        {
                            IdUsuario = c.IdUsuario,
                            Nome = c.Usuario!.Nome
                        },

                        Evento = new Evento
                        {
                            IdEvento = c.IdEvento,
                            NomeEvento = c.Evento!.NomeEvento,
                            DataEvento = c.Evento.DataEvento,
                            IdTipoEvento = c.Evento.IdTipoEvento,

                        }

                    }).Where(c => c.Exibe == true && c.IdEvento == id).ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<ComentariosEvento> Listar(Guid id)
        {

            try
            {
                return _context.ComentariosEvento
                    .Select(c => new ComentariosEvento
                    {
                        Descricao = c.Descricao,
                        Exibe = c.Exibe,
                        IdUsuario = c.IdUsuario,
                        IdComentarioEvento = c.IdComentarioEvento,
                        IdEvento = c.IdEvento,

                        Usuario = new Usuario
                        {
                            Nome = c.Usuario!.Nome
                        },

                        Evento = new Evento
                        {
                            NomeEvento = c.Evento!.NomeEvento,
                        }

                    }).Where(c => c.IdEvento == id).ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}