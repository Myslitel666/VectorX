using VectorXBackend.Interfaces.Repositories.AccountService;
using VectorXBackend.Interfaces.Services;
using VectorXBackend.DTOs.Requests.VectorX.TakingCourses;
using VectorXBackend.DTOs.SharedDTOs;

namespace VectorXBackend.Services
{
    public class TakingCoursesService : ITakingCoursesService
    {
        private readonly IUserRepository _userRepository;

        public TakingCoursesService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<ResponseBaseDto> TopUpFunds(TopUpBalanceDto topUpBalanceDto)
        {
            try
            {
                //Увеличиваем баланс пользователя
                await _userRepository.RedactUserData(topUpBalanceDto);

                var response = new ResponseBaseDto()
                {
                    IsError = false,
                    FeedbackMessage = "✓Wallet successfully topped up",
                };
                return response;
            }
            catch (Exception ex)
            {
                ResponseBaseDto response = new ResponseBaseDto()
                {
                    IsError = true,
                    FeedbackMessage = $"✗An error occurred when replenishing the wallet. Error: {ex.Message}"
                };
                return response;
            }
        }
    }
}
