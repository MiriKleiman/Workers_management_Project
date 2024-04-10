using Mng.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Core.Repositories
{
    public interface IRoleRepository
    {
        Task<IEnumerable<Role>> Get();
        Task<Role> GetById(int id);
        Task<Role> Post(Role employee);
        Task<Role> Put(int id, Role employee);
        Task<Role> Delete(int id);
    }
}
