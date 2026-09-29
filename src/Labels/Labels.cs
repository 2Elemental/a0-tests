namespace A0Tests.Labels
{
    /// <summary>Label helpers.</summary>
    public static class Labels
    {
        /// <summary>Returns the label with leading and trailing white space removed.</summary>
        /// <param name="value">The label, or null.</param>
        /// <returns>The trimmed label, or an empty string when <paramref name="value"/> is null.</returns>
        public static string NormalizeLabel(string? value)
        {
            return value is null ? string.Empty : value.Trim();
        }
    }
}
