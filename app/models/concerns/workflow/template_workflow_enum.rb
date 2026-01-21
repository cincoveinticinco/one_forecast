module Workflow::TemplateWorkflowEnum
  extend ActiveSupport::Concern

  included do
    enum :workflow_type, {
      form_submission: "form_submission",
    }


    enum :status, {
      active: "active",
      inactive: "inactive",
    }


    before_validation :set_default_status, on: :create

    validates :status, presence: true

    private
    
    def set_default_status
      self.status ||= "active"
    end
  end
end