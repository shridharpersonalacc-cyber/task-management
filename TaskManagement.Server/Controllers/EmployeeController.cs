using Microsoft.AspNetCore.Mvc;
using TaskManagement.Server.Mongo.Product;
using TaskManagement.Server.Mongo.Repository;

namespace TaskManagement.Server.Controllers
{
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeRepository _empRepo;
        public EmployeeController(EmployeeRepository empRepo)
        {
            _empRepo = empRepo;
        }

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _empRepo.GetAllAsync());

        [HttpPost]
        public async Task<IActionResult> Create(Employee employee)
        {
            await _empRepo.CreateAsync(employee);
            return Ok(employee);
        }
    }
}
