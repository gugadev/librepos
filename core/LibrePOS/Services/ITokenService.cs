using System;
namespace Pos.Services
{
    public interface ITokenService
    {
        string GenerateToken(string username);
    }
}
