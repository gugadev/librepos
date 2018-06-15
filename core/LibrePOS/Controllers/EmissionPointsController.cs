using System;
using System.Linq;
using System.Threading.Tasks;
using Pos.Models;
using Pos.Repositories;
using Pos.Types;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Pos.Controllers
{
    [Route("api/[controller]"), EnableCors("AllowAll"), Authorize]
    public class EmissionPointsController : Controller
    {
        private IEmissionPointRepository repository;

        public EmissionPointsController(IEmissionPointRepository repository)
        {
            this.repository = repository;
        }

        // GET: api/emissionPoints
        [HttpGet, Produces("application/json")]
        public async Task<IActionResult> Get([FromQuery] EmissionPointPagination query)
        {
            var points = await repository.Get(query);
            return Json(new StandardResponse
            {
                Status = 200,
                Data = points
            });
        }

        [HttpGet("count"), Produces("application/json")]
        public async Task<IActionResult> Count([FromQuery] EmissionPointPagination query)
        {
            var count = await repository.Count(query);
            return Json(new StandardResponse
            {
                Status = 200,
                Data = count
            });
        }

        // GET api/emissionPoints/?
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var point = await repository.GetPoint(id);
            return Json(new StandardResponse
            {
                Status = 200,
                Data = point
            });
        }

        // POST api/emissionPoints
        [HttpPost, Produces("application/json"), Consumes("application/json")]
        public async Task<IActionResult> Post([FromBody] EmissionPoint model)
        {
            if (ModelState.IsValid)
            {
                var point = await repository.Create(model);
                return Json(new StandardResponse
                {
                    Status = 200,
                    Data = point
                });
            }
            else
            {
                var errorList = ModelState.Values.SelectMany(v => v.Errors);
                var errors = errorList.Select(e => e.ErrorMessage).ToArray();
                return Json(new StandardResponse
                {
                    Status = 400,
                    Errors = errors
                });
            }
        }

        // PUT api/emissionPoints/?
        [HttpPut("{id}"), Produces("application/json"), Consumes("application/json")]
        public async Task<IActionResult> Put(int id, [FromBody] EmissionPoint model)
        {
            if (ModelState.IsValid)
            {
                var point = await repository.Update(model);
                return Json(new StandardResponse
                {
                    Status = 200,
                    Data = point
                });
            }
            else
            {
                var errorList = ModelState.Values.SelectMany(v => v.Errors);
                var errors = errorList.Select(e => e.ErrorMessage).ToArray();
                return Json(new StandardResponse
                {
                    Status = 400,
                    Errors = errors
                });
            }
        }
    }
}
