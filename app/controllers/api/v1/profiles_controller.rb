class Api::V1::ProfilesController < Api::V1::BaseController
  skip_before_action :authenticate_user!, only: [:index, :show]

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

  def render_error
    render json: { errors: @profile.errors.full_messages },
      status: :unprocessable_entity
  end

end
