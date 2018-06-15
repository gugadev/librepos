using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Pos.Models.Document
{
    [Table("documento.adicionales")]
    public class AditionalData
    {
        private string _value;
        [Column("tipoDocumento")]
        public string DocumentType { get; set; }
        [Column("serie")]
        public string Serie { get; set; }
        [Column("correlativo")]
        public int Correlative { get; set; }
        [Column("secuencial"), DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Sequential { get; set; }
        [JsonIgnore]
        public virtual Document Document { get; set; }
        [NotMapped, Column("valor")]
        public JObject Value {
            get
            {
                return JsonConvert.DeserializeObject<JObject>(string.IsNullOrEmpty(_value) ? "{}" : _value);
            }
            set
            {
                _value = value.ToString();
            }
        }

        public AditionalData()
        {
        }
    }
}
