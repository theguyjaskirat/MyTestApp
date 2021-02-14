using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Data;
using DTOs;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Controllers
{
    public class AccountController:BaseApiController
    {
        private readonly DataContext _context;
        public AccountController(DataContext context)
        {
            _context=context;
        }
        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(RegisterDto model){
            if(await UserExists(model.Username))
            {
                return BadRequest("Username already exists");
            }
            using var hmac = new HMACSHA512();
                var registeruser = new AppUser {
                    UserName=model.Username.ToLower(),
                    PasswordHash= hmac.ComputeHash(Encoding.UTF8.GetBytes(model.Password)),
                    PasswordSalt=hmac.Key
                };
                _context.Users.Add(registeruser);
                await _context.SaveChangesAsync();
                return registeruser;
        }
         [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(LoginDto model){
           var user = await _context.Users.FirstOrDefaultAsync(x=>x.UserName==model.Username.ToLower());
           if(user==null)
           {
               return Unauthorized("username doesn't exists");
           }
           using var hmac = new HMACSHA512(user.PasswordSalt);
           var computedhash = hmac.ComputeHash(Encoding.UTF8.GetBytes(model.Password));
           for (int i=0;i< computedhash.Length;i++)
           {
               if(computedhash[i]!=user.PasswordHash[i]) return Unauthorized("Invalid Password");
           }
           return Ok("krde aa implement");
        }
        private async Task<bool> UserExists(string username)
        {
        return await _context.Users.AnyAsync(x=> x.UserName==username.ToLower());
        }
    }
}