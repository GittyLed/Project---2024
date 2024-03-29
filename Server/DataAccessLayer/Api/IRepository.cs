﻿using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Api
{
    public interface IRepository<T>
    {
        Task<PagedList<T>> GetAllAsync(BaseQueryParams queryParams);
        Task<T> GetSingleAsync(int id);
        Task<T> AddAsync(T entity);
        Task<T> UpdateAsync(int id, T entity);
        Task<T> DeleteAsync(int id);
    }
}
