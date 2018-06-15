using System.Threading.Tasks;
using System.Collections.Generic;
using Pos.Models;

namespace Pos.Repositories
{
    public interface ITurnRepository
    {
        Task<List<Turn>> Get(string isActive);
        Task<Turn> Find(string code);
    }
}