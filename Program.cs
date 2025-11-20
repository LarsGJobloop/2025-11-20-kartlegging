// Lag en ny ASP .NET web app
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var messages = new List<Message>();

app.MapPost("/message", (MessageCreateInfo createInfo) =>
{
  Console.WriteLine($"New Message from: {createInfo.Alias}. Content: {createInfo.Content}");

  var newMessage = new Message(createInfo);
  messages.Add(newMessage);

  return "Message accepted";
});

app.MapGet("/message", () =>
{
  return messages;
});

// Start server
app.Run();

class MessageCreateInfo
{
  public required string Alias { get; set; }
  public required string Content { get; set; }
}

class Message
{
  public Guid Id { get; set; }
  public string Alias { get; set; }
  public string Content { get; set; }

  public Message(MessageCreateInfo createInfo)
  {
    Id = Guid.NewGuid(); // Generate a new Globaly Unique Identifier
    Alias = createInfo.Alias;
    Content = createInfo.Content;
  }
}