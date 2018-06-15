using System.Threading.Tasks;
using System.Collections.Generic;
using Pos.Models;
using Pos.Types;

namespace Pos.Repositories
{
    public interface IEmissionPointRepository
    {
        Task<List<EmissionPoint>> Get(EmissionPointPagination pagination);
        Task<EmissionPoint> GetPoint(int pk);
        Task<EmissionPoint> Create(EmissionPoint point);
        Task<EmissionPoint> Update(EmissionPoint point);
        Task<int> Count(EmissionPointPagination pagination);
    }
}
