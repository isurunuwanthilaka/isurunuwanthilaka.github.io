source "https://rubygems.org"

# GitHub Pages pins the exact Jekyll + plugin versions it builds with, so this
# is the one gem that really matters for matching production.
gem "github-pages", group: :jekyll_plugins
gem "jekyll", "~> 3.9.0"

# macOS still ships Ruby 2.6, which cannot build newer ffi native extensions.
gem "ffi", RUBY_VERSION < "2.7" ? "~> 1.15.5" : ">= 1.15"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"    # Atom feed at /feed.xml
  gem "jekyll-seo-tag", "~> 2.8"  # <title>, Open Graph, Twitter cards, JSON-LD
  gem "jekyll-sitemap", "~> 1.4"  # /sitemap.xml
  gem "jekyll-paginate", "~> 1.1" # /page2, /page3, …
end

# Windows-specific dependencies
install_if -> { RUBY_PLATFORM =~ /mingw|mswin|java/ } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
  gem "wdm", "~> 0.1.1"           # Faster directory watching on Windows
end

# Stdlib gems that were unbundled in Ruby 3.4, plus the local server.
gem "webrick", "~> 1.7"
gem "csv"
gem "base64"
gem "bigdecimal"
gem "faraday-retry"
