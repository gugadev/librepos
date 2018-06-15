using System.Threading.Tasks;
using System.Collections.Generic;
using Pos.Models.Document;
using Pos.Types;

namespace Pos.Repositories
{
    public interface IDetailRepository
    {
        Task<Detail> Create(Detail detail);
        Task<Detail> Find(string docType, string serie, int correlative);
    }
}
