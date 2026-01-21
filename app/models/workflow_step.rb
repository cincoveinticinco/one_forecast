class WorkflowStep < ApplicationRecord
  belongs_to :workflow
  belongs_to :form_template, optional: true


  validates :name, :color, :step_type, :order_index, presence: true
  validates :order_index, numericality: { greater_than_or_equal_to: 1 }
  validates :order_index, uniqueness: { scope: :workflow_id }

  # Validaciones condicionales según step_type
  validates :form_template_id, presence: true, if: -> { step_type == "form" }
  validate :file_upload_settings_min_files_required, if: -> { step_type == "file_upload" }
  
  before_validation :set_default_actions_enabled, if: -> { step_type == "approval" && actions_enabled.blank? }

  private

  def file_upload_settings_min_files_required
    if file_upload_settings.blank? || file_upload_settings["min_files"].blank?
      errors.add(:file_upload_settings, "debe incluir min_files cuando step_type es file_upload")
    end
  end

  def set_default_actions_enabled
    self.actions_enabled = ["approve", "reject"]
  end
end
