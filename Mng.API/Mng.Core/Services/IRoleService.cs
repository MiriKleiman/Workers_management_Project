using Mng.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.Services
{
    public interface IRoleService
    {
        public IEnumerable<Role> Get();
        public Role GetById(int id);

        public Role Post(Role employee);
        public Role Put(int id, Role employee);
        public Role Delete(int id);
    }
}
