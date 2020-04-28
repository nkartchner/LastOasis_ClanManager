using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ClanManager.Hubs
{
    public class ChatHub : Hub
    {
        public async Task NewMessage(string Name, string Message)
        {
            await Clients.All.SendAsync("messageReceived", Name, Message);
        }
    }
}