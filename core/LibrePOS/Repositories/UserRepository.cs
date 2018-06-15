using System.Threading.Tasks;
using System.Linq;
using Pos.Models;
using Pos.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Pos.Types;
using System;

namespace Pos.Repositories
{
    public class UserRepository : IUserRepository
    {
        private DataContext context;

        public UserRepository(DataContext _context)
        {
            context = _context;
        }

        public async Task<User> Find(string username)
        {
            return await (
                context
                .Users
                .Where(u => u.Username == username)
                // .DefaultIfEmpty()
                .Include(u => u.Role)
                .Include(u => u.EmissionPoint)
                .Include(u => u.Turn)
                .FirstOrDefaultAsync()
            );
        }

        public async Task<User> Create(User user)
        {
            context.Users.Add(user);
            context.SaveChanges();
            return await Find(user.Username);
        }

        public Task<List<User>> All(UserPagination pagination)
        {
            var query =
                context.Users
                .Include(u => u.Role)
                .Include(u => u.EmissionPoint)
                .Include(u => u.Turn)
                .Skip(pagination.Page * pagination.Quantity - pagination.Quantity)
                .Take(pagination.Quantity);                

            if (pagination.IsActive != "-")
            {
                query = query.Where(u => u.IsActive == Boolean.Parse(pagination.IsActive));
            }

            if (pagination.Role != 0)
            {
                query = query.Where(u => u.Role.Id == pagination.Role);
            }

            if (pagination.EmissionPoint != 0)
            {
                query = query.Where(u => u.EmissionPoint.Id == pagination.EmissionPoint);
            }

            query = query.OrderBy(u => u.Name);

            return query.ToListAsync();

            //return await (
            //    query
            //    .Include(u => u.Role)
            //    .Include(u => u.EmissionPoint)
            //    .Skip(pagination.Page * pagination.Quantity - pagination.Quantity)
            //    .Take(pagination.Quantity)
            //    //from u in context.Users
            //    //select new User
            //    //{
            //    //    Id = u.Id,
            //    //    Name = u.Name,
            //    //    Username = u.Username,
            //    //    Email = u.Email,
            //    //    // Password = u.Password,
            //    //    Role = u.Role,
            //    //    IsActive = u.IsActive
            //    //}
            //).ToListAsync();
        }

        public Task<int> Count(UserPagination pagination)
        {
            var query = from u in context.Users select u;

            if (pagination.IsActive != "-")
            {
                query = query.Where(u => u.IsActive == Boolean.Parse(pagination.IsActive));
            }

            if (pagination.Role != 0)
            {
                query = query.Where(u => u.Role.Id == pagination.Role);
            }

            if (pagination.EmissionPoint != 0)
            {
                query = query.Where(u => u.EmissionPoint.Id == pagination.EmissionPoint);
            }

            return query.CountAsync();
        }

        public Task<User> Update(User user)
        {
            context.SaveChanges();
            return Find(user.Username);
        }
    }
}
