using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using Pos.Types;
using Pos.Repositories;
using Pos.Models.Document;
using System.Threading.Tasks;

namespace Pos.Services
{
    public class ReportService : IReportService
    {
        private IServiceRepository serviceRepository;

        public ReportService(IServiceRepository serviceRepository)
        {
            this.serviceRepository = serviceRepository;
        }

        public byte[] GenerateOrdersReport(List<OrderResponse> orders)
        {
            using (var p = new ExcelPackage())
            {
                var ws = p.Workbook.Worksheets.Add("Ventas");
                
                // Títle
                using (var range = ws.Cells["B2:Q3"])
                {
                    range.Merge = true;
                    range.Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                    range.Style.Fill.BackgroundColor.SetColor(Color.FromArgb(16, 85, 131));
                    range.Style.Font.Color.SetColor(Color.White);
                    range.Style.Font.Bold = true;
                    range.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    range.Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    range.Value = "Reporte de ventas";
                }

                // Date
                using (var range = ws.Cells["B5:C5"])
                {
                    range.Merge = true;
                    range.Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    range.Value = $"Fecha: {DateTime.Now.Date.ToString("dd/MM/yyyy")}";
                }
                // Time
                using (var range = ws.Cells["B6:C6"])
                {
                    range.Merge = true;
                    range.Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    range.Value = $"Hora: {DateTime.Now.ToString("hh:mm:ss")}";
                }

                //-- Headers
                // Document type
                using (var range = ws.Cells["B8:C8"])
                {
                    range.Merge = true;
                    range.Style.Font.Bold = true;
                    range.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    range.Value = "Tipo de documento";
                }
                // Serie
                ws.Cells["D8"].Style.Font.Bold = true;
                ws.Cells["D8"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["D8"].Value = "Serie";
                // Correlative
                ws.Cells["E8"].Style.Font.Bold = true;
                ws.Cells["E8"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["E8"].Value = "Correlativo";
                // Total
                ws.Cells["F8"].Style.Font.Bold = true;
                ws.Cells["F8"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["F8"].Value = "Total";
                // Total Net
                ws.Cells["G8"].Style.Font.Bold = true;
                ws.Cells["G8"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["G8"].Value = "SubTotal";
                // Total tax
                ws.Cells["H8"].Style.Font.Bold = true;
                ws.Cells["H8"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["H8"].Value = "IGV";
                // License Plate
                ws.Cells["I8"].Style.Font.Bold = true;
                ws.Cells["I8"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["I8"].Value = "Placa";
                // F. Emisión
                ws.Cells["J8"].Style.Font.Bold = true;
                ws.Cells["J8"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["J8"].Value = "Fecha";
                // Servicio
                ws.Cells["K8:L8"].Style.Font.Bold = true;
                ws.Cells["K8:L8"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["K8:L8"].Merge = true;
                ws.Cells["K8:L8"].Value = "Servicio";
                // User
                ws.Cells["M8:N8"].Style.Font.Bold = true;
                ws.Cells["M8:N8"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["M8:N8"].Merge = true;
                ws.Cells["M8:N8"].Value = "Usuario";
                // Emission Point
                ws.Cells["O8:P8"].Style.Font.Bold = true;
                ws.Cells["O8:P8"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["O8:P8"].Merge = true;
                ws.Cells["O8:P8"].Value = "Punto de emisión";
                // State
                ws.Cells["Q8"].Style.Font.Bold = true;
                ws.Cells["Q8"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["Q8"].Value = "Estado";

                // Le ponemos color
                using (var range = ws.Cells["B8:Q8"])
                {
                    range.Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                    range.Style.Fill.BackgroundColor.SetColor(Color.FromArgb(35, 35, 35));
                    range.Style.Font.Color.SetColor(Color.White);
                }

                //-- Let's start iterating the orders to fill the table
                var i = 1;
                foreach (var order in orders)
                {
                    var n = 8 + i;
                    // Document type
                    ws.Cells[$"B{n}:C{n}"].Merge = true;
                    ws.Cells[$"B{n}:C{n}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Cells[$"B{n}:C{n}"].Value = "Boleta";
                    // Serie
                    ws.Cells[$"D{n}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Cells[$"D{n}"].Value = order.Document.Serie;
                     // Correlative
                    ws.Cells[$"E{n}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Cells[$"E{n}"].Value = order.Document.Correlative;
                     // Total
                    ws.Cells[$"F{n}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Cells[$"F{n}"].Style.Numberformat.Format = "#,##0.00";
                    ws.Cells[$"F{n}"].Value = order.Document.TotalAmount;
                     // Net
                    ws.Cells[$"G{n}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Cells[$"G{n}"].Style.Numberformat.Format = "#,##0.00";
                    ws.Cells[$"G{n}"].Value = order.Document.NetAmount;
                     // Tax
                    ws.Cells[$"H{n}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Cells[$"H{n}"].Style.Numberformat.Format = "#,##0.00";
                    ws.Cells[$"H{n}"].Value = order.Tax.Amount;
                     // License Plate
                    ws.Cells[$"I{n}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Cells[$"I{n}"].Value = order.Document.Plate;
                     // Emission date
                    ws.Cells[$"J{n}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Cells[$"J{n}"].Value = order.Document.EmissionDate.ToString("dd/MM/yyyy");
                     // Service
                    ws.Cells[$"K{n}:L{n}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Cells[$"K{n}:L{n}"].Merge = true;
                    ws.Cells[$"K{n}:L{n}"].Value = order.Detail.Service.Name;
                    // User
                    ws.Cells[$"M{n}:N{n}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Cells[$"M{n}:N{n}"].Merge = true;
                    ws.Cells[$"M{n}:N{n}"].Value = order.Document.User.Name;                    
                    // Punto de emisión
                    ws.Cells[$"O{n}:P{n}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Cells[$"O{n}:P{n}"].Merge = true;
                    ws.Cells[$"O{n}:P{n}"].Value = order.Document.EmissionPoint.Name;
                    // State
                    ws.Cells[$"Q{n}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Cells[$"Q{n}"].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                    ws.Cells[$"Q{n}"].Style.Font.Color.SetColor(Color.White);
                    if (order.Document.EmissionState == "P")
                    {
                        ws.Cells[$"Q{n}"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(142, 68, 173));
                    }
                    else
                    {
                        ws.Cells[$"Q{n}"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(5, 141, 19));
                    }
                    ws.Cells[$"Q{n}"].Value = order.Document.EmissionState == "P" ? "Pendiente" : "Aceptado";
                    i += 1;
                }

                i += 8; // 8 is the file of the headers

                // SubTotal
                ws.Cells[$"P{i + 1}"].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                ws.Cells[$"P{i + 1}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells[$"P{i + 1}"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(213, 52, 0));
                ws.Cells[$"P{i + 1}"].Style.Font.Color.SetColor(Color.White);
                ws.Cells[$"P{i + 1}"].Value = "SubTotal";
                ws.Cells[$"Q{i + 1}"].Style.Numberformat.Format = "#,##0.00";
                ws.Cells[$"Q{i + 1}"].Value = orders.Sum(o => o.Document.NetAmount);
                // Igv
                ws.Cells[$"P{i + 2}"].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                ws.Cells[$"P{i + 2}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells[$"P{i + 2}"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(213, 52, 0));
                ws.Cells[$"P{i + 2}"].Style.Font.Color.SetColor(Color.White);
                ws.Cells[$"P{i + 2}"].Value = "Igv";
                ws.Cells[$"Q{i + 2}"].Style.Numberformat.Format = "#,##0.00";
                ws.Cells[$"Q{i + 2}"].Value = orders.Sum(o => o.Tax.Amount);
                // Total
                ws.Cells[$"P{i + 3}"].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                ws.Cells[$"P{i + 3}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells[$"P{i + 3}"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(213, 52, 0));
                ws.Cells[$"P{i + 3}"].Style.Font.Color.SetColor(Color.White);
                ws.Cells[$"P{i + 3}"].Value = "Total";
                ws.Cells[$"Q{i + 3}"].Style.Numberformat.Format = "#,##0.00";
                ws.Cells[$"Q{i + 3}"].Value = orders.Sum(o => o.Document.TotalAmount);

                return p.GetAsByteArray();
            }
        }

        public async Task<byte[]> GenerateUserReport(List<IGrouping<string, Document>> orders)
        {
            using (var p = new ExcelPackage())
            {
                var ws = p.Workbook.Worksheets.Add("Reporte de usuario");

                // Title
                using (var range = ws.Cells["A1:D1"])
                {
                    range.Merge = true;
                    range.Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                    range.Style.Fill.BackgroundColor.SetColor(Color.White);
                    range.Style.Font.Bold = true;
                    range.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    range.Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    range.Style.Border.Bottom.Style = ExcelBorderStyle.Dashed;
                    range.Value = "Reporte de usuario";
                }

                // Date
                ws.Cells["A3"].Value = "Fecha:";
                // Time
                ws.Cells["C3"].Value = "  Hora:";

                //--- Headers
                //-- Line end
                using (var range = ws.Cells["A5:D5"])
                {
                    // range.Merge = true;
                    range.Style.Border.Bottom.Style = ExcelBorderStyle.Dashed;
                }
                ws.Cells["A5"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                // Description
                ws.Cells["B5:C5"].Merge = true;
                ws.Cells["B5:C5"].Style.Font.Bold = true;
                ws.Cells["B5:C5"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["B5:C5"].Value = "Servicio";
                ws.Cells["B5:C5"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                // Amount
                ws.Cells["D5"].Style.Font.Bold = true;
                ws.Cells["D5"].Value = "Monto";
                ws.Cells["D5"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

                //--- Values
                ws.Cells["B3"].Value = DateTime.Now.Date.ToString("dd/MM/yyyy");
                ws.Cells["D3"].Value = DateTime.Now.ToString("hh:mm:ss");

                var index = 1;
                var total = 0d;
                foreach (var group in orders)
                {
                    var key = group.Key;
                    var row = 5 + index;
                    // Quantity
                    ws.Cells[$"A{row}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Cells[$"A{row}"].Value = group.ToList().Count;
                    // Find Service
                    var service = await serviceRepository.Find(key);
                    // Set Service Name
                    ws.Cells[$"B{row}:C{row}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Cells[$"B{row}:C{row}"].Merge = true;
                    ws.Cells[$"B{row}:C{row}"].Value = service.Name;
                    // Set Total Cost
                    ws.Cells[$"D{row}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Cells[$"D{row}"].Style.Numberformat.Format = "#,##0.00";
                    ws.Cells[$"D{row}"].Value = group.Sum(d => d.TotalAmount);
                    // sum to global total
                    total += group.Sum(d => d.TotalAmount);
                    index += 1;
                }

                //-- Line at the end of the table
                using (var range = ws.Cells[$"A{index + 4}:D{index + 4}"])
                {
                    // range.Merge = true;
                    range.Style.Border.Bottom.Style = ExcelBorderStyle.Dashed;
                }

                //-- Total amount
                ws.Cells[$"D{index + 5}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells[$"D{index + 5}"].Style.Numberformat.Format = "#,##0.00";
                ws.Cells[$"D{index + 5}"].Value = total;

                return p.GetAsByteArray();
            }
        }
    }
}