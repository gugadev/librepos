using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Pos.Models.Document;
using Pos.Repositories;
using Pos.Services;
using Pos.Types;

namespace Pos.Controllers
{
    [Route("api/[controller]"), EnableCors("AllowAll"), Authorize]
    public class ReportsController: Controller
    {
        private IDocumentRepository documentRepository;
        private ITaxRepository taxRepository;
        private IDetailRepository detailRepository;
        private IUserRepository userRepository;
        private IServiceRepository serviceRepository;
        private IReportService reportService;

        public ReportsController(
            IDocumentRepository documentRepository,
            ITaxRepository taxRepository,
            IDetailRepository detailRepository,
            IUserRepository userRepository,
            IServiceRepository serviceRepository,
            IReportService reportService)
        {
            this.documentRepository = documentRepository;
            this.taxRepository = taxRepository;
            this.detailRepository = detailRepository;
            this.userRepository = userRepository;
            this.serviceRepository = serviceRepository;
            this.reportService = reportService;
        }

        [HttpGet("general"), Produces("application/json")]
        public async Task<IActionResult> GenerateGeneralReport(DocumentPagination p)
        {
            var documents = await documentRepository.Get(p);
            var orders = new List<OrderResponse>();

            foreach (Document document in documents)
            {
                var docType = document.Type;
                var serie = document.Serie;
                var correlative = document.Correlative;
                var order = new OrderResponse
                {
                    Document = document,
                    Tax = await taxRepository.Find(docType, serie, correlative),
                    Detail = await detailRepository.Find(docType, serie, correlative)
                };
                orders.Add(order);
            };

            var binary = reportService.GenerateOrdersReport(orders);
            // HttpResponseMessage response = new HttpResponseMessage();
            // response.Content = new ByteArrayContent(binary);
            // response.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
            // response.Content.Headers.ContentDisposition.FileName = $"Reporte-Ventas-{DateTime.Now.ToString("dd/MM/yyy hh:m:ss")}";
            // response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.ms-excel");
            // return response;
            var hardcoded = Convert.ToBase64String(binary);
            return Json(new StandardResponse
            {
                Status = 200,
                Data = hardcoded
            });
        }

        [HttpGet("user"), Produces("application/json")]
        public async Task<IActionResult> GenerateUserReport(UserReport query)
        {
            // var orders = new List<OrderResponse>();
            var documents = await documentRepository.GetReport(query);
            // foreach (var document in documents)
            // {
                // orders.Add(new OrderResponse
                // {
                //     Document = document,
                //     Detail = await detailRepository.Find(document.Type, document.Serie, document.Correlative),
                //     Tax = await taxRepository.Find(document.Type, document.Serie, document.Correlative)
                // });
            // }

            var binary = await reportService.GenerateUserReport(documents);
            var b64str = Convert.ToBase64String(binary);

            return Json(new StandardResponse
            {
                Status = 200,
                Data = b64str
            });
        }

        [HttpGet("user/raw"), Produces("application/json")]
        public async Task<IActionResult> GenerateUserRawReport(UserReport query)
        {
            var documents = await documentRepository.GetReport(query);
            if (query.Page > 0 && query.Size > 0)
            {
                var offset = (query.Page * query.Size) - query.Size;
                documents = documents.Skip(offset).Take(query.Size).ToList();
            }
            var reports = new List<Report>();
            foreach (var group in documents)
            {
                var service = await serviceRepository.Find(group.Key);
                reports.Add(new Report
                {
                    Quantity = group.ToList().Count,
                    Service = service.Name,
                    Amount = group.Sum(d => d.TotalAmount)
                });
            }

            return Json(new StandardResponse
            {
                Status = 200,
                Data = reports
            });
        }
    }
}