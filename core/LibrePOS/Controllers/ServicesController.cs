using System;
using System.Collections.Generic;
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
    public class ServicesController : Controller
    {
        private IServiceRepository repository;
        private IEmissionPointRepository ePointRepository;

        public ServicesController(
            IServiceRepository repository,
            IEmissionPointRepository ePointRepository)
        {
            this.repository = repository;
            this.ePointRepository = ePointRepository;
        }

        // GET: api/services
        [HttpGet, Produces("application/json")]
        public async Task<IActionResult> Get([FromQuery] ServicePagination p)
        {
            var services = await repository.All(p);
            return Json(new StandardResponse
            {
                Status = 200,
                Data = services
            });
        }

        [HttpGet("count"), Produces("application/json")]
        public async Task<IActionResult> Count([FromQuery] ServicePagination p)
        {
            var count = await repository.Count(p);
            return Json(new StandardResponse
            {
                Status = 200,
                Data = count
            });
        }

        // GET api/service/xyz
        [HttpGet("{code}"), Produces("application/json")]
        public async Task<IActionResult> Get(string code)
        {
            return Json(new StandardResponse
            {
                Status = 200,
                Data = await repository.Find(code)
            });
        }

        // POST api/services
        [HttpPost, Consumes("application/json"), Produces("application/json")]
        public async Task<IActionResult> Post([FromBody] ServiceRegister s)
        {
            if (ModelState.IsValid)
            {
                var service = await repository.Create(new Service
                {
                    Name = s.Name,
                    Code = s.Code,
                    Cost = s.Cost,
                    UnitMeasurement = s.UnitMeasurement,
                    NeedPlate = s.NeedPlate,
                    EmissionPoint = await ePointRepository.GetPoint(s.EmissionPoint),
                    IsActive = s.IsActive
                });
                return Json(new StandardResponse
                {
                    Status = 200,
                    Data = service
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

        // PUT api/values/5
        [HttpPut("{code}"), Consumes("application/json"), Produces("application/json")]
        public async Task<IActionResult> Put(string code, [FromBody] ServiceRegister s)
        {
            if (ModelState.IsValid)
            {
                var service = await repository.Find(s.Code);
                service.Name = s.Name;
                // service.Code = s.Code;
                service.Cost = s.Cost;
                service.UnitMeasurement = s.UnitMeasurement;
                service.NeedPlate = s.NeedPlate;
                service.EmissionPoint = await ePointRepository.GetPoint(s.EmissionPoint);
                service.IsActive = s.IsActive;

                service = await repository.Update(service);

                return Json(new StandardResponse
                {
                    Status = 200,
                    Data = service
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
