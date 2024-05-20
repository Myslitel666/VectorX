using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class UserAction
{
    public int UserActionId { get; set; }

    public int AuthorizedUserId { get; set; }

    public DateTime? ActionDate { get; set; }

    public virtual User AuthorizedUser { get; set; } = null!;

    public virtual ICollection<CourseStatus> CourseStatuses { get; set; } = new List<CourseStatus>();
}
