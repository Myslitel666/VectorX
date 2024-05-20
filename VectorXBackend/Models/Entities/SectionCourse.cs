using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class SectionCourse
{
    public int SectionCourseId { get; set; }

    public int CourseId { get; set; }

    public int? LastSectionId { get; set; }

    public string? SectionName { get; set; }

    public string? Description { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime? CreationDate { get; set; }

    public virtual Course Course { get; set; } = null!;

    public virtual ICollection<SectionCourse> InverseLastSection { get; set; } = new List<SectionCourse>();

    public virtual SectionCourse? LastSection { get; set; }

    public virtual ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
}
