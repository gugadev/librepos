using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Pos.Types;
using Pos.Models.Document;

namespace Pos.Services
{
    public interface IReportService
    {
        byte[] GenerateOrdersReport(List<OrderResponse> orders);
        Task<byte[]> GenerateUserReport(List<IGrouping<string, Document>> orders);
    }
}