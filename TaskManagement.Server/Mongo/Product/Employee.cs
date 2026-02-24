using MongoDB.Bson.Serialization.Attributes;

namespace TaskManagement.Server.Mongo.Product
{
    public class Employee
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
        public string Firstanme { get; set; }
        public string Lastname { get; set; }
        public int phone {  get; set; }
        public int salary { get; set;  }
    }
}
