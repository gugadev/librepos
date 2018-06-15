using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Pos.Data;
using Pos.Models.Document;

namespace Pos.Repositories
{
    public class TaxRepository : ITaxRepository
    {
        private DataContext context;

        public TaxRepository(DataContext context)
        {
            this.context = context;
        }

        public Task<Tax> Create(Tax tax)
        {
            context.Taxes.Add(tax);
            context.SaveChanges();
            return Find(tax.DocumentType, tax.Serie, tax.Correlative);
        }

        public Task<Tax> Find(string docType, string serie, int correlative)
        {
            var query = from t in context.Taxes
                        where t.DocumentType == docType && t.Serie == serie
                        && t.Correlative == correlative select t;
            return query.FirstOrDefaultAsync();
        }
    }
}
