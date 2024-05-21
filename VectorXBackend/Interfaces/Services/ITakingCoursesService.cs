using VectorXBackend.DTOs.SharedDTOs;
using VectorXBackend.DTOs.Requests.VectorX.TakingCourses;

namespace VectorXBackend.Interfaces.Services
{
    public interface ITakingCoursesService
    {
        Task<ResponseBaseDto> TopUpFunds(TopUpBalanceDto topUpBalanceDto);
    }
}