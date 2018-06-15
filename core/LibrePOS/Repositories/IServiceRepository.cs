using System.Collections.Generic;
using System.Threading.Tasks;
using Pos.Models;
using Pos.Types;

namespace Pos.Repositories
{
    public interface IServiceRepository
    {
        Task<List<Service>> All(ServicePagination p);
        Task<Service> Find(string code);
        Task<Service> Create(Service service);
        Task<Service> Update(Service service);

        Task<int> Count(ServicePagination p);
    }
}
