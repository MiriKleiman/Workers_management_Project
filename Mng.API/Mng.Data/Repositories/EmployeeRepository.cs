using Microsoft.EntityFrameworkCore;
using Mng.Core.Entities;
using Mng.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }

        
      
        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            return await _context.Employee.Include(u => u.Roles).ThenInclude(x => x.Role)
                .Where(e => e.Status == true).ToListAsync();
           
        }
        public async Task<Employee> Post(Employee employee)
        {
            employee.Status = true;
            _context.Employee.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

     

        public async Task<Employee> Put(int id, Employee employee)
        {
            var currentEmployee =await GetById(id);
            if (currentEmployee == null)
            {
                return null;
            }
            currentEmployee.Status = true;
            employee.Status = true;
            employee.Id = id;
            _context.Entry(currentEmployee).CurrentValues.SetValues(employee);  
            await _context.SaveChangesAsync();
            return employee;
        }
     
            public async Task<Employee> UpdateStatus(int id)
            {
                var currentEmployee = await GetById(id);
                if (currentEmployee != null)
                {
                    currentEmployee.Status = false;
                  await  _context.SaveChangesAsync();
                }
                return currentEmployee;
            }


        public async Task Delete(int id)
        {
            var employee = await GetById(id);
            _context.Employee.Remove(employee);
            await _context.SaveChangesAsync();
        }

        public async Task<Employee> GetById(int id)
        {
            return await _context.Employee.Include(u => u.Roles).ThenInclude(x => x.Role)
                .FirstAsync(e =>e.Id == id);
        }
    }
}
