using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pos.Models
{
    [Table("punto_emision")]
    public class EmissionPoint
    {
        [Column("idPuntoEmision")]
        public int Id { get; set; }
        [Column("nombre"), Required]
        public string Name { get; set; }
        [Column("activo")]
        public bool IsActive { get; set; }

        public EmissionPoint()
        {
        }
    }
}
