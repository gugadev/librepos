using System;

namespace Pos.Types
{
    public class DocumentPagination
    {
        public string From { get; set; }
        public string To { get; set; }
        // can be 'P', 'E' or 'A'
        public string State { get; set; }
        // this will be used only when the user
        // wants to search documents of a specific
        // car license plate.
        public string Plate { get; set; }
        public int EmissionPoint { get; set; }
        public int User { get; set; }
        public string Serie { get; set; }
        public int Correlative { get; set; }
    }
}