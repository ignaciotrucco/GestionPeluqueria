using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using GestionPeluqueria.Models;
using GestionPeluqueria.Data;

namespace GestionPeluqueria.Controllers;

public class ClientesController : Controller
{
    // private readonly ILogger<ClientesController> _logger;

    // public ClientesController(ILogger<ClientesController> logger)
    // {
    //     _logger = logger;
    // }

    private ApplicationDbContext _context;

    public ClientesController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult NuevoTurno()
    {
        return View();
    }


    public JsonResult BuscarClientePorDNI(string dni)
    {
        var cliente = _context.Clientes.FirstOrDefault(c =>
            c.DNI == dni && !c.Eliminado);

        return Json(cliente);
    }

    public JsonResult GuardarCliente(Cliente cliente)
    {
        if (string.IsNullOrWhiteSpace(cliente.DNI))
            return Json(new { resultado = "El DNI es obligatorio." });

        if (string.IsNullOrWhiteSpace(cliente.NombreCompleto))
            return Json(new { resultado = "El nombre completo es obligatorio." });

        if (string.IsNullOrWhiteSpace(cliente.Telefono))
            return Json(new { resultado = "El teléfono es obligatorio." });

        bool existe = _context.Clientes.Any(c =>
            c.DNI == cliente.DNI && !c.Eliminado);

        if (existe)
            return Json(new { resultado = "Ya existe un cliente activo con ese DNI." });

        cliente.Eliminado = false;

        _context.Clientes.Add(cliente);
        _context.SaveChanges();

        return Json(new
        {
            resultado = "OK",
            clienteID = cliente.ClienteID
        });
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