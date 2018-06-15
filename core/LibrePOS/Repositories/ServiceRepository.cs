using System.Collections.Generic;
using System.Threading.Tasks;
using Pos.Data;
using Pos.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Pos.Types;
using System;

namespace Pos.Repositories
{
    public class ServiceRepository : IServiceRepository
    {
        private DataContext context;

        public ServiceRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<List<Service>> All(ServicePagination p)
        {
            var query = from s in context.Services select s;

            if (p.IsActive != "-")
            {
                query = query.Where(s => s.IsActive == Boolean.Parse(p.IsActive));
            }

            if (p.NeedPlate != "-") {
                query = query.Where(s => s.NeedPlate == Boolean.Parse(p.NeedPlate));
            }

            if (p.EmissionPoint != 0)
            {
                query = query.Where(s => s.EmissionPoint.Id == p.EmissionPoint);
            }

            query = query.Include(s => s.EmissionPoint);

            return await query.OrderBy(s => s.Name).ToListAsync();

            // return await (
            //     from s in context.Services
            //     select new Service
            //     {
            //         Id = s.Id,
            //         Name = s.Name,
            //         Code = s.Code,
            //         UnitMeasurement = s.UnitMeasurement,
            //         NeedPlate = s.NeedPlate,
            //         IsActive = s.IsActive
            //     }
            // ).ToListAsync();
        }

        public Task<Service> Create(Service service)
        {
            context.Services.Add(service);
            context.SaveChanges();
            return Find(service.Code);
        }

        public async Task<Service> Find(string code)
        {
            return await (
                context
                .Services
                .Where(s => s.Code == code)
                .Include(s => s.EmissionPoint)
                .FirstOrDefaultAsync()
            );
        }

        public Task<Service> Update(Service service)
        {
            context.Update(service);
            context.SaveChanges();
            return Find(service.Code);
        }

        public Task<int> Count(ServicePagination p)
        {
             var query = from s in context.Services select s;

            if (p.IsActive != "-")
            {
                query = query.Where(s => s.IsActive == Boolean.Parse(p.IsActive));
            }

            if (p.NeedPlate != "-") {
                query = query.Where(s => s.NeedPlate == Boolean.Parse(p.NeedPlate));
            }

            if (p.EmissionPoint != 0)
            {
                query = query.Where(s => s.EmissionPoint.Id == p.EmissionPoint);
            }

            return query.CountAsync();
        }
    }
}
