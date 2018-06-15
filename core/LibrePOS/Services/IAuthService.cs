using System.Threading.Tasks;
using Pos.Models;

namespace Pos.Services
{
    public interface IAuthService
    {
        Task<User> Authenticate(string username, string password);
        Task<User> Register(User user);
    }
}
