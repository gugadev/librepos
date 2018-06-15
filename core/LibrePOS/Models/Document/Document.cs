using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Pos.Models.Document
{
    [Table("documento"), Serializable()]
    public class Document
    {
        [Column("tipoDocumento"), Required]
        public string Type { get; set; }
        [Column("serie"), Required]
        public string Serie { get; set; }
        [Column("correlativo"), Required]
        public int Correlative { get; set; }
        [ForeignKey("idPuntoEmision"), Required]
        public EmissionPoint EmissionPoint { get; set; }
        [ForeignKey("idUsuario"), Required]
        public User User { get; set; }
        [Column("tipoDocEmisor"), Required]
        public string IssuerType { get; set; }
        [Column("numDocEmisor"), Required]
        public string IssuerNumber { get; set; }
        [Column("nombreEmisor"), Required]
        public string IssuerName { get; set; }
        [Column("tipoMoneda"), Required]
        public string Currency { get; set; }
        [Column("tipoMonedaDestino")]
        public string TargetCurrency { get; set; }
        [Column("tipCambioDestino")]
        public string TargetCurrencyChange { get; set; }
        [Column("mntNeto"), Required]
        public double NetAmount { get; set; }
        [Column("mntTotal"), Required]
        public double TotalAmount { get; set; }
        [Column("mntTotalIgv"), Required]
        public double IgvTotalAmount { get; set; }
        [Column("fechaEmision")]
        public DateTime EmissionDate { get; set; }
        [Column("fechaCreacion")]
        public DateTime CreationDate { get; set; }
        [Column("estadoEmision")]
        public string EmissionState { get; set; }
        [Column("tipoDocReceptor")]
        public string ReceiverType { get; set; }
        [Column("numDocReceptor")]
        public string ReceiverNumber { get; set; }
        [Column("nombreReceptor")]
        public string ReceiverName { get; set; }
        [Column("direccionDestino")]
        public string TargetAddress { get; set; }
        [Column("usuarioCreacion")]
        public string Creator { get; set; }
        [Column("placa")]
        public string Plate { get; set; }
        [Column("idOperacion")]
        public string OperationId { get; set; }
        [JsonIgnore]
        public virtual List<Detail> Details { get; set; }
        [JsonIgnore]
        public virtual List<Tax> Taxes { get; set; }
        [JsonIgnore]
        public virtual List<AditionalData> AditionalDatas { get; set; }

        public Document()
        {
        }
    }
}
