using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
    public class UsersController : Controller
    {
        private IUserRepository repository;
        private IRoleRepository roleRepository;
        private ITurnRepository turnRepository;
        private IEmissionPointRepository pointRepository;

        public UsersController(
            IUserRepository repository,
            IRoleRepository roleRepository,
            ITurnRepository turnRepository,
            IEmissionPointRepository pointRepository
        )
        {
            this.repository = repository;
            this.roleRepository = roleRepository;
            this.turnRepository = turnRepository;
            this.pointRepository = pointRepository;
        }

        // GET: api/users
        [HttpGet, Produces("application/json")]
        public async Task<IActionResult> Get([FromQuery] UserPagination pagination)
        {
            var users = await repository.All(pagination);
            return Json(new StandardResponse
            {
                Status = 200,
                Data = users
            });
        }

        // GET: api/users/count
        [HttpGet("count")]
        public async Task<IActionResult> Count([FromQuery] UserPagination pagination)
        {
            var count = await repository.Count(pagination);
            return Json(new StandardResponse
            {
                Status = 200,
                Data = count
            });
        }

        // GET api/users/x
        [HttpGet("{username}"), Produces("application/json")]
        public async Task<IActionResult> Get(string username)
        {
            var user = await repository.Find(username);
            return Json(new StandardResponse
            {
                Status = 200,
                Data = user
            });
        }

        [HttpGet("self"), Produces("application/json")]
        public async Task<IActionResult> Self()
        {
            var username = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            var user = await repository.Find(username);
            return Json(new StandardResponse
            {
                Status = 200,
                Data = user
            });
        }

        // POST api/users
        [HttpPatch("{username}/photo"), Consumes("application/json"), Produces("application/json")]
        public async Task<IActionResult> UpdatePhoto(string username, [FromBody] UserPhoto body)
        {
            var user = await repository.Find(username);
            user.Photo = body.Photo;
            user = await repository.Update(user);
            return Json(new StandardResponse
            {
                Status = 200,
                Data = user
            });
        }

        // PUT api/users/x
        [HttpPut("{username}"), Produces("application/json")]
        public async Task<IActionResult> Put(string username, [FromBody] UserRegister u)
        {
            if (ModelState.IsValid)
            {
                var user = await repository.Find(username);
                user.Name = u.Name;
                user.Username = u.Username;
                user.Email = u.Email;
                user.IsActive = u.IsActive;
                user.Role = await roleRepository.Find(u.Role);
                user.EmissionPoint = await pointRepository.GetPoint(u.EmissionPoint);
                user.Turn = await turnRepository.Find(u.Turn);
                return Json(new StandardResponse
                {
                    Status = 200,
                    Data = await repository.Update(user)
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
