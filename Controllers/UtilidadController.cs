using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactVentas.Models;
using ReactVentas.Models.DTO;

namespace ReactVentas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UtilidadController : ControllerBase
    {

        private readonly DBREACT_VENTAContext _context;
        public UtilidadController(DBREACT_VENTAContext context)
        {
            _context = context;

        }
        [HttpGet]
        [Route("Dashboard")]
        public async Task<IActionResult> Dashboard()
        {
            DtoDashboard config = new DtoDashboard();

            DateTime fecha = DateTime.Now;
            DateTime fecha2 = DateTime.Now;
            fecha = fecha.AddDays(-30);
            fecha2 = fecha2.AddDays(-7);
            try
            {
                config.TotalVentas = _context.Venta.Where(v => v.FechaRegistro >= fecha).Count().ToString();
                config.TotalIngresos = _context.Venta.Where(v => v.FechaRegistro >= fecha).Sum(v => v.Total).ToString();
                config.TotalProductos = _context.Productos.Count().ToString();
                config.TotalCategorias = _context.Categoria.Count().ToString();


                config.ProductosVendidos = (from p in _context.Productos
                           join d in _context.DetalleVenta on p.IdProducto equals d.IdProducto
                           group p by p.Descripcion into g
                           orderby g.Count() ascending
                           select new DtoProductoVendidos { Producto = g.Key, Total = g.Count().ToString()}).Take(4).ToList();

                config.VentasporDias = (from v in _context.Venta
                            where v.FechaRegistro.Value.Date >= fecha2.Date
                            group v by v.FechaRegistro.Value.Date into g
                            orderby g.Key ascending
                            select new DtoVentasDias { Fecha = g.Key.ToString("dd/MM/yyyy"), Total = g.Count().ToString() }).ToList();

                return StatusCode(StatusCodes.Status200OK, config);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, config);
            }
        }

    }
}
