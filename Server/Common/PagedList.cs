using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer;

public class PagedList<T> : List<T>
{
    public int CurrentPage { get; private set; }
    public int TotalPages { get; private set; }
    public int PageSize { get; private set; }
    public int TotalItems { get; private set; }
    public bool HasPrevious => CurrentPage > 1;
    public bool HasNext => CurrentPage < TotalPages;

    public PagedList(int totalCount, int currentPage, int pageSize, List<T> items)
    {
        TotalItems = totalCount;
        CurrentPage = currentPage;
        PageSize = pageSize;
        TotalPages = (int)Math.Ceiling(TotalItems / (double)pageSize);

        AddRange(items);
    }
    public static PagedList<T> ToPagedList(IQueryable<T> source, int pageNumber, int pageSize)
    {
        int totalItems = source.Count();
        var items = source.Skip((pageNumber - 1) * pageSize)
            .Take(pageSize).ToList();
        return new PagedList<T>(totalItems, pageNumber, pageSize, items);
    }

}
