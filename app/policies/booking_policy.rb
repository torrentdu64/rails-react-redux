class BookingPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def create?
    if user.profile == true
      false
    else
      true
    end
  end

  def reply
    # verif if owner === record.owner
    true
  end

  def booking_time?
    true
  end

  def busy_till_now?
    true
  end



end
