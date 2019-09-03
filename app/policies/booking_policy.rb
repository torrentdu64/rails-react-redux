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



  def reply?
    true
  end

  def booking_time?
    true
  end

  def busy_till_now?
    true
  end

  def stripe_customer?
    if user
      true
    else
      false
    end
  end



end
