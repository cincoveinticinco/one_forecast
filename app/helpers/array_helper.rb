module ArrayHelper
  def normalize_array(value)
    case value
    when Array
      value
    when String
      JSON.parse(value) rescue []
    else
      []
    end
  end
end
