namespace VectorXBackend.DTOs.Requests.AccountService
{
    public class UpdateUserDataDto
    {
        public int UserId { get; set; }

        public string DesiredUsername { get; set; }

        public string DesiredUserRole { get; set; }
    }
}