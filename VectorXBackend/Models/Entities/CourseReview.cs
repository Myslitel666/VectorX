using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class CourseReview
{
    public int CourseReviewId { get; set; }

    public int UserId { get; set; }

    public int CourseId { get; set; }

    public string? ReviewText { get; set; }

    public DateTime? ReviewDateTime { get; set; }

    public int RatingId { get; set; }

    public virtual Course Course { get; set; } = null!;

    public virtual Rating Rating { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
