namespace A0Tests.Labels
{
    /// <summary>Label helpers.</summary>
    public static class Labels
    {
        /// <summary>Returns the label with leading and trailing white space removed.</summary>
        /// <param name="value">The label.</param>
        /// <returns>The trimmed label, or the empty string if <paramref name="value"/> is null.</returns>
        public static string NormalizeLabel(string? value)
        {
            return value is null ? string.Empty : value.Trim();
        }

        /// <summary>Returns the normalized label in upper case.</summary>
        /// <param name="value">The label.</param>
        /// <returns>The trimmed label in upper case, or the empty string if <paramref name="value"/> is null.</returns>
        public static string ShoutLabel(string? value)
        {
            return NormalizeLabel(value).ToUpperInvariant();
        }
    }
}
