namespace VectorXBackend.DTOs.Requests.AccountService
{
    public class PasswordRedactDto
    {
        public int UserId { get; set; }

        public string DesiredPassword { get; set; }
    }
}
