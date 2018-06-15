using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Pos.Models.Document
{
    [Table("documento.impuesto")]
    public class Tax
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
        [Column("codImpuesto")]
        public string Code { get; set; }
        [Column("tasaImpuesto"), Required]
        public double Rate { get; set; }
        [Column("mntImpuesto"), Required]
        public double Amount { get; set; }

        public Tax()
        {
        }
    }
}
