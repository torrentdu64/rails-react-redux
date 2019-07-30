class ProfilePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def show?
    true
  end

  def list?
    true
  end



  def create?
    true
  end

  def update?
    record.user == user
  end

  def destroy?
    record.user == user
  end

  private

  def user_is_owner?
    record.user == user
  end


end
