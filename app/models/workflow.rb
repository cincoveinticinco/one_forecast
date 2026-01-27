class Workflow < ApplicationRecord
  belongs_to :tenant
  has_many :form_templates
  has_many :workflow_steps, -> { order(:order_index) }, dependent: :destroy

  validates :name, presence: true
  validates :workflow_type, presence: true
  validates :status, presence: true

  before_destroy :ensure_not_associated_to_forms

  private

  def ensure_not_associated_to_forms
    if form_templates.exists?
      errors.add(:base, 'No se puede eliminar el workflow porque está asociado a formularios')
      throw :abort
    end
  end
end
