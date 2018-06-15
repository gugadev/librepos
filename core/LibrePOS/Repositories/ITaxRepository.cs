using System.Threading.Tasks;
using System.Collections.Generic;
using Pos.Models.Document;
using Pos.Types;

namespace Pos.Repositories
{
    public interface ITaxRepository
    {
        Task<Tax> Create(Tax tax);
        Task<Tax> Find(string docType, string serie, int correlative);
    }
}
