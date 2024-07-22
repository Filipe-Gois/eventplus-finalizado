using Microsoft.EntityFrameworkCore;
using webapi.event_.Domains;

namespace webapi.event_.Contexts
{
    /// <summary>
    /// Classe de contexto que faz referências as tabelas e define string de conexão
    /// </summary>
    public class Event_Context : DbContext
    {
        public DbSet<TiposUsuario> TiposUsuario { get; set; }

        public DbSet<Usuario> Usuario { get; set; }

        public DbSet<TiposEvento> TiposEvento { get; set; }

        public DbSet<Evento> Evento { get; set; }

        public DbSet<ComentariosEvento> ComentariosEvento { get; set; }

        public DbSet<Instituicao> Instituicao { get; set; }

        public DbSet<PresencasEvento> PresencasEvento { get; set; }

        /// <summary>
        /// Define as opções de construção do banco
        /// </summary>
        /// <param name="optionsBuilder">Objeto com as configurações definidas</param>
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //pc do Senai
            //optionsBuilder.UseSqlServer("Server=NOTE14-S14; Database=event_filipeGois; User Id= sa; pwd=Senai@134; TrustServerCertificate=true;");
            //base.OnConfiguring(optionsBuilder);

            //pc de casa
            //optionsBuilder.UseSqlServer("Server=FILIPEGOIS\\SQLEXPRESS; Database=event_filipeGois; User Id= sa; pwd=xtringer28700; TrustServerCertificate=true;");
            //base.OnConfiguring(optionsBuilder);


            //string de conexão SQL DataBase - Azure
            optionsBuilder.UseSqlServer("Server=tcp:eventfilipe-server.database.windows.net,1433;Initial Catalog=event_FilipeDataBase;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;User Id = eventfilipe-server; Pwd= Xtringer28700;");
        }
    }
}
