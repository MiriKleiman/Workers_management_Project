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

        
      
        public IEnumerable<Employee> GetEmployees()
        {
            return _context.Employee.Include(u => u.Roles).ThenInclude(x => x.Role)
                .Where(e => e.Status == true).ToList();
           
        }
        public Employee Post(Employee employee)
        {
            employee.Status = true;
            _context.Employee.Add(employee);
            _context.SaveChanges();
            return employee;
        }

     

        public Employee Put(int id, Employee employee)
        {
            var currentEmployee = GetById(id);
            if (currentEmployee == null)
            {
                return null;
            }
            currentEmployee.Status = true;
            employee.Status = true;
            employee.Id = id;
            _context.Entry(currentEmployee).CurrentValues.SetValues(employee);  
            _context.SaveChanges();
            return employee;
        }
     
        public Employee UpdateStatus(int id)
            {
                var currentEmployee = GetById(id);
                if (currentEmployee != null)
                {
                    currentEmployee.Status = false;
                    _context.SaveChanges();
                }
                return currentEmployee;
            }
        

        public void Delete(int id)
        {
            var employee = GetById(id);
           _context.Employee.Remove(employee);
        }

        public Employee GetById(int id)
        {
            return _context.Employee.Include(u => u.Roles).ThenInclude(x => x.Role)
                .First(e =>e.Id == id);
        }
    }
}
