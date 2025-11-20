var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hallaien, Porsgrunn og Sandefjord!");

app.Run();
