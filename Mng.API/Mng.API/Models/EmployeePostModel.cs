using Mng.Core.Entities;

namespace Mng.API.Models
{
    public class EmployeePostModel
    {
        public int Id { get; set; }
        public string Tz { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Gender { get; set; }
        public DateOnly BeginningOfWork { get; set; }
        public List<RoleToEmployeePostModel>? Roles { get; set; }
        //public bool Status { get; set; }
    }
}
