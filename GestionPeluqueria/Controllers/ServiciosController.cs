using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using GestionPeluqueria.Models;

namespace GestionPeluqueria.Controllers;

public class ServiciosController : Controller
{
    private readonly ILogger<ServiciosController> _logger;

    public ServiciosController(ILogger<ServiciosController> logger)
    {
        _logger = logger;
    }

    public IActionResult Servicios()
    {
        return View();
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
