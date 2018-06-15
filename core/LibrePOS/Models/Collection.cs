using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pos.Models
{
    [Table("coleccion")]
    public class Collection
    {
        [Column("idColeccion")]
        public int Id { get; set; }
        [Column("codigo")]
        public string Code { get; set; }
        [Column("descripcion")]
        public string Description { get; set; }
        [Column("activo")]
        public bool IsActive { get; set; }

        public Collection()
        {
        }
    }
}
