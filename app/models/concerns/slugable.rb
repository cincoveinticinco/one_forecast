module Slugable
  extend ActiveSupport::Concern

  included do
    validates :slug, presence: true
    validates :slug,
            format: {
              with: /\A[a-zA-Z0-9_-]+\z/,
              message: :invalid_slug_format
            }
  end

  class_methods do
    def configure_slug_uniqueness(scope: nil)
      if scope
        validates :slug, uniqueness: { scope: scope }
      else
        validates :slug, uniqueness: true
      end
    end
  end
end
