namespace ReactVentas.Models.DTO
{
    public class DtoReporteVenta
    {
        public string FechaRegistro { get; set; }
        public string NumeroDocumento { get; set; }
        public string TipoDocumento { get; set; }
        public string DocumentoCliente { get; set; }
        public string NombreCliente { get; set; }
        public string SubTotalVenta { get; set; }
        public string ImpuestoTotalVenta { get; set; }
        public string TotalVenta { get; set; }
        public string Producto { get; set; }
        public string Cantidad { get; set; }
        public string Precio { get; set; }
        public string Total { get; set; }

    }
}
