using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Mng.API.Models;
using Mng.Core.DTOs;
using Mng.Core.Entities;
using Mng.Core.Services;
using Mng.Service.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Mng.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;

        public RoleController(IRoleService roleService, IMapper mapper)
        {
            _roleService = roleService;
            _mapper = mapper;
        }
        // GET: api/<RoleController>
        [Route("role")]
        [HttpGet]
        public ActionResult<IEnumerable<RoleDto>> Get()
        {
            try
            {
                var roleList = _roleService.Get();
                var roleListDto = _mapper.Map<IEnumerable<RoleDto>>(roleList);
                return Ok(roleListDto);
            }
            catch (Exception)
            {

               return NotFound();
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Role> GetById(int id)
        {
            try
            {
                var role = _roleService.GetById(id);
                var roleDto = _mapper.Map<RoleDto>(role);
                return Ok(roleDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public ActionResult Post([FromBody] RolePostModel role)
        {
            try
            {
                Role role1 = _mapper.Map<Role>(role);
                return Ok(_roleService.Post(role1));
            }
            catch (Exception ex)
            {
               return NotFound(ex.InnerException);
            }
        }

        [HttpPut("{id}")]
        public ActionResult Put([FromRoute] int id, [FromBody] RolePostModel role)
        {
            try
            {
                return Ok(_roleService.Put(id, _mapper.Map<Role>(role)));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        // DELETE api/<RoleController>/5
        [HttpDelete("{id}")]
        public ActionResult<Role> Delete([FromRoute] int id)
        {
            try
            {
                return Ok(_roleService.Delete(id));

            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
