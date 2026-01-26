# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2026_01_22_183151) do
  create_table "countries", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "code", null: false
    t.string "name", null: false
    t.string "dial_code", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_countries_on_code", unique: true
  end

  create_table "form_fields", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "form_template_id", null: false
    t.bigint "parent_field_id"
    t.string "key", null: false
    t.text "label", null: false
    t.string "field_type", null: false
    t.string "block_type"
    t.boolean "required", default: false, null: false
    t.integer "order_index", default: 0, null: false
    t.string "placeholder"
    t.text "help_text"
    t.json "options"
    t.json "validations"
    t.json "visibility_rules"
    t.json "settings"
    t.json "mapping"
    t.boolean "is_system", default: false, null: false
    t.boolean "is_active", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["field_type"], name: "index_form_fields_on_field_type"
    t.index ["form_template_id", "key"], name: "index_form_fields_on_form_template_id_and_key", unique: true
    t.index ["form_template_id", "parent_field_id", "order_index"], name: "idx_on_form_template_id_parent_field_id_order_index_da13d7bc01"
    t.index ["form_template_id"], name: "index_form_fields_on_form_template_id"
    t.index ["parent_field_id"], name: "index_form_fields_on_parent_field_id"
  end

  create_table "form_submission_values", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "form_submission_id", null: false
    t.bigint "form_field_id", null: false
    t.json "value", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["form_field_id"], name: "index_form_submission_values_on_form_field_id"
    t.index ["form_submission_id", "form_field_id"], name: "idx_on_form_submission_id_form_field_id_b464949d9a", unique: true
    t.index ["form_submission_id"], name: "index_form_submission_values_on_form_submission_id"
  end

  create_table "form_submissions", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "form_template_id", null: false
    t.string "status", default: "draft", null: false
    t.datetime "submitted_at"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["form_template_id"], name: "index_form_submissions_on_form_template_id"
  end

  create_table "form_templates", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "tenant_id", null: false
    t.string "name", null: false
    t.string "slug", null: false
    t.string "template_type", null: false
    t.string "status", default: "draft", null: false
    t.string "access_type", null: false
    t.datetime "published_at"
    t.datetime "archived_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "workflow_id"
    t.index ["access_type"], name: "index_form_templates_on_access_type"
    t.index ["name"], name: "index_form_templates_on_name"
    t.index ["slug"], name: "index_form_templates_on_slug"
    t.index ["status"], name: "index_form_templates_on_status"
    t.index ["template_type"], name: "index_form_templates_on_template_type"
    t.index ["tenant_id", "slug"], name: "index_form_templates_on_tenant_id_and_slug", unique: true
    t.index ["tenant_id"], name: "index_form_templates_on_tenant_id"
    t.index ["workflow_id"], name: "index_form_templates_on_workflow_id"
  end

  create_table "friendly_id_slugs", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true, length: { slug: 70, scope: 70 }
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type", length: { slug: 140 }
    t.index ["sluggable_type", "sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_type_and_sluggable_id"
  end

  create_table "tenants", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
    t.index ["slug"], name: "index_tenants_on_slug", unique: true
  end

  create_table "workflow_steps", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "workflow_id", null: false
    t.string "name"
    t.string "step_type"
    t.string "color"
    t.integer "order_index"
    t.json "assignees"
    t.json "actions_enabled"
    t.json "actions"
    t.bigint "form_template_id"
    t.json "file_upload_settings"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["form_template_id"], name: "index_workflow_steps_on_form_template_id"
    t.index ["workflow_id", "order_index"], name: "index_workflow_steps_on_workflow_id_and_order_index"
    t.index ["workflow_id"], name: "index_workflow_steps_on_workflow_id"
  end

  create_table "workflows", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "tenant_id", null: false
    t.string "name"
    t.string "workflow_type"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tenant_id"], name: "index_workflows_on_tenant_id"
  end

  add_foreign_key "form_fields", "form_fields", column: "parent_field_id"
  add_foreign_key "form_fields", "form_templates"
  add_foreign_key "form_submission_values", "form_fields"
  add_foreign_key "form_submission_values", "form_submissions"
  add_foreign_key "form_submissions", "form_templates"
  add_foreign_key "form_templates", "tenants"
  add_foreign_key "form_templates", "workflows"
  add_foreign_key "workflow_steps", "form_templates"
  add_foreign_key "workflow_steps", "workflows"
  add_foreign_key "workflows", "tenants"
end
