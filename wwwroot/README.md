# Static Assets

`wwwroot` is a folder for the ASP .NET Server.

We can configure the ASP .NET server to make the server serve files from inside here.

> [!NOTE]
>
> Do you see where the name Server comes from?

ASP .NET configuration to add:

```csharp
app.UseDefaultFiles(); // Makes index.html the default file to serve. Needs to be configured first
app.UseStaticFiles(); // Actually enables serving of files
```

## Splitting of files

You will see that I have split up CSS and JS files into multiple parts and linked them in individually.

There's a plethora of ways to do this. What your usecase is will decide what's the best option to use.
For now I recommend you don't think too much about it.

My motivation here is to allow you to navigate and reason over a small chunk at a time. Rather than
having to parse hundreds of lines of code to find what you are looking for.

> [!NOTE]
>
> You will come over optimization fetishists that screams at you that this is inefficient, and makes
> pages loads slow for the end users. While true, it's entirely immaterial. As once you start working
> on anything of size you will be using a tool for "stitching" all these files together into an
> optimized bundle for delivery.
>
> That allows you to organize your project for readability and ease of maintenance, and what you
> deliver to the end user to be optimized for transferability and machine parsing.
> Providing you the best of both worlds.
>
> So just organize them to the best of your abilities for now. Patterns will come, and you can find
> them if you look online. Just don't expect there to be "One ~~Ring~~Way to Rule them all!".
> We are humans, not machines. And there's simply to many rebels.
