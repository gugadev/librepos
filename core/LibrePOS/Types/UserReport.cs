using System;

namespace Pos.Types
{
    public class UserReport
    {
        public int EmissionPoint { get; set; }
        public int User { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public int Page { get; set; }
        public int Size { get; set; }
    }
}