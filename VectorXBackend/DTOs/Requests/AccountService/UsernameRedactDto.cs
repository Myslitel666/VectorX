namespace VectorXBackend.DTOs.Requests.AccountService
{
    public class UsernameRedactDto
    {
        public int UserId { get; set; }

        public string DesiredUsername { get; set; }
    }
}