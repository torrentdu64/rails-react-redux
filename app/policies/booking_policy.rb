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

  def show_api?
    true
  end

  def destroy?
    true if user.id == record.user_id
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
