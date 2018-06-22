using System;
using System.Threading.Tasks;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using Pos.Models;
using Pos.Models.Document;
using Pos.Repositories;
using Pos.Services;
using Pos.Types;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using System.Net.Http;
using System.Net.Http.Headers;

namespace Pos.Controllers
{
    [Route("api/[controller]"), EnableCors("AllowAll"), Authorize]
    public class OrdersController: Controller
    {
        private IDocumentRepository documentRepository;
        private ITaxRepository taxRepository;
        private IDetailRepository detailRepository;
        private IConfigurationRepository configurationRepository;
        private IUserRepository userRepository;
        private IServiceRepository serviceRepository;
        // private IReportService reportService;

        public OrdersController(
            IDocumentRepository documentRepository,
            ITaxRepository taxRepository,
            IDetailRepository detailRepository,
            IConfigurationRepository configurationRepository,
            IUserRepository userRepository,
            IServiceRepository serviceRepository,
            IReportService reportService)
        {
            this.documentRepository = documentRepository;
            this.taxRepository = taxRepository;
            this.detailRepository = detailRepository;
            this.configurationRepository = configurationRepository;
            this.userRepository = userRepository;
            this.serviceRepository = serviceRepository;
            // this.reportService = reportService;
        }

        [HttpPost, Consumes("application/json"), Produces("application/json")]
        public async Task<IActionResult> Save([FromBody] Orders orders)
        {
            // stores all document responses
            var orderResponses = new List<OrderResponse> {};

            // Find the user responsible of this operation
            var username = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            // get the user owner of this operation
            var user = await userRepository.Find(username);
            
            /* === Instances of Configuration model that represent
                    configurations of this specific emission point === */
            var serieConf = await configurationRepository.Get("SERIE", user.EmissionPoint.Id);
            var docTypeConf = await configurationRepository.Get("TIPO_DOC_EMISOR", user.EmissionPoint.Id);
            var correlaConf = await configurationRepository.Get("CORRELATIVO", user.EmissionPoint.Id);
            var docNumberConf = await configurationRepository.Get("NUMERO_DOC_EMISOR", user.EmissionPoint.Id);
            var issuerNameConf = await configurationRepository.Get("NOMBRE_EMISOR", user.EmissionPoint.Id);
            var taxRateConf = await configurationRepository.Get("IGV_TASA", user.EmissionPoint.Id);

            foreach(Order order in orders.Data)
            {
                var document = new Document
                {
                    Type = docTypeConf.Value,
                    Serie = serieConf.Value,
                    Correlative = Int32.Parse(correlaConf.Value) + 1,
                    IssuerType = docTypeConf.Value,
                    IssuerNumber = docNumberConf.Value,
                    IssuerName = issuerNameConf.Value,
                    User = user,
                    EmissionPoint = user.EmissionPoint,
                    Currency = order.Currency,
                    TotalAmount = order.Total,
                    NetAmount = order.Total - (order.Total * Double.Parse(taxRateConf.Value)),
                    IgvTotalAmount = order.Total * Double.Parse(taxRateConf.Value),
                    CreationDate = DateTime.Now,
                    EmissionDate = DateTime.Now,
                    EmissionState = "P",
                    Creator = user.Username,
                    Plate = order.Plate
                };

                var tax = new Tax
                {
                    DocumentType = docTypeConf.Value,
                    Serie = serieConf.Value,
                    Correlative = Int32.Parse(correlaConf.Value) + 1,
                    Code = "",
                    Rate = Double.Parse(taxRateConf.Value),
                    Amount = order.Total * Double.Parse(taxRateConf.Value)
                };

                var service = await serviceRepository.Find(order.Service);

                var detail = new Detail
                {
                    DocumentType = docTypeConf.Value,
                    Serie = serieConf.Value,
                    Correlative = Int32.Parse(correlaConf.Value) + 1,
                    Service = service,
                    Quantity = order.Quantity,
                    Amount = service.Cost * order.Quantity,
                    Discount = 0.0,
                    TaxRate = Double.Parse(taxRateConf.Value),
                    TaxAmount = (service.Cost * order.Quantity) * Double.Parse(taxRateConf.Value),
                };

                var _document = await documentRepository.Create(document);
                var _tax = await taxRepository.Create(tax);
                var _detail = await detailRepository.Create(detail);

                orderResponses.Add(new OrderResponse
                {
                    Document = _document,
                    Tax = _tax,
                    Detail = _detail
                });

                correlaConf.Value = (Int32.Parse(correlaConf.Value) + 1).ToString();
                correlaConf = await configurationRepository.Update(correlaConf, user.EmissionPoint.Id);
            }

            return Json(new StandardResponse
            {
                Status = 200,
                // Data = await documentRepository.Get(docTypeConf.Value, serieConf.Value, Int32.Parse(correlaConf.Value))
                // Data = new OrderResponse
                // {
                //     Document = _document,
                //     Tax = _tax,
                //     Detail = _detail
                // }
                Data = orderResponses
            });
        }

        // [HttpGet("export/excel"), Produces("application/json")]
        // public async Task<IActionResult> ExcelExport([FromQuery] DocumentPagination p)
        // {
        //     var documents = await documentRepository.Get(p);
        //     var orders = new List<OrderResponse>();

        //     foreach (Document document in documents)
        //     {
        //         var docType = document.Type;
        //         var serie = document.Serie;
        //         var correlative = document.Correlative;
        //         var order = new OrderResponse
        //         {
        //             Document = document,
        //             Tax = await taxRepository.Find(docType, serie, correlative),
        //             Detail = await detailRepository.Find(docType, serie, correlative)
        //         };
        //         orders.Add(order);
        //     };

        //     var binary = reportService.GenerateOrdersReport(orders);
        //     // HttpResponseMessage response = new HttpResponseMessage();
        //     // response.Content = new ByteArrayContent(binary);
        //     // response.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
        //     // response.Content.Headers.ContentDisposition.FileName = $"Reporte-Ventas-{DateTime.Now.ToString("dd/MM/yyy hh:m:ss")}";
        //     // response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.ms-excel");
        //     // return response;
        //     var hardcoded = Convert.ToBase64String(binary);
        //     return Json(new StandardResponse
        //     {
        //         Status = 200,
        //         Data = hardcoded
        //     });
        // }

        [HttpGet, Produces("application/json")]
        public async Task<IActionResult> Get([FromQuery] DocumentPagination p)
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

            return Json(new StandardResponse
            {
                Status = 200,
                Data = orders
            });
        }

        [HttpGet("count"), Produces("application/json")]
        public async Task<IActionResult> Count([FromQuery] DocumentPagination p)
        {
            var count = await documentRepository.Count(p);
            return Json(new StandardResponse
            {
                Status = 200,
                Data = count
            });
        }
    }
}