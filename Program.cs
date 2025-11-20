// Lag en ny ASP .NET web app
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapPost("/message", (MessageCreateInfo createInfo) =>
{
  Console.WriteLine($"New Message from: {createInfo.Alias}. Content: {createInfo.Content}");
  return "Message accepted";
});

// Start server
app.Run();

class MessageCreateInfo
{
  public required string Alias { get; set; }
  public required string Content { get; set; }
}
