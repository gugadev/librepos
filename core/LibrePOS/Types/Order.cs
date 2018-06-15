using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Pos.Types
{
    public class Order
    {
        [Required]
        public string Service { get; set; }
        [Required]
        public double Quantity { get; set; }
        [Required]
        public double Total { get; set; }
        [Required]
        public string Currency { get; set; }
        public string Plate { get; set; }
        // [JsonProperty]
        public Aditional Aditional { get; set; }
        // [JsonProperty]
        public Metadata Metadata { get; set; }
    }
}