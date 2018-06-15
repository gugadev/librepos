using System.Threading.Tasks;
using System.Collections.Generic;
using Pos.Models;

namespace Pos.Repositories
{
    public interface IRoleRepository
    {
        Task<List<Role>> All();
        Task<Role> Find(int pk);
        Task<Role> Create(Role role);
    }
}
