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

        [Fact]
        public void NormalizeLabelReturnsEmptyForNull()
        {
            Assert.Equal(string.Empty, Labels.NormalizeLabel(null));
        }

        [Fact]
        public void ShoutLabelUpperCasesTheNormalizedLabel()
        {
            Assert.Equal("A B", Labels.ShoutLabel("  a b  "));
        }
    }
}
