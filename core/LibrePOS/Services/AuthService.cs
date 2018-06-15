using System;
using System.Threading.Tasks;
using Pos.Models;
using Pos.Repositories;

namespace Pos.Services
{
    public class AuthService : IAuthService
    {
        private IUserRepository userRepository;

        public AuthService(IUserRepository _userRepository)
        {
            userRepository = _userRepository;
        }

        public async Task<User> Authenticate(string username, string password)
        {
            var user = await userRepository.Find(username);
            if (user != null)
            {
                var match = BCrypt.Net.BCrypt.Verify(password, user.Password);
                if (match)
                {
                    return user;
                }
                throw new Exception("Contraseña incorrecta");
            }
            else {
                throw new Exception("Usuario no existe");
            }
        }

        public async Task<User> Register(User user)
        {
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            return await userRepository.Create(user);
        }
    }
}
