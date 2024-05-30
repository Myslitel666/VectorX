using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class Lesson
{
    public int LessonId { get; set; }

    public int SectionCourseId { get; set; }

    public int? LastLessonId { get; set; }

    public virtual ICollection<Lesson> InverseLastLesson { get; set; } = new List<Lesson>();

    public virtual Lesson? LastLesson { get; set; }

    public virtual ICollection<LessonVersion> LessonVersions { get; set; } = new List<LessonVersion>();

    public virtual SectionCourse SectionCourse { get; set; } = null!;

    public virtual ICollection<Test> Tests { get; set; } = new List<Test>();

    public virtual ICollection<UserLesson> UserLessons { get; set; } = new List<UserLesson>();
}
