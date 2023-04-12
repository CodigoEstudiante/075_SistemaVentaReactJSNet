namespace ReactVentas.Models.DTO
{
    public class DtoDashboard
    {
        public string TotalVentas { get; set; }
        public string TotalIngresos { get; set; }
        public string TotalProductos { get; set; }
        public string TotalCategorias { get; set; }
        public List<DtoProductoVendidos> ProductosVendidos { get; set; }
        public List<DtoVentasDias> VentasporDias { get; set; }
    }
}
