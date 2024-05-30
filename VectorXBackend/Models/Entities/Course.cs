using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class Course
{
    public int CourseId { get; set; }

    public int AuthorId { get; set; }

    public int SubjectId { get; set; }

    public string? Title { get; set; }

    public byte[]? CourseAvatar { get; set; }

    public string? Descriptrion { get; set; }

    public int Price { get; set; }

    public virtual User Author { get; set; } = null!;

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<CourseAppealBlocking> CourseAppealBlockings { get; set; } = new List<CourseAppealBlocking>();

    public virtual ICollection<CourseComplaint> CourseComplaints { get; set; } = new List<CourseComplaint>();

    public virtual ICollection<CourseReview> CourseReviews { get; set; } = new List<CourseReview>();

    public virtual ICollection<CourseStatus> CourseStatuses { get; set; } = new List<CourseStatus>();

    public virtual ICollection<LearnerTeacherCourse> LearnerTeacherCourses { get; set; } = new List<LearnerTeacherCourse>();

    public virtual ICollection<SectionCourse> SectionCourses { get; set; } = new List<SectionCourse>();

    public virtual SubjectDirectory Subject { get; set; } = null!;

    public virtual ICollection<UserCourse> UserCourses { get; set; } = new List<UserCourse>();
}
