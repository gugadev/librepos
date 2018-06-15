using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pos.Models
{
    [Table("configuracion")]
    public class Configuration
    {
        [Column("idConfiguracion")]
        public int Id { get; set; }
        [Column("codigo"), Required]
        public string Code { get; set; }
        // [ForeignKey("idPuntoEmision")]
        public virtual EmissionPoint EmissionPoint { get; set; }
        [Column("idPuntoEmision")]
        public int EmissionPointId { get; set; }
        [Column("valor"), Required]
        public string Value { get; set; }
        [Column("activo")]
        public bool IsActive { get; set; }
        
        public Configuration()
        {
        }
    }
}
