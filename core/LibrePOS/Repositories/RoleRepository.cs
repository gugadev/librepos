using System.Linq;
using Microsoft.EntityFrameworkCore;
using Pos.Data;
using System.Threading.Tasks;
using Pos.Models;
using System.Collections.Generic;

namespace Pos.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private DataContext context;

        public RoleRepository(DataContext _context)
        {
            context = _context;
        }

        public async Task<Role> Find(int pk)
        {
            return await (
                context
                .Roles
                .Where(r => r.Id == pk)
                .FirstAsync()
            );
        }

        public async Task<Role> Create(Role role)
        {
            context.Roles.Add(role);
            context.SaveChanges();
            return await Find(role.Id);
        }

        public async Task<List<Role>> All()
        {
            return await (
                from r in context.Roles
                select new Role
                {
                    Id = r.Id,
                    Name = r.Name,
                    Description = r.Description,
                    IsActive = r.IsActive
                }
            ).ToListAsync();
        }
    }
}
