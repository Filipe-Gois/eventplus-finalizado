using webapi.event_.Domains;

namespace webapi.event_.Interfaces
{
    public interface IUsuarioRepository
    {
        void Cadastrar(Usuario usuario, bool isCreateAccountGoogle = false);

        Usuario BuscarPorId(Guid id);

        Usuario BuscarPorEmailESenha(string email, string senha);
        Usuario BuscarPorEmailEGoogleId(string email, string googleIdAccount);
    }
}