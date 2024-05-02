namespace VectorXBackend.DTOs.Requests.WebSocketService;

public class UserConnectionInfo
{
    public int UserId { get; set; }
    public string BrowserId { get; set; }

    public override bool Equals(object obj)
    {
        if (obj == null || GetType() != obj.GetType())
        {
            return false;
        }

        UserConnectionInfo other = (UserConnectionInfo)obj;
        return UserId == other.UserId && BrowserId == other.BrowserId;
    }
}