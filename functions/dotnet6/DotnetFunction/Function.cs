using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;

namespace DotnetFunction
{
    public class Function
    {
        private HttpClient _httpClient;

        public Function()
        {
            this._httpClient = new HttpClient();
        }
        
        public async Task<APIGatewayProxyResponse> LambdaHandler(APIGatewayProxyRequest evt, ILambdaContext context)
        {
            var responseHeaders = new Dictionary<string, string>()
            {
                {"Content-Type", "application/json"},
                {"X-Custom-Header", "application/json"}
            };

            var result = await this.getPageContent("https://checkip.amazonaws.com");
            var output = $"{{\"message\": \"hello world\", \"location\": \"{result}\"}}";

            return new APIGatewayProxyResponse()
            {
                Headers = responseHeaders,
                Body = output,
                StatusCode = 200
            };
        }

        private async Task<string> getPageContent(string url) => await this._httpClient.GetStringAsync(new Uri(url));
    }
}
