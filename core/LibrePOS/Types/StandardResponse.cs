using System;
namespace Pos.Types
{
    public class StandardResponse
    {
        public int Status { get; set; }
        public string[] Errors { get; set; }
        public object Data { get; set; }

        public StandardResponse()
        {
        }
    }
}
