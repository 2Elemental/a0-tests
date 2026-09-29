namespace A0Tests.Labels
{
    /// <summary>Label helpers.</summary>
    public static class Labels
    {
        /// <summary>Returns the label with leading and trailing white space removed.</summary>
        /// <param name="value">The label.</param>
        /// <returns>The trimmed label.</returns>
        public static string NormalizeLabel(string value)
        {
            return value.Trim();
        }
    }
}
