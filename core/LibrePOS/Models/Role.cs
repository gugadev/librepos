using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pos.Models
{
    [Table("rol")]
    public class Role
    {
        [Column("idRol")]
        public int Id { get; set; }
        [Column("nombre"), Required]
        public string Name { get; set; }
        [Column("descripcion")]
        public string Description { get; set; }
        [Column("activo")]
        public bool IsActive { get; set; }

        public Role()
        {
        }
    }
}
