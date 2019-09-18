class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  PHONE_REGEX = /\A(\+\d{4}|\d{3})(\s?|\-)\d{3}(\s?|\-)|\d{4}|\d{3}|\d{1}\z/

end
