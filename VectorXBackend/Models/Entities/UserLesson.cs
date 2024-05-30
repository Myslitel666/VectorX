using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class UserLesson
{
    public int UserLessonId { get; set; }

    public int UserId { get; set; }

    public int LessonId { get; set; }

    public int? MarkId { get; set; }

    public byte[]? AssignmentFile { get; set; }

    public string? TextAnswer { get; set; }

    public string? FeedbackTeacher { get; set; }

    public virtual Lesson Lesson { get; set; } = null!;

    public virtual MarkDirectory? Mark { get; set; }

    public virtual User User { get; set; } = null!;

    public virtual ICollection<UserLessonsAnswer> UserLessonsAnswers { get; set; } = new List<UserLessonsAnswer>();
}
