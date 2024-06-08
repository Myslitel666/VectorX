using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class Rating
{
    public int RatingId { get; set; }

    public int RatingValue { get; set; }

    public virtual ICollection<CourseReview> CourseReviews { get; set; } = new List<CourseReview>();
}
