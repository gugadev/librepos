using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Pos.Types
{
    public class UserRegister
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Username { get; set; }
        [Required, EmailAddress(ErrorMessage = "El formato del email es inválido")]
        public string Email { get; set; }
        // [Required]
        public string Password { get; set; }
        public bool IsActive { get; set; }
        [Required, JsonProperty(PropertyName = "roleId")]
        public int Role { get; set; }
        [Required, JsonProperty(PropertyName = "emissionPointId")]
        public int EmissionPoint { get; set; }
        [Required, JsonProperty(PropertyName = "turnId")]
        public string Turn { get; set; }

        public UserRegister()
        {
        }
    }
}
