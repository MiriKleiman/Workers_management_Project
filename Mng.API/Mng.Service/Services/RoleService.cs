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
        public IEnumerable<Role> Get()
        {
            return _repository.Get();
        }

       
        public Role Post(Role employee)
        {
           return _repository.Post(employee);
        }

        public Role Put(int id, Role employee)
        {
          return _repository.Put(id, employee);
        }
        public Role Delete(int id)
        {
           return _repository.Delete(id);
        }

        public Role GetById(int id)
        {
           return _repository.GetById(id);
        }
    }
}
