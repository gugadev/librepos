using System.ComponentModel.DataAnnotations.Schema;

namespace Pos.Models.Document
{
    [Table("documento.correlativo")]
    public class Correlative
    {
        [Column("tipoDocumento")]
        public string DocumentType { get; set; }
        [Column("serie")]
        public string Serie { get; set; }
        // public virtual Document Document { get; set; }
        [Column("correlativo")]
        public int Index { get; set; }

        public Correlative()
        {
        }
    }
}
