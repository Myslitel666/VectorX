using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class User
{
    public int UserId { get; set; }

    public int RoleId { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public byte[]? Avatar { get; set; }

    public bool IsBlocked { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<ChatWithLearner> ChatWithLearners { get; set; } = new List<ChatWithLearner>();

    public virtual ICollection<ConsultantMessage> ConsultantMessages { get; set; } = new List<ConsultantMessage>();

    public virtual ICollection<CourseComplaint> CourseComplaints { get; set; } = new List<CourseComplaint>();

    public virtual ICollection<CourseReview> CourseReviews { get; set; } = new List<CourseReview>();

    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();

    public virtual ICollection<EducationalProgram> EducationalPrograms { get; set; } = new List<EducationalProgram>();

    public virtual ICollection<ForumChannelMessage> ForumChannelMessages { get; set; } = new List<ForumChannelMessage>();

    public virtual ICollection<ForumChannel> ForumChannels { get; set; } = new List<ForumChannel>();

    public virtual ICollection<LearnerMessage> LearnerMessages { get; set; } = new List<LearnerMessage>();

    public virtual ICollection<LearnerTeacherCourse> LearnerTeacherCourseLearners { get; set; } = new List<LearnerTeacherCourse>();

    public virtual ICollection<LearnerTeacherCourse> LearnerTeacherCourseTeachers { get; set; } = new List<LearnerTeacherCourse>();

    public virtual Role Role { get; set; } = null!;

    public virtual ICollection<UserAction> UserActions { get; set; } = new List<UserAction>();

    public virtual ICollection<UserCourse> UserCourses { get; set; } = new List<UserCourse>();

    public virtual ICollection<UserJargon> UserJargons { get; set; } = new List<UserJargon>();

    public virtual ICollection<UserLesson> UserLessons { get; set; } = new List<UserLesson>();

    public virtual ICollection<UserStatusChannel> UserStatusChannels { get; set; } = new List<UserStatusChannel>();
}
