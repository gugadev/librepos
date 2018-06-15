using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Pos.Models.Document;
using Pos.Types;
using Pos.Data;

namespace Pos.Repositories
{
    public class DocumentRepository : IDocumentRepository
    {
        private DataContext context;

        public DocumentRepository(DataContext context)
        {
            this.context = context;
        }

        public Task<Document> Create(Document document)
        {
            context.Documents.Add(document);
            context.SaveChanges();
            return Get(document.Type, document.Serie, document.Correlative);
        }

        public Task<List<Document>> Get(DocumentPagination p)
        {
            // Console.WriteLine($"From: {p.From}");
            // Console.WriteLine($"To: {p.To}");
            // Console.WriteLine($"State: {p.State}");
            // Console.WriteLine($"Plate: {p.Plate}");
            // Console.WriteLine(p.Plate == null);
            // Console.WriteLine(p.State == null);

            var query = from d in context.Documents select d;

            if (p.From != null && p.From != "")
            {
                var date = DateTime.Parse(p.From).Date;
                query = query.Where(d => d.EmissionDate.Date >= date);
            }
            if (p.To != null && p.To != "")
            {
                var date = DateTime.Parse(p.To).Date;
                query = query.Where(d => d.EmissionDate.Date <= date);
            }
            if (p.State != null)
            {
                query = query.Where(d => d.EmissionState == p.State);
            }

            if (p.Plate != null)
            {
                query = query.Where(d => d.Plate == p.Plate);
            }
            if (p.EmissionPoint != 0)
            {
                query = query.Where(d => d.EmissionPoint.Id == p.EmissionPoint);
            }
            if (p.User != 0)
            {
                query = query.Where(d => d.User.Id == p.User);
            }
            if (p.Serie != null)
            {
                query = query.Where(d => d.Serie == p.Serie);
            }
            if (p.Correlative != 0)
            {
                query = query.Where(d => d.Correlative == p.Correlative);
            }

            query = query.Include(d => d.User).Include(d => d.EmissionPoint);

            return query.ToListAsync();
        }

        public Task<Document> Get(string type, string serie, int correlative)
        {
            var query = from d in context.Documents
                        where d.Type == type && d.Serie == serie
                        && d.Correlative == correlative select d;
            return query.FirstOrDefaultAsync();
        }

        public Task<int> Count(DocumentPagination p)
        {
            var query = from d in context.Documents select d;

            if (p.From != "")
            {
                var date = DateTime.Parse(p.From);
                query = query.Where(d => d.EmissionDate.Date >= date);
            }
            if (p.To != "")
            {
                var date = DateTime.Parse(p.To);
                query = query.Where(d => d.EmissionDate.Date <= date);
            }
            if (p.State != null)
            {
                query = query.Where(d => d.EmissionState == p.State);
            }

            if (p.Plate != null)
            {
                query = query.Where(d => d.Plate == p.Plate);
            }
            if (p.EmissionPoint != 0)
            {
                query = query.Where(d => d.EmissionPoint.Id == p.EmissionPoint);
            }

            return query.CountAsync();
        }

        public Task<List<IGrouping<string, Document>>> GetReport(UserReport filters)
        {
            var query = (
                from document in context.Documents
                join detail in context.Details
                on new {
                    Type = document.Type,
                    Serie = document.Serie,
                    Correlative = document.Correlative }
                equals new {
                    Type = detail.DocumentType,
                    Serie = detail.Serie,
                    Correlative = detail.Correlative }
                join service in context.Services
                on detail.Service.Id equals service.Id
                where
                document.User.Id == filters.User
                && document.EmissionPoint.Id == filters.EmissionPoint
                && document.EmissionDate >= filters.From.Date
                && document.EmissionDate <= filters.To.Date
                group document by service.Code into groupx
                select groupx
            );

            // if (filters.Page > 0 && filters.Size > 0)
            // {
            //     query = query
            //     .Skip(filters.Page * filters.Size - filters.Size)
            //     .Take(filters.Size);
            // }
            
            return query.ToListAsync();
            // context
            // .Documents
            // .Join(
            //     context.Details,
            //     doc => { doc.Type, doc.Serie, doc.Correlative },
            //     det => { det.DocumentType, det.Serie, det.Correlative },
            //     (doc, det) => { Document = doc, Detailx = det}
            // )
            // return q.SelectMany(doc => doc).ToListAsync();
            // var query = (
            //     from d in context.Documents
            //     where d.User.Id == filters.User
            //     && d.EmissionPoint.Id == filters.EmissionPoint
            //     && d.EmissionDate >= filters.From.Date
            //     && d.EmissionDate <= filters.To.Date
            //     select d
            // );
            // query = query
            //     .Include(d => d.User)
            //     .Include(d => d.EmissionPoint);
        
            // return query.ToListAsync();
        }
    }
}