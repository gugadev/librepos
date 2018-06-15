using System.Threading.Tasks;
using System.Collections.Generic;
using Pos.Models;

namespace Pos.Repositories
{
    public interface IConfigurationRepository
    {
        Task<Configuration> Get(string code);
        Task<Configuration> Update(Configuration c);
    }
}
