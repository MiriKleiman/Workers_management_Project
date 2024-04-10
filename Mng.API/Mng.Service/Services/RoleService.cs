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
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _repository;
        //private readonly IMapper _mapper;

        public RoleService(IRoleRepository repository/*, IMapper mapper*/)
        {
            _repository = repository;
            //_mapper = mapper;

        }
        public async Task<IEnumerable<Role>> Get()
        {
            return await _repository.Get();
        }

       
        public async Task<Role> Post(Role employee)
        {
           return await _repository.Post(employee);
        }

        public async Task<Role> Put(int id, Role employee)
        {
          return await _repository.Put(id, employee);
        }
        public async Task<Role> Delete(int id)
        {
           return await _repository.Delete(id);
        }

        public async Task<Role> GetById(int id)
        {
           return await _repository.GetById(id);
        }
    }
}
