class Country < ApplicationRecord
  validates :code, presence: true, uniqueness: true
  validates :name, presence: true
  validates :dial_code, presence: true
end
