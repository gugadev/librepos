using System;
using Newtonsoft.Json;

namespace Pos.Types
{
    // [JsonObject]
    public class Aditional
    {
        public string Cashier { get; set; }
        public string EmissionPoint { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
        public double Total { get; set; }
        public double Cash { get; set; }
        public double Change { get; set; }
        public string Turn { get; set; }
    }
}