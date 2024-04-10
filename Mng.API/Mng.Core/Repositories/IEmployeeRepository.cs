using Mng.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.Repositories
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetEmployees();
        Task<Employee> GetById(int id);
        Task<Employee> Post(Employee employee);
        Task<Employee> Put(int id, Employee employee);
        Task Delete(int id);
        Task<Employee> UpdateStatus(int id);
    }
}
