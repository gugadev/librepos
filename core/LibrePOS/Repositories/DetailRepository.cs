using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Pos.Data;
using Pos.Models.Document;

namespace Pos.Repositories
{
    public class DetailRepository : IDetailRepository
    {
        private DataContext context;

        public DetailRepository(DataContext context)
        {
            this.context = context;
        }

        public Task<Detail> Create(Detail detail)
        {
            context.Details.Add(detail);
            context.SaveChanges();
            return Find(detail.DocumentType, detail.Serie, detail.Correlative);
        }

        public Task<Detail> Find(string docType, string serie, int correlative)
        {
            var query = from d in context.Details
                        where d.DocumentType == docType && d.Serie == serie
                        && d.Correlative == correlative select d;
            query = query.Include(d => d.Service);
            return query.FirstOrDefaultAsync();
        }
    }
}
