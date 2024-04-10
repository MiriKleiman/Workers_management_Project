using AutoMapper;
using Mng.Core.Entities;
using Mng.Core.Repositories;
using Mng.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Service.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _repository;
        //private readonly IMapper _mapper;

        public EmployeeService(IEmployeeRepository repository/*, IMapper mapper*/)
        {
            _repository = repository;
            //_mapper = mapper;

        }

        public async Task<Employee> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<IEnumerable<Employee>> Get()
        {
            return await _repository.GetEmployees();
        }

        public async Task<Employee> Post(Employee employee)
        {
             return await _repository.Post(employee);
        }

        public async Task<Employee> Put(int id, Employee employee)
        {
           return await _repository.Put(id, employee);  
        }

        public async Task Delete(int id)
        {
           await _repository.Delete(id);
        }

        public async Task<Employee> UpdateStatus(int id)
        {
            return await _repository.UpdateStatus(id);
        }
    }
}
