using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pos.Models
{
    [Table("servicio")]
    public class Service
    {
        [Column("idServicio")]
        public int Id { get; set; }
        [ForeignKey("idPuntoEmision"), Required]
        public EmissionPoint EmissionPoint { get; set; }
        [Column("codigo"), Required]
        public string Code { get; set; }
        [Column("nombre"), Required]
        public string Name { get; set; }
        [Column("tarifa"), Required]
        public double Cost { get; set; }
        [Column("unidadMedida"), Required]
        public string UnitMeasurement { get; set; }
        [Column("necesitaPlaca")]
        public bool NeedPlate { get; set; }
        [Column("activo")]
        public bool IsActive { get; set; }

        public Service()
        {
        }
    }
}
