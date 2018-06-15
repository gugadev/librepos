using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Pos.Models.Document;
using Pos.Types;
using System.Linq;

namespace Pos.Repositories
{
    public interface IDocumentRepository
    {
        Task<List<Document>> Get(DocumentPagination p);
        Task<Document> Get(string type, string serie, int correlative);
        Task<Document> Create(Document document);
        Task<int> Count(DocumentPagination p);
        Task<List<IGrouping<string, Document>>> GetReport(UserReport filters);
    }
}