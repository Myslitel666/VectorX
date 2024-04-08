namespace VectorXBackend.DTOs.Requests.AccountService
{
    public class VerifyUserDto
    {
        public int UserId { get; set; }

        public string EnteredPassword { get; set; }
    }
}
