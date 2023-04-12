using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactVentas.Models;

namespace ReactVentas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolController : ControllerBase
    {
        private readonly DBREACT_VENTAContext _context;
        public RolController(DBREACT_VENTAContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista() {
            List<Rol> lista = new List<Rol>();
            try {
                lista = await _context.Rols.ToListAsync();
                return StatusCode(StatusCodes.Status200OK, lista);
            }
            catch {
                return StatusCode(StatusCodes.Status500InternalServerError, lista);
            }
        }

    }
}
