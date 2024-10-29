source "https://rubygems.org"

# Core Jekyll Setup
gem "jekyll", "~> 3.9.0"         # Core Jekyll gem
gem "minima", "~> 2.5"           # Default theme for Jekyll sites
gem "github-pages", group: :jekyll_plugins

# Jekyll Plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"   # Generates RSS feed for posts
end

# Windows-specific Dependencies
install_if -> { RUBY_PLATFORM =~ /mingw|mswin|java/ } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
  gem "wdm", "~> 0.1.1"          # Boosts directory-watching performance on Windows
end

# Additional Required Gems
gem "webrick", "~> 1.7"          # Needed for Jekyll server
gem "csv"                         # CSV handling support
gem "base64"                      # Base64 encoding
gem "bigdecimal"                  # High-precision decimal support
gem "faraday-retry"               # Faraday retry middleware for Faraday v2.0+
