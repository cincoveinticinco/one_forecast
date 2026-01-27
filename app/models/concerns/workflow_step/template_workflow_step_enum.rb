module WorkflowStep::TemplateWorkflowStepEnum
  extend ActiveSupport::Concern

  included do
    enum :step_type, {
      approval: "approval",
      form: "form",
      file_upload: "file_upload"
    }
  end
end