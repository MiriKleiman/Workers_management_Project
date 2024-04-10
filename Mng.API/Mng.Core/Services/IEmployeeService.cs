using Mng.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.Services
{
    public interface IEmployeeService
    {
        Task<IEnumerable<Employee>> Get();
        Task<Employee> GetById(int id);
        Task<Employee> Post(Employee employee);
        Task<Employee> Put(int id, Employee employee);
        Task Delete(int id);
        Task<Employee> UpdateStatus(int id);
    }
}
/*
 מחלקת עובד:
*Put(bool status);
 מחלקת תפקיד:
 * GetAll();
 * GetByName();????
  מחלקת תפקיד לעובד:
 * Post(Role,Employee);
 * Put(RoleId,EmployeeId)
 * Delete(RoleId,EmployeeId)
 * 
*/