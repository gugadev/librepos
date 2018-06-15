using System.Collections.Generic;
using System.Threading.Tasks;
using Pos.Models;
using Pos.Types;

namespace Pos.Repositories
{
    public interface IUserRepository
    {
        Task<List<User>> All(UserPagination pagination);
        Task<int> Count(UserPagination pagination);
        Task<User> Find(string username);
        Task<User> Create(User user);
        Task<User> Update(User user);
    }
}
