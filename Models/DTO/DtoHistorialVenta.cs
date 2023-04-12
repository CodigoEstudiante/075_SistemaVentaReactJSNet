namespace ReactVentas.Models.DTO
{
    public class DtoHistorialVenta
    {
        public string? FechaRegistro { get; set; }
        public string? NumeroDocumento { get; set; }
        public string? TipoDocumento { get; set; }
        public string? DocumentoCliente { get; set; }
        public string? NombreCliente { get; set; }
        public string? UsuarioRegistro { get; set; }
        public string? SubTotal { get; set; }
        public string? Impuesto { get; set; }
        public string? Total { get; set; }

        public List<DtoDetalleVenta> Detalle { get; set; }


    }
}
