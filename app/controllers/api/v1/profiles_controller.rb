class Api::V1::ProfilesController < Api::V1::BaseController
  skip_before_action :authenticate_user!, only: [:index, :show]

  before_action :set_profile, only: [ :show_api ]


  def index
    if current_user
      destroy_booking_no_pay
    end
    @profiles = policy_scope(Profile)
  end





  private

  def destroy_booking_no_pay
    @booking = Booking.where(state: 'create', user_id: current_user.id )

    @booking.destroy_all
  end

  def set_profile
    p " =====>  profile #{params}"

    @profile = Profile.find(params[:profile_id])
      # For Pundit
    p " =====>  proflie #{@profile}"
  end

  def render_error
    render json: { errors: @profile.errors.full_messages },
      status: :unprocessable_entity
  end

end
