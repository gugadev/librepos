using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pos.Models
{
    [Table("usuario")]
    public class User
    {
        [Column("idUsuario")]
        public int Id { get; set; }
        [ForeignKey("idRol"), Required]
        public Role Role { get; set; }
        [Column("nombre"), Required]
        public string Name { get; set; }
        [Column("foto")]
        public string Photo { get; set; }
        [Column("alias"), Required]
        public string Username { get; set; }
        [Column("email"), Required, EmailAddress]
        public string Email { get; set; }
        [Column("password"), Required]
        public string Password { get; set; }
        [Column("activo")]
        public bool IsActive { get; set; }
        [ForeignKey("idPuntoEmision")]
        public EmissionPoint EmissionPoint { get; set; }
        [ForeignKey("idTurno")]
        public Turn Turn { get; set; }

        public User()
        {
        }
    }
}
