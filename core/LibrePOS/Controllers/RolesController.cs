using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Pos.Repositories;
using Pos.Types;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Pos.Controllers
{
    [Route("api/[controller]"), EnableCors("AllowAll"), Authorize]
    public class RolesController : Controller
    {
        private IRoleRepository repository;

        public RolesController(IRoleRepository repository)
        {
            this.repository = repository;
        }

        // GET: api/roles
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var roles = await repository.All();
            return Json(new StandardResponse
            {
                Status = 200,
                Data = roles
            });
        }

        // GET api/roles/x
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var role = await repository.Find(id);
            return Json(new StandardResponse
            {
                Status = 200,
                Data = role
            });
        }

        // POST api/roles
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
    }
}
