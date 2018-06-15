using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Pos.Models;
using Pos.Types;
using Pos.Data;
using Microsoft.EntityFrameworkCore;

namespace Pos.Repositories
{
    public class EmissionPointRepository : IEmissionPointRepository
    {
        private DataContext context;

        public EmissionPointRepository(DataContext context)
        {
            this.context = context;
        }

        public Task<int> Count(EmissionPointPagination pagination)
        {
            var query = from e in context.EmissionPoints select e;

            if (pagination.IsActive != "-")
            {
                query = query.Where(e => e.IsActive == Boolean.Parse(pagination.IsActive));
            }
            return query.CountAsync();
        }

        public Task<EmissionPoint> Create(EmissionPoint point)
        {
            context.Add(point);
            context.SaveChanges();
            return GetPoint(point.Id);
        }

        public Task<List<EmissionPoint>> Get(EmissionPointPagination pagination)
        {
            var query = from e in context.EmissionPoints select e;

            if (pagination.IsActive != "-")
            {
                query = query.Where(e => e.IsActive == Boolean.Parse(pagination.IsActive));
            }

            query = query.Take(pagination.Page * pagination.Quantity);
            query = query.Skip(pagination.Page * pagination.Quantity - pagination.Quantity);
            query = query.OrderBy(e => e.Name);
            //return (
            //    from e in context.EmissionPoints
            //    select new EmissionPoint
            //    {
            //        Id = e.Id,
            //        Name = e.Name,
            //        IsActive = e.IsActive
            //    }
            //).ToListAsync();
            return query.ToListAsync();
        }

        public Task<EmissionPoint> GetPoint(int pk)
        {
            return (
                from e in context.EmissionPoints
                where e.Id == pk select e
            ).FirstOrDefaultAsync();
        }

        public Task<EmissionPoint> Update(EmissionPoint point)
        {
            context.Update(point);
            context.SaveChanges();
            return GetPoint(point.Id);
        }
    }
}
