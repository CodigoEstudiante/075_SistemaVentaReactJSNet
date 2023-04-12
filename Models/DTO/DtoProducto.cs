namespace ReactVentas.Models.DTO
{
    public class DtoProducto
    {
        public int IdProducto { get; set; }
        public string? Codigo { get; set; }
        public string? Marca { get; set; }
        public string? Descripcion { get; set; }
        public decimal? Precio { get; set; }

        public int Cantidad { get; set; }

        public decimal Total { get; set; }
    }
}
