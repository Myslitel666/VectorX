using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using VectorXBackend.Models.Entities;

namespace VectorXBackend.Context;

public partial class VectorXContext : DbContext
{
    public VectorXContext()
    {
    }

    public VectorXContext(DbContextOptions<VectorXContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Answer> Answers { get; set; }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<ChatWithLearner> ChatWithLearners { get; set; }

    public virtual DbSet<ConsultantMessage> ConsultantMessages { get; set; }

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<CourseAppealBlocking> CourseAppealBlockings { get; set; }

    public virtual DbSet<CourseComplaint> CourseComplaints { get; set; }

    public virtual DbSet<CourseReview> CourseReviews { get; set; }

    public virtual DbSet<CourseSection> CourseSections { get; set; }

    public virtual DbSet<CourseStatus> CourseStatuses { get; set; }

    public virtual DbSet<CourseStatusDirectory> CourseStatusDirectories { get; set; }

    public virtual DbSet<EducationalProgram> EducationalPrograms { get; set; }

    public virtual DbSet<EducationalProgramCourse> EducationalProgramCourses { get; set; }

    public virtual DbSet<ForumChannel> ForumChannels { get; set; }

    public virtual DbSet<ForumChannelMessage> ForumChannelMessages { get; set; }

    public virtual DbSet<Jargon> Jargons { get; set; }

    public virtual DbSet<JargonDictionary> JargonDictionaries { get; set; }

    public virtual DbSet<LearnerMessage> LearnerMessages { get; set; }

    public virtual DbSet<LearnerTeacherCourse> LearnerTeacherCourses { get; set; }

    public virtual DbSet<Lesson> Lessons { get; set; }

    public virtual DbSet<LessonVersion> LessonVersions { get; set; }

    public virtual DbSet<MarkDirectory> MarkDirectories { get; set; }

    public virtual DbSet<Question> Questions { get; set; }

    public virtual DbSet<QuestionVersion> QuestionVersions { get; set; }

    public virtual DbSet<Rating> Ratings { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<SubjectDirectory> SubjectDirectories { get; set; }

    public virtual DbSet<Test> Tests { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserAction> UserActions { get; set; }

    public virtual DbSet<UserCourse> UserCourses { get; set; }

    public virtual DbSet<UserJargon> UserJargons { get; set; }

    public virtual DbSet<UserLesson> UserLessons { get; set; }

    public virtual DbSet<UserLessonsAnswer> UserLessonsAnswers { get; set; }

    public virtual DbSet<UserStatusChannel> UserStatusChannels { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS; Database=VectorX; Trusted_Connection=True; TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Answer>(entity =>
        {
            entity.ToTable("Answer");

            entity.Property(e => e.AnswerContent)
                .HasMaxLength(256)
                .IsUnicode(false);

            entity.HasOne(d => d.Question).WithMany(p => p.Answers)
                .HasForeignKey(d => d.QuestionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Answer_Question");
        });

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.ToTable("Cart");

            entity.HasOne(d => d.Course).WithMany(p => p.Carts)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Cart_Course");

            entity.HasOne(d => d.User).WithMany(p => p.Carts)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Cart_User");
        });

        modelBuilder.Entity<ChatWithLearner>(entity =>
        {
            entity.ToTable("ChatWithLearner");

            entity.HasOne(d => d.ConsultantMessage).WithMany(p => p.ChatWithLearners)
                .HasForeignKey(d => d.ConsultantMessageId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChatWithLearner_ConsultantMessage");

            entity.HasOne(d => d.Learner).WithMany(p => p.ChatWithLearners)
                .HasForeignKey(d => d.LearnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChatWithLearner_User");
        });

        modelBuilder.Entity<ConsultantMessage>(entity =>
        {
            entity.ToTable("ConsultantMessage");

            entity.Property(e => e.SendingDateTime).HasColumnType("datetime");
            entity.Property(e => e.TextMessage).HasColumnType("text");

            entity.HasOne(d => d.Consult).WithMany(p => p.ConsultantMessages)
                .HasForeignKey(d => d.ConsultId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ConsultantMessage_User");
        });

        modelBuilder.Entity<Course>(entity =>
        {
            entity.ToTable("Course");

            entity.Property(e => e.Descriptrion)
                .HasMaxLength(256)
                .IsUnicode(false);
            entity.Property(e => e.Title)
                .HasMaxLength(256)
                .IsUnicode(false);

            entity.HasOne(d => d.Author).WithMany(p => p.Courses)
                .HasForeignKey(d => d.AuthorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Course_User");

            entity.HasOne(d => d.Subject).WithMany(p => p.Courses)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Course_SubjectDirectory");
        });

        modelBuilder.Entity<CourseAppealBlocking>(entity =>
        {
            entity.ToTable("CourseAppealBlocking");

            entity.Property(e => e.CourseAppealBlockingId).ValueGeneratedNever();
            entity.Property(e => e.AnswerDateTime).HasColumnType("datetime");
            entity.Property(e => e.AnswerText).HasColumnType("text");
            entity.Property(e => e.AppealDateTime).HasColumnType("datetime");
            entity.Property(e => e.AppealText).HasColumnType("text");
            entity.Property(e => e.AppealTitle)
                .HasMaxLength(256)
                .IsUnicode(false);

            entity.HasOne(d => d.Course).WithMany(p => p.CourseAppealBlockings)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseAppealBlocking_Course");
        });

        modelBuilder.Entity<CourseComplaint>(entity =>
        {
            entity.ToTable("CourseComplaint");

            entity.Property(e => e.ComplaintDateTime).HasColumnType("datetime");
            entity.Property(e => e.ComplaintText).HasColumnType("text");

            entity.HasOne(d => d.Course).WithMany(p => p.CourseComplaints)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseComplaint_Course");

            entity.HasOne(d => d.User).WithMany(p => p.CourseComplaints)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseComplaint_User");
        });

        modelBuilder.Entity<CourseReview>(entity =>
        {
            entity.ToTable("CourseReview");

            entity.Property(e => e.ReviewDateTime).HasColumnType("datetime");
            entity.Property(e => e.ReviewText).HasColumnType("text");

            entity.HasOne(d => d.Course).WithMany(p => p.CourseReviews)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseReview_Course");

            entity.HasOne(d => d.Rating).WithMany(p => p.CourseReviews)
                .HasForeignKey(d => d.RatingId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseReview_Rating");

            entity.HasOne(d => d.User).WithMany(p => p.CourseReviews)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseReview_User");
        });

        modelBuilder.Entity<CourseSection>(entity =>
        {
            entity.HasKey(e => e.CourseSectionId).HasName("PK_SectionCourse");

            entity.ToTable("CourseSection");

            entity.Property(e => e.CreationDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.SectionName)
                .HasMaxLength(256)
                .IsUnicode(false);

            entity.HasOne(d => d.Course).WithMany(p => p.CourseSections)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SectionCourse_Course");

            entity.HasOne(d => d.LastSection).WithMany(p => p.InverseLastSection)
                .HasForeignKey(d => d.LastSectionId)
                .HasConstraintName("FK_SectionCourse_SectionCourse");
        });

        modelBuilder.Entity<CourseStatus>(entity =>
        {
            entity.HasOne(d => d.Course).WithMany(p => p.CourseStatuses)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseStatuses_Course");

            entity.HasOne(d => d.CourseStatusNavigation).WithMany(p => p.CourseStatuses)
                .HasForeignKey(d => d.CourseStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseStatuses_CourseStatusDirectory");

            entity.HasOne(d => d.UserAction).WithMany(p => p.CourseStatuses)
                .HasForeignKey(d => d.UserActionId)
                .HasConstraintName("FK_CourseStatuses_UserAction");
        });

        modelBuilder.Entity<CourseStatusDirectory>(entity =>
        {
            entity.HasKey(e => e.CourseStatusId);

            entity.ToTable("CourseStatusDirectory");

            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.StatusName)
                .HasMaxLength(256)
                .IsUnicode(false);
        });

        modelBuilder.Entity<EducationalProgram>(entity =>
        {
            entity.ToTable("EducationalProgram");

            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.Title).HasMaxLength(256);

            entity.HasOne(d => d.Learner).WithMany(p => p.EducationalPrograms)
                .HasForeignKey(d => d.LearnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EducationalProgram_User");
        });

        modelBuilder.Entity<EducationalProgramCourse>(entity =>
        {
            entity.HasOne(d => d.EducationalProgram).WithMany(p => p.EducationalProgramCourses)
                .HasForeignKey(d => d.EducationalProgramId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EducationalProgramCourses_EducationalProgram");

            entity.HasOne(d => d.UseCourse).WithMany(p => p.EducationalProgramCourses)
                .HasForeignKey(d => d.UseCourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EducationalProgramCourses_UserCourse");
        });

        modelBuilder.Entity<ForumChannel>(entity =>
        {
            entity.ToTable("ForumChannel");

            entity.Property(e => e.ChannelTitle).HasMaxLength(256);
            entity.Property(e => e.CreationDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasColumnType("text");

            entity.HasOne(d => d.Author).WithMany(p => p.ForumChannels)
                .HasForeignKey(d => d.AuthorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ForumChannel_User");
        });

        modelBuilder.Entity<ForumChannelMessage>(entity =>
        {
            entity.ToTable("ForumChannelMessage");

            entity.Property(e => e.SendingDateTime).HasColumnType("datetime");
            entity.Property(e => e.TextMessage).HasColumnType("text");

            entity.HasOne(d => d.AuthorMessage).WithMany(p => p.ForumChannelMessages)
                .HasForeignKey(d => d.AuthorMessageId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ForumChannelMessage_User");

            entity.HasOne(d => d.ForumChannel).WithMany(p => p.ForumChannelMessages)
                .HasForeignKey(d => d.ForumChannelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ForumChannelMessage_ForumChannel");
        });

        modelBuilder.Entity<Jargon>(entity =>
        {
            entity.ToTable("Jargon");

            entity.Property(e => e.ExampleOfUse).HasColumnType("text");
            entity.Property(e => e.JargonInstance)
                .HasMaxLength(256)
                .IsUnicode(false);
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

        modelBuilder.Entity<LearnerMessage>(entity =>
        {
            entity.ToTable("LearnerMessage");

            entity.Property(e => e.SendingDateTime).HasColumnType("datetime");
            entity.Property(e => e.TextMessage).HasColumnType("text");

            entity.HasOne(d => d.User).WithMany(p => p.LearnerMessages)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LearnerMessage_User");
        });

        modelBuilder.Entity<LearnerTeacherCourse>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.Course).WithMany(p => p.LearnerTeacherCourses)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LearnerTeacherCourses_Course");

            entity.HasOne(d => d.Learner).WithMany(p => p.LearnerTeacherCourseLearners)
                .HasForeignKey(d => d.LearnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LearnerTeacherCourses_User");

            entity.HasOne(d => d.Teacher).WithMany(p => p.LearnerTeacherCourseTeachers)
                .HasForeignKey(d => d.TeacherId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LearnerTeacherCourses_User1");
        });

        modelBuilder.Entity<Lesson>(entity =>
        {
            entity.ToTable("Lesson");

            entity.HasOne(d => d.LastLesson).WithMany(p => p.InverseLastLesson)
                .HasForeignKey(d => d.LastLessonId)
                .HasConstraintName("FK_Lesson_Lesson");

            entity.HasOne(d => d.SectionCourse).WithMany(p => p.Lessons)
                .HasForeignKey(d => d.SectionCourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Lesson_SectionCourse");
        });

        modelBuilder.Entity<LessonVersion>(entity =>
        {
            entity.ToTable("LessonVersion");

            entity.Property(e => e.CreationDate).HasColumnType("datetime");
            entity.Property(e => e.LessonContent).HasColumnType("text");
            entity.Property(e => e.LessonFile).HasMaxLength(256);
            entity.Property(e => e.LessonName)
                .HasMaxLength(256)
                .IsUnicode(false);
            entity.Property(e => e.LessonTask).HasColumnType("text");

            entity.HasOne(d => d.Lesson).WithMany(p => p.LessonVersions)
                .HasForeignKey(d => d.LessonId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LessonVersion_Lesson");
        });

        modelBuilder.Entity<MarkDirectory>(entity =>
        {
            entity.HasKey(e => e.MarkId);

            entity.ToTable("MarkDirectory");
        });

        modelBuilder.Entity<Question>(entity =>
        {
            entity.ToTable("Question");

            entity.HasOne(d => d.Test).WithMany(p => p.Questions)
                .HasForeignKey(d => d.TestId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Question_Test");
        });

        modelBuilder.Entity<QuestionVersion>(entity =>
        {
            entity.ToTable("QuestionVersion");

            entity.Property(e => e.CreationDate).HasColumnType("datetime");
            entity.Property(e => e.QuestionContent).HasColumnType("text");

            entity.HasOne(d => d.LastQuestion).WithMany(p => p.InverseLastQuestion)
                .HasForeignKey(d => d.LastQuestionId)
                .HasConstraintName("FK_QuestionVersion_QuestionVersion");

            entity.HasOne(d => d.Question).WithMany(p => p.QuestionVersions)
                .HasForeignKey(d => d.QuestionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_QuestionVersion_Question");
        });

        modelBuilder.Entity<Rating>(entity =>
        {
            entity.ToTable("Rating");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.ToTable("Role");

            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.RoleName)
                .HasMaxLength(64)
                .IsUnicode(false);
        });

        modelBuilder.Entity<SubjectDirectory>(entity =>
        {
            entity.HasKey(e => e.SubjectId);

            entity.ToTable("SubjectDirectory");

            entity.Property(e => e.SubjectDescription).HasColumnType("text");
            entity.Property(e => e.SubjectName)
                .HasMaxLength(256)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Test>(entity =>
        {
            entity.ToTable("Test");

            entity.HasOne(d => d.Lesson).WithMany(p => p.Tests)
                .HasForeignKey(d => d.LessonId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Test_Lesson");
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

        modelBuilder.Entity<UserAction>(entity =>
        {
            entity.ToTable("UserAction");

            entity.Property(e => e.ActionDate).HasColumnType("datetime");

            entity.HasOne(d => d.AuthorizedUser).WithMany(p => p.UserActions)
                .HasForeignKey(d => d.AuthorizedUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserAction_User");
        });

        modelBuilder.Entity<UserCourse>(entity =>
        {
            entity.ToTable("UserCourse");

            entity.Property(e => e.PurchaseDate).HasColumnType("datetime");

            entity.HasOne(d => d.Course).WithMany(p => p.UserCourses)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserCourse_Course");

            entity.HasOne(d => d.Learner).WithMany(p => p.UserCourses)
                .HasForeignKey(d => d.LearnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserCourse_User");
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

        modelBuilder.Entity<UserLesson>(entity =>
        {
            entity.Property(e => e.FeedbackTeacher).HasColumnType("text");
            entity.Property(e => e.TextAnswer).HasColumnType("text");

            entity.HasOne(d => d.Lesson).WithMany(p => p.UserLessons)
                .HasForeignKey(d => d.LessonId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserLessons_Lesson");

            entity.HasOne(d => d.Mark).WithMany(p => p.UserLessons)
                .HasForeignKey(d => d.MarkId)
                .HasConstraintName("FK_UserLessons_MarkDirectory");

            entity.HasOne(d => d.User).WithMany(p => p.UserLessons)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserLessons_User");
        });

        modelBuilder.Entity<UserLessonsAnswer>(entity =>
        {
            entity.HasOne(d => d.Answer).WithMany(p => p.UserLessonsAnswers)
                .HasForeignKey(d => d.AnswerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserLessonsAnswers_Answer");

            entity.HasOne(d => d.UserLessons).WithMany(p => p.UserLessonsAnswers)
                .HasForeignKey(d => d.UserLessonsId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserLessonsAnswers_UserLessons");
        });

        modelBuilder.Entity<UserStatusChannel>(entity =>
        {
            entity.ToTable("UserStatusChannel");

            entity.HasOne(d => d.ForumChannel).WithMany(p => p.UserStatusChannels)
                .HasForeignKey(d => d.ForumChannelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserStatusChannel_ForumChannel");

            entity.HasOne(d => d.User).WithMany(p => p.UserStatusChannels)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserStatusChannel_User");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
