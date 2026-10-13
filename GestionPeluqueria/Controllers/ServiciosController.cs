using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using GestionPeluqueria.Models;
using GestionPeluqueria.Data;

namespace GestionPeluqueria.Controllers;

public class ServiciosController : Controller
{
    // private readonly ILogger<ServiciosController> _logger;

    // public ServiciosController(ILogger<ServiciosController> logger)
    // {
    //     _logger = logger;
    // }

    private ApplicationDbContext _context;

    public ServiciosController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Servicios()
    {
        return View();
    }

    public JsonResult ListadoServicios(int? ServicioID)
    {
        var listadoServicios = _context.Servicios
            .Where(s => ServicioID == null || s.ServicioID == ServicioID)
            .ToList();

        return Json(listadoServicios);
    }

    public JsonResult GuardarRegistros(int ServicioID, string Nombre, string Descripcion, decimal Precio)
    {
        string resultado = "";
        if (!String.IsNullOrEmpty(Nombre))
        {
            Nombre = Nombre.ToUpper();

            if (ServicioID == 0)
            {
                var existeServicio = _context.Servicios.Where(e => e.Nombre == Nombre).Count();
                if (existeServicio == 0)
                {
                    var nuevoServicio = new Servicio
                    {
                        Nombre = Nombre,
                        Descripcion = Descripcion,
                        Precio = Precio
                    };
                    _context.Add(nuevoServicio);
                    _context.SaveChanges();
                    resultado = "<i class='fas fa-check-circle'></i> ¡Servicio agregado correctamente!";
                }
                else
                {
                    resultado = "<i class='fas fa-exclamation-triangle'></i> ¡Servicio existente!";
                }
            }
            else
            {
                var servicioEditar = _context.Servicios.Where(s => s.ServicioID == ServicioID).SingleOrDefault();
                if (servicioEditar != null)
                {
                    var existeServicio = _context.Servicios.Where(e => e.Nombre == Nombre && e.ServicioID != ServicioID).Count();
                    if (existeServicio == 0)
                    {
                        servicioEditar.Nombre = Nombre;
                        servicioEditar.Descripcion = Descripcion;
                        servicioEditar.Precio = Precio;
                        _context.SaveChanges();
                        resultado = "<i class='fas fa-check-circle'></i> ¡Servicio editado correctamente!";
                    }
                    else
                    {
                        resultado = "<i class='fas fa-exclamation-triangle'></i> ¡Servicio existente!";
                    }
                }
            }
        }
        else
        {
            resultado = "¡Debe ingresar un servicio!";
        }

        return Json(resultado);
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
