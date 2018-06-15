using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pos.Models
{
    [Table("catalogo")]
    public class Catalog
    {
        [Column("idCatalogo")]
        public int Id { get; set; }
        [ForeignKey("idColeccion")]
        public Collection Collection { get; set; }
        [Column("codigo"), Required]
        public string Code { get; set; }
        [Column("nombre"), Required]
        public string Name { get; set; }
        [Column("descripcion")]
        public string Description { get; set; }
        [Column("activo")]
        public bool IsActive { get; set; }

        public Catalog()
        {
        }
    }
}
