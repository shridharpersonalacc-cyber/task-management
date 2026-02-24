using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TaskManagement.Server.Mongo.Product;

namespace TaskManagement.Server.Mongo.Repository
{
    public class EmployeeRepository
    {
        private readonly IMongoCollection<Employee> _employeeCollection;

        public EmployeeRepository(IMongoClient client, IOptions<MongoDbSettings> settings)
        {
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _employeeCollection = database.GetCollection<Employee>(settings.Value.CollectionName);
        }

        public async Task<List<Employee>> GetAllAsync() => await _employeeCollection.Find(_ => true).ToListAsync();

        public async Task<Employee> GetByIdAsync(string Id) => await _employeeCollection.Find(x => x.Id == Id).FirstOrDefaultAsync();

        public async Task CreateAsync(Employee employee)
        {
            await _employeeCollection.InsertOneAsync(employee);
        }

        public async Task UpdateAsync(string id, Employee employee) => await _employeeCollection.ReplaceOneAsync(x => x.Id == id, employee);

        public async Task DeleteAsync(string id) => await _employeeCollection.DeleteOneAsync(x => x.Id == id);

        public async Task FilterQueryForFirstname(string firstName)
        {
            var checkMatchingFirstname = Builders<Employee>.Filter.Eq(e => e.Firstanme, firstName);
            var resultForCheckMatchingFirstname = SearchByFilter(checkMatchingFirstname);

            var checkSalaryGreater = Builders<Employee>.Filter.Gt(e => e.Firstanme, firstName);
            var resultForCheckSalaryGreater = SearchByFilter(checkMatchingFirstname);
        }


        public async Task<Employee> SearchByFilter(FilterDefinition<Employee> filter)
        {
            return await _employeeCollection.Find(filter).FirstOrDefaultAsync();
        }
        public async Task UpdateQueryForFirstname(string firstName, string id)
        {
            var checkMatchingFirstname = Builders<Employee>.Update.Set(e => e.Firstanme, firstName);
            await _employeeCollection.UpdateOneAsync(p => p.Id == id, checkMatchingFirstname);
        }

        public async Task CreateIndex()
        {
            var indexKeys = Builders<Employee>.IndexKeys.Ascending(p => p.Firstanme);
            await _employeeCollection.Indexes.CreateOneAsync(new CreateIndexModel<Employee>(indexKeys));
        }

    }
}
