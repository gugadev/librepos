using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Pos.Data;
using Pos.Models;

namespace Pos.Repositories
{
    public class ConfigurationRepository : IConfigurationRepository
    {
        private DataContext context;

        public ConfigurationRepository(DataContext context)
        {
            this.context = context;
        }

        public Task<Configuration> Get(string code) => (
            from c in context.Configurations
            where c.Code == code
            select c
        ).FirstOrDefaultAsync();

        public async Task<Configuration> Update(Configuration c)
        {
            context.Configurations.Update(c);
            context.SaveChanges();
            return await Get(c.Code);
        }
    }
}
