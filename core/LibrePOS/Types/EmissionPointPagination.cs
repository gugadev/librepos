using System;
using Microsoft.AspNetCore.Mvc;

namespace Pos.Types
{
    public class EmissionPointPagination
    {
        [FromQuery(Name = "page")]
        public int Page { get; set; }
        [FromQuery(Name = "quantity")]
        public int Quantity { get; set; }
        public string IsActive { get; set; }

        public EmissionPointPagination()
        {
        }
    }
}
