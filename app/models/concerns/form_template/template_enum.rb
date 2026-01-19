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

    validates :template_type, :access_type, presence: true
    validates :slug, presence: true, uniqueness: { scope: :tenant_id }

    before_validation :set_default_status, on: :create

    validates :status, presence: true

    private
    
    def set_default_status
      self.status ||= "draft"
    end
  end
end