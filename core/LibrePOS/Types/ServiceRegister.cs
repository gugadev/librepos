using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Pos.Types {
    public class ServiceRegister {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public double Cost { get; set; }
        [Required]
        public string UnitMeasurement { get; set; }
        [Required]
        public bool NeedPlate { get; set; }
        [Required, JsonProperty(PropertyName = "emissionPointId")]
        public int EmissionPoint { get; set; }
        [Required]
        public bool IsActive { get; set; }

    }
}