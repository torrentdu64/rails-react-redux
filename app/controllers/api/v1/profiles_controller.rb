class Api::V1::ProfilesController < Api::V1::BaseController
  skip_before_action :authenticate_user!, only: [:index, :show]

  before_action :set_profile, only: [ :show ]


  def index
    destroy_booking_no_pay
    @profiles = policy_scope(Profile)
  end



  def show
  end

  private

  def destroy_booking_no_pay
    @booking = Booking.where(payment: nil, user_id: current_user.id )

    @booking.destroy_all
  end

  def set_profile
    @profile = Profile.find(params[:id])
    authorize @profile  # For Pundit
  end

  def render_error
    render json: { errors: @profile.errors.full_messages },
      status: :unprocessable_entity
  end

end
