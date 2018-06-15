using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Pos.Models.Document
{
    [Table("documento.detalle")]
    public class Detail
    {
        [Column("tipoDocumento")]
        public string DocumentType { get; set; }
        [Column("serie")]
        public string Serie { get; set; }
        [Column("correlativo")]
        public int Correlative { get; set; }
        [JsonIgnore]
        public virtual Document Document { get; set; }
        [Column("secuencial"), DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Sequential { get; set; }
        [ForeignKey("idServicio")]
        public Service Service { get; set; }
        [Column("cantidad"), Required]
        public double Quantity { get; set; }
        [Column("mntTotal"), Required]
        public double Amount { get; set; }
        [Column("mntDescuento"), Required]
        public double Discount { get; set; }
        [Column("tasaIgv"), Required]
        public double TaxRate { get; set; }
        [Column("mntIgv"), Required]
        public double TaxAmount { get; set; }
        [Column("codAfectacionIgv")]
        public string IgvAffectCode { get; set; }
        // [Column("idOperacion")]
        // public string OperationId { get; set; }

        public Detail()
        {
        }
    }
}
