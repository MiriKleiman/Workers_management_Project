﻿using AutoMapper;
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
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;

        public EmployeeController(IEmployeeService employeeService,IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }
        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<ActionResult<List<EmployeeDto>>> Get()
        {
            try
            {
                var employeesList = await _employeeService.Get();
                var employeesListDto = _mapper.Map<List<EmployeeDto>>(employeesList);
                return Ok(employeesListDto);
                //return Ok(_employeeService.Get());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDto>> GetById(int id)
        {
            try
            {
                var employee = await _employeeService.GetById(id);
                var employeeDto = _mapper.Map<EmployeeDto>(employee);
                return Ok(employeeDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel employee)
        {
            try
            {
                var employeeToAdd = await _employeeService.Post(_mapper.Map<Employee>(employee));
                return Ok(employeeToAdd);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel employee)
        {
            try
            {
                var updateEmployee = await _employeeService.Put(id, _mapper.Map<Employee>(employee));
                return Ok(updateEmployee);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
            //try
            //{
            //    var updateEmployee = await _employeeService.Put(id, _mapper.Map<Employee>(employee));
            //    category = await _categoryService.GetByIdAsync(id);
            //    return Ok(updateEmployee);
            //}
            //catch (Exception ex)
            //{
            //   return BadRequest(ex.Message);
            //}
        }
        //[Route("")]
        [HttpPut("UpdateStatus/{id}")]
        public async Task<ActionResult> UpdateStatus([FromRoute] int id)
        {
            try
            {
                var updateEmployee = await _employeeService.UpdateStatus(id);
                return Ok(updateEmployee);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        // DELETE api/<EmployeeController>/5
        //[HttpDelete("{id}")]
        //public ActionResult Delete(int id,Employee employee)
        //{
        //    var CurrentEmployee = _employeeService.GetById(id);
        //    if (CurrentEmployee is null)
        //    {
        //        return NotFound();
        //    }
        //    _employeeService.UpdateStatus(id,employee);
        //    return  

        //}
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var user = await _employeeService.GetById(id);
            if (user is null)
            {
                return NotFound();
            }
            _employeeService.Delete(id);
            return NoContent();

        }
    }
}
