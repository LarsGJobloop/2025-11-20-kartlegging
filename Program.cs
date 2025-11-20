// Lag en ny ASP .NET web app
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

var messages = new List<Message>();

// Accept new create message requests and figures
// out what to do with them.
app.MapPost("/message", (MessageCreateInfo createInfo) =>
{
  Console.WriteLine($"New Message from: {createInfo.Alias}. Content: {createInfo.Content}");

  var newMessage = new Message(createInfo);
  messages.Add(newMessage);

  return "Message accepted";
});

// Returns a list of the message we have recived.
// Very simple here.
app.MapGet("/message", () =>
{
  return messages;
});

// Start server
app.Run();


// The Objects our application needs.
// These can be moved to other files, and usually are.

// The Object ("Form") the user needs fill out and send us
class MessageCreateInfo
{
  public required string Alias { get; set; }
  public required string Content { get; set; }
}

// The Object that defines what we persist in our application
class Message
{
  // Properties that this object consists of
  public Guid Id { get; set; }
  public string Alias { get; set; }
  public string Content { get; set; }

  // The constructor, defining how new instances
  // of this object is created.
  public Message(MessageCreateInfo createInfo)
  {
    // Generate a new Globaly Unique Identifier
    Id = Guid.NewGuid();
    // We have no rules for what valid Aliases are beyond a string of any length
    Alias = createInfo.Alias;
    // Nor what is valid content
    Content = createInfo.Content;
  }
}
