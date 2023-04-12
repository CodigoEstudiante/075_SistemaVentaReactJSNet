namespace ReactVentas.Models.DTO
{
    public class DtoVenta
    {
        public string documentoCliente { get; set; }
        public string nombreCliente { get; set; }
        public string tipoDocumento { get; set; }
        public int idUsuario { get; set; }
        public decimal subTotal { get; set; }
        public decimal igv { get; set; }
        public decimal total { get; set; }

        public List<DtoProducto> listaProductos { get; set; }
    }
}
