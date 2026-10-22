using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using GestionPeluqueria.Models;
using GestionPeluqueria.Data;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace GestionPeluqueria.Controllers;

public class TurnosController : Controller
{
    // private readonly ILogger<TurnosController> _logger;

    // public TurnosController(ILogger<TurnosController> logger)
    // {
    //     _logger = logger;
    // }

    private ApplicationDbContext _context;

    public TurnosController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult NuevoTurno()
    {
        var servicios = _context.Servicios.Where(s => !s.Eliminado).ToList();
        servicios.Add(new Servicio { ServicioID = 0, Nombre = "[SELECCIONE...]" });
        ViewBag.ServicioID = new SelectList(servicios.OrderBy(s => s.Nombre), "ServicioID", "Nombre");

        return View();
    }

    public JsonResult CrearTurno(Turno turno)
    {
        if (turno.ClienteID <= 0 ||
            !_context.Clientes.Any(c =>
                c.ClienteID == turno.ClienteID && !c.Eliminado))
        {
            return Json(new { resultado = "El cliente seleccionado no es válido." });
        }

        if (!_context.Servicios.Any(s =>
            s.ServicioID == turno.ServicioID && !s.Eliminado))
        {
            return Json(new { resultado = "Seleccioná un servicio válido." });
        }

        turno.Estado = Estado.Pendiente;
        turno.RecordatorioEnviado = false;

        _context.Turnos.Add(turno);
        _context.SaveChanges();

        return Json(new { resultado = "OK" });
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}