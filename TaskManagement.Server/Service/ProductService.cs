namespace TaskManagement.Server.Service
{
    public interface IProductService
    {
        Product? GetProductById(int id);
    }
    public class ProductService : IProductService
    {
        public Product? GetProductById(int id)
        {
            if (id == 1234)
            {
                return new Product() { ProductName = "My HP Laptop", Id = 1234, ProductDescription = "This is my new HP Laptop" };
            }
            else
            {
                return null;
            }
        }
    }


}
