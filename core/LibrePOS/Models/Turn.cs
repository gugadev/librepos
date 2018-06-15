using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pos.Models
{
    [Table("turno")]
    public class Turn
    {
        [Column("idTurno")]
        public int Id { get; set; }
        [Column("codigo"), Required]
        public string Code { get; set; }
        [Column("descripcion")]
        public string Description { get; set; }
        [Column("horaInicio"), Required]
        public TimeSpan Start { get; set; }
        [Column("horaFin"), Required]
        public TimeSpan End { get; set; }
        [Column("activo")]
        public bool IsActive { get; set; }

        public Turn()
        {
        }
    }
}
