using Mng.Core.Entities;
using Mng.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.Data.Repositories
{
    public class RoleRepository : IRoleRepository
    {

        private readonly DataContext _context;
        public RoleRepository(DataContext context)
        {
            _context = context;
        }
        public static int RoleIdCounter = 0;

        public Role Delete(int id)
        {
            Role currentrole = GetById(id);
            _context.Remove(currentrole);
            _context.SaveChanges();
            return currentrole;
        }

        public IEnumerable<Role> Get()
        {
            return _context.Role.ToList();
        }


        public Role Post(Role role)
        {
            if (!_context.Role.Any(r => r.Name == role.Name))
            {
                _context.Role.Add(role);
                _context.SaveChanges(); // שמירת השינויים במסד הנתונים
            }
            //role.Id = RoleIdCounter++;
            //_context.Role.Add(role);
            //_context.SaveChanges();
            return role;
        }

        public Role Put(int id, Role role)
        {
            var currentEmployee = GetById(id);
            if (currentEmployee == null)
            {
                return null;
            }
            //role.Id = currentEmployee.Id;
            _context.Entry(currentEmployee).CurrentValues.SetValues(role);
           _context.SaveChanges();
           return role; 
        }

        public Role GetById(int id)
        {
           return _context.Role.FirstOrDefault(e => e.Id == id);
        }

      
    }
}
