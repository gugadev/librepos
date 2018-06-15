using Newtonsoft.Json;

namespace Pos.Types
{
    // [JsonObject]
    public class Metadata
    {
        public string DocumentType { get; set; }
        public string Serie { get; set; }
        public int Correlative { get; set; }
    }
}