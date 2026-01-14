module FormSubmission::StatusEnum
  extend ActiveSupport::Concern

  included do
    enum :status, {
      draft: "draft",
      submitted: "submitted",
      reopened: "reopened"
    }

    validates :status, presence: true
  end
end
