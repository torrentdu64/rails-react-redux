import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createBooking } from '../actions';



class BookingsNew extends Component {

  onSubmit = (values) => {
    const { id } = this.props.match.params;
    this.props.createBooking( id, values );
  }

  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          type={field.type}
              {...field.input}
        />
      </div>
    );
  }



  render() {

    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field
              label="date"
              name="start_time"
              type="datetime-local"
              component={this.renderField}
            />

             <Field
              label="date end"
              name="end_time"
              type="datetime-local"
              component={this.renderField}
            />


            <Field
              label="time"
              name="duration"
              type="time"
              component={this.renderField}

          />

            <button className="btn btn-primary" type="submit"
          disabled={this.props.pristine || this.props.submitting}>
              Create Booking
            </button>
        </form>
      </div>
    );
 }
}

export default reduxForm({ form: 'newBookingForm', initialValues: { user_id: 1, profile_id: 1 } })(
  connect(null, { createBooking })(BookingsNew)
);
