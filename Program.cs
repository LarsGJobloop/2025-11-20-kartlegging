// Lag en ny ASP .NET web app
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Sette opp noen variabler
var visits = 0;

// Konfigurer alle endpunkter
app.MapGet("/testing", () =>
{
  visits++;

  if (visits > 10)
  {
    return "Sorry we're full today!";
  }
  else
  {
    return "Hallaien, Porsgrunn og Sandefjord!";
  }
});

app.MapGet("/another", () =>
{
  visits++;
  return "This is a test!";
});

app.MapGet("/crash", () =>
{
  visits++;
  return Results.InternalServerError();
  // Du kan skrive det eksplisitt, men som regel gjør vi det ikke
  // return Results.StatusCode(500);
});

app.MapGet("/visits", () =>
{
  return $"Total requsts responded to: {visits}";
});

// Start server
app.Run();
