using A0Tests.Labels;
using Xunit;

namespace A0Tests.Labels.Tests
{
    public sealed class LabelsTests
    {
        [Fact]
        public void NormalizeLabelTrims()
        {
            Assert.Equal("a b", Labels.NormalizeLabel("  a b  "));
        }
    }
}
