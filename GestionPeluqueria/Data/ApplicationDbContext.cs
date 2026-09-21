using GestionPeluqueria.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GestionPeluqueria.Data;

public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Turno> Turnos { get; set; }
    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Servicio> Servicios { get; set; }
}
