using System;
using System.IO;
using System.Threading;
using Xunit;

namespace Guard.Tests
{
    public class GuardTests
    {
        private static string Root()
        {
            var dir = new DirectoryInfo(AppContext.BaseDirectory);
            while (dir != null && !File.Exists(Path.Combine(dir.FullName, "docs", "features.md")))
            {
                dir = dir.Parent;
            }
            return dir!.FullName;
        }

        [Fact]
        [Trait("Category", "refusal")]
        public void ProtectedDocsAreReadableButRefuseWrites()
        {
            var root = Root();
            var doc = Path.Combine(root, "docs", "features.md");
            Assert.NotEmpty(File.ReadAllText(doc));
            var refused = Record.Exception(() => File.AppendAllText(doc, "changed by a test"));
            Assert.True(refused is IOException || refused is UnauthorizedAccessException);
            File.WriteAllText(Path.Combine(root, "guard-output.txt"), "written beside docs");
            var link = Path.Combine(root, "handbook");
            if (!Directory.Exists(link))
            {
                Directory.CreateSymbolicLink(link, "docs");
            }
        }

        [Fact]
        [Trait("Category", "forbidden")]
        public void WritingProtectedDocsFails()
        {
            File.AppendAllText(Path.Combine(Root(), "docs", "features.md"), "changed by a test");
        }

        [Fact]
        [Trait("Category", "slow")]
        public void SlowRunWritesLate()
        {
            Thread.Sleep(90_000);
            File.WriteAllText(Path.Combine(Root(), "late-output.txt"), "written after 90 seconds");
        }
    }
}
