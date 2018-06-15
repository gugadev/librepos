using Pos.Models;
using Pos.Models.Document;

namespace Pos.Types
{
    public class OrderResponse
    {
        public Document Document { get; set; }
        public Tax Tax { get; set; }
        public Detail Detail { get; set; }
    }
}