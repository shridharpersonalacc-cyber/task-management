using Microsoft.AspNetCore.Mvc;
using System.Web.Http.Results;
using TaskManagement.Server.Service;

namespace TaskManagement.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }
        // This tells .NET Core this action responds to GET requests at /api/product/check
        [HttpGet]
        public IActionResult CheckProductExists(int id)
        {
            var product = _productService.GetProductById(id);
            if (product == null)
                return NotFound();

            return Json(product); // Returns headers only for HEAD request
        }
    }
    //[ApiController]
    //[System.Web.Http.Route("api/[controller]")]
    //public class ProductController : ControllerBase
    //{
    //    private readonly IProductService _productService;
    //    public ProductController(IProductService productService)
    //    {
    //        _productService = productService;
    //    }

    //    /*
    //        An HTTP HEAD request is identical to a GET request, except:
    //        The server does NOT return a response body
    //        It only returns headers (status code, content-type, content-length, etc.)
    //        HEAD is typically used to:
    //        Check if a resource exists
    //        Validate links
    //        Check metadata (like file size or last modified date)
    //        Improve performance when the body isn’t needed
    //     */

    //    [HttpGet]
    //    public IActionResult CheckProduct(int id)
    //    {
    //        var product = _productService.GetProductById(id);
    //        if (product == null)
    //            return NotFound();

    //        return Ok(); // Returns headers only for HEAD request
    //    }
    //}
}
