using FluentAssertions;

namespace DotnetFunction.Test;

public class FunctionTest
{
    [Fact]
    public async Task SuccessfulResponse_ShouldReturnStatusCodeBodyAndHeaders()
    {
        var function = new Function();
        var result = await function.LambdaHandler(null, null);

        result.StatusCode.Should().Be(200);
        result.Headers["Content-Type"].Should().Be("application/json");
        result.Body.Should().NotBeNull();
        result.Body.Should().Contain("\"message\"");
        result.Body.Should().Contain("\"hello world\"");
        result.Body.Should().Contain("\"location\"");
    }
}