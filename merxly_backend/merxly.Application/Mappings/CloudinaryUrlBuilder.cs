namespace merxly.Application.Mappings
{
    public static class CloudinaryUrlBuilder
    {
        private static string? _cloudName;

        public static void Configure(string cloudName)
        {
            _cloudName = cloudName;
        }

        public static string? BuildUrl(string? publicId)
        {
            if (string.IsNullOrEmpty(publicId) || string.IsNullOrEmpty(_cloudName))
            {
                return null;
            }

            return $"https://res.cloudinary.com/{_cloudName}/image/upload/{publicId}";
        }
    }
}
