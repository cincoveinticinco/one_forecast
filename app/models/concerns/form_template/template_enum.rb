module FormTemplate::TemplateEnum
  extend ActiveSupport::Concern

  included do
    enum :template_type, {
      vendor_creation: "vendor creation",
      vendor_update: "vendor update",
      vendor_onboarding: "vendor onboarding"
    }, suffix: true

    enum :access_type, {
      internal: "internal",
      public_token: "public with token"
    }, suffix: true

    enum :status, {
      draft: "draft",
      published: "published",
      archived: "archived"
    }, suffix: true

    validates :template_type, :status, :access_type, presence: true
  end
end