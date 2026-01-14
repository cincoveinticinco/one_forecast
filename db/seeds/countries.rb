file = Rails.root.join("db/seeds/data/countries.json")
countries = JSON.parse(File.read(file))

countries.each do |c|
  Country.find_or_create_by!(code: c["code"]) do |country|
    country.name = c["name"]
    country.dial_code = c["dial_code"]
    country.code = c["code"]
  end
end
