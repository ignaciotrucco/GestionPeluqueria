using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestionPeluqueria.Models;

public class Turno
{
    [Key]
    public int TurnoID { get; set; }
    public int ClienteID { get; set; }
    public int ServicioID { get; set; }
    public DateTime FechaHora { get; set; }
    public Estado Estado { get; set; }
    public decimal MontoSeña { get; set; }
    public bool RecordatorioEnviado { get; set; }
    public string? Observaciones { get; set; }
    public Cliente Cliente { get; set; }
    public Servicio Servicio { get; set; }
}

public enum Estado
{
    Pendiente = 1,
    Confirmado,
    Cancelado,
    Completado
}