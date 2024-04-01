using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using EnglishAssistantBackend.Models.Entities;

namespace EnglishAssistantBackend.Context;

public partial class EnglishAssistantContext : DbContext
{
    public EnglishAssistantContext()
    {
    }

    public EnglishAssistantContext(DbContextOptions<EnglishAssistantContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Jargon> Jargons { get; set; }

    public virtual DbSet<JargonDictionary> JargonDictionaries { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserJargon> UserJargons { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS; Database=EnglishAssistant; Trusted_Connection=True; TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Jargon>(entity =>
        {
            entity.ToTable("Jargon");

            entity.Property(e => e.ExampleOfUse).HasColumnType("text");
            entity.Property(e => e.JargonInstance)
                .HasMaxLength(256)
                .IsUnicode(false)
                .HasColumnName("JargonInstance");
            entity.Property(e => e.Translate)
                .HasMaxLength(256)
                .IsUnicode(false);
        });

        modelBuilder.Entity<JargonDictionary>(entity =>
        {
            entity.ToTable("JargonDictionary");

            entity.Property(e => e.ExampleOfUse).HasColumnType("text");
            entity.Property(e => e.Jargon)
                .HasMaxLength(256)
                .IsUnicode(false);
            entity.Property(e => e.Translate)
                .HasMaxLength(256)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.ToTable("Role");

            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.RoleName)
                .HasMaxLength(64)
                .IsUnicode(false);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("User");

            entity.Property(e => e.Password)
                .HasMaxLength(256)
                .IsUnicode(false);
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_User_Role");
        });

        modelBuilder.Entity<UserJargon>(entity =>
        {
            entity.HasKey(e => e.UserJargonsId).HasName("PK_UserJargons_1");

            entity.HasOne(d => d.Jargon).WithMany(p => p.UserJargons)
                .HasForeignKey(d => d.JargonId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserJargons_Jargon");

            entity.HasOne(d => d.User).WithMany(p => p.UserJargons)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserJargons_User");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
