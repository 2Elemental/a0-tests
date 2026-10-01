using System;
using System.ClientModel;
using OpenAI;
using OpenAI.Chat;
using Xunit;

namespace Sdk.Tests
{
    /// <summary>
    /// Transport controls for A0's provider route: one chat completion through the official OpenAI .NET SDK, sent to
    /// OPENAI_BASE_URL with OPENAI_API_KEY as A0 sets them for a run that names the model. Each test is selected by its
    /// Category and asserts transport, not wording: the call succeeds, answers for the model asked for, and reports usage.
    /// </summary>
    public class ProviderRouteTests
    {
        private static ChatCompletion Complete(string model)
        {
            var endpoint = Environment.GetEnvironmentVariable("OPENAI_BASE_URL")
                ?? throw new InvalidOperationException("OPENAI_BASE_URL is not set: this run was not given a provider route.");
            var key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")
                ?? throw new InvalidOperationException("OPENAI_API_KEY is not set: this run was not given a provider route.");
            var client = new ChatClient(model, new ApiKeyCredential(key), new OpenAIClientOptions { Endpoint = new Uri(endpoint) });

            return client.CompleteChat(
                new ChatMessage[] { new UserChatMessage("Reply with the single word OK.") },
                new ChatCompletionOptions { MaxOutputTokenCount = 200 }).Value;
        }

        [Fact]
        [Trait("Category", "openrouter")]
        public void OpenRouterThroughTheProviderRoute()
        {
            var completion = Complete("openrouter:openai/gpt-4.1");

            Assert.Equal("openrouter:openai/gpt-4.1", completion.Model);
            Assert.True(completion.Usage.InputTokenCount > 0);
        }

        [Fact]
        [Trait("Category", "openai")]
        public void OpenAIThroughTheProviderRoute()
        {
            var completion = Complete("openai:gpt-5.6-luna");

            Assert.Equal("openai:gpt-5.6-luna", completion.Model);
            Assert.True(completion.Usage.InputTokenCount > 0);
        }
    }
}
