using System;
using System.Threading.Tasks;
using Pos.Models;
using Pos.Repositories;
using Pos.Services;
using Pos.Types;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Cors;

namespace Pos.Controllers
{
    [Route("api/[controller]")] [EnableCors("AllowAll")]
    public class AuthController : Controller
    {
        private IAuthService authService;
        private IRoleRepository roleRepository;
        private ITurnRepository turnRepository;
        private IEmissionPointRepository pointRepository;
        private ITokenService tokenService;

        public AuthController(
            IAuthService _authService,
            IRoleRepository _roleRepository,
            ITurnRepository _turnRepository,
            ITokenService _tokenService,
            IEmissionPointRepository _pointRepository
        )
        {
            authService = _authService;
            roleRepository = _roleRepository;
            turnRepository = _turnRepository;
            pointRepository = _pointRepository;
            tokenService = _tokenService;
        }

        [HttpPost, Consumes("application/json"), Produces("application/json")]
        public async Task<IActionResult> Login([FromBody] UserLogin u)
        {
            try {
                var user = await authService.Authenticate(u.Username, u.Password);
                return Json(new StandardResponse
                {
                    Status = 200,
                    Data = tokenService.GenerateToken(user.Username)
                });
            } catch (Exception e) {
                return Json(new StandardResponse
                {
                    Status = 400,
                    Errors = new string[] { e.Message }
                });
            }
        }

        [HttpPost("register"), Consumes("application/json"), Produces("application/json")]
        public async Task<IActionResult> Register([FromBody] UserRegister u)
        {
            if (ModelState.IsValid)
            {
                var user = await authService.Register(new User
                {
                    Name = u.Name,
                    Username = u.Username,
                    Email = u.Email,
                    Password = u.Username,
                    Role = await roleRepository.Find(u.Role),
                    EmissionPoint = await pointRepository.GetPoint(u.EmissionPoint),
                    Turn = await turnRepository.Find(u.Turn),
                    IsActive = u.IsActive
                });
                return Json(new StandardResponse
                {
                    Status = 200,
                    Data = tokenService.GenerateToken(user.Username)
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
