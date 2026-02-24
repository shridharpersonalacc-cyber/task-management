
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Identity.Web;

namespace TaskManagement.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly ITokenAcquisition _tokenAcquisition;
        public AuthController(ITokenAcquisition tokenAcquisition)
        {
            _tokenAcquisition = tokenAcquisition;
        }

        [HttpGet("login")]
        public IActionResult Login()
        {
            return Challenge(new AuthenticationProperties
            {
                RedirectUri = "/api/auth/token"
            }, OpenIdConnectDefaults.AuthenticationScheme);
        }

        // the below api will be helfull when we wanted to do the and it will be calle for  Auto Refresh Strategy - /api/auth/token
        [Authorize]
        [HttpGet("token")]
        public async Task<IActionResult> GetToken()
        {
            var accessToken = await _tokenAcquisition.GetAccessTokenForUserAsync(new[] { "api://YOUR_CLIENT_ID/access_as_user" });
            return Ok(new { token = accessToken });
        }
        //private readonly IProductService _productService;
        //public AuthController(IProductService productService)
        //{
        //    productService = _productService;
        //}
        // TODO: Check 
        //[HttpHead]


        //public IActionResult Index()
        //{
        //    return Ok(true);
        //}
    }
}
