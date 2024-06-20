using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class Lesson
{
    public int LessonId { get; set; }

    public int SectionCourseId { get; set; }

    public int? LastLessonId { get; set; }

    public string? LessonName { get; set; }

    public string? LessonContent { get; set; }

    public byte[]? LessonFile { get; set; }

    public string? LessonTask { get; set; }

    public bool IsDeleted { get; set; }

    public virtual ICollection<LessonVersion> LessonVersions { get; set; } = new List<LessonVersion>();

    public virtual CourseSection SectionCourse { get; set; } = null!;

    public virtual ICollection<Test> Tests { get; set; } = new List<Test>();

    public virtual ICollection<UserLesson> UserLessons { get; set; } = new List<UserLesson>();
}
