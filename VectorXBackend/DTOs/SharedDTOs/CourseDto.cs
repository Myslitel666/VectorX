using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VectorXBackend.DTOs.SharedDTOs;

public partial class CourseDto
{
    public int CourseId { get; set; }

    public int AuthorId { get; set; }

    public int SubjectId { get; set; }

    public string? Title { get; set; }

    public string CourseAvatar { get; set; }

    public string? Descriptrion { get; set; }

    public int Price { get; set; }
}
