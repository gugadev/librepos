using System;
using System.Linq;
using System.Threading.Tasks;
using Pos.Models;
using Pos.Repositories;
using Pos.Types;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Pos.Controllers
{
    [Route("api/[controller]"), EnableCors("AllowAll"), Authorize]
    public class ConfigurationsController : Controller
    {
        private IConfigurationRepository repository;

        public ConfigurationsController(IConfigurationRepository repository) => this.repository = repository;

        [HttpGet("{zoneId}"), Produces("application/json")]
        public async Task<IActionResult> GetByZone(int zoneId)
        {
            var results = await repository.Get(zoneId);

            if (results.Count == 0)
            {
                return Json(new StandardResponse
                {
                    Status = 200,
                    Data = new List<Settings>() {}
                });
            }
        
            var documentType = results.Where(c => c.Code == "TIPO_DOC_EMISOR").FirstOrDefault();
            var serie = results.Where(c => c.Code == "SERIE").FirstOrDefault();
            var issuerName = results.Where(c => c.Code == "NOMBRE_EMISOR").FirstOrDefault();
            var issuerRUC = results.Where(c => c.Code == "NUMERO_DOC_EMISOR").FirstOrDefault();
            var igvRate = results.Where(c => c.Code == "IGV_TASA").FirstOrDefault();
            
            var settings = new Settings
            {
                EmissionPoint = zoneId,
                DocumentType = documentType?.Value,
                Serie = serie?.Value,
                IssuerName = issuerName?.Value,
                IssuerRUC = issuerRUC?.Value,
                IgvRate = Double.Parse(igvRate?.Value)
            };

            return Json(new StandardResponse
            {
                Status = 200,
                Data = settings
            });
        }

        [HttpPut, Consumes("application/json"), Produces("application/json")]
        public async Task<IActionResult> Update([FromBody] Settings newSettings)
        {
            var results = await repository.Get(newSettings.EmissionPoint);
            var documentType = results.Where(c => c.Code == "TIPO_DOC_EMISOR").FirstOrDefault();
            var serie = results.Where(c => c.Code == "SERIE").FirstOrDefault();
            var issuerName = results.Where(c => c.Code == "NOMBRE_EMISOR").FirstOrDefault();
            var issuerRUC = results.Where(c => c.Code == "NUMERO_DOC_EMISOR").FirstOrDefault();
            var igvRate = results.Where(c => c.Code == "IGV_TASA").FirstOrDefault();

            documentType.Value = newSettings.DocumentType;
            serie.Value = newSettings.Serie;
            issuerName.Value = newSettings.IssuerName;
            issuerRUC.Value = newSettings.IssuerRUC;
            igvRate.Value = newSettings.IgvRate.ToString();

            await repository.Update(documentType, newSettings.EmissionPoint);
            await repository.Update(serie, newSettings.EmissionPoint);
            await repository.Update(issuerName, newSettings.EmissionPoint);
            await repository.Update(issuerRUC, newSettings.EmissionPoint);
            await repository.Update(igvRate, newSettings.EmissionPoint);

            return Json(new StandardResponse
            {
                Status = 200,
                Data = newSettings
            });
        }
    }
}