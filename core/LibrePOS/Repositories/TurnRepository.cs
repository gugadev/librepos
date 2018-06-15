using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Pos.Data;
using Pos.Models;

namespace Pos.Repositories
{
    public class TurnRepository : ITurnRepository
    {
        private DataContext context;

        public TurnRepository(DataContext context)
        {
            this.context = context;
        }

        public Task<Turn> Find(string code)
        {
            var query = from t in context.Turns where t.Code == code select t;
            return query.FirstOrDefaultAsync();
        }

        public Task<List<Turn>> Get(string isActive)
        {
            var query = from t in context.Turns select t;

            if (isActive != null)
            {
                query = query.Where(t => t.IsActive == Boolean.Parse(isActive));
            }
            return query.ToListAsync();
        }
    }
}