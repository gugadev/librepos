using System;
using Microsoft.AspNetCore.Mvc;

namespace Pos.Types
{
    public class UserPagination
    {
        [FromQuery(Name = "page")]
        public int Page { get; set; }
        [FromQuery(Name = "quantity")]
        public int Quantity { get; set; }
        // works without annotation }:)
        public int Role { get; set; }
        public int EmissionPoint { get; set; }
        [FromQuery(Name = "isActive")]
        public string IsActive { get; set; }

        public UserPagination()
        {
        }
    }
}
