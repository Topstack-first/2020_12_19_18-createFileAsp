using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using System.IO;

namespace Server.Controllers
{
    public class HomeController : Controller
    {
        private string fileContent = "this is text file example.";
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
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
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPost]
        public IActionResult Download()
        {
            byte[] bytes = Encoding.ASCII.GetBytes(fileContent);
            return File(bytes, "application/txt","name.txt");
        }
    }
}
