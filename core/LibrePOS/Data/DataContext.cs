using Pos.Models;
using Pos.Models.Document;
using Microsoft.EntityFrameworkCore;

namespace Pos.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Turn> Turns { get; set; }
        public DbSet<EmissionPoint> EmissionPoints { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Configuration> Configurations { get; set; }
        // public DbSet<Collection> Collections { get; set; }
        // public DbSet<Catalog> Catalogs { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Detail> Details { get; set; }
        public DbSet<Tax> Taxes { get; set; }
        public DbSet<AditionalData> AditionalDatas { get; set; }
        // public DbSet<Correlative> Correlatives { get; set; }

        public DataContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Document>().HasKey(t => new
            {
                t.Type,
                t.Serie,
                t.Correlative
            });

            builder.Entity<Detail>(entity =>
            {
                entity
                .HasOne(t => t.Document)
                .WithMany(t => t.Details)
                .HasForeignKey(t => new
                {
                    t.DocumentType,
                    t.Serie,
                    t.Correlative
                });
                entity
                .HasKey(t => new
                {
                    t.DocumentType,
                    t.Serie,
                    t.Correlative,
                    t.Sequential
                });
            });

            builder.Entity<Tax>(entity =>
            {
                entity
                .HasOne(t => t.Document)
                .WithMany(t => t.Taxes)
                .HasForeignKey(t => new
                {
                    t.DocumentType,
                    t.Serie,
                    t.Correlative
                });
                entity
                .HasKey(t => new
                {
                    t.DocumentType,
                    t.Serie,
                    t.Correlative,
                    t.Sequential
                });
            });

            // builder
            // .Entity<Correlative>()
            // .HasKey(t => new
            // {
            //     t.DocumentType,
            //     t.Serie,
            //     t.Index
            // });

            builder.Entity<AditionalData>(entity =>
            {
                entity
                .HasOne(t => t.Document)
                .WithMany(t => t.AditionalDatas)
                .HasForeignKey(t => new
                {
                    t.DocumentType,
                    t.Serie,
                    t.Correlative
                });
                entity
                .HasKey(t => new
                {
                    t.DocumentType,
                    t.Serie,
                    t.Correlative,
                    t.Sequential
                });
            });

            builder.Entity<Configuration>(entity =>
            {
                entity
                .HasIndex(t => new
                {
                    t.Code,
                    t.EmissionPointId
                })
                .IsUnique();
            });


            builder
            .Entity<AditionalData>()
            .Property<string>("valor")
            .HasField("_value");
        }
    }
}
