using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestionPeluqueria.Models;

public class Cliente
{
    [Key]
    public int ClienteID { get; set; }
    public string DNI { get; set; }
    public string NombreCompleto { get; set; }
    public DateTime FechaNacimiento { get; set; }
    public string Telefono { get; set; }
    public string? Email { get; set; }
    public string? Observaciones { get; set; }
    public bool Eliminado { get; set; }
    public ICollection<Turno> Turnos { get; set; }
}