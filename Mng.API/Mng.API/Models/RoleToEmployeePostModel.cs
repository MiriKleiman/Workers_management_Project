using Mng.Core.DTOs;
using Mng.Core.Entities;

namespace Mng.API.Models
{
    public class RoleToEmployeePostModel
    {
        public int RoleId { get; set; }
        //public int EmployeeId { get; set; }
        public DateOnly BeginningOfWork { get; set; }
        public string Management { get; set; }
        public RolePostModel? Role { get; set; }

    }
}
