using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestionPeluqueria.Models;

public class Servicio
{
    [Key]
    public int ServicioID { get; set; }
    public string Nombre { get; set; }
    public string? Descripcion { get; set; }
    public decimal Precio { get; set; }
    public bool Eliminado { get; set; }
    public ICollection<Turno> Turnos { get; set; }
}