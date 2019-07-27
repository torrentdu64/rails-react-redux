class Api::V1::ProfilesController < Api::V1::BaseController
  before_action :set_profile, only: [ :show ]


  def index
    @profiles = policy_scope(Profile)
  end



  def show
  end

  private

  def set_profile
    @profile = Profile.find(params[:id])
    authorize @profile  # For Pundit
  end
end
