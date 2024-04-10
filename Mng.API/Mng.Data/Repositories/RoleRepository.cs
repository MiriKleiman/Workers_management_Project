using Microsoft.EntityFrameworkCore;
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

        public async Task<Role> Delete(int id)
        {
            Role currentrole = await GetById(id);
            _context.Remove(currentrole);
            await _context.SaveChangesAsync();
            return currentrole;
        }

        public async Task<IEnumerable<Role>> Get()
        {
            return await _context.Role.ToListAsync();
        }


        public async Task<Role> Post(Role role)
        {
            if (!await _context.Role.AnyAsync(r => r.Name == role.Name))
            {
                _context.Role.Add(role);
               await _context.SaveChangesAsync(); // שמירת השינויים במסד הנתונים
            }
            //role.Id = RoleIdCounter++;
            //_context.Role.Add(role);
            //_context.SaveChanges();
            return role;
        }

        public async Task<Role> Put(int id, Role role)
        {
            var currentEmployee =await GetById(id);
            if (currentEmployee == null)
            {
                return null;
            }
            //role.Id = currentEmployee.Id;
            _context.Entry(currentEmployee).CurrentValues.SetValues(role);
            await _context.SaveChangesAsync();
           return role; 
        }

        public async Task<Role> GetById(int id)
        {
           return await _context.Role.FirstOrDefaultAsync(e => e.Id == id);
        }

      
    }
}
